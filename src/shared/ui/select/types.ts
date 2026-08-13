import React from 'react';

export interface SelectItemProps {
  value: string;
  mainText: string;
  subText?: string;
  selected?: boolean;
  onSelect?: (value: string) => void;
}

export interface SelectProps {
  children:
    | React.ReactElement<SelectItemProps>
    | React.ReactElement<SelectItemProps>[];
  onSelect?: (value: string) => void;
}