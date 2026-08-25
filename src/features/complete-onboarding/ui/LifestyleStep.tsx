import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Text, View } from 'react-native';
import { OnboardingAnswers } from '../model/types';
import { PrimaryButton, SelectItem } from '@/shared/ui';

// Список уровней активности с описанием (subText)
const LIFESTYLES: {
  value: OnboardingAnswers['lifestyle'];
  label: string;
  subText: string;
}[] = [
  {
    value: 'sedentary',
    label: 'Sedentary',
    subText: 'Desk job, sitting most of the day, little to no exercise',
  },
  {
    value: 'moderate',
    label: 'Moderately Active',
    subText: 'Standing job or light workouts 1-3 times/week',
  },
  {
    value: 'active',
    label: 'Highly Active',
    subText: 'Physical labor or hard workouts 3-5 times/week',
  },
];

interface LifestyleStepProps {
  onNext: (lifestyle: OnboardingAnswers['lifestyle']) => void;
}

export const LifestyleStep: React.FC<LifestyleStepProps> = ({ onNext }) => {
  const [selected, setSelected] = useState<OnboardingAnswers['lifestyle']>();
  const [isExiting, setIsExiting] = useState(false);

  // Значения для анимации
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  // 1. Анимация появления при открытии экрана
  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 350,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]);

    animation.start();

    return () => {
      animation.stop();
    };
  }, [fadeAnim, slideAnim]);

  // 2. Анимация выхода при нажатии на кнопку Next
  const handleNext = () => {
    if (!selected || isExiting) return;
    setIsExiting(true);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 220,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -24, // Улетает влево
        duration: 220,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        onNext(selected);
      }
    });
  };

  return (
    <Animated.View
      className="flex-1 w-full justify-between"
      style={{
        opacity: fadeAnim,
        transform: [{ translateX: slideAnim }],
      }}
    >
      <View className="gap-xl">
        <Text className="text-disp font-bold text-foreground">
          What's your lifestyle?
        </Text>

        <View className="gap-md">
          {LIFESTYLES.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              mainText={item.label}
              subText={item.subText}
              selected={selected === item.value}
              onSelect={setSelected}
            />
          ))}
        </View>
      </View>

      <PrimaryButton
        text="Next"
        onPress={handleNext}
        disabled={!selected || isExiting}
      />
    </Animated.View>
  );
};

export default LifestyleStep;