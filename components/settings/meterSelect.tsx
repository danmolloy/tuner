import { colors, globalStyles, radii, spacing } from "@/lib/themes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

export const METER_TYPE_KEY = '@meter_type';

const DEFAULT_METER_TYPE = 'Default';

export default function MeterSelect() {
const [meter, setMeter] = useState(DEFAULT_METER_TYPE);

    useEffect(() => {
    const loadMeter = async () => {
      const stored = await AsyncStorage.getItem(METER_TYPE_KEY);
      if (stored) setMeter(stored);
    };
    loadMeter();
  }, []);

  const handleSelect = async (value: string) => {
    if (value === "Default" || value === "Analogue") {
      setMeter(value)
      await AsyncStorage.setItem(METER_TYPE_KEY, value);
    } else {
      Alert.alert("Invalid Value", "Temperament must be Equal or Just");
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Meter Type</Text>
      <Picker
        selectedValue={meter}
        onValueChange={(itemValue: string) => handleSelect(itemValue)}
        style={styles.picker}
      >
        <Picker.Item style={styles.pickerItem} label="Default" value="Default" />
                <Picker.Item style={styles.pickerItem} label="Analogue" value="Analogue" />
        
      </Picker>
     
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
     ...globalStyles.settingsContainer,
         backgroundColor: colors.backgroundLight,
         borderRadius: radii.sm,
         padding: spacing.sm
  },
  label: {
    ...globalStyles.settingsLabel,
  },
  picker: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 8,
    color: colors.backgroundLight
  },
  pickerItem: {
    color: colors.backgroundLight,
    
  }
})