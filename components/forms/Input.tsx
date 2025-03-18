import React, {useState} from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TextInputProps,
  Pressable,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

interface InputFieldProps extends TextInputProps {
  label: string;
  type: "email" | "date" | "number" | "text" | "password" | "name";
  icon?: any;
  name: string;
  error?: string;
  touched?: boolean;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
  bodyClass?: string;
  extraClass?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  icon,
  name,
  error,
  touched,
  setFieldValue,
  extraClass,
  bodyClass,
  ...props
}) => {
  const [date, setDate] = useState<Date | string>("");
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setDate(formattedDate);
      if (setFieldValue) {
        setFieldValue(name, formattedDate); // Update Formik state
      }
    }
  };

  return (
    <View className={`mb-4 ${bodyClass}`}>
      {/* Input Container */}
      <View className="relative">
        {type === "date" ? (
          <>
            <Pressable
              onPress={() => setShowDatePicker(true)}
              className={`relative flex flex-col justify-end h-20 w-full bg-white/5 rounded-lg px-3 border ${extraClass} ${
                error && "border-red-500"
              } ${isFocused && !error && "border-primary"}`}
            >
              <Text className="text-base text-white/70 absolute top-2 left-4 font-robotoMedium">
                {label}
              </Text>

              <TextInput
                {...props}
                editable={false}
                value={date ? moment(date).format("DD-MM-YYYY") : ""}
                placeholder="DD-MM-YYYY"
                className={`text-primary placeholder:text-primary/60 text-xl`}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </Pressable>

            {showDatePicker && (
              <DateTimePicker
                value={date ? new Date(date) : new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </>
        ) : (
          <View
            className={`relative flex flex-col justify-end h-20 w-full bg-white/5 rounded-lg px-3 border ${extraClass} ${
              error && "border-red-500"
            } ${isFocused && !error && "border-primary"}`}
          >
            <Text className="text-base text-white/70 absolute top-2 left-4 font-robotoMedium">
              {label}
            </Text>

            <TextInput
              {...props}
              className={`text-primary placeholder:text-primary/60 text-xl`}
              keyboardType={
                type === "email"
                  ? "email-address"
                  : type === "number"
                  ? "numeric"
                  : "default"
              }
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              secureTextEntry={type === "password"}
              autoCapitalize={type === "email" ? "none" : "sentences"}
            />
          </View>
        )}

        {icon && (
          <Image
            source={icon}
            className="absolute top-3 right-4 w-6 h-6"
            resizeMode="contain"
          />
        )}
      </View>

      {error && <Text className="text-xs text-primary mt-1">{error}</Text>}
    </View>
  );
};

export default InputField;
