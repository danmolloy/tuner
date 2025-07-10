import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { useColorScheme } from '@/hooks/useColorScheme';
import { usePurchase } from '@/lib/purchaseProvider';
import { borderWidths, colors, typography } from '@/lib/themes';
import FontAwesome from '@expo/vector-icons/FontAwesome';


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isProUser = usePurchase();

  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: {
          fontFamily: typography.fontSemiBold
        },
        tabBarActiveTintColor: colors.accentBlue,
        tabBarInactiveTintColor: colors.black,
        headerShown: false,
        
        tabBarButton: HapticTab,
        //tabBarBackground: TabBarBackground,
        
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
            backgroundColor: colors.backgroundCream,
            borderTopWidth: borderWidths.lg,
            borderColor: colors.black,
            height: 54,
            fontFamily: typography.fontRegular
          },
          default: {
            backgroundColor: colors.backgroundCream
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome name="cog" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color }) => <FontAwesome name="info" size={28} color={color} />,
        }}
      />
       <Tabs.Screen
        name="upgrade"
        options={{
          title: 'Upgrade',
          tabBarIcon: ({ color }) => <FontAwesome name="rocket" size={28} color={color} />,
          href: isProUser ? null : "/(tabs)/upgrade"
        }}
      />
    </Tabs>
  );
}
