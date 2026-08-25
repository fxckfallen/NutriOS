import { Badge, CircledIcon } from '@/shared/ui';
import { Check } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Text, View } from 'react-native';
import { OnboardingAnswers } from '../model/types';
import { getGoalContent } from '../lib/getGoalContent';

interface GoalConfirmStepProps {
  goal: OnboardingAnswers['goal'];
  onNext: () => void;
}

export const GoalConfirmStep: React.FC<GoalConfirmStepProps> = ({
  goal,
  onNext,
}) => {
  const content = getGoalContent(goal);

  const iconOpacity = useRef(new Animated.Value(0)).current;
  const iconTranslateY = useRef(new Animated.Value(12)).current;

  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(12)).current;

  const descriptionOpacity = useRef(new Animated.Value(0)).current;
  const descriptionTranslateY = useRef(new Animated.Value(12)).current;

  const badgeOpacity = useRef(new Animated.Value(0)).current;
  const badgeTranslateY = useRef(new Animated.Value(12)).current;

  const footerOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateElement = (
      opacity: Animated.Value,
      translateY: Animated.Value,
      delay: number,
    ) => {
      return Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 400,
          delay,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 400,
          delay,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]);
    };

    const animation = Animated.sequence([
      animateElement(iconOpacity, iconTranslateY, 100),
      animateElement(titleOpacity, titleTranslateY, 150),
      animateElement(descriptionOpacity, descriptionTranslateY, 150),
      animateElement(badgeOpacity, badgeTranslateY, 150),

      Animated.timing(footerOpacity, {
        toValue: 1,
        duration: 500,
        delay: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]);

    animation.start(({ finished }) => {
      if (!finished) return;

      // Мягкое мерцание:
      // 1 → 0.75 → 1
      Animated.loop(
        Animated.sequence([
          Animated.timing(footerOpacity, {
            toValue: 0.75,
            duration: 700,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(footerOpacity, {
            toValue: 1,
            duration: 700,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        {
          iterations: 100,
        },
      ).start(({ finished }) => {
        if (finished) {
          onNext();
        }
      });
    });

    return () => {
      animation.stop();

      iconOpacity.stopAnimation();
      iconTranslateY.stopAnimation();

      titleOpacity.stopAnimation();
      titleTranslateY.stopAnimation();

      descriptionOpacity.stopAnimation();
      descriptionTranslateY.stopAnimation();

      badgeOpacity.stopAnimation();
      badgeTranslateY.stopAnimation();

      footerOpacity.stopAnimation();
    };
  }, [
    onNext,
    iconOpacity,
    iconTranslateY,
    titleOpacity,
    titleTranslateY,
    descriptionOpacity,
    descriptionTranslateY,
    badgeOpacity,
    badgeTranslateY,
    footerOpacity,
  ]);

  return (
    <View className="flex-1">
      {/* Main content */}
      <View className="flex-1 items-center justify-center">
        <View className="gap-md items-center">
          {/* Icon */}
          <Animated.View
            style={{
              opacity: iconOpacity,
              transform: [{ translateY: iconTranslateY }],
            }}
          >
            <CircledIcon Icon={content.icon} />
          </Animated.View>

          {/* Title */}
          <Animated.View
            style={{
              opacity: titleOpacity,
              transform: [{ translateY: titleTranslateY }],
            }}
          >
            <Text className="font-semibold text-titl text-foreground text-center">
              {content.title}
            </Text>
          </Animated.View>

          {/* Description */}
          <Animated.View
            style={{
              opacity: descriptionOpacity,
              transform: [{ translateY: descriptionTranslateY }],
            }}
          >
            <Text className="text-foreground-muted text-body text-center">
              {content.description}
            </Text>
          </Animated.View>

          {/* Badge */}
          <Animated.View
            style={{
              opacity: badgeOpacity,
              transform: [{ translateY: badgeTranslateY }],
            }}
          >
            <Badge Icon={Check} text="Goal locked in" />
          </Animated.View>
        </View>

        {/* Footer */}
        <Animated.Text
          className="absolute bottom-0 w-full text-center text-micr text-foreground-placeholder"
          style={{
            opacity: footerOpacity,
          }}
        >
          Setting up your next questions…
        </Animated.Text>
      </View>
    </View>
  );
};

export default GoalConfirmStep;