import {View, Text, ScrollView, Alert, Pressable} from "react-native";
import React, {useEffect, useState} from "react";
import OTPInput from "@/components/forms/OTPInput";
import Button from "@/components/ui/Button";

export default function index() {
  const [code, setCode] = useState("");
  const [isPinReady, setIsPinReady] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(30);

  const maximumLength = 6;

  const handleVerifyOTP = () => {
    if (isPinReady) {
      Alert.alert("Success", `OTP Verified: ${code}`);
      // Add your OTP verification logic here
    } else {
      Alert.alert("Error", "Please enter a valid OTP.");
    }
  };

  // Handle resend OTP
  const handleResendOTP = () => {
    // Reset the countdown
    setCountdown(30);
    setResendDisabled(true);

    // Call your API to resend OTP
    Alert.alert("OTP Resent", "A new OTP has been sent to your phone.");
    // Add your resend OTP logic here (e.g., API call)
  };

  // Countdown timer
  useEffect(() => {
    if (resendDisabled) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 0) {
            clearInterval(timer);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [resendDisabled]);

  return (
    <View style={{flex: 1, backgroundColor: "#000"}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 16,
        }}
      >
        <Pressable className="mb-12">
          <Text className="text-primary">Back</Text>
        </Pressable>

        <Text className="text-primary text-4xl mb-14">
          Enter the code sent to Your email address
        </Text>
        {/* OTP Input */}
        <OTPInput
          code={code}
          setCode={setCode}
          maximumLength={maximumLength}
          setIsPinReady={setIsPinReady}
        />
        {/* Verify Button */}
        <View className="mt-40">
          {/* Resend OTP Button */}
          <Pressable
            onPress={handleResendOTP}
            disabled={resendDisabled}
            style={{opacity: resendDisabled ? 0.5 : 1}}
          >
            <Text className="text-primary text-center mt-4">
              {resendDisabled
                ? `Resend OTP in ${countdown} seconds`
                : "Resend OTP"}
            </Text>
          </Pressable>

          <Button
            title="Verify"
            onPress={handleVerifyOTP}
            disabled={!isPinReady}
          />
        </View>
      </ScrollView>
    </View>
  );
}
