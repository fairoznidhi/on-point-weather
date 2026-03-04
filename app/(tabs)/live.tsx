import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { RootState } from '@/store/store';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function LiveScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const { user } = useSelector((state: RootState) => state.auth);
  const isAuthenticated = !!user;

  return (
    <View style={[styles.container, { backgroundColor: '#F2F6FC' }]}>
       <View style={styles.header}>
            <Text style={styles.headerTitle}>Live & Community</Text>
       </View>

       <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {!isAuthenticated && (
            <View style={styles.signInCard}>
              <View style={styles.signInCardLeft}>
                <IconSymbol name="video.badge.plus" size={36} color={theme.tint} />
                <View style={{ marginLeft: 12 }}>
                  <Text style={styles.signInCardTitle}>Sign in to join the live stream</Text>
                  <Text style={styles.signInCardSub}>Watch community weather updates live</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.signInCardBtn} onPress={() => router.push('/auth/sign-in' as never)} activeOpacity={0.85}>
                <Text style={styles.signInCardBtnText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          )}

          {isAuthenticated ? (
            <View style={styles.content}>
               <IconSymbol name="video.fill" size={64} color="#CBD5E0" />
               <Text style={styles.placeholderText}>Streaming will begin shortly...</Text>
            </View>
          ) : (
            <View style={styles.guestContent}>
               <IconSymbol name="lock.fill" size={48} color="#CBD5E0" />
               <Text style={styles.placeholderText}>Please sign in to view live content</Text>
            </View>
          )}
       </ScrollView>
    </View>
  );
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
  content: {
    flex: 1,
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  guestContent: {
    flex: 1,
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
    gap: 16,
  },
  placeholderText: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: '#6E7F99',
    textAlign: 'center',
  },
});
