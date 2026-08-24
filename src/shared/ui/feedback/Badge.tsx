import { cn } from '@/shared/lib';
import { LucideIcon } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';

interface BadgeProps {
  text: string;
  Icon?: LucideIcon;
}

export const Badge: React.FC<BadgeProps> = ({ text, Icon }) => {
  return (
    <View className={cn(`bg-accent-bg border border-accent-border rounded-xl px-sm py-[2px] gap-1 flex flex-row items-center justify-center`)}>
      {Icon ? <Icon size={12} color={'#1CF28A'}/> : null}
      <Text className='text-accent text-micr'>{text}</Text>
    </View>
  );
};

export default Badge;