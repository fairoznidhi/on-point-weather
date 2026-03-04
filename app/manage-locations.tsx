import { ThemedText } from '@/components/themed-text'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { RootState } from '@/store/store'
import {
  addLocation,
  removeLocation,
  setActiveIndex,
} from '@/store/weatherSlice'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

export default function ManageLocationsScreen() {
  const router = useRouter()
  const dispatch = useDispatch()
  const colorScheme = useColorScheme()
  const themeColors = Colors[colorScheme ?? 'light']
  const { locations } = useSelector((state: RootState) => state.weather)

  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  const searchCity = async () => {
    if (!search) return
    setLoading(true)
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=1`,
      )
      const data = await response.json()
      if (!data.results || data.results.length === 0) {
        alert('City not found')
        return
      }
      const place = data.results[0]
      dispatch(
        addLocation({
          name: place.name,
          country: place.country,
          lat: place.latitude,
          lon: place.longitude,
        }),
      )
      setSearch('')
    } catch {
      alert('Failed to search city')
    } finally {
      setLoading(false)
    }
  }

  const handleSelectLocation = (index: number) => {
    dispatch(setActiveIndex(index))
    router.back()
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      <View style={styles.header}>
        <ThemedText style={styles.title}>Weather</ThemedText>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={28} color={themeColors.text} />
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.searchContainer,
          {
            backgroundColor:
              (colorScheme as string) === 'dark' ? '#333' : '#eee',
          },
        ]}
      >
        <Ionicons name="search" size={20} color="#888" />
        <TextInput
          placeholder="Search for a city or airport"
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={searchCity}
          style={[styles.input, { color: themeColors.text }]}
        />
        {loading && <ActivityIndicator size="small" />}
      </View>

      <FlatList
        data={locations}
        keyExtractor={(item, index) => `${item.lat}-${item.lon}-${index}`}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => handleSelectLocation(index)}
            style={styles.locationCard}
          >
            <View style={styles.cardContent}>
              <View>
                <ThemedText style={styles.locationName}>{item.name}</ThemedText>
                <ThemedText style={styles.locationCountry}>
                  {item.country}
                </ThemedText>
              </View>
              {/* Temperature would ideally be fetched here for each card, 
                  but for now we just show the name as per request to lead to page */}
              <TouchableOpacity onPress={() => dispatch(removeLocation(index))}>
                <Ionicons name="trash-outline" size={24} color="#ff4444" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 10,
    fontSize: 16,
  },
  locationCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 20,
    overflow: 'hidden',
    padding: 20,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationName: {
    fontSize: 24,
    fontWeight: '700',
  },
  locationCountry: {
    fontSize: 16,
    opacity: 0.7,
  },
  listContent: {
    paddingBottom: 20,
  },
})
