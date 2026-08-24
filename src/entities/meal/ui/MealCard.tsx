import React from 'react';
import { Meal } from '../model/types';
import { Text, View } from 'react-native';
import MealStats from './MealStats';
import { CheckboxCard } from '@/shared/ui';

interface MealCardProps {
    meal: Meal;
    checked: boolean;
    onCheck: (state: boolean) => void;
    custom?: boolean;
}

export const MealCard: React.FC<MealCardProps> = ({ meal, checked, onCheck, custom }) => {
  return (
    <View className='flex flex-row items-center justify-between w-full bg-surface border border-divider rounded-md p-sm'>
        <View className='flex flex-col gap-xs'>
            <View className='flex flex-row gap-lg'>
                <Text className='text-micr text-foreground-placeholder'>{meal.type}</Text> 
                {/* ADD CUSTOM BADGE */}
            </View>
            <Text className='text-body font-semibold text-foreground'>{meal.name}</Text>
            <MealStats meal={meal}/>
        </View>
        <CheckboxCard checked={checked} onCheck={onCheck}/>
    </View>
  );
};

export default MealCard;