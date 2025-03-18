import React from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import {useRouter} from "expo-router";

interface OnboardingItemProps {
  id: number;
  title: string;
  description: string;
  image: any;
  currentIndex: number;
  handleNext: () => void;
  handleBack: () => void;
  finishOnboarding: () => void;
}

export const OnboardingItem: React.FC<OnboardingItemProps> = ({
  id,
  title,
  description,
  image,
  currentIndex,
  handleNext,
  handleBack,
  finishOnboarding,
}) => {
  const router = useRouter();
  const {width} = useWindowDimensions();
  const totalDots = 4;

  const showBackButton = currentIndex > 0;
  const isLastSlide = currentIndex === totalDots - 1;

  return (
    <View className="flex-1 flex-col justify-between" style={{width}}>
      {/* Header with back and skip buttons */}
      <View className="w-full flex-row items-center justify-between p-6">
        {showBackButton ? (
          <TouchableOpacity onPress={handleBack}>
            <Image
              source={require("icons/back.png")}
              className="w-8 h-8"
              accessibilityLabel="Go back"
            />
          </TouchableOpacity>
        ) : (
          <View className="w-8 h-8" /> // Placeholder for layout consistency
        )}

        {!isLastSlide && (
          <TouchableOpacity
            onPress={finishOnboarding}
            className="h-10 flex items-center justify-center bg-primary rounded-full"
          >
            <Text className="px-4 text-black text-sm font-medium">Skip</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Image Section */}
      <View className="w-full h-[386px] overflow-hidden">
        <Image
          source={image}
          className="w-full h-full absolute -bottom-8 object-cover"
          accessibilityLabel={`Onboarding image ${id}`}
        />
      </View>

      {/* Content Section */}
      <View className="mx-4 mb-4 py-8 px-6 bg-primary rounded-2xl flex-grow flex gap-4 flex-col justify-between">
        <Text className="text-center text-3xl text-black font-robotoMonoBold">
          {title}
        </Text>
        <Text className="text-black text-center text-lg mb-2">
          {description}
        </Text>

        {/* Progress Dots */}
        <View className="flex-row items-center justify-center gap-2 mb-2">
          {Array.from({length: totalDots}).map((_, index) => (
            <View
              key={index}
              className={`${
                index === currentIndex
                  ? "w-2 h-6 rounded-full bg-white"
                  : "w-2 h-2 rounded-full bg-black"
              }`}
            />
          ))}
        </View>

        {/* Navigation Buttons */}
        {!isLastSlide ? (
          <TouchableOpacity
            onPress={handleNext}
            className="w-full flex items-center justify-center bg-black py-4 rounded-2xl"
          >
            <Text className="text-primary text-lg font-robotoBold">Next</Text>
          </TouchableOpacity>
        ) : (
          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={() => {
                finishOnboarding();
                // router.push("/login");
              }}
              className="flex-1 items-center justify-center bg-black py-4 rounded-2xl"
            >
              <Text className="text-white text-lg font-robotoBold">Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                finishOnboarding();
                // router.push("/register");
              }}
              className="flex-1 items-center justify-center bg-black py-4 rounded-2xl"
            >
              <Text className="text-white text-lg font-robotoBold">
                Register
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};
