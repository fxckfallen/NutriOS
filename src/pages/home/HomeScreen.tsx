import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackButton, ProgressBar } from "@/shared/ui";
import { View } from "react-native";
import { Meal, MealCard } from "@/entities/meal";
import { BudgetCard } from "@/entities/grocery";
import { IngredientList, Recipe, StepList } from "@/entities/recipe";
import { LossItem, LossList } from "@/entities/subscription";

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
  const mock: Recipe = {
      ingredients: [{
        name: "Salmon fillet",
        kcal: 240,
        amount: 180,
        unit: "g"
      },
      {
        name: "Salmon fillet",
        kcal: 240,
        amount: 180,
        unit: "g"
      },{
        name: "Salmon fillet",
        kcal: 240,
        amount: 180,
        unit: "g"
      },{
        name: "Salmon fillet",
        kcal: 240,
        amount: 180,
        unit: "g"
      }],
      steps: [{
        index: 1,
        body: "cook 1 "
      },
      {
        index: 2,
        body: "cook 2"
      },
      {
        index: 3,
        body: "cook 3"
      },
      {
        index: 4,
        body: "cook 4"
      }
    ]
  }
  const mockItems: LossItem[] = [{
    feature: "Personalized AI plan"
  },
  {
    feature: "Budget-based menus"
  },
  {
    feature: "Smart grocery lists"
  },
  {
    feature: "Recipes for every meal"
  }
]
  return (
    <SafeAreaView className="bg-background p-3xl gap-xl flex items-center w-full">
      <View className="flex flex-row h-fit w-full gap-sm items-center">
        <BackButton />
        <View className="flex-1">
          <ProgressBar value={progress} />
        </View>
      </View>
      <LossList items={mockItems}/>
    </SafeAreaView> 
  );
};