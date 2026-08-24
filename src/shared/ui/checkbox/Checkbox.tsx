// shared/ui/checkbox/Checkbox.tsx
import React, { useEffect, useRef } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import { Check } from 'lucide-react-native';

/**
 * Standalone circle checkbox — same visual language as CheckListItem's
 * indicator (dim grey ring while unchecked, fades to filled mint circle +
 * checkmark when checked), but interactive and reusable anywhere a plain
 * checkbox is needed (grocery list, settings toggles, etc).
 *
 * Pure core `Animated` (no Reanimated) — only opacity/color transitions,
 * works in plain Expo Go.
 */

const CIRCLE_SIZE = 22;
const BORDER_COLOR_IDLE = 'rgba(255, 255, 255, 0.08)'; // divider
const FILL_COLOR = '#1CF28A'; // accent.DEFAULT
const CHECK_COLOR = '#04342c'; // dark contrast color for the checkmark on the filled circle

export interface CheckboxProps {
  checked: boolean;
  onCheck: (checked: boolean) => void;
  /** Transition duration in ms. */
  duration?: number;
  size?: number;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onCheck,
  duration = 350,
  size = CIRCLE_SIZE,
}) => {
  const progress = useRef(new Animated.Value(checked ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: checked ? 1 : 0,
      duration,
      useNativeDriver: false, // color interpolation needs the JS driver
    }).start();
  }, [checked, duration, progress]);

  const borderColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [BORDER_COLOR_IDLE, FILL_COLOR],
  });
  const backgroundColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(28, 242, 138, 0)', FILL_COLOR],
  });

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => onCheck(!checked)}>
      <Animated.View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: 2,
          borderColor,
          backgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Animated.View style={{ opacity: progress }}>
          <Check size={size * 0.55} color={CHECK_COLOR} strokeWidth={3} />
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default Checkbox;