import { bassTunings, guitarTunings } from "@/lib/gtrTunings";
import { useAppSettings } from "@/lib/hooks/useAppSettings";
import { usePurchase } from "@/lib/purchaseProvider";
import { TUNER_TYPE_KEY } from "@/lib/settingsKeys";
import { colors, globalStyles, typography } from "@/lib/themes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";


const DEFAULT_TUNER_TYPE = 'Chromatic';


export default function TunerSelect() {
  const isProUser = usePurchase();
  const [localTunerType, setLocalTunerType] = useState(DEFAULT_TUNER_TYPE);
  const {  setTunerType } = useAppSettings();

  useEffect(() => {
    const loadTunerType = async () => {
      const stored = await AsyncStorage.getItem(TUNER_TYPE_KEY);
      if (stored) setLocalTunerType(stored);
    };
    loadTunerType();
  }, []);

  const handleSelect = async (value: string) => {
    if (!isProUser && (value !== "Chromatic" && value !== "Guitar: Standard" && value !== "Bass: Standard")) {
      Alert.alert("Alternative guitar and bass tunings are only available for premium users. To make a purchase or restore purchase, navigate to the Premium tab on the bottom of your screen.")
      return;
    }
    if (value === "Chromatic" || guitarTunings.map(i => i.name).includes(value)|| bassTunings.map(i => i.name).includes(value)) {
      
      setLocalTunerType(value);
      setTunerType(value)
      await AsyncStorage.setItem(TUNER_TYPE_KEY, value);
      //value === "Chromatic" && setTunerMode("Detect")
    } else {
      Alert.alert("Invalid Value", "Selected tuning invalid.");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>TUNER TYPE</Text>
      <Picker
        selectedValue={localTunerType}
        onValueChange={(itemValue) => handleSelect(itemValue)}
        style={styles.picker}
      >
        <Picker.Item style={styles.pickerItem} label="CHROMATIC" value="Chromatic" />
        {guitarTunings.map(i => (
          <Picker.Item style={styles.pickerItem} key={i.id} label={i.name.toUpperCase()} value={i.name} />

        ))}
        {bassTunings.map(i => (
          <Picker.Item style={styles.pickerItem} key={i.id} label={i.name.toUpperCase()} value={i.name} />

        ))}

      </Picker>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
  },
  label: {
    ...globalStyles.settingsLabel,
  },
  picker: {
    ...globalStyles.settingsContainer,

        fontFamily: typography.fontBold,
        backgroundColor: colors.buttonPanelTeal,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 24,
  },
  pickerItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 24,
    }
});