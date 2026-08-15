import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';
import { Check } from 'lucide-react-native';

/**
 * One row of a build/loading checklist: dim grey + empty ring while
 * pending, fades to full brightness + filled mint circle + checkmark once
 * `active` flips to true. Pure core `Animated` (no Reanimated) — this only
 * needs opacity/color transitions, and staying on core Animated means it
 * works in plain Expo Go without a custom dev client.
 *
 * Requires: `npx expo install lucide-react-native react-native-svg`
 * (react-native-svg is lucide's peer dep — both work fine in Expo Go).
 */

const CIRCLE_SIZE = 22;
const BORDER_COLOR_IDLE = 'rgba(255, 255, 255, 0.08)'; // divider
const FILL_COLOR = '#1CF28A'; // accent.DEFAULT
const LABEL_COLOR_IDLE = 'rgba(255, 255, 255, 0.5)'; // foreground.muted
const LABEL_COLOR_ACTIVE = '#FFFFFF'; // foreground.DEFAULT
const CHECK_COLOR = '#04342c'; // no matching token — dark contrast color for the checkmark sitting on the accent-filled circle

export type CheckListItemProps = {
  label: string;
  active: boolean;
  /** Transition duration in ms. */
  duration?: number;
  className?: string;
  style?: ViewStyle;
};

export function CheckListItem({
  label,
  active,
  duration = 350,
  className,
  style,
}: CheckListItemProps) {
  const progress = useRef(new Animated.Value(active ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: active ? 1 : 0,
      duration,
      useNativeDriver: false, // color interpolation needs the JS driver
    }).start();
  }, [active, duration, progress]);

  const rowOpacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.35, 1],
  });
  const circleBorderColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [BORDER_COLOR_IDLE, FILL_COLOR],
  });
  const circleBackground = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(28, 242, 138, 0)', FILL_COLOR],
  });
  const labelColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [LABEL_COLOR_IDLE, LABEL_COLOR_ACTIVE],
  });

  return (
    <Animated.View
      className={className}
      style={[
        // gap: 12 already matches the spacing.md token value.
        { flexDirection: 'row', alignItems: 'center', gap: 12, opacity: rowOpacity },
        style,
      ]}
    >
      <Animated.View
        style={{
          width: CIRCLE_SIZE,
          height: CIRCLE_SIZE,
          borderRadius: CIRCLE_SIZE / 2,
          borderWidth: 2,
          borderColor: circleBorderColor,
          backgroundColor: circleBackground,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Animated.View style={{ opacity: progress }}>
          <Check size={12} color={CHECK_COLOR} strokeWidth={3} />
        </Animated.View>
      </Animated.View>

      <Animated.Text className="text-body" style={{ color: labelColor }}>
        {label}
      </Animated.Text>
    </Animated.View>
  );
}