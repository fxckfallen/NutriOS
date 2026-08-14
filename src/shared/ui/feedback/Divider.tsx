import React, { ReactNode } from 'react';
import { Text } from 'react-native';

interface DividerProps {
  children: ReactNode;
}

export const Divider: React.FC<DividerProps> = ({ children }) => {
  return (
    <Text className='text-foreground-muted text-head'>
      {children}
    </Text>
  );
};

export default Divider;