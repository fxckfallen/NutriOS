import React from 'react';
import { Text } from 'react-native';
import { User } from '../model/types';

interface UserEmailProps {
    user: User;
}

export const UserEmail: React.FC<UserEmailProps> = ({ user }) => {
  return (
    <Text className='text-body text-foreground-muted'>{user.email}</Text>
  );
};

export default UserEmail;