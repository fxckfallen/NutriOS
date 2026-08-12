import { ChevronLeft } from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface BackButtonProps {
    onClick?: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <TouchableOpacity onPress={onClick} className="
      w-fit
      bg-surface
      border
      border-divider
      p-md
      rounded-md
      self-start
    ">
      <ChevronLeft size={20} color={'white'}/>
    </TouchableOpacity>
  );
};

export default BackButton;