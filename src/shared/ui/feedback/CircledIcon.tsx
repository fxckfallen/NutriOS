import { LucideIcon } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';

interface CircledIconProps {
  Icon: LucideIcon;
}

export const CircledIcon: React.FC<CircledIconProps> = ({ Icon }) => {
  return (
    <View className="border p-xxl rounded-full border-accent-border bg-accent-bg">
      <Icon size={50} color={"#1CF28A"} strokeWidth={1}/>
    </View>
  );
};

export default CircledIcon;