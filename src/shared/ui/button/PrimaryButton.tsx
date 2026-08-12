import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface PrimaryButtonProps {
    text: string;
    onClick?: () => void;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ text, onClick }) => {
  return (
    <TouchableOpacity onPress={onClick} className="
      bg-accent
      p-md
      flex
      justify-center
      items-center
      shadow-[0_0_28px_rgba(28,242,138,0.3)]
      rounded-sm
    ">
      <Text className="
      text-black
      font-bold
      text-body
      ">
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;