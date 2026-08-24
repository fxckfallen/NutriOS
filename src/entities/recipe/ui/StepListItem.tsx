import React from 'react';
import { RecipeStep } from '../model/types';
import { Text, View } from 'react-native';

interface StepListItemProps {
    step: RecipeStep;
}

export const StepListItem: React.FC<StepListItemProps> = ({ step }) => {
  return (
    <View className='flex flex-row w-full items-center gap-sm'>
        <View className='rounded-full size-8 border border-accent-border bg-accent-bg items-center justify-center'>
            <Text className='font-bold text-body text-accent'>{step.index}</Text>
        </View>
        <Text className='text-cap text-foreground-muted'>{step.body}</Text>
    </View>
  );
};

export default StepListItem;