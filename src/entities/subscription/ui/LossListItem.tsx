import React from 'react';
import { LossItem } from '../model/types';
import { Text, View } from 'react-native';
import { X } from 'lucide-react-native';
import { cn } from '@/shared/lib';

interface LossListItemProps {
    item: LossItem;
    isLast: boolean;
}

export const LossListItem: React.FC<LossListItemProps> = ({ item, isLast }) => {
  return (
    <View className={cn(`flex flex-row gap-md py-md items-center`, isLast ? `` : `border-b border-divider`)}>
        <X color={"rgba(255, 255, 255, 0.50)"} size={36} strokeWidth={1}/>
        <Text className='text-foreground-muted font-medium text-body line-through'>{item.feature}</Text>
    </View>
  );
};

export default LossListItem;