import React from 'react';
import { LossItem } from '../model/types';
import { View } from 'react-native';
import LossListItem from './LossListItem';

interface LossListProps {
    items: LossItem[];
}

export const LossList: React.FC<LossListProps> = ({ items }) => {
  return (
    <View className='w-full'>    
        {items.map((item: LossItem, index: number) => {
            const isLast = index === items.length - 1;
              return (
                <LossListItem 
                  key={index}
                  item={item}
                  isLast={isLast}
                />
            );
        })}
    </View>
    );
};

export default LossList;