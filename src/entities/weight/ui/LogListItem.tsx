import { MoveDown, MoveUp } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';
import { WeightLog } from '../model/types';

interface LogListItemProps {
    weightLog: WeightLog;
    diff?: number;
    isLast?: boolean; 
}

export const LogListItem: React.FC<LogListItemProps> = ({ weightLog, diff, isLast }) => {
  return (
    <View className={`
        flex
        flex-row
        justify-between
        w-full
        bg-surface
        items-center
        p-lg
        ${!isLast ? 'border-b border-divider' : ''} 
    `}>
        <Text className='text-body font-medium text-foreground-muted'>{weightLog.date}</Text>
        <View className='flex flex-row gap-lg items-center'>
            {diff !== undefined && (
                diff <= 0 ? (
                    <View className='flex flex-row items-center justify-end'>
                        <MoveDown size={15} color={'#1CF28A'}/>
                        <Text className='text-body text-accent font-medium'>{Math.abs(diff)}</Text>
                    </View>
                ) : (
                    <View className='flex flex-row items-center justify-end'>
                        <MoveUp size={15} color={'#F87171'}/>
                        <Text className='text-body text-red font-medium'>{diff}</Text>
                    </View>
                )
            )}
            <Text className='text-body font-medium text-foreground text-right'>{weightLog.weight}</Text>
        </View>
    </View>
  );
};

export default LogListItem;