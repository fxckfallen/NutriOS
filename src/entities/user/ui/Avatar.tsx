import React from 'react';
import { Text, View } from 'react-native';
import { User } from '../model/types';
import { getUserAvatar } from '../lib/getUserAvatar';

interface AvatarProps {
    user: User;
}

export const Avatar: React.FC<AvatarProps> = ({ user }) => {
  return (
    <View className='size-[100px] border-accent border-[2px] rounded-md bg-surface items-center justify-center'>
        <Text className='text-foreground text-disp font-bold'>
            {getUserAvatar(user)}
        </Text>
    </View>  
);
};

export default Avatar;