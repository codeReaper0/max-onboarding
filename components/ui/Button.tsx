import React from "react";
import {TouchableOpacity, Text} from "react-native";
import {twMerge} from "tailwind-merge";

interface ButtonProps {
  title: string;
  onPress?: () => void;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  className = "",
  textClassName = "",
  disabled = false,
}) => {
  const defaultClasses =
    "flex h-14 px-6 justify-center items-center gap-2 rounded-[32px] bg-primary disabled:bg-brand-neutral disabled:text-black";
  const defaultTextClasses = "text-black text-lg font-interSemiBold";

  return (
    <TouchableOpacity
      onPress={onPress}
      className={twMerge(defaultClasses, className)}
      disabled={disabled}
    >
      <Text
        className={twMerge(
          defaultTextClasses,
          textClassName,
          `${disabled && "text-text-medium"}`
        )}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
