import { ThemedText } from '@/components/themed-text'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { useGetWeatherQuery } from '@/services/weatherApi'
import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

export function CurrentWeather({
  lat,
  lon,
  city,
  country,
}: {
  lat: number
  lon: number
  city: string
  country: string
}) {
  const colorScheme = useColorScheme()
  const weatherColors = Colors[colorScheme ?? 'light'].weather

  const { data, isLoading, error } = useGetWeatherQuery(
    { latitude: lat, longitude: lon },
    {
      pollingInterval: 600000,
    },
  )

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={weatherColors.text} />
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.container}>
        <ThemedText style={{ color: weatherColors.text }}>
          Error loading weather
        </ThemedText>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* Location */}
      <ThemedText style={[styles.location, { color: weatherColors.text }]}>
        {city}
      </ThemedText>
      {country && (
        <ThemedText
          style={[styles.locationSub, { color: weatherColors.textSecondary }]}
        >
          {country}
        </ThemedText>
      )}

      {/* Temperature */}
      <ThemedText style={[styles.temperature, { color: weatherColors.text }]}>
        {data?.current_weather?.temperature !== undefined
          ? `${Math.round(data.current_weather.temperature)}°`
          : '--°'}
      </ThemedText>

      {/* Condition */}
      <ThemedText
        style={[styles.condition, { color: weatherColors.textSecondary }]}
      >
        Weather Code: {data?.current_weather?.weathercode ?? '--'}
      </ThemedText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  location: {
    fontSize: 32,
    fontWeight: '400',
    marginBottom: 4,
  },
  locationSub: {
    fontSize: 16,
    marginBottom: 8,
  },
  temperature: {
    fontSize: 90,
    fontWeight: '200',
    lineHeight: 110,
  },
  condition: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 5,
  },
})
