import React, {useState, useRef} from "react";
import {View, TextInput, StyleSheet, Pressable} from "react-native";

interface OTPInputProps {
  code: string;
  setCode: (code: string) => void;
  maximumLength: number;
  setIsPinReady: (isReady: boolean) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({
  code,
  setCode,
  maximumLength,
  setIsPinReady,
}) => {
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    const newCode = code.split("");
    newCode[index] = text;
    setCode(newCode.join(""));

    // Auto-focus to the next input
    if (text && index < maximumLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if the OTP is complete
    if (newCode.join("").length === maximumLength) {
      setIsPinReady(true);
    } else {
      setIsPinReady(false);
    }
  };

  const handleBackspace = (event: any, index: number) => {
    if (event.nativeEvent.key === "Backspace" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View className="flex flex-row justify-between mb-4">
      {Array(maximumLength)
        .fill(0)
        .map((_, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            className="w-[50px] h-[50px] bg-white/5 rounded-xl text-xl border border-primary text-primary flex items-center justify-center text-center"
            keyboardType="number-pad"
            maxLength={1}
            value={code[index] || ""}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(event) => handleBackspace(event, index)}
          />
        ))}
    </View>
  );
};

export default OTPInput;
