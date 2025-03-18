import gluestackPlugin from "@gluestack-ui/nativewind-utils/tailwind-plugin";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto-Regular", "sans-serif"],
        inter: ["Inter-Regular", "sans-serif"],
        interMedium: ["Inter-Medium", "sans-serif"],
        interSemiBold: ["Inter-SemiBold", "sans-serif"],
        interBold: ["Inter-Bold", "sans-serif"],
        robotoMedium: ["Roboto-Medium", "sans-serif"],
        robotoSemiBold: ["Roboto-SemiBold", "sans-serif"],
        robotoBold: ["Roboto-Bold", "sans-serif"],
        mono: ["RobotoMono-Regular", "monospace"],
        robotoMonoMedium: ["RobotoMono-Medium", "monospace"],
        robotoMonoSemiBold: ["RobotoMono-SemiBold", "monospace"],
        robotoMonoBold: ["RobotoMono-Bold", "monospace"],
      },
      colors: {
        primary: "#F5C200",
        background: {light: "#F4F4F4", neutral: "#D6D6D6", dark: "#130423"},
        success: {light: "#EBF5EE", neutral: "#08AA3B"},
        warning: {veryLight: "#FFFAE7", light: "#FFE687", medium: "#e0b202"},
        danger: {light: "#FFF5F5", neutral: "#E60000"},
        info: {
          light: "#F2F3FF",
          bg: "#F2F3FF",
          neutral: "#0955FB",
        },
        brand: {
          light: "#E9D7FE",
          neutral: "#EAEAEA",
          lightPurple: "#E9D7FE",
        },
        text: {
          neutral: "#717171",
          medium: "#BFBFBF",
        },
      },
    },
  },
  plugins: [gluestackPlugin],
};
