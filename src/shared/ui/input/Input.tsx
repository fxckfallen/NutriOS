import { cn } from '@/shared/lib';
import React from 'react';
import { TextInput } from 'react-native';


interface InputProps {
  defaultValue?: string;
  variant?: "default" | "error";
  placeholder: string;
  onChangeText?: (text: string) => void; 
}

export const Input: React.FC<InputProps> = ({ defaultValue, variant, placeholder, onChangeText }) => {
  return (
    <TextInput className={cn(`
      bg-surface
      border
      border-divider
      p-md
      rounded-md
      text-foreground
      transition-all
      placeholder:text-foreground-placeholder
      focus:border-accent
      w-full
    `, variant == "error" ? `border-red text-red` : ``)}
    placeholder={placeholder}
    defaultValue={defaultValue}
    onChangeText={onChangeText}
    />
  );
};

export default Input;