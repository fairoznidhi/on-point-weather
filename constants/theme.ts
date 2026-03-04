/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    weather: {
      primary: "#1E1E2E",
      secondary: "#2E2E3E",
      text: "#04356F",
      textSecondary: "#04356F",
      accent: "#FFD700", // Sun yellow
      cardBg: "#fff",
      gradientStart: "#DFEDFF",
      gradientEnd: "#DFEDFF",
    },
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    weather: {
      primary: "#1E1E2E",
      secondary: "#2E2E3E",
      text: "#FFFFFF",
      textSecondary: "#B0B0B0",
      accent: "#FFD700", // Sun yellow
      cardBg: "rgba(30, 30, 46, 0.6)",
      gradientStart: "#1e3c72",
      gradientEnd: "#2a5298",
    },
  },
};

export const Fonts = {
  regular: "GoogleSans-Regular",
  medium: "GoogleSans-Medium",
  bold: "GoogleSans-Bold",
};
