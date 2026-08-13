import React, {
  Children,
  cloneElement,
  ReactElement,
  useState,
} from 'react';
import { View } from 'react-native';
import { SelectProps } from './types';


export const Select: React.FC<SelectProps> = ({
  children,
  onSelect,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>();

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onSelect?.(value);
  };

  return (
    <View className="w-full gap-md">
      {Children.map(children, (child) =>
        cloneElement(child, {
          selected: child.props.value === selectedValue,
          onSelect: handleSelect,
        }),
      )}
    </View>
  );
};

export default Select;