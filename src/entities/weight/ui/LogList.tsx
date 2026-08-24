import React from 'react';
import { View } from 'react-native';
import { WeightLog } from '../model/types';
import LogListItem from './LogListItem';
import { calculateWeightDiff } from '../lib/calculateWeightDiff';

interface LogListProps {
    weightLogs: WeightLog[];
}

export const LogList: React.FC<LogListProps> = ({ weightLogs }) => {
  return (
    <View className="rounded-md border border-divider overflow-hidden">
        {weightLogs.map((weightLog: WeightLog, index: number) => {
            const previousLog = weightLogs[index + 1];
            const diff = previousLog ? calculateWeightDiff(weightLog.weight, previousLog.weight) : undefined;
            
            // Проверяем, последний ли это элемент, чтобы не рисовать ему линию снизу
            const isLast = index === weightLogs.length - 1;

            return (
                <LogListItem 
                    key={weightLog.date} 
                    weightLog={weightLog} 
                    diff={diff}
                    isLast={isLast}
                />
            );
        })}    
    </View>
  );
};

export default LogList;