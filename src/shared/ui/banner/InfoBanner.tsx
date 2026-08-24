import { cn } from '@/shared/lib';
import { LucideIcon } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';

interface InfoBannerProps {
  text: string;
  Icon?: LucideIcon;
}

export const InfoBanner: React.FC<InfoBannerProps> = ({ text, Icon }) => {
  return (
    <View className={cn(`bg-accent-bg border border-accent-border rounded-md p-md flex flex-row items-center justify-center`)}>
      <View className='flex-1 flex-row gap-sm'>
        {Icon ? <Icon size={30} color={'#1CF28A'}/> : null}
        <Text className='text-foreground-muted text-cap'>{text}</Text>
      </View>
    </View>
  );
};

export default InfoBanner;