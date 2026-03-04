import { IconSymbol } from '@/components/ui/icon-symbol'
import { Colors, Fonts } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { signOut } from '@/store/authSlice'
import { RootState } from '@/store/store'
import { Stack, useRouter } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

export default function PersonalInfoScreen() {
  const router = useRouter()
  const dispatch = useDispatch()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']
  const user = useSelector((state: RootState) => state.auth.user)

  const displayName = user?.name
    ? user.name
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    : 'Guest'

  const handleLogout = () => {
    dispatch(signOut())
    router.replace('/auth/sign-in' as never)
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Personal Information' }} />
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.card}>
          <View style={styles.userInfoRow}>
            <View
              style={[styles.avatarCircle, { backgroundColor: theme.tint }]}
            >
              <Text style={styles.avatarLetter}>
                {displayName.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.label}>NAME</Text>
              <Text style={[styles.name, { color: theme.text }]}>
                {displayName}
              </Text>
              {user?.email ? (
                <>
                  <Text style={[styles.label, { marginTop: 8 }]}>EMAIL</Text>
                  <Text
                    style={[styles.name, { color: theme.text, fontSize: 14 }]}
                  >
                    {user.email}
                  </Text>
                </>
              ) : null}
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <IconSymbol
            name="rectangle.portrait.and.arrow.right"
            size={20}
            color="#D93025"
          />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
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
    padding: 16,
    marginBottom: 24,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarLetter: {
    fontFamily: Fonts.bold,
    fontSize: 22,
    color: '#fff',
  },
  textContainer: {
    justifyContent: 'center',
  },
  label: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  name: {
    fontFamily: Fonts.bold,
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE5E5',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D93025',
    gap: 8,
  },
  logoutText: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: '#D93025',
  },
})
