import React, {useRef, useState, useCallback, useEffect} from "react";
import {View, FlatList, Animated, useWindowDimensions} from "react-native";
import OnboardingData from "constants/onboarding";
import {OnboardingItem} from "components/ui/OnboardingItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useRouter} from "expo-router";

export default function Index() {
  const router = useRouter();
  const {width} = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<any>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(
    null
  );

  // Handle scroll end to ensure currentIndex is correct
  const handleScrollEnd = useCallback(
    (e: any) => {
      const contentOffset = e.nativeEvent.contentOffset.x;
      const index = Math.round(contentOffset / width);
      setCurrentIndex(index);
    },
    [width]
  );

  // Scroll to specific index
  const scrollToIndex = useCallback(
    (index: number) => {
      if (flatListRef.current && index >= 0 && index < OnboardingData.length) {
        flatListRef.current.scrollToOffset({
          offset: index * width,
          animated: true,
        });
        setCurrentIndex(index);
      }
    },
    [width]
  );

  const handleNext = useCallback(() => {
    scrollToIndex(currentIndex + 1);
  }, [currentIndex, scrollToIndex]);

  const handleBack = useCallback(() => {
    scrollToIndex(currentIndex - 1);
  }, [currentIndex, scrollToIndex]);

  const handleSkip = useCallback(async () => {
    await AsyncStorage.setItem("hasSeenOnboarding", "true");
    // router.push("/login");
  }, [router]);

  useEffect(() => {
    const checkOnboard = async () => {
      const status = await AsyncStorage.getItem("hasSeenOnboarding");
      setHasSeenOnboarding(status === "true");
      //   await AsyncStorage.setItem("hasSeenOnboarding", "false");
    };
    checkOnboard();
  }, []);

  useEffect(() => {
    // AsyncStorage.setItem("hasSeenOnboarding", "false");
    if (hasSeenOnboarding !== null) {
      if (hasSeenOnboarding) {
        router.replace("/");
      }
    }
  }, [hasSeenOnboarding, router]);

  return (
    <View
      className="h-full flex items-center justify-center bg-black"
      style={{width}}
    >
      <View className="flex-[3]">
        <FlatList
          ref={flatListRef}
          data={OnboardingData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <OnboardingItem
              {...item}
              currentIndex={currentIndex}
              handleNext={handleNext}
              handleBack={handleBack}
              finishOnboarding={handleSkip}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          onMomentumScrollEnd={handleScrollEnd}
          snapToInterval={width}
          snapToAlignment="center"
          decelerationRate="fast"
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          initialScrollIndex={0}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false}
          )}
          scrollEventThrottle={16}
        />
      </View>
    </View>
  );
}
