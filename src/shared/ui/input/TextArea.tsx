import { cn } from '@/shared/lib/cn';
import React from 'react';
import { TextInput } from 'react-native';


interface TextAreaProps {
  value?: string;
  variant?: "default" | "error";
  placeholder: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ value, variant, placeholder }) => {
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
      focus:text-foreground
    `, variant == "error" ? `border-red text-red` : ``)} multiline={true} textAlignVertical='top'  placeholder={placeholder} defaultValue={value}/>
  );
};

export default TextArea;