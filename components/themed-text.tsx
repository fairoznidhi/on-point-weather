import { Fonts } from "@/constants/theme";
import { Text, type TextProps } from "react-native";

export function ThemedText({ style, ...rest }: TextProps) {
  return (
    <Text
      style={[
        {
          fontFamily: Fonts.regular,
          fontSize: 16,
          color: "#04356F",
        },
        style,
      ]}
      {...rest}
    />
  );
}
