import { cn } from '@/shared/lib';
import React from 'react';
import { TextInput } from 'react-native';

interface TextAreaProps {
  defaultValue?: string;
  variant?: "default" | "error";
  placeholder: string;
  onChangeText?: (text: string) => void; 
}

export const TextArea: React.FC<TextAreaProps> = ({ defaultValue, variant, placeholder, onChangeText }) => {
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
    `, variant == "error" ? `border-red text-red` : ``)}
   multiline={true} 
   textAlignVertical='top'  
   placeholder={placeholder} 
   defaultValue={defaultValue}
   onChangeText={onChangeText}
   />
  );
};

export default TextArea;