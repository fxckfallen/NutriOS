import React from 'react';
import { Text, View } from 'react-native';

interface AvatarProps {
    name: string;
}

export const Avatar: React.FC<AvatarProps> = ({ name }) => {
  return (
    <View className='size-[100px] border-accent border-[2px] rounded-md bg-surface items-center justify-center'>
        <Text className='text-foreground text-disp font-bold'>
            {name?.[0]?.toUpperCase()}
        </Text>
    </View>  
);
};

export default Avatar;