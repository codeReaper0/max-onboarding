import {View, Text, ScrollView, Alert, Pressable} from "react-native";
import React, {useEffect, useState} from "react";
import OTPInput from "@/components/forms/OTPInput";
import Button from "@/components/ui/Button";
import {useLocalSearchParams, useRouter} from "expo-router";
import apiEndpoints, {api} from "@/lib/axios";
import {useToast} from "@/contexts/ToastProviders";

export default function VerifyOTP() {
  const {showToast} = useToast();
  const router = useRouter();
  const {email} = useLocalSearchParams();
  const [code, setCode] = useState("");
  const [isPinReady, setIsPinReady] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [loading, setLoading] = useState(false);

  const maximumLength = 6;

  // Handle OTP verification
  const handleVerifyOTP = async () => {
    if (!isPinReady) {
      Alert.alert("Error", "Please enter a valid OTP.");
      return;
    }

    setLoading(true);
    try {
      const response = await apiEndpoints.verifyOTP(email as string, code);

      showToast(response.data.message, "success");
      router.push(`/login`);
    } catch (error: any) {
      console.log(error.response.data);
      showToast(
        error.response?.data?.non_field_errors[0] ||
          "Verification failed. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle resend OTP
  const handleResendOTP = async () => {
    setCountdown(30);
    setResendDisabled(true);

    try {
      const response = await api.post("/otp/request/", {email});

      if (response.data.success) {
        Alert.alert("OTP Resent", "A new OTP has been sent to your email.");
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to resend OTP."
      );
    }
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
          Enter the code sent to {email}
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
            disabled={resendDisabled || loading}
            style={{opacity: resendDisabled || loading ? 0.5 : 1}}
            className="mb-6"
          >
            <Text className="text-primary text-center mt-4">
              {resendDisabled
                ? `Resend OTP in ${countdown} seconds`
                : "Resend OTP"}
            </Text>
          </Pressable>

          <Button
            title={loading ? "Verifying..." : "Verify"}
            onPress={handleVerifyOTP}
            disabled={!isPinReady || loading}
          />
        </View>
      </ScrollView>
    </View>
  );
}
