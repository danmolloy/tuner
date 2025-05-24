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
    if (value === "Chromatic" || value === "Guitar (Standard)"|| value === "Bass (Standard)") {
      setTunerType(value);
      await AsyncStorage.setItem(TUNER_TYPE_KEY, value);
    } else {
      Alert.alert("Invalid Value", "Temperament must be Equal or Just");
    }
  };
  return (
    <View>
      <Text>Tuner Type</Text>
      <Picker
        selectedValue={tunerType}
        onValueChange={(itemValue) => handleSelect(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Chromatic" value="Chromatic" />
        <Picker.Item label="Guitar (Standard)" value="Guitar (Standard)" />
                <Picker.Item label="Bass (Standard)" value="Bass (Standard)" />

      </Picker>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  picker: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
});