import React from 'react';
import { Recipe, RecipeStep } from '../model/types';
import { View } from 'react-native';
import StepListItem from './StepListItem';

interface StepListProps {
    recipe: Recipe;
}

export const StepList: React.FC<StepListProps> = ({ recipe }) => {
  return (
    <View className='w-full gap-sm'>
        {recipe.steps.map((step: RecipeStep) => <StepListItem key={step.index} step={step} />)}  
    </View>
  );
};

export default StepList;