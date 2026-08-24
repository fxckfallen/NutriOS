import React from 'react';
import { Meal } from '../model/types';
import { Text, View } from 'react-native';

interface MealStatsProps {
    meal: Meal;
}

export const MealStats: React.FC<MealStatsProps> = ({ meal }) => {
  return (
    <View className='flex flex-row gap-xs'>
        <Text className='text-cap font-medium text-foreground-muted'>{meal.kcal} kcal</Text>
        <Text className='text-cap text-foreground-placeholder'>P {meal.proteins} F {meal.fats} C {meal.carbs}</Text>
    </View>
  );
};

export default MealStats;