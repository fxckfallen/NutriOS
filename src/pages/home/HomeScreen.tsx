import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackButton, ProgressBar } from "@/shared/ui";
import { View } from "react-native";
import { Meal, MealCard } from "@/entities/meal";

export const HomeScreen = () => {
  const [progress, setProgress] = useState(35);
  const [checked, setChecked] = useState<boolean>(false);
  const testMeal: Meal = {
    name: "Beef",
    type: "Dinner",
    kcal: 500,
    proteins: 30,
    fats: 30,
    carbs: 80
  }
  return (
    <SafeAreaView className="bg-background p-3xl gap-xl flex items-center w-full">
      <View className="flex flex-row h-fit w-full gap-sm items-center">
        <BackButton />
        <View className="flex-1">
          <ProgressBar value={progress} />
        </View>
      </View>
      <MealCard meal={testMeal} checked={checked} onCheck={setChecked}/>
    </SafeAreaView> 
  );
};