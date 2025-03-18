import React, {useEffect, useState} from "react";
import {Image, View, Text, ActivityIndicator} from "react-native";
import {useRouter} from "expo-router";

const SplashScreen = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, [router]);

  return (
    <View className="flex-1 bg-black justify-center items-center">
      <View className="w-48 h-48 bg-primary rounded-xl" />
    </View>
  );
};

export default SplashScreen;
