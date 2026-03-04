import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { WeatherCard } from "./WeatherCard";

const mockHourlyData = [
  { time: "Now", temp: "32°", icon: "cloud.sun.fill" },
  { time: "10AM", temp: "32°", icon: "sun.max.fill" },
  { time: "11AM", temp: "32°", icon: "sun.max.fill" },
  { time: "12PM", temp: "33°", icon: "cloud.sun.fill" },
  { time: "1PM", temp: "34°", icon: "cloud.sun.fill" },
  { time: "2PM", temp: "35°", icon: "sun.max.fill" },
];

export function HourlyForecast() {
  const colorScheme = useColorScheme();
  const weatherColors = Colors[colorScheme ?? "light"].weather;

  return (
    <WeatherCard title="Sunny conditions will continue all day. wind gusts are up to 11km/h.">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {mockHourlyData.map((item, index) => (
          <View key={index} style={styles.item}>
            <ThemedText style={[styles.time, { color: weatherColors.text }, { fontSize: 14 }]}>
              {item.time}
            </ThemedText>
            <View style={styles.iconContainer}>
              <IconSymbol
                name={item.icon as any}
                size={24}
                color={weatherColors.accent}
              />
            </View>
            <ThemedText style={[styles.temp, { color: weatherColors.text }]}>
              {item.temp}
            </ThemedText>
          </View>
        ))}
      </ScrollView>
    </WeatherCard>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingVertical: 10,
  },
  item: {
    alignItems: "center",
    marginRight: 24,
    minWidth: 50,
  },
  time: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  iconContainer: {
    marginBottom: 8,
    height: 30,
    justifyContent: "center",
  },
  temp: {
    fontSize: 16,
    fontWeight: "600",
  },
});
