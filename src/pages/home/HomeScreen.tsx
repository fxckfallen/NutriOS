import BackButton from "@/shared/ui/button/BackButton";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProgressBar } from "@/shared/ui/progress/ProgressBar";
import { View } from "react-native";
import { CheckList } from "@/shared/ui/checklist/CheckList";
import ProgressRing from "@/shared/ui/progress/ProgressRing";

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
      <ProgressRing duration={4000}/>
      <CheckList
        steps={[
            'Analyzing your goal',
            'Calculating your calorie needs',
            'Matching recipes to your budget',
            'Building your grocery list',
          ]}
          onComplete={() => {}}
          delays={[500, 1400, 2300, 3200]}
      /> 
    </SafeAreaView>
  );
};