import React, { useState } from 'react';
import { OnboardingAnswers } from '../model/types';
import { Text, View } from 'react-native';
import { BackButton, PrimaryButton, ProgressBar, Select, SelectItem, TextArea } from '@/shared/ui';
import { getPercentage } from '@/shared/lib';

const GOALS: { value: OnboardingAnswers['goal']; label: string }[] = [
  { value: 'lose-weight', label: 'Lose Weight' },
  { value: 'build-muscle', label: 'Build Muscle' },
  { value: 'maintain', label: 'Maintain & Eat Healthy' },
  { value: 'save-money', label: 'Save Money on Food' },
  { value: 'other', label: 'Something Else' },
];

interface GoalStepProps {
    currentIndex: number;
    total: number;
    onNext: (goal: OnboardingAnswers['goal'], goalOther?: string) => void;
    onBack: () => void;
}

export const GoalStep: React.FC<GoalStepProps> = ({ currentIndex, total, onNext, onBack }) => {
  const [selected, setSelected] = useState<OnboardingAnswers['goal']>();
  const [otherText, setOtherText] = useState('');

  return (
    <View className="flex-1 w-full justify-between">
      <View className="gap-xl">
        
      <Text className="text-disp font-bold text-foreground">What's your main goal? {selected}</Text>
      <View className="gap-md">
            {GOALS.map((goal) => (
                <SelectItem
                    key={goal.value}
                    value={goal.value}                
                    mainText={goal.label}
                    selected={selected == goal.value}
                    onSelect={setSelected}             
                />
            ))}
            {selected === "other" ? 
            <TextArea placeholder='Write here...'/> : null 
        }
        </View>
      </View>

      <PrimaryButton
        text="Next"
        onPress={() => onNext(selected!, selected === "other" ? otherText : undefined)}
        disabled={!selected}
      />
    </View>
  );
};

export default GoalStep;