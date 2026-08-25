import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface PrimaryButtonProps {
  text: string;
  onPress?: () => void;
  disabled?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  text,
  onPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.7}
      className={`
        p-md
        flex
        justify-center
        items-center
        rounded-sm
        w-full
        ${disabled
          ? 'bg-surface-secondary border border-divider'
          : 'bg-accent'}
      `}
      style={
        !disabled
          ? {
              shadowColor: '#1CF28A',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.3,
              shadowRadius: 14,
              elevation: 10,
            }
          : undefined
      }
    >
      <Text
        className={`
          font-bold
          text-body
          ${disabled ? 'text-foreground-placeholder' : 'text-black'}
        `}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;