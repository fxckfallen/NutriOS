import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface DangerButtonProps {
    text: string;
    onClick?: () => void;
}

export const DangerButton: React.FC<DangerButtonProps> = ({ text, onClick }) => {
  return (
    <TouchableOpacity onPress={onClick} className="
      bg-[rgba(248,113,113,0.08)]
      border
      border-[rgba(248,113,113,0.14)]
      p-md
      flex
      justify-center
      items-center
      rounded-md
      w-full
    ">
      <Text className="
        text-red
        font-bold 
        text-body
      ">
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default DangerButton;