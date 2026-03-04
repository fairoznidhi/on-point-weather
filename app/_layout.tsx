import { persistor, store , RootState } from "@/store/store";
import {
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, Stack, useRootNavigationState, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { PersistGate } from 'redux-persist/integration/react';

import { useColorScheme } from "@/hooks/use-color-scheme";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Provider, useSelector } from "react-redux";

export const unstable_settings = {
  anchor: "(tabs)",
};
SplashScreen.preventAutoHideAsync();

function AuthGuard() {
  const segments = useSegments();
  const rootNavigationState = useRootNavigationState();
  const { user, isGuest, hasSeenLogin } = useSelector((state: RootState) => state.auth);
  const isTrulyAuthenticated = !!user;
  const inAuthGroup = (segments[0] as string) === 'auth';

  if (!rootNavigationState?.key) return null;

  // 1. Force sign-in only for first-time users who haven't skipped yet
  if (!isTrulyAuthenticated && !isGuest && !hasSeenLogin && !inAuthGroup) {
    return <Redirect href="/auth/sign-in" />;
  }

  // 2. Truly authenticated users should not see auth screens
  if (isTrulyAuthenticated && inAuthGroup) {
    return <Redirect href="/(tabs)" />;
  }

  // 3. Guests can navigate between tabs and sign-in freely
  return null;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    "GoogleSans-Regular": require("@/assets/fonts/GoogleSans-Regular.ttf"),
    "GoogleSans-Bold": require("@/assets/fonts/GoogleSans-Bold.ttf"),
    "GoogleSans-Medium": require("@/assets/fonts/GoogleSans-Medium.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider value={DefaultTheme}>
          <AuthGuard />
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="auth/sign-in" options={{ headerShown: false }} />
            <Stack.Screen name="auth/sign-up" options={{ headerShown: false }} />
            <Stack.Screen
              name="modal"
              options={{ presentation: "modal", title: "Modal" }}
            />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
