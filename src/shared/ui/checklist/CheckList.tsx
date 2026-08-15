import React, { useEffect, useMemo, useState } from 'react';
import { View, ViewStyle } from 'react-native';
import { CheckListItem } from './CheckListItem';

/**
 * Plays a list of steps through one-by-one on a timer, same rhythm as the
 * reference mock: each step activates at its own delay from mount, and
 * previously-activated steps stay checked (nothing un-checks itself).
 *
 * Self-driving by default (matches "animate on their own" from the mock).
 * If you need it tied to real async progress instead of a timer, pass
 * `activeCount` directly and skip `delays`/`duration`/autoplay — see the
 * note below the component.
 *
 * To sync with something else that runs for a fixed `duration` (e.g. a
 * ProgressRing animating 0→100% over the same span), pass that same
 * `duration` here instead of `delays` — steps get spaced evenly across it,
 * and the last one lands exactly at `duration`, so as long as both
 * components mount together (same parent, not gated behind each other),
 * they start together and finish together by construction, not by luck.
 */

export type CheckListProps = {
  steps: string[];
  /**
   * Delay in ms (from mount) before each step activates. Must have the
   * same length as `steps`. Takes priority over `duration` if both are
   * passed. Defaults to the mock's rhythm if neither is given: first step
   * at 500ms, then every ~900ms after.
   */
  delays?: number[];
  /**
   * Total time (ms) to spread all steps across, evenly spaced, with the
   * last step landing exactly at `duration` — use this to sync against
   * another timed animation (e.g. `<ProgressRing duration={duration} />`)
   * instead of hand-rolling matching `delays`.
   */
  duration?: number;
  /**
   * Controlled alternative to `delays`/`duration` — if provided, the
   * component stops driving itself off a timer and just reflects this
   * number of completed steps (e.g. tie it to real progress:
   * `activeCount={completedStepIndex}`).
   */
  activeCount?: number;
  onComplete?: () => void;
  itemDuration?: number;
  className?: string;
  style?: ViewStyle;
};

export function CheckList({
  steps,
  delays,
  duration,
  activeCount: controlledActiveCount,
  onComplete,
  itemDuration = 350,
  className,
  style,
}: CheckListProps) {
  const isControlled = controlledActiveCount !== undefined;
  const [autoActiveCount, setAutoActiveCount] = useState(0);

  const resolvedDelays = useMemo(() => {
    if (delays) return delays;
    if (duration !== undefined) {
      // Evenly spaced, last step lands exactly on `duration` — this is
      // what makes syncing with e.g. ProgressRing exact rather than
      // approximate.
      return steps.map((_, i) => Math.round(((i + 1) / steps.length) * duration));
    }
    return steps.map((_, i) => 500 + i * 900);
  }, [delays, duration, steps]);

  useEffect(() => {
    if (isControlled) return;
    const timers = resolvedDelays.map((delay, i) =>
      setTimeout(() => {
        setAutoActiveCount((count) => Math.max(count, i + 1));
        if (i === steps.length - 1) onComplete?.();
      }, delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [isControlled, resolvedDelays, steps.length, onComplete]);

  const activeCount = isControlled ? controlledActiveCount : autoActiveCount;

  return (
    <View className={className} style={[{ width: '100%', gap: 16 }, style]}>
      {steps.map((label, i) => (
        <CheckListItem
          key={`${i}-${label}`}
          label={label}
          active={i < activeCount}
          duration={itemDuration}
        />
      ))}
    </View>
  );
}