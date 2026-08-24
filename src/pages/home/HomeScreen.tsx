import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackButton, ProgressBar } from "@/shared/ui";
import { View } from "react-native";
import { Avatar, UserEmail, UserName } from "@/entities/user";

export const HomeScreen = () => {
  
  const [progress, setProgress] = useState(35);
  const name = 'Daniil';
  const email = "fxckfallen@icloud.com"
  return (
    <SafeAreaView className="bg-background p-3xl gap-xl flex items-center w-full">
      <View className="flex flex-row h-fit w-full gap-sm items-center">
        <BackButton />
        <View className="flex-1">
          <ProgressBar value={progress} />
        </View>
      </View>
      <Avatar name={name}/>
      <UserName name={name}/>
      <UserEmail email={email}/>
    </SafeAreaView> 
  );
};