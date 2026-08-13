import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

interface ProgressBarProps {
  value: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  const clampedValue = Math.min(100, Math.max(0, value));
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: clampedValue,
      duration: 500, 
      useNativeDriver: false, 
    }).start();
  }, [clampedValue]);

  return (
    <View className='flex-1 border border-divider bg-surface rounded-md h-full w-full'>
      <Animated.View 
        className='bg-accent rounded-md shadow-[0_0_28px_rgba(28,242,138,0.3)] h-full'
        style={{ width: widthAnim.interpolate({
          inputRange: [0, 100],
          outputRange: ['0%', '100%']
        }) }}
      />
    </View>
  );
};