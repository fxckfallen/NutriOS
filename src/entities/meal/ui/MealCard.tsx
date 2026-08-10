import React from "react";
import { View, Text } from "react-native";

interface MealCardProps {
  title: string;
  calories: number;
}

export const MealCard = ({ title, calories }: MealCardProps) => {
  return (
    <View className="bg-slate-800 p-4 rounded-2xl border border-slate-700 mb-4">
      <Text className="text-slate-100 font-bold text-lg">{title}</Text>
      <Text className="text-emerald-400 font-medium mt-1">{calories} kcal</Text>
    </View>
  );
};