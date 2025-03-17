import {Stack} from "expo-router";
import "../global.css";
import {SafeAreaView} from "react-native";
import {ToastProvider} from "@/contexts/ToastProviders";

export default function RootLayout() {
  return (
    <ToastProvider>
      <SafeAreaView style={{flex: 1}}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </SafeAreaView>
    </ToastProvider>
  );
}
