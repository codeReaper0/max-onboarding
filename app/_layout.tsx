import {Stack} from "expo-router";
import "../global.css";
import {SafeAreaView} from "react-native";
import {ToastProvider} from "@/contexts/ToastProviders";
import {useFonts} from "expo-font";
import SplashScreenComponent from "@/components/ui/SplashScreen";
import * as SplashScreen from "expo-splash-screen";

import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_500Medium,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import {useEffect} from "react";
import {AuthProvider} from "@/contexts/AuthContexts";

const customFonts = {
  "Roboto-Regular": require("assets/fonts/Roboto-Regular.ttf"),
  "Roboto-Medium": require("assets/fonts/Roboto-Medium.ttf"),
  "Roboto-SemiBold": require("assets/fonts/Roboto-SemiBold.ttf"),
  "Roboto-Bold": require("assets/fonts/Roboto-Bold.ttf"),
  "RobotoMono-Regular": require("assets/fonts/RobotoMono-Regular.ttf"),
  "RobotoMono-Medium": require("assets/fonts/RobotoMono-Medium.ttf"),
  "RobotoMono-SemiBold": require("assets/fonts/RobotoMono-SemiBold.ttf"),
  "RobotoMono-Bold": require("assets/fonts/RobotoMono-Bold.ttf"),
  "Inter-Regular": Inter_400Regular,
  "Inter-Medium": Inter_500Medium,
  "Inter-SemiBold": Inter_600SemiBold,
  "Inter-Bold": Inter_700Bold,
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts(customFonts);

  useEffect(() => {
    const prepare = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        // await AsyncStorage.setItem("hasSeenOnboarding", "false");
      } catch (error) {
        console.error("Error preparing the app:", error);
      } finally {
        SplashScreen.hideAsync();
      }
    };
    prepare();
  }, []);

  if (!fontsLoaded) {
    return <SplashScreenComponent />;
  }

  return (
    <AuthProvider>
      <ToastProvider>
        <SafeAreaView style={{flex: 1}}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </SafeAreaView>
      </ToastProvider>
    </AuthProvider>
  );
}
