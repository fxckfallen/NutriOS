import "./global.css"; // Путь теперь правильный, так как css лежит рядом
import { SafeAreaProvider } from "react-native-safe-area-context";
import { HomeScreen } from "@/pages/home/HomeScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    // Оборачиваем приложение в провайдер!
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <HomeScreen />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}