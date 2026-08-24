import React from 'react';
import { Text } from 'react-native';
import { User } from '../model/types';

interface UserNameProps {
    user: User;
}

export const UserName: React.FC<UserNameProps> = ({ user }) => {
  return (
    <Text className='font-bold text-disp text-foreground'>{user.name}</Text>
  );
};

export default UserName;