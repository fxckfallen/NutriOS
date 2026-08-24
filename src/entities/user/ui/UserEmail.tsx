import React from 'react';
import { Text } from 'react-native';

interface UserEmailProps {
    email: string;
}

export const UserEmail: React.FC<UserEmailProps> = ({ email }) => {
  return (
    <Text className='text-body text-foreground-muted'>{email}</Text>
  );
};

export default UserEmail;