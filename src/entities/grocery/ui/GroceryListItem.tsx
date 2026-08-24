import React from 'react';
import { Text, View } from 'react-native';
import { GroceryItem } from '../model/types';
import { Checkbox } from '@/shared/ui';
import { getCurrencyChar } from '@/shared/lib';

interface GroceryListItemProps {
    item: GroceryItem;
    onCheck: (checked: boolean) => void;
}

export const GroceryListItem: React.FC<GroceryListItemProps> = ({ item, onCheck }) => {
  return (
    <View className='flex flex-row justify-between items-center p-md w-full bg-surface border border-divider rounded-md'>
        <View className='flex flex-row gap-xs items-center'>
            <Checkbox size={20} checked={item.checked} onCheck={onCheck}/>
            <Text className='font-medium text-body text-foreground'>{item.name}</Text>
        </View>
        <View className='flex flex-row gap-xs items-center'>
            <Text className='text-micr text-foreground-placeholder'>{item.amount}{item.unit}</Text>
            <Text className='text-cap text-foreground-muted font-medium'>{getCurrencyChar(item.currency)}{item.price}</Text>
        </View>
    </View>
  );
};

export default GroceryListItem;