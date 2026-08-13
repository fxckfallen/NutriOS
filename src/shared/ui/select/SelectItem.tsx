import { cn } from '@/shared/lib/cn';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { SelectItemProps } from './types';


export const SelectItem: React.FC<SelectItemProps> = ({
  value,
  mainText,
  subText,
  selected = false,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      className={cn(
        'bg-surface border py-lg w-full rounded-md items-center justify-center transition-all',
        selected ? 'border-accent' : 'border-divider',
      )}
      onPress={() => onSelect?.(value)}
      activeOpacity={1}
    >
      <Text
        className={cn(
          'text-body',
          selected ? 'text-accent' : 'text-foreground-muted transition-all',
        )}
      >
        {mainText}
      </Text>

      {subText && (
        <Text className="text-cap text-foreground-muted">
          {subText}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default SelectItem;