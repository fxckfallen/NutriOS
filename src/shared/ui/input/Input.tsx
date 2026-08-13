import { cn } from '@/shared/lib/cn';
import React from 'react';
import { TextInput } from 'react-native';


interface InputProps {
  value?: string;
  variant?: "default" | "error";
  placeholder: string;
}

export const Input: React.FC<InputProps> = ({ value, variant, placeholder }) => {
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
    `, variant == "error" ? `border-red text-red` : ``)} placeholder={placeholder} defaultValue={value}/>
  );
};

export default Input;