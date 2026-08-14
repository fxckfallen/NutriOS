import BackButton from "@/shared/ui/button/BackButton";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProgressBar } from "@/shared/ui/progress/ProgressBar";
import { View } from "react-native";
import Link from "@/shared/ui/feedback/Link";
import Divider from "@/shared/ui/feedback/Divider";
import CheckboxCard from "@/shared/ui/feedback/CheckboxCard";
import CircledIcon from "@/shared/ui/feedback/CircledIcon";
import {Dumbbell, Stars } from "lucide-react-native";
import Badge from "@/shared/ui/feedback/Badge";

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
      <Link href="#">Forgot password?</Link>
      <Divider>OR</Divider>
      <CheckboxCard isChecked={true} onCheck={() => {}}/>
      <CircledIcon Icon={Dumbbell}/>
      <Badge text="test"/>
      <Badge text="test" Icon={Stars}/>
    </SafeAreaView>
  );
};