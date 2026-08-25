import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Text, View } from 'react-native';
import { OnboardingAnswers } from '../model/types';
import { PrimaryButton, WeightPicker, WheelPicker } from '@/shared/ui';

interface BodyStepProps {
  onNext: (
    height: OnboardingAnswers['height'],
    weight: OnboardingAnswers['weight']
  ) => void;
}

// Диапазон роста от 100 см до 230 см
const HEIGHTS = Array.from({ length: 131 }, (_, i) => 100 + i);

export const BodyStep: React.FC<BodyStepProps> = ({ onNext }) => {
  const [height, setHeight] = useState<number>(184);
  const [weight, setWeight] = useState<number>(84.2);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  // Значения для анимации (прозрачность и сдвиг по оси X)
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

  // 2. Анимация ухода при нажатии на Next
  const handleNext = () => {
    if (isExiting) return;
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
        onNext(height, weight);
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
      <View className="gap-xl w-full">
        {/* Блок выбора роста */}
        <View className="gap-md w-full">
          <Text className="text-disp font-bold text-foreground">
            What's your height?
          </Text>
          <WheelPicker
            data={HEIGHTS}
            value={height}
            onChange={(newHeight) => setHeight(newHeight)}
            unit="cm"
          />
        </View>

        {/* Блок выбора веса */}
        <View className="gap-md w-full">
          <Text className="text-disp font-bold text-foreground">
            What's your weight?
          </Text>
          <WeightPicker
            value={weight}
            onChange={(newWeight) => setWeight(newWeight)}
            unit="kg"
          />
        </View>
      </View>

      {/* Кнопка Далее */}
      <PrimaryButton
        text="Next"
        onPress={handleNext}
        disabled={!height || !weight || isExiting}
      />
    </Animated.View>
  );
};

export default BodyStep;