import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WeatherCard } from './WeatherCard';

export type GridItem = {
  title: string;
  value: string;
  subtitle?: string;
  icon?: string;
  content?: React.ReactNode;
};

export const firstGridItems: GridItem[] = [
  { title: 'Feels Like', value: '36°', subtitle: 'Wind is making it feel cooler', icon: 'thermometer' },
  { title: 'UV Index', value: '4', subtitle: 'Moderate', icon: 'sun.min.fill' },
  { title: 'AQI', value: '345', subtitle: 'Unhealthy', icon: 'aqi.medium' },
  { title: 'Wind', value: '4 km/h', subtitle: 'Direction SW 320', icon: 'wind' },
];

export const secondGridItems: GridItem[] = [
  { title: 'Sunrise', value: '6:38 AM', subtitle: 'Sunset: 18:58', icon: 'sunrise.fill' },
  { title: 'Precipitation', value: '40 mm', subtitle: 'Today', icon: 'cloud.rain.fill' },
  { title: 'Pressure', value: '1015 hPa', subtitle: 'Low -> High', icon: 'gauge' },
  { title: 'Humidity', value: '85%', subtitle: 'The dew point is 24°C', icon: 'humidity.fill' },
  { title: 'Visibility', value: '16 km', subtitle: 'Perfectly Clear View', icon: 'eye.fill' },
  { title: 'Community Live', value: '320', subtitle: 'Persons engaged', icon: 'person.2.fill' },
];

interface WeatherGridProps {
    items: GridItem[];
}

export function WeatherGrid({ items }: WeatherGridProps) {
  const colorScheme = useColorScheme();
  const weatherColors = Colors[colorScheme ?? 'light'].weather;

  return (
    <View style={styles.gridContainer}>
      {items.map((item, index) => (
        <View key={index} style={styles.gridItemWrapper}>
            <WeatherCard title={item.title} icon={item.icon} style={styles.card}>
                <View style={styles.content}>
                    <ThemedText style={[styles.value]}>{item.value}</ThemedText>
                    {item.subtitle && (
                         <ThemedText style={[styles.subtitle, { color: weatherColors.textSecondary }]}>{item.subtitle}</ThemedText>
                    )}
                </View>
            </WeatherCard>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6, // specific negative margin to handle gutter
  },
  gridItemWrapper: {
    width: '50%',
    paddingHorizontal: 6,
  },
  card: {
    height: 160,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  value: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
  },
});
