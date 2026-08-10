import "./global.css"; // Путь теперь правильный, так как css лежит рядом
import { SafeAreaProvider } from "react-native-safe-area-context";
import { HomeScreen } from "@/pages/home/HomeScreen";

export default function App() {
  return (
    // Оборачиваем приложение в провайдер!
    <SafeAreaProvider>
      <HomeScreen />
    </SafeAreaProvider>
  );
}