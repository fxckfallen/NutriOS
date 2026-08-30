import React from 'react';
import { NutritionGoal } from '../model/types';
import { Text, View } from 'react-native';

interface PlanReadyStepProps {
  goal?: NutritionGoal; //timeless optional for testing
}

export const PlanReadyStep: React.FC<PlanReadyStepProps> = ({ goal }) => {
  return (
    <View className='gap-xl'>
      <View className=''>
        <Text className='font-semibold text-disp text-foreground w-full'>Your plan is ready</Text>
        <Text className='text-body text-foreground-muted max-w-[292px]'>Personalized for your goal, weight, and week budget.</Text>
      </View>
      {/* NutriGoal will be there */}
      <View className='gap-sm'>
        <Text className='font-semibold text-titl text-foreground'>This week plan</Text>
        {/* TODO: meals muted, ill do it myself */}
      </View>
    </View>
  );
};

export default PlanReadyStep;