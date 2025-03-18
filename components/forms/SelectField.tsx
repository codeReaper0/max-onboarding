import React, {useState} from "react";
import {View, Text, Pressable} from "react-native";
import {Picker} from "@react-native-picker/picker";

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onValueChange: (itemValue: string) => void;
  error?: string;
  touched?: boolean;
  options: {label: string; value: string}[];
  bodyClass?: string;
  extraClass?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  value,
  onValueChange,
  error,
  touched,
  options,
  bodyClass,
  extraClass,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`mb-4 relative ${bodyClass}`}>
      {/* Label */}
      <Text className="text-base text-white/70 mb-2 font-robotoMedium absolute top-2 left-4">
        {label}
      </Text>

      {/* Picker Container */}
      <View
        className={`relative flex flex-col justify-end h-20 w-full bg-white/5 rounded-lg pr-2 border ${extraClass} ${
          error && "border-red-500"
        } ${isFocused && !error && "border-primary"}`}
      >
        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            color: "#F5C200", // Text color
          }}
        >
          {options.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>

      {/* Error Message */}
      {error && <Text className="text-xs text-primary mt-1">{error}</Text>}
    </View>
  );
};

export default SelectField;
