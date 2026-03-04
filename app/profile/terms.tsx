import { Colors, Fonts } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { Stack } from 'expo-router'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

export default function TermsScreen() {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']

  return (
    <>
      <Stack.Screen options={{ title: 'Terms & Condition' }} />
      <ScrollView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.card}>
          <Text style={[styles.text, { color: theme.text }]}></Text>
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // Elevation for Android
    elevation: 3,
  },
  text: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 22,
  },
})
