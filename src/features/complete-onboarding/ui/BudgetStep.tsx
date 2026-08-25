import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Text, View } from 'react-native';
import { OnboardingAnswers } from '../model/types';
import { PrimaryButton, Slider, WheelPicker } from '@/shared/ui';

// Список валют для барабана
const CURRENCIES: OnboardingAnswers['currency'][] = [
  'RUB',
  'USD',
  'EUR',
] as OnboardingAnswers['currency'][];

interface BudgetStepProps {
  onNext: (
    budget: OnboardingAnswers['budget'],
    currency: OnboardingAnswers['currency']
  ) => void;
}

export const BudgetStep: React.FC<BudgetStepProps> = ({ onNext }) => {
  const [budget, setBudget] = useState<number>(200);
  const [currency, setCurrency] = useState<OnboardingAnswers['currency']>('USD');
  const [isExiting, setIsExiting] = useState<boolean>(false);

  // Значения для анимации появления и ухода
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

  // 2. Анимация выхода при нажатии на Next
  const handleNext = () => {
    if (!budget || !currency || isExiting) return;
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
        onNext(budget, currency);
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
        <Text className="text-disp font-bold text-foreground">
          What's your budget?
        </Text>

        {/* Секция: Слайдер бюджета слева + Выбор валюты справа */}
        <View className="flex flex-row items-center w-full gap-lg my-auto pt-24">
          
          {/* Левая колонка: цифра суммы и слайдер */}
          <View className="flex-1 gap-md">
            <View className="flex flex-row items-baseline justify-center gap-xs">
              <Text className="text-[32px] font-bold text-foreground">
                {budget}
              </Text>
              <Text className="text-body text-foreground-muted">
                / week
              </Text>
            </View>

            <Slider
              value={budget}
              min={20}
              max={1000}
              step={10}
              onValueChange={setBudget}
            />
          </View>

          {/* Правая колонка: барабан валют */}
          <View className="w-20 items-center justify-center">
            <WheelPicker
              data={CURRENCIES}
              value={currency}
              onChange={(newCurrency) => setCurrency(newCurrency)}
              itemHeight={38}
              visibleItems={5}
              selectedFontSize={24}
              unselectedFontSize={16}
              selectedColor="#ffffff"
              unselectedColor="#404040"
            />
          </View>

        </View>
      </View>

      {/* Кнопка Далее */}
      <PrimaryButton
        text="Next"
        onPress={handleNext}
        disabled={!budget || !currency || isExiting}
      />
    </Animated.View>
  );
};

export default BudgetStep;