import React, { useCallback, useEffect, useRef } from 'react';
import { LayoutChangeEvent, View, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

/**
 * Draggable slider — solid mint fill, glow only around the filled portion,
 * dark empty track with a faint border only where it's NOT covered by fill.
 *
 * Gesture + all visual updates (fill width, thumb position) run as
 * Reanimated worklets on the UI thread — dragging stays smooth even while
 * JS is busy elsewhere.
 *
 * Requires: `npx expo install react-native-reanimated react-native-worklets
 * react-native-gesture-handler`. No babel.config changes needed. You DO
 * need to wrap your app root once in
 * `<GestureHandlerRootView style={{ flex: 1 }}>` (e.g. Expo Router's
 * app/_layout.tsx) — without it, gestures silently don't receive touches
 * on Android and break inside iOS modals.
 */

const FILL_COLOR = '#1CF28A'; // accent.DEFAULT
const EMPTY_BG = '#141414'; // surface.DEFAULT
const EMPTY_BORDER = 'rgba(255, 255, 255, 0.08)'; // divider
const GLOW_COLOR = 'rgba(28, 242, 138, 0.3)'; // accent @ 30% — deliberately more than accent.bg (10%)/accent.border (20%), needs to read as a glow

function clamp01(v: number) {
  'worklet';
  return Math.min(1, Math.max(0, v));
}

function snapWorklet(ratio: number, min: number, max: number, step: number) {
  'worklet';
  const raw = min + ratio * (max - min);
  if (step <= 0) return Math.min(max, Math.max(min, raw));
  const snapped = Math.round((raw - min) / step) * step + min;
  return Math.min(max, Math.max(min, snapped));
}

function ratioFromValue(value: number, min: number, max: number) {
  return max > min ? Math.min(1, Math.max(0, (value - min) / (max - min))) : 0;
}

export type SliderProps = {
  value: number;
  onValueChange?: (value: number) => void;
  /** Fires once, on release — use this for expensive side effects. */
  onSlidingComplete?: (value: number) => void;

  min?: number;
  max?: number;
  step?: number;

  trackHeight?: number;
  thumbSize?: number;

  disabled?: boolean;
  className?: string;
  style?: ViewStyle;
};

export function Slider({
  value,
  onValueChange,
  onSlidingComplete,
  min = 0,
  max = 100,
  step = 1,
  trackHeight = 8,
  thumbSize = 24,
  disabled = false,
  className,
  style,
}: SliderProps) {
  const trackWidth = useSharedValue(0);
  const ratio = useSharedValue(ratioFromValue(value, min, max));
  const startRatio = useSharedValue(0);
  const isDragging = useSharedValue(false);
  // Mirrors, on the UI thread, the last stepped value we already sent to
  // JS — lets onUpdate skip runOnJS entirely on frames where the stepped
  // value hasn't actually changed, instead of relying on a JS-side dedupe
  // *after* already paying the bridge-crossing cost every frame.
  const lastEmittedValueSV = useSharedValue(ratioFromValue(value, min, max));

  // The value we ourselves last reported via onValueChange/onSlidingComplete.
  // Used below to recognize "this incoming prop is just our own update
  // echoing back" vs. a genuine external change (e.g. a reset button) —
  // without this, a self-echo arriving late (JS thread was momentarily
  // behind during a fast drag) could get misread as an external change and
  // re-trigger the sync animation, which is exactly what caused the
  // snap-back-then-forward glitch.
  const lastEmitted = useRef<number | null>(null);
  const didMount = useRef(false);

  const emitChange = useCallback(
    (v: number) => {
      lastEmitted.current = v;
      onValueChange?.(v);
    },
    [onValueChange]
  );
  const emitComplete = useCallback(
    (v: number) => {
      lastEmitted.current = v;
      onSlidingComplete?.(v);
    },
    [onSlidingComplete]
  );

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      lastEmitted.current = value;
      return;
    }
    if (lastEmitted.current === value) return; // our own echo — ignore
    lastEmitted.current = value;
    if (!isDragging.value) {
      const r = ratioFromValue(value, min, max);
      ratio.value = withTiming(r, { duration: 120 });
      lastEmittedValueSV.value = value;
    }
  }, [value, min, max]); // eslint-disable-line react-hooks/exhaustive-deps

  const pan = Gesture.Pan()
    .enabled(!disabled)
    .onBegin((e) => {
      isDragging.value = true;
      const r = trackWidth.value > 0 ? clamp01(e.x / trackWidth.value) : 0;
      ratio.value = r;
      startRatio.value = r;
      const v = snapWorklet(r, min, max, step);
      lastEmittedValueSV.value = v;
      runOnJS(emitChange)(v);
    })
    .onUpdate((e) => {
      if (trackWidth.value <= 0) return;
      const r = clamp01(startRatio.value + e.translationX / trackWidth.value);
      ratio.value = r;
      const v = snapWorklet(r, min, max, step);
      if (v !== lastEmittedValueSV.value) {
        lastEmittedValueSV.value = v;
        runOnJS(emitChange)(v);
      }
    })
    .onFinalize(() => {
      isDragging.value = false;
      const v = snapWorklet(ratio.value, min, max, step);
      runOnJS(emitComplete)(v);
    });

  const handleLayout = (e: LayoutChangeEvent) => {
    trackWidth.value = e.nativeEvent.layout.width;
  };

  const fillStyle = useAnimatedStyle(() => ({
    width: ratio.value * trackWidth.value,
  }));
  const thumbStyle = useAnimatedStyle(() => ({
    left: ratio.value * trackWidth.value - thumbSize / 2,
  }));

  return (
    // Gesture wraps the FULL padded hit area, not just the thin track —
    // that padding is what makes the thumb graspable, so the touch target
    // needs to match it, not just the track's own (much thinner) bounds.
    <GestureDetector gesture={pan}>
      <View
        className={className}
        style={[{ paddingVertical: thumbSize / 2, opacity: disabled ? 0.4 : 1 }, style]}
      >
        <View onLayout={handleLayout} style={{ height: trackHeight }}>
          {/* Background + border + fill, clipped to the pill shape so the
              fill's right edge and the border's corners always look clean. */}
          <View
            style={{
              height: trackHeight,
              borderRadius: trackHeight / 2,
              overflow: 'hidden',
            }}
          >
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: EMPTY_BG,
                borderWidth: 1,
                borderColor: EMPTY_BORDER,
                borderRadius: trackHeight / 2,
              }}
            />
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  backgroundColor: FILL_COLOR,
                },
                fillStyle,
              ]}
            />
          </View>

          {/* Glow — deliberately NOT inside the overflow:hidden box above,
              so the blur can bleed past the track's edges. */}
          <Animated.View
            pointerEvents="none"
            style={[
              {
                position: 'absolute',
                top: 0,
                left: 0,
                height: trackHeight,
                borderRadius: trackHeight / 2,
                // (default with Expo SDK 52+). Old-arch fallback (iOS-only):
                // shadowColor: FILL_COLOR, shadowOpacity: 0.3,
                // shadowRadius: 28, shadowOffset: { width: 0, height: 0 }.
                boxShadow: `0 0 28px ${GLOW_COLOR}`,
              },
              fillStyle,
            ]}
          />

          <Animated.View
            pointerEvents="none"
            style={[
              {
                position: 'absolute',
                top: (trackHeight - thumbSize) / 2,
                width: thumbSize,
                height: thumbSize,
                borderRadius: thumbSize / 2,
                backgroundColor: FILL_COLOR,
              },
              thumbStyle,
            ]}
          />
        </View>
      </View>
    </GestureDetector>
  );
}