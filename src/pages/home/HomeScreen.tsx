import BackButton from "@/shared/ui/button/BackButton";
import DangerButton from "@/shared/ui/button/DangerButton";
import PrimaryButton from "@/shared/ui/button/PrimaryButton";
import Input from "@/shared/ui/input/Input";
import { WheelPicker } from "@/shared/ui/input/WheelInput";

import { Slider } from "@/shared/ui/input/Slider";

import React, { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export const HomeScreen = () => {
  const heights = useMemo(
    () => Array.from({ length: 121 }, (_, i) => i + 100),
    []
  );
  const [progress, setProgress] = useState(50);

  return (
    <SafeAreaView className="bg-background p-3xl gap-xl">
      <PrimaryButton text="Test" />
      <DangerButton text="Test" />
      <BackButton />
      <Input placeholder="Test" value="123" variant="default" />
      <WheelPicker
        data={heights}
        value={heights[50]}
        onChange={() => {}}
        unit="cm"
      />

      <Slider value={progress} onValueChange={setProgress} min={0} max={100} />
    </SafeAreaView>
  );
};