import { cn } from '@/shared/lib';
import React, { useState } from 'react';
import { TextInput } from 'react-native';

interface TextAreaProps {
  defaultValue?: string;
  variant?: 'default' | 'error';
  placeholder: string;
  onChangeText?: (text: string) => void;
}

export const TextArea: React.FC<TextAreaProps> = ({
  defaultValue,
  variant = 'default',
  placeholder,
  onChangeText,
}) => {
  const [height, setHeight] = useState(48);

  return (
    <TextInput
      className={cn(
        `
          bg-surface
          border
          border-divider
          p-md
          rounded-md
          text-foreground
          placeholder:text-foreground-placeholder
        `,
        variant === 'error'
          ? 'border-red text-red'
          : ''
      )}
      textAlignVertical="top"
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChangeText={onChangeText}
      onContentSizeChange={(event) => {
        setHeight(Math.max(48, event.nativeEvent.contentSize.height));
      }}
      style={{
        height,
      }}
    />
  );
};

export default TextArea;  