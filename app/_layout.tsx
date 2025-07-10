import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { PlaypenSans_200ExtraLight, PlaypenSans_400Regular, PlaypenSans_500Medium, PlaypenSans_600SemiBold, PlaypenSans_700Bold, PlaypenSans_800ExtraBold, useFonts } from '@expo-google-fonts/playpen-sans';
import React from 'react';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  let [fontsLoaded] = useFonts({
    PlaypenSans_200ExtraLight,
    PlaypenSans_400Regular,
    PlaypenSans_500Medium,
    PlaypenSans_600SemiBold,
    PlaypenSans_700Bold,
    PlaypenSans_800ExtraBold,
  });



  
  if (!fontsLoaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
