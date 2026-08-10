import React from "react";
import { Text, Pressable, PressableProps } from "react-native";

interface ButtonProps extends PressableProps {
  title: string;
}

export const Button = ({ title, ...props }: ButtonProps) => {
  return (
    <Pressable
      className="bg-emerald-500 active:bg-emerald-600 px-6 py-3 rounded-2xl items-center shadow-md"
      {...props}
    >
      <Text className="text-white font-semibold text-base">{title}</Text>
    </Pressable>
  );
};