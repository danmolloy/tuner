import { METER_TYPE_KEY } from "@/lib/settingsKeys";
import { colors, globalStyles, radii, spacing } from "@/lib/themes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

const DEFAULT_METER_TYPE = 'Analogue';

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
    if (value === "Arc" || value === "Analogue") {
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
        <Picker.Item style={styles.pickerItem} label="Arc" value="Arc" />
                <Picker.Item style={styles.pickerItem} label="Analogue" value="Analogue" />
        
      </Picker>
     
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
         borderRadius: radii.sm,
         padding: spacing.sm
  },
  label: {
    ...globalStyles.settingsLabel,
  },
  picker: {
         ...globalStyles.settingsContainer,

  },
  pickerItem: {
    color: colors.lightShade,
    
  }
})