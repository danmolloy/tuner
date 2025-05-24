import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

export const TEMPERAMENT_KEY = '@tuner_temperament';
export const TEMPERAMENT_ROOT = '@tuner_root';

const DEFAULT_TEMPERAMENT = 'Equal';

export default function TemperamentSelect() {
       const [temperament, setTemperament] = useState(DEFAULT_TEMPERAMENT);

  useEffect(() => {
    const loadTemperament = async () => {
      const stored = await AsyncStorage.getItem(TEMPERAMENT_KEY);
      if (stored) setTemperament(stored);
    };
    loadTemperament();
  }, []);

  const handleSelect = async (value: string) => {
    if (value === "Just") {
      setTemperament(value);
      await AsyncStorage.setItem(TEMPERAMENT_KEY, value);
      await AsyncStorage.setItem(TEMPERAMENT_ROOT, "C");
    } else if (value === "Equal") {
      setTemperament(value);
      await AsyncStorage.setItem(TEMPERAMENT_KEY, value);
      await AsyncStorage.removeItem(TEMPERAMENT_ROOT);
    } else {
      Alert.alert("Invalid Value", "Temperament must be Equal or Just");
    }
  };

  return (
    <View>
      <Text>Temperament</Text>
      <Picker
        selectedValue={temperament}
        onValueChange={(itemValue) => handleSelect(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Equal Temperament" value="Equal" />
        <Picker.Item label="Just Temperament (C)" value="Just" />
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