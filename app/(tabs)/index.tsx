import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { LinearGradient } from 'expo-linear-gradient'
import * as Location from 'expo-location'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import PagerView from 'react-native-pager-view'

import { CurrentWeather } from '@/components/weather/CurrentWeather'
import { DailyForecast } from '@/components/weather/DailyForecast'
import { HourlyForecast } from '@/components/weather/HourlyForecast'
import {
  WeatherGrid,
  firstGridItems,
  secondGridItems,
} from '@/components/weather/WeatherGrid'
import { RootState } from '@/store/store'
import {
  SavedLocation,
  setActiveIndex,
  setLocations,
} from '@/store/weatherSlice'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'

export default function WeatherScreen() {
  const router = useRouter()
  const dispatch = useDispatch()
  const colorScheme = useColorScheme()
  const weatherColors = Colors[colorScheme ?? 'light'].weather

  const { locations, activeIndex } = useSelector(
    (state: RootState) => state.weather,
  )
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const pagerRef = React.useRef<PagerView>(null)

  // Sync pager with activeIndex
  useEffect(() => {
    if (pagerRef.current && activeIndex < locations.length) {
      pagerRef.current.setPage(activeIndex)
    }
  }, [activeIndex])

  // Load current location if empty
  useEffect(() => {
    if (locations.length === 0) {
      getCurrentLocation()
    } else {
      setLoading(false)
    }
  }, [locations.length])

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync()
      let finalStatus = status

      if (status !== 'granted') {
        const { status: newStatus } =
          await Location.requestForegroundPermissionsAsync()
        finalStatus = newStatus
      }

      if (finalStatus !== 'granted') {
        setErrorMsg('Permission denied')
        setLoading(false)
        return
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      })

      const lat = currentLocation.coords.latitude
      const lon = currentLocation.coords.longitude

      const address = await Location.reverseGeocodeAsync({
        latitude: lat,
        longitude: lon,
      })

      const place = address[0]

      const newLocation: SavedLocation = {
        name: place?.city ?? place?.region ?? 'Current Location',
        country: place?.country ?? '',
        lat,
        lon,
      }

      dispatch(setLocations([newLocation]))
      setLoading(false)
    } catch {
      setErrorMsg('Failed to get location')
      setLoading(false)
    }
  }

  if (loading) return <ActivityIndicator size="large" />
  if (errorMsg) return <Text>{errorMsg}</Text>
  console.log(locations)

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[weatherColors.gradientStart, weatherColors.gradientEnd]}
        style={styles.background}
      />

      <SafeAreaView style={styles.safeArea}>
        {/* Header with list button */}
        <View style={styles.header}>
          <View style={{ width: 44 }} />
          <View style={styles.paginationDots}>
            {locations.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  i === activeIndex && styles.activeDot,
                  {
                    backgroundColor:
                      i === activeIndex ? '#fff' : 'rgba(255,255,255,0.3)',
                  },
                ]}
              />
            ))}
          </View>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => router.push('/manage-locations')}
          >
            <Ionicons name="list" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        <PagerView
          ref={pagerRef}
          style={{ flex: 1 }}
          initialPage={activeIndex}
          onPageSelected={(e) => {
            dispatch(setActiveIndex(e.nativeEvent.position))
          }}
        >
          {locations.map((loc, index) => (
            <ScrollView
              key={index}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              <CurrentWeather
                lat={loc.lat}
                lon={loc.lon}
                city={loc.name}
                country={loc.country}
              />

              <HourlyForecast />
              <WeatherGrid items={firstGridItems} />
              <DailyForecast />
              <WeatherGrid items={secondGridItems} />

              <View style={{ height: 100 }} />
            </ScrollView>
          ))}
        </PagerView>
      </SafeAreaView>

      <StatusBar barStyle="light-content" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    zIndex: 10,
  },
  paginationDots: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  activeDot: {
    width: 6,
  },
  navButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
})
