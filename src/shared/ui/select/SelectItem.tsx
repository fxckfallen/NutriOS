import { cn } from '@/shared/lib';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { SelectItemProps } from './types';


export function SelectItem<T extends string = string>({
  value,
  mainText,
  subText,
  selected = false,
  onSelect,
}: SelectItemProps<T>) {
  return (
    <TouchableOpacity
      className={cn(
        'bg-surface border py-lg w-full rounded-md items-center justify-center transition-all',
        selected ? 'border-accent' : 'border-divider',
      )}
      onPress={() => {
        // console.log('tap', value);
        onSelect?.(value);  
      }}  
      activeOpacity={1}
    >
      <Text className={cn('text-body transition-all', selected ? 'text-accent' : 'text-foreground-muted ')}>
        {mainText}
      </Text>
      {subText && <Text className="text-cap text-foreground-muted">{subText}</Text>}
    </TouchableOpacity>
  );
}

export default SelectItem;