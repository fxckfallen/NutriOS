import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MealCard } from "@/entities/meal/ui/MealCard";
import { Button } from "@/shared/ui/Button";

export const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-slate-900 px-4 pt-8">
      <View className="flex-1 justify-between pb-6">
        <View>
          <Text className="text-3xl font-extrabold text-white mb-6">
            nutri<Text className="text-emerald-400">OS</Text>
          </Text>

          <Text className="text-slate-400 text-sm mb-4 font-semibold uppercase tracking-wider">
            Сегодняшний рацион
          </Text>

          {/* Тестовые карточки */}
          <MealCard title="Завтрак: Овсянка с ягодами" calories={420} />
          <MealCard title="Обед: Куриное филе с киноа" calories={650} />
        </View>

        <Button
          title="+ Добавить прием пищи"
          onPress={() => alert("Кнопка работает!")}
        />
      </View>
    </SafeAreaView>
  );
};