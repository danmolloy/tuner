import { bassTunings, guitarTunings } from "@/lib/gtrTunings";
import { globalStyles } from "@/lib/themes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";


export const TUNER_TYPE_KEY = '@tuner_type';

const DEFAULT_TUNER_TYPE = 'Chromatic';


export default function TunerSelect() {
  const [tunerType, setTunerType] = useState(DEFAULT_TUNER_TYPE);

  useEffect(() => {
    const loadTunerType = async () => {
      const stored = await AsyncStorage.getItem(TUNER_TYPE_KEY);
      if (stored) setTunerType(stored);
    };
    loadTunerType();
  }, []);

  const handleSelect = async (value: string) => {
    if (value === "Chromatic" || guitarTunings.map(i => i.name).includes(value)|| bassTunings.map(i => i.name).includes(value)) {
      setTunerType(value);
      await AsyncStorage.setItem(TUNER_TYPE_KEY, value);
    } else {
      Alert.alert("Invalid Value", "Selected tuning invalid.");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tuner Type</Text>
      <Picker
        selectedValue={tunerType}
        onValueChange={(itemValue) => handleSelect(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Chromatic" value="Chromatic" />
        {guitarTunings.map(i => (
          <Picker.Item key={i.id} label={i.name} value={i.name} />

        ))}
        {bassTunings.map(i => (
          <Picker.Item key={i.id} label={i.name} value={i.name} />

        ))}

      </Picker>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
   ...globalStyles.settingsContainer
  },
  label: {
    ...globalStyles.settingsLabel
  },
  picker: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,

  },
});