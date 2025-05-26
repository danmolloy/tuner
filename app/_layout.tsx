import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useFonts } from '@expo-google-fonts/roboto';
import { Roboto_100Thin } from '@expo-google-fonts/roboto/100Thin';
import { Roboto_100Thin_Italic } from '@expo-google-fonts/roboto/100Thin_Italic';
import { Roboto_200ExtraLight } from '@expo-google-fonts/roboto/200ExtraLight';
import { Roboto_200ExtraLight_Italic } from '@expo-google-fonts/roboto/200ExtraLight_Italic';
import { Roboto_300Light } from '@expo-google-fonts/roboto/300Light';
import { Roboto_300Light_Italic } from '@expo-google-fonts/roboto/300Light_Italic';
import { Roboto_400Regular } from '@expo-google-fonts/roboto/400Regular';
import { Roboto_400Regular_Italic } from '@expo-google-fonts/roboto/400Regular_Italic';
import { Roboto_500Medium } from '@expo-google-fonts/roboto/500Medium';
import { Roboto_500Medium_Italic } from '@expo-google-fonts/roboto/500Medium_Italic';
import { Roboto_600SemiBold } from '@expo-google-fonts/roboto/600SemiBold';
import { Roboto_600SemiBold_Italic } from '@expo-google-fonts/roboto/600SemiBold_Italic';
import { Roboto_700Bold } from '@expo-google-fonts/roboto/700Bold';
import { Roboto_700Bold_Italic } from '@expo-google-fonts/roboto/700Bold_Italic';
import { Roboto_800ExtraBold } from '@expo-google-fonts/roboto/800ExtraBold';
import { Roboto_800ExtraBold_Italic } from '@expo-google-fonts/roboto/800ExtraBold_Italic';
import { Roboto_900Black } from '@expo-google-fonts/roboto/900Black';
import { Roboto_900Black_Italic } from '@expo-google-fonts/roboto/900Black_Italic';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  let [fontsLoaded] = useFonts({
    Roboto_100Thin, 
    Roboto_200ExtraLight, 
    Roboto_300Light, 
    Roboto_400Regular, 
    Roboto_500Medium, 
    Roboto_600SemiBold, 
    Roboto_700Bold, 
    Roboto_800ExtraBold, 
    Roboto_900Black, 
    Roboto_100Thin_Italic, 
    Roboto_200ExtraLight_Italic, 
    Roboto_300Light_Italic, 
    Roboto_400Regular_Italic, 
    Roboto_500Medium_Italic, 
    Roboto_600SemiBold_Italic, 
    Roboto_700Bold_Italic, 
    Roboto_800ExtraBold_Italic, 
    Roboto_900Black_Italic
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
