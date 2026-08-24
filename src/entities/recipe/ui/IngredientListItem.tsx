import React from 'react';
import { Ingredient } from '../model/types';
import { Text, View } from 'react-native';

interface IngredientListItemProps {
    ingredient: Ingredient;
    isLast: boolean;
}

export const IngredientListItem: React.FC<IngredientListItemProps> = ({ ingredient, isLast }) => {
  return (
    <View className={`
        flex
        flex-row
        justify-between
        w-full
        bg-surface
        items-center
        p-lg
        ${!isLast ? 'border-b border-divider' : ''} 
    `}>
        <Text className='text-body font-medium text-foreground'>{ingredient.name}</Text>
        <View className='flex flex-row gap-lg items-center'>
            <Text className='text-micr text-foreground-placeholder'>{ingredient.kcal} kcal</Text>
            <Text className='text-body font-medium text-foreground text-right'>{ingredient.amount}{ingredient.unit}</Text>
        </View>
    </View>
  );
};

export default IngredientListItem;