import React from 'react';
import { Text } from 'react-native';

interface UserNameProps {
    name: string;
}

export const UserName: React.FC<UserNameProps> = ({ name }) => {
  return (
    <Text className='font-bold text-disp text-foreground'>{name}</Text>
  );
};

export default UserName;