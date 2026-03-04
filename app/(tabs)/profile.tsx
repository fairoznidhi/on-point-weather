import { IconSymbol } from '@/components/ui/icon-symbol'
import { Colors, Fonts } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { RootState } from '@/store/store'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'

// Reusable Section Component
const ProfileSection = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionContent}>{children}</View>
  </View>
)

// Reusable Toggle Item
const ToggleItem = ({
  icon,
  label,
  value,
  onValueChange,
  isFirst = false,
}: {
  icon: string
  label: string
  value: boolean
  onValueChange: (val: boolean) => void
  isFirst?: boolean
}) => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']

  return (
    <View style={[styles.itemContainer, !isFirst && styles.itemBorder]}>
      <View style={styles.itemLeft}>
        <Ionicons name="person-outline" size={24} color={theme.text} />
        <Text style={[styles.itemLabel, { color: theme.text }]}>{label}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#E0E0E0', true: '#007AFF' }}
        thumbColor={'#fff'}
      />
    </View>
  )
}

// Reusable Custom Switch Item (for Unit toggles etc)
const CustomSwitchItem = ({
  icon,
  label,
  options,
  selected,
  onSelect,
  isFirst = false,
}: {
  icon: string
  label: string
  options: [string, string]
  selected: string
  onSelect: (val: string) => void
  isFirst?: boolean
}) => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']

  return (
    <View style={[styles.itemContainer, !isFirst && styles.itemBorder]}>
      <View style={styles.itemLeft}>
        <Ionicons
          name="person-outline"
          size={24}
          color={theme.text}
          style={styles.icon}
        />
        <Text style={[styles.itemLabel, { color: theme.text }]}>{label}</Text>
      </View>
      <View style={styles.customSwitchContainer}>
        {options.map((opt) => (
          <Pressable
            key={opt}
            style={[
              styles.customSwitchOption,
              selected === opt && styles.customSwitchSelected,
            ]}
            onPress={() => onSelect(opt)}
          >
            <Text
              style={[
                styles.customSwitchText,
                selected === opt && styles.customSwitchTextSelected,
                { color: selected === opt ? theme.tint : theme.icon },
              ]}
            >
              {opt}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  )
}

// Reusable Link Item
const LinkItem = ({
  icon,
  label,
  onPress,
  isFirst = false,
  rightElement,
}: {
  icon: string
  label: string
  onPress: () => void
  isFirst?: boolean
  rightElement?: React.ReactNode
}) => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.itemContainer,
        !isFirst && styles.itemBorder,
        pressed && { opacity: 0.7 },
      ]}
    >
      <View style={styles.itemLeft}>
        <Ionicons
          name="person-outline"
          size={24}
          color={theme.text}
          style={styles.icon}
        />
        <Text style={[styles.itemLabel, { color: theme.text }]}>{label}</Text>
      </View>
      {rightElement || (
        <IconSymbol name="chevron.right" size={20} color="#C7C7CC" />
      )}
    </Pressable>
  )
}

export default function ProfileScreen() {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']
  const { user, isGuest } = useSelector((state: RootState) => state.auth)
  const isAuthenticated = !!user

  // State for toggles
  const [tempUnit, setTempUnit] = useState('°C')
  const [pressureUnit, setPressureUnit] = useState('Hg')
  const [rainUnit, setRainUnit] = useState('mm')
  const [timeFormat, setTimeFormat] = useState('12 hr')

  const [severeAlerts, setSevereAlerts] = useState(false)
  const [rainAlerts, setRainAlerts] = useState(true)
  const [highUV, setHighUV] = useState(false)
  const [heatwave, setHeatwave] = useState(false)

  const [locationPerm, setLocationPerm] = useState(false)
  const [notifPerm, setNotifPerm] = useState(true)

  const [largerText, setLargerText] = useState(false)
  const [highContrast, setHighContrast] = useState(true)
  const [screenReader, setScreenReader] = useState(true)
  const [haptic, setHaptic] = useState(true)

  return (
    <View style={[styles.container, { backgroundColor: '#F2F6FC' }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile & Settings</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Sign In CTA — shown when guest or not logged in */}
        {!isAuthenticated && (
          <View style={styles.signInCard}>
            <View style={styles.signInCardLeft}>
              <IconSymbol
                name="person.crop.circle"
                size={36}
                color={theme.tint}
              />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.signInCardTitle}>
                  Sign in to unlock your profile
                </Text>
                <Text style={styles.signInCardSub}>
                  Save settings, alerts & more
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.signInCardBtn}
              onPress={() => router.push('/auth/sign-in' as never)}
              activeOpacity={0.85}
            >
              <Text style={styles.signInCardBtnText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Personal Infomation — only when logged in */}
        {isAuthenticated && (
          <Pressable
            onPress={() => router.push('/profile/personal-info')}
            style={styles.personalInfoCard}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <IconSymbol name="person.circle" size={24} color={theme.tint} />
              <Text style={styles.personalInfoText}>Personal Information</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color="#C7C7CC" />
          </Pressable>
        )}

        {/* Unit & Scale */}
        <ProfileSection title="UNIT & SCALE">
          <CustomSwitchItem
            icon="thermometer"
            label="Temperature Unit"
            options={['°C', '°F']}
            selected={tempUnit}
            onSelect={setTempUnit}
            isFirst={true}
          />
          <CustomSwitchItem
            icon="gauge"
            label="Pressure Unit"
            options={['Hg', 'mm']}
            selected={pressureUnit}
            onSelect={setPressureUnit}
          />
          <CustomSwitchItem
            icon="cloud.rain"
            label="Rain Unit"
            options={['Hg', 'mm']}
            selected={rainUnit}
            onSelect={setRainUnit}
          />
          <CustomSwitchItem
            icon="clock"
            label="Time Format"
            options={['12 hr', '24 hr']}
            selected={timeFormat}
            onSelect={setTimeFormat}
          />
        </ProfileSection>

        {/* Alerts & Notification */}
        <ProfileSection title="ALERTS & NOTIFICATION">
          <ToggleItem
            icon="exclamationmark.triangle"
            label="Severe weather alerts"
            value={severeAlerts}
            onValueChange={setSevereAlerts}
            isFirst={true}
          />
          <ToggleItem
            icon="cloud.rain"
            label="Rain starting soon"
            value={rainAlerts}
            onValueChange={setRainAlerts}
          />
          <ToggleItem
            icon="sun.max"
            label="High UV alert"
            value={highUV}
            onValueChange={setHighUV}
          />
          <ToggleItem
            icon="thermometer.sun"
            label="Heatwave / cold wave"
            value={heatwave}
            onValueChange={setHeatwave}
          />
        </ProfileSection>

        {/* Privacy & Permissions */}
        <ProfileSection title="PRIVACY & PERMISSIONS">
          <ToggleItem
            icon="location"
            label="Location Permission"
            value={locationPerm}
            onValueChange={setLocationPerm}
            isFirst={true}
          />
          <ToggleItem
            icon="bell"
            label="Notification Permission"
            value={notifPerm}
            onValueChange={setNotifPerm}
          />
        </ProfileSection>

        {/* Accessibility */}
        <ProfileSection title="ACCESSIBILITY">
          <ToggleItem
            icon="textformat.size"
            label="Larger Text Mode"
            value={largerText}
            onValueChange={setLargerText}
            isFirst={true}
          />
          <ToggleItem
            icon="circle.lefthalf.filled"
            label="High Contrast Mode"
            value={highContrast}
            onValueChange={setHighContrast}
          />
          <ToggleItem
            icon="rectangle.on.rectangle"
            label="Screen Reader Optimization"
            value={screenReader}
            onValueChange={setScreenReader}
          />
          <ToggleItem
            icon="hand.tap"
            label="Haptic Feedback"
            value={haptic}
            onValueChange={setHaptic}
          />
        </ProfileSection>

        {/* About */}
        <ProfileSection title="ABOUT">
          <LinkItem
            icon="info.circle"
            label="App Version"
            onPress={() => {}}
            isFirst={true}
            rightElement={
              <Text style={{ color: theme.icon, fontFamily: Fonts.regular }}>
                V4.3.0.3
              </Text>
            }
          />
          <LinkItem icon="star" label="Rate App" onPress={() => {}} />
          <LinkItem
            icon="headphones"
            label="Contact Support"
            onPress={() => {}}
          />
          <LinkItem
            icon="questionmark.circle"
            label="FAQ"
            onPress={() => router.push('/profile/faq')}
          />
          <LinkItem
            icon="doc.text"
            label="Terms & Condition"
            onPress={() => router.push('/profile/terms')}
          />
          <LinkItem
            icon="arrow.down.doc"
            label="Download Data"
            onPress={() => {}}
          />
        </ProfileSection>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#F2F6FC',
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: '#000',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  personalInfoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  personalInfoText: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    marginLeft: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: '#6E7F99',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  sectionContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  itemBorder: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
    width: 24,
    textAlign: 'center',
  },
  itemLabel: {
    fontFamily: Fonts.medium,
    fontSize: 15,
  },
  customSwitchContainer: {
    flexDirection: 'row',
    backgroundColor: '#E0EFFF',
    borderRadius: 20,
    padding: 2,
  },
  customSwitchOption: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 18,
  },
  customSwitchSelected: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  customSwitchText: {
    fontFamily: Fonts.medium,
    fontSize: 13,
  },
  customSwitchTextSelected: {
    fontFamily: Fonts.bold,
  },
  signInCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    gap: 12,
  },
  signInCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  signInCardTitle: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: '#04356F',
    marginBottom: 2,
  },
  signInCardSub: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: '#6E7F99',
  },
  signInCardBtn: {
    backgroundColor: '#04356F',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  signInCardBtnText: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: '#fff',
  },
})
