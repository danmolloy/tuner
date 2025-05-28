import { Stack } from 'expo-router';

export default function AboutLayout() {
  return (
     <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="how-to-use"
        options={{  headerTitle: "" }}
      />
      <Stack.Screen
        name="tuning-basics"
        options={{  headerTitle: ""  }}
      />
      <Stack.Screen
        name="tuning-history"
        options={{  headerTitle: ""  }}
      />
    </Stack>
  );
}