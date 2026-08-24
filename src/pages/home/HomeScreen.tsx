import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackButton, ProgressBar } from "@/shared/ui";
import { View } from "react-native";

export const HomeScreen = () => {
  
  const [progress, setProgress] = useState(35);

  return (
    <SafeAreaView className="bg-background p-3xl gap-xl flex items-center w-full">
      <View className="flex flex-row h-fit w-full gap-sm items-center">
        <BackButton />
        <View className="flex-1">
          <ProgressBar value={progress} />
        </View>
      </View>
      
    </SafeAreaView>
  );
};