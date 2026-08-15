import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Svg, { Circle, Defs, FeDropShadow, Filter } from "react-native-svg";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

/**
 * NOTE: this uses react-native-reanimated (useSharedValue/withTiming),
 * same as Slider — it needs a custom dev client on Expo, it will not
 * animate correctly in plain Expo Go. See the Slider notes for why.
 */

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ACCENT = "#1CF28A"; // accent.DEFAULT
const SURFACE = "#141414"; // surface.DEFAULT
const DIVIDER = "rgba(255, 255, 255, 0.08)"; // divider — was rgba(0,0,0,0.08), didn't match the app's actual token

interface ProgressRingProps {
  size?: number;
  strokeWidth?: number;
  duration?: number;
}

export default function ProgressRing({
  size = 120,
  strokeWidth = 6,
  duration = 1000,
}: ProgressRingProps) {
  const progress = useSharedValue(0);
  const [percentage, setPercentage] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    progress.value = withTiming(1, {
      duration,
      easing: Easing.out(Easing.cubic),
    });

    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const linearProgress = Math.min(elapsed / duration, 1);

      // Та же easing, что и у кольца
      const easedProgress = 1 - Math.pow(1 - linearProgress, 3);

      setPercentage(Math.round(easedProgress * 100));

      if (linearProgress >= 1) {
        clearInterval(interval);
        setPercentage(100);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [duration, progress]);

  const animatedProgressProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progress.value),
  }));

  return (
    <View
      className="items-center justify-center"
      style={{
        width: size,
        height: size,
      }}
    >
      <Svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{
          transform: [{ rotate: "-90deg" }],
        }}
      >
        {/* 
          BORDER EMPTY RING
          Только у пустой части.
        */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={DIVIDER}
          strokeWidth={strokeWidth + 2}
        />

        {/* EMPTY RING */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={SURFACE}
          strokeWidth={strokeWidth}
        />

        {/*
          GLOW LAYER 1
          Самый близкий и яркий к основной линии.
        */}
        <AnimatedCircle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={ACCENT}
          strokeWidth={strokeWidth + 4}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          animatedProps={animatedProgressProps}
          opacity={0.16}
        />

        {/*
          GLOW LAYER 2
          Средний ореол.
        */}
        <AnimatedCircle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={ACCENT}
          strokeWidth={strokeWidth + 10}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          animatedProps={animatedProgressProps}
          opacity={0.08}
        />

        {/*
          GLOW LAYER 3
          Дальний мягкий ореол.
          Вместе слои дают визуально примерно 28px glow.
        */}
        <AnimatedCircle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={ACCENT}
          strokeWidth={strokeWidth + 18}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          animatedProps={animatedProgressProps}
          opacity={0.03}
        />

        {/* MAIN PROGRESS */}
        <AnimatedCircle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={ACCENT}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          animatedProps={animatedProgressProps}
        />
      </Svg>

      {/* PERCENTAGE */}
      <View className="absolute items-center justify-center">
        <Text className="text-disp font-bold text-foreground">
          {percentage}%
        </Text>
      </View>
    </View>
  );
}