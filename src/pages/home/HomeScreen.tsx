import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackButton, ProgressBar } from "@/shared/ui";
import { Meal, MealCard } from "@/entities/meal";
import { BudgetCard, GroceryList, GroceryItem } from "@/entities/grocery"; 

const INITIAL_GROCERY_ITEMS: GroceryItem[] = [
  {
    name: "Salmon fillet",
    amount: 400,
    unit: "g",
    price: 8.4,
    currency: "EUR",
    category: "Proteins",
    checked: true,
  },
  {
    name: "Chicken breast",
    amount: 500,
    unit: "g",
    price: 6.5,
    currency: "EUR",
    category: "Proteins",
    checked: false,
  },
  {
    name: "Avocado",
    amount: 2,
    unit: "pcs",
    price: 3.2,
    currency: "EUR",
    category: "Vegetables",
    checked: false,
  },
  {
    name: "Broccoli",
    amount: 300,
    unit: "g",
    price: 2.1,
    currency: "EUR",
    category: "Vegetables",
    checked: true,
  },
];

export const HomeScreen = () => {
  const [progress, setProgress] = useState(35);
  const [checked, setChecked] = useState<boolean>(false);
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>(INITIAL_GROCERY_ITEMS);

  const testMeal: Meal = {
    name: "Beef",
    type: "Dinner",
    kcal: 500,
    proteins: 30,
    fats: 30,
    carbs: 80,
  };
  const handleGroceryCheck = (name: string, isChecked: boolean) => {
    setGroceryItems((prevItems) =>
      prevItems.map((item) =>
        item.name === name ? { ...item, checked: isChecked } : item
      )
    );
  };
  return (
    <SafeAreaView className="bg-background flex-1">
      <ScrollView contentContainerClassName="p-3xl gap-xl items-center w-full">
        <View className="flex flex-row h-fit w-full gap-sm items-center">
          <BackButton />
          <View className="flex-1">
            <ProgressBar value={progress} />
          </View>
        </View>
        <MealCard meal={testMeal} checked={checked} onCheck={setChecked} />
        <BudgetCard budget={80} spent={23.3} currency="EUR" />

        <GroceryList items={groceryItems} onCheck={handleGroceryCheck} />
      </ScrollView>
    </SafeAreaView>
  );
};