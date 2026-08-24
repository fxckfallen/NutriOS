import React from 'react';
import { Text, View } from 'react-native';

interface CurrentWeightCardProps {
    currentWeight: number;
}

export const CurrentWeightCard: React.FC<CurrentWeightCardProps> = ({ currentWeight }) => {
  return (
    <View className='flex items-center gap-xs border border-divider rounded-md bg-surface w-full p-sm'>
        <Text className='text-foreground font-bold text-titl flex flex-row items-center justify-center'>{currentWeight} kg</Text>
        <Text className='text-foreground-muted text-body'>Current Weight</Text>
     </View>
  );
};

export default CurrentWeightCard;