import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Text, View } from 'react-native';
import { CheckList, ProgressRing } from '@/shared/ui';

interface BuildingPlanStepProps {
  onNext: () => void;
}

const STEPS = [
  'Analyzing your goal',
  'Calculating your calorie needs',
  'Matching recipes to your budget',
  'Building your grocery list',
];

// Точные задержки для каждого шага
const DELAYS = [500, 1400, 2300, 3200];
// Точное время анимации кольца
const RING_DURATION = 4000;

export const BuildingPlanStep: React.FC<BuildingPlanStepProps> = ({ onNext }) => {
  const [isExiting, setIsExiting] = useState(false);

  // Анимации появления и выхода
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const footerOpacity = useRef(new Animated.Value(0.3)).current;

  // 1. Появление экрана и мягкое дыхание футера
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();

    // Бесконечная плавная пульсация футера
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(footerOpacity, {
          toValue: 0.8,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(footerOpacity, {
          toValue: 0.3,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
      { resetBeforeIteration: false }
    );

    pulseLoop.start();

    return () => {
      pulseLoop.stop();
    };
  }, [fadeAnim, slideAnim, footerOpacity]);

  // 2. Обработка завершения (после последнего шага чеклиста)
  const handleComplete = () => {
    if (isExiting) return;
    setIsExiting(true);

    // Даем пользователю полсекунды посмотреть на 100% и улетаем влево
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -24,
          duration: 250,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (finished) {
          onNext();
        }
      });
    }, 500);
  };

  return (
    <Animated.View
      className="flex-1 w-full justify-between items-center pb-8 pt-8"
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      {/* Центральный контент */}
      <View className="flex-1 justify-center items-center w-full gap-xl">
        
        {/* 1. Кольцо с прогрессом (4000мс) */}
        <ProgressRing 
          size={150} 
          duration={RING_DURATION} 
          strokeWidth={7} 
        />

        {/* 2. Заголовки */}
        <View className="items-center gap-xs px-md">
          <Text className="text-disp font-bold text-foreground text-center">
            Building your plan
          </Text>
          <Text className="text-body text-foreground-muted text-center">
            Personalizing everything for you
          </Text>
        </View>

        {/* 3. Список шагов (идеально центрирован относительно экрана) */}
        <View className="items-center justify-center w-full mt-2">
          <CheckList
            steps={STEPS}
            delays={DELAYS}
            onComplete={handleComplete}
            style={{ width: 'auto', alignSelf: 'center' }}
          />
        </View>

      </View>

      {/* 4. Пульсирующий текст внизу */}
      <Animated.Text
        className="text-center text-cap text-foreground-placeholder"
        style={{
          opacity: footerOpacity,
        }}
      >
        Setting up your next questions…
      </Animated.Text>
    </Animated.View>
  );
};

export default BuildingPlanStep;