import React, { ReactNode } from 'react';
import { Text } from 'react-native';

interface LinkProps {
  children: ReactNode;
  href: string;
}

export const Link: React.FC<LinkProps> = ({ children, href }) => {
  return (
    <Text className='text-accent text-body'>
      {children}
    </Text>
  );
};

export default Link;