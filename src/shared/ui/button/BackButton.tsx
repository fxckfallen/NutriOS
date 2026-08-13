import { ChevronLeft } from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface BackButtonProps {
    onClick?: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <TouchableOpacity onPress={onClick} className="
      h-full
      bg-surface
      border
      aspect-square
      border-divider
      p-md
      rounded-md
      self-start
      items-center
      justify-center
    ">
      <ChevronLeft size={20} color={'white'}/>
    </TouchableOpacity>
  );
};

export default BackButton;