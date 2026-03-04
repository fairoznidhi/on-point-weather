import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ProgressBar } from './ProgressBar';
import { WeatherCard } from './WeatherCard';

const mockDailyData = [
  { day: 'Today', icon: 'sun.max.fill', low: '24°', high: '34°', progress: 0.8 },
  { day: 'Sun', icon: 'cloud.sun.fill', low: '24°', high: '34°', progress: 0.7 },
  { day: 'Mon', icon: 'sun.max.fill', low: '24°', high: '34°', progress: 0.9 },
  { day: 'Tue', icon: 'cloud.sun.fill', low: '24°', high: '34°', progress: 0.6 },
  { day: 'Wed', icon: 'sun.max.fill', low: '24°', high: '34°', progress: 0.8 },
];

export function DailyForecast() {
  const colorScheme = useColorScheme();
  const weatherColors = Colors[colorScheme ?? 'light'].weather;

  return (
    <WeatherCard title="10 Day Forecast" icon="calendar" style={styles.card}>
      <View style={styles.container}>
        {mockDailyData.map((item, index) => (
          <View key={index} style={styles.row}>
            <ThemedText style={[styles.day, { color: weatherColors.text }]}>{item.day}</ThemedText>
            <View style={styles.iconContainer}>
                 <IconSymbol name={item.icon as any} size={20} color={weatherColors.accent} />
            </View>
            <ThemedText style={[styles.temp, { color: weatherColors.textSecondary }]}>{item.low}</ThemedText>
            
            <View style={styles.progressContainer}>
                 <ProgressBar progress={item.progress} startColor={weatherColors.accent} />
            </View>
            
            <ThemedText style={[styles.temp, { color: weatherColors.text }]}>{item.high}</ThemedText>
          </View>
        ))}
      </View>
    </WeatherCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
  container: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  day: {
    width: 50,
    fontSize: 16,
    fontWeight: '600',
  },
  iconContainer: {
    width: 30,
    alignItems: 'center',
  },
  temp: {
    fontSize: 16,
    fontWeight: '500',
    width: 35,
    textAlign: 'center',
  },
  progressContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
});
