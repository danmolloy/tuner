import { borderWidths, globalStyles } from "@/lib/themes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export const METER_TYPE_KEY = '@meter_type';

const DEFAULT_METER_TYPE = 'Default';

export default function MeterSelect() {
const [meterType, setMeterType] = useState(DEFAULT_METER_TYPE);

  useEffect(() => {
    const loadMeterType = async () => {
      const stored = await AsyncStorage.getItem(METER_TYPE_KEY);
      if (stored) setMeterType(stored);
    };
    loadMeterType();
  }, []);

  const handleSelect = async (value: string) => {
    if (value === "Default") {
      setMeterType(value);
      await AsyncStorage.setItem(METER_TYPE_KEY, value);
    } else {
      Alert.alert("Invalid Value", "Temperament must be Equal or Just");
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Meter Type</Text>
      <Pressable style={{ borderWidth: meterType === "Default" ? borderWidths.md : borderWidths.hairline}} onPress={() => handleSelect("Default")}>
        <Text>Default</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
     marginVertical: 16,
    paddingHorizontal: 16,
  },
  label: {
    ...globalStyles.settingsLabel
  }
})