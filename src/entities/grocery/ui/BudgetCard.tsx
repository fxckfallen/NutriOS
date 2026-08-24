import { getCurrencyChar, getPercentage } from '@/shared/lib';
import { ProgressBar } from '@/shared/ui';
import React from 'react';
import { Text, View } from 'react-native';

interface BudgetCardProps {
    budget: number;
    spent: number;
    currency: 'USD' | 'EUR' | 'RUB';
}

export const BudgetCard: React.FC<BudgetCardProps> = ({ budget, spent, currency }) => {
    const currencyChar: string = getCurrencyChar(currency);
    return (
        <View className='flex flex-col gap-sm w-full border border-divider rounded-sm p-sm bg-surface'>
            <View className='flex flex-row w-full justify-between items-center'>
                <Text className='font-medium text-cap text-foreground-muted'>Weekly Budget</Text>
                <Text className='font-semibold text-cap text-foreground'>{currencyChar}{spent} spent</Text>
            </View>
            <View className='h-2'>
                <ProgressBar value={getPercentage(budget, spent)}/>
            </View>
            <Text className='text-micr text-foreground-placeholder'>{currencyChar}{budget-spent} remaining this week</Text>
        </View>
    );
};

export default BudgetCard;