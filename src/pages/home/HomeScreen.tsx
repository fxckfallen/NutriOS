import BackButton from "@/shared/ui/button/BackButton";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProgressBar } from "@/shared/ui/progress/ProgressBar";
import { View } from "react-native";
import {Stars } from "lucide-react-native";
import InfoBanner from "@/shared/ui/banner/InfoBanner";

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
      <InfoBanner text="NutriOS AI calculates macros automatically from your description." Icon={Stars}/>
    </SafeAreaView>
  );
};