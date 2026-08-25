import { ReactElement } from 'react';

export interface SelectItemProps<T extends string = string> {
  value: T;
  mainText: string;
  subText?: string;
  selected?: boolean;
  onSelect?: (value: T) => void;
}

// types.ts
export interface SelectProps {
  children: ReactElement<SelectItemProps> | ReactElement<SelectItemProps>[];
  selectedValue?: string;      // ← теперь приходит снаружи
  onSelect?: (value: string) => void;
}