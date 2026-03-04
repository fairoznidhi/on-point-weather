import { IconSymbol } from '@/components/ui/icon-symbol'
import { Colors, Fonts } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { Stack } from 'expo-router'
import { useState } from 'react'
import {
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native'

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

interface FAQItemProps {
  question: string
  answer?: string
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [expanded, setExpanded] = useState(false)
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setExpanded(!expanded)
  }

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={toggleExpand} style={styles.header}>
        <Text style={[styles.question, { color: theme.text }]}>{question}</Text>
        <IconSymbol
          name={expanded ? 'minus' : 'plus'}
          size={20}
          color={theme.icon}
        />
      </TouchableOpacity>
      {expanded && answer && (
        <View style={styles.body}>
          <Text style={[styles.answer, { color: theme.icon }]}>{answer}</Text>
        </View>
      )}
    </View>
  )
}

export default function FAQScreen() {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']

  return (
    <>
      <Stack.Screen options={{ title: 'FAQ' }} />
      <ScrollView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <FAQItem
          question="Can I view weather forecasts by the hour?"
          answer="Yes, the app provides detailed hourly weather forecasts up to 24 hours ahead."
        />
        <FAQItem
          question="How accurate is the weather data?"
          answer="Our weather data is sourced from a combination of reputable providers, including the National Weather Service, WeatherAPI, and AerisWeather. We also use sophisticated algorithms to ensure high accuracy."
        />
        <FAQItem
          question="Can I get alerts for severe weather?"
          answer="Yes, you can enable severe weather alerts in the Alerts & Notification section of your profile settings."
        />
        <FAQItem
          question="Is there a radar feature in the app?"
          answer="Yes, the Radar tab allows you to view real-time weather radar maps."
        />
        <FAQItem
          question="How frequently is the weather updated?"
          answer="Weather data is updated every 15 minutes to ensure you have the latest information."
        />
        <FAQItem
          question="Can I save multiple locations?"
          answer="Yes, you can add and save multiple locations to quickly switch between them."
        />
        <FAQItem
          question="Does the app provide hourly forecasts?"
          answer="Absolutely! Check the Hourly tab for a detailed hour-by-hour breakdown."
        />
        <FAQItem
          question="Is there a temperature map feature?"
          answer="The Radar tab includes various map layers, including temperature, precipitation, and wind."
        />
        <FAQItem
          question="Can I customize notifications?"
          answer="Yes, visit the Profile > Alerts & Notification section to customize which alerts you receive."
        />
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    flex: 1,
    marginRight: 8,
  },
  body: {
    marginTop: 12,
  },
  answer: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 20,
  },
})
