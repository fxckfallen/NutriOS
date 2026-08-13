import BackButton from "@/shared/ui/button/BackButton";
import DangerButton from "@/shared/ui/button/DangerButton";
import PrimaryButton from "@/shared/ui/button/PrimaryButton";
import Input from "@/shared/ui/input/Input";
import { Slider } from "@/shared/ui/input/Slider";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { WeightPicker } from "@/shared/ui/input/WeightInput";
import { ProgressBar } from "@/shared/ui/progress/ProgressBar";
import { View } from "react-native";
import SelectItem from "@/shared/ui/select/SelectItem";
import Select from "@/shared/ui/select/Select";

export const HomeScreen = () => {
  
  const [progress, setProgress] = useState(75);

  return (
    <SafeAreaView className="bg-background p-3xl gap-xl flex items-center w-full">
      <PrimaryButton text="Test" />
      <DangerButton text="Test" />
      
      <Input placeholder="Test" value="123" variant="default" />
      <WeightPicker
        value={38.0}
        onChange={() => {}}
        unit="kg"
      />
      <Slider value={progress} onValueChange={setProgress} min={0} max={100} style={{width: "100%"}} />
      <View className="flex flex-row h-14 w-full gap-sm">
        <BackButton />
        <ProgressBar value={progress}/>
      </View>
     <Select>
      <SelectItem value="test" mainText="Test"/>
      <SelectItem value="test1" mainText="Test"/>
     </Select>
    </SafeAreaView>
  );
};