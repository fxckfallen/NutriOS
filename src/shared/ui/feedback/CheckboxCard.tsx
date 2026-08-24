import { cn } from '@/shared/lib';
import { Check } from 'lucide-react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

interface CheckboxCardProps {
  checked: boolean;
  onCheck: (checked: boolean) => void;
}

export const CheckboxCard: React.FC<CheckboxCardProps> = ({ checked, onCheck }) => {
  
  return (
    <TouchableOpacity 
    activeOpacity={1}
    onPress={() => {onCheck(!checked)}}
    className={
      cn(checked ? 
      `border-accent-border bg-accent-bg` 
      : 
      `border-divider bg-surface`, 
      `border transition-all duration-500 p-md rounded-lg`)}>
      <Check size={25} color={checked ? "#1CF28A" : "rgba(255, 255, 255, 0.50)"}/>
    </TouchableOpacity>
  );
};

export default CheckboxCard;