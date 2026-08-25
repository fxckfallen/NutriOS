import React, {
  Children,
  cloneElement,
  ReactElement,
} from 'react';
import { View } from 'react-native';
import { SelectItemProps, SelectProps } from './types';


// Select.tsx
export const Select: React.FC<SelectProps> = ({ children, selectedValue, onSelect }) => {
  return (
    <View className="w-full gap-md">
      {Children.map(children, (child) => {
        const element = child as ReactElement<SelectItemProps>;
        return cloneElement(element, {
          selected: element.props.value === selectedValue,
          onSelect, // просто прокидываем дальше, а не оборачиваем в свой handleSelect
        });
      })}
    </View>
  );
};

export default Select;