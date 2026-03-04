import { Fonts } from '@/constants/theme';
import { clearError, registerUser } from '@/store/authSlice';
import { RootState } from '@/store/store';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function SignUpScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  useEffect(() => {
    dispatch(clearError());
  }, []);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Enter a valid email';
    if (!password.trim()) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!confirmPassword.trim()) newErrors.confirmPassword = 'Please confirm your password';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validate()) return;
    const resultAction = await dispatch(registerUser({ name: name.trim(), email: email.trim(), password }) as any);
    if (registerUser.fulfilled.match(resultAction)) {
      router.replace('/(tabs)' as never);
    }
  };

  const handleSocial = (provider: string) => {
    Alert.alert(`${provider} Sign Up`, 'Social sign-up coming soon!');
  };

  return (
    <LinearGradient
      colors={['#DFEDFF', '#C8DFFF', '#A8C8FF']}
      style={styles.gradient}
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require('@/assets/images/icon.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.appName}>ON POINT{'\n'}WEATHER</Text>
          </View>

          {/* Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Create Account</Text>
            <Text style={styles.cardSubtitle}>Join On Point Weather today</Text>

            {/* API Error */}
            {error ? (
              <View style={styles.apiErrorContainer}>
                <Text style={styles.apiErrorText}>{error}</Text>
              </View>
            ) : null}

            {/* Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={[styles.input, errors.name ? styles.inputError : null]}
                placeholder="Your name"
                placeholderTextColor="#A0AEC0"
                value={name}
                onChangeText={(t) => { 
                  setName(t); 
                  setErrors(prev => ({ ...prev, name: undefined })); 
                  if (error) dispatch(clearError());
                }}
                editable={!loading}
              />
              {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={[styles.input, errors.email ? styles.inputError : null]}
                placeholder="you@example.com"
                placeholderTextColor="#A0AEC0"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={(t) => { 
                  setEmail(t); 
                  setErrors(prev => ({ ...prev, email: undefined })); 
                  if (error) dispatch(clearError());
                }}
                editable={!loading}
              />
              {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={[styles.inputRow, errors.password ? styles.inputError : null]}>
                <TextInput
                  style={styles.inputFlex}
                  placeholder="Min 6 characters"
                  placeholderTextColor="#A0AEC0"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={(t) => { 
                    setPassword(t); 
                    setErrors(prev => ({ ...prev, password: undefined })); 
                    if (error) dispatch(clearError());
                  }}
                  editable={!loading}
                />
                <Pressable onPress={() => setShowPassword(v => !v)} style={styles.eyeBtn}>
                  <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
                </Pressable>
              </View>
              {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
            </View>

            {/* Confirm Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <View style={[styles.inputRow, errors.confirmPassword ? styles.inputError : null]}>
                <TextInput
                  style={styles.inputFlex}
                  placeholder="Repeat your password"
                  placeholderTextColor="#A0AEC0"
                  secureTextEntry={!showConfirm}
                  value={confirmPassword}
                  onChangeText={(t) => { 
                    setConfirmPassword(t); 
                    setErrors(prev => ({ ...prev, confirmPassword: undefined })); 
                    if (error) dispatch(clearError());
                  }}
                  editable={!loading}
                />
                <Pressable onPress={() => setShowConfirm(v => !v)} style={styles.eyeBtn}>
                  <Text style={styles.eyeIcon}>{showConfirm ? '🙈' : '👁️'}</Text>
                </Pressable>
              </View>
              {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
            </View>

            {/* Create Account Button */}
            <TouchableOpacity 
              style={[styles.primaryBtn, loading && styles.disabledBtn]} 
              onPress={handleSignUp} 
              activeOpacity={0.85}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.primaryBtnText}>Create Account</Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>or sign up with</Text>
              <View style={styles.divider} />
            </View>

            {/* Social Buttons */}
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialBtn} onPress={() => handleSocial('Facebook')} activeOpacity={0.8} disabled={loading}>
                <Text style={styles.socialIcon}>f</Text>
                <Text style={styles.socialBtnText}>Facebook</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn} onPress={() => handleSocial('Google')} activeOpacity={0.8} disabled={loading}>
                <Text style={[styles.socialIcon, { color: '#EA4335' }]}>G</Text>
                <Text style={styles.socialBtnText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn} onPress={() => handleSocial('Apple')} activeOpacity={0.8} disabled={loading}>
                <Text style={[styles.socialIcon, { color: '#000' }]}>🍎</Text>
                <Text style={styles.socialBtnText}>Apple</Text>
              </TouchableOpacity>
            </View>

            {/* Sign In Link */}
            <View style={styles.switchRow}>
              <Text style={styles.switchText}>Already have an account? </Text>
              <Pressable onPress={() => router.back()} disabled={loading}>
                <Text style={styles.switchLink}>Sign In</Text>
              </Pressable>
            </View>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  gradient: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 60,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 80,
    height: 80,
  },
  appName: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: '#04356F',
    textAlign: 'center',
    letterSpacing: 1.5,
    marginTop: 8,
    lineHeight: 24,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#04356F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },
  cardTitle: {
    fontFamily: Fonts.bold,
    fontSize: 22,
    color: '#04356F',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: '#6E7F99',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    color: '#04356F',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F5F8FF',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#DDE6FF',
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontFamily: Fonts.regular,
    fontSize: 15,
    color: '#1A1A2E',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F8FF',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#DDE6FF',
    paddingRight: 4,
  },
  inputFlex: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontFamily: Fonts.regular,
    fontSize: 15,
    color: '#1A1A2E',
  },
  inputError: {
    borderColor: '#D93025',
  },
  eyeBtn: {
    padding: 10,
  },
  eyeIcon: {
    fontSize: 16,
  },
  errorText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: '#D93025',
    marginTop: 4,
    marginLeft: 4,
  },
  primaryBtn: {
    backgroundColor: '#04356F',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#04356F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  primaryBtnText: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: '#fff',
    letterSpacing: 0.5,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E8EDF5',
  },
  dividerText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: '#A0AEC0',
    marginHorizontal: 12,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#DDE6FF',
    borderRadius: 12,
    paddingVertical: 11,
    gap: 6,
    backgroundColor: '#FAFCFF',
  },
  socialIcon: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: '#1877F2',
  },
  socialBtnText: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: '#3A3A5C',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: '#6E7F99',
  },
  switchLink: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: '#04356F',
    textDecorationLine: 'underline',
  },
  disabledBtn: {
    opacity: 0.6,
  },
  apiErrorContainer: {
    backgroundColor: '#FFF5F5',
    borderWidth: 1,
    borderColor: '#FEB2B2',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },
  apiErrorText: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    color: '#C53030',
    textAlign: 'center',
  },
});
