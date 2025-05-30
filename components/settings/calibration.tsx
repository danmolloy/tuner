import { colors, globalStyles } from "@/lib/themes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";

export const CALIBRATION_KEY = '@tuner_calibration';
const DEFAULT_CALIBRATION = '440';

export default function CalibrationInput() {
      const [calibration, setCalibration] = useState(DEFAULT_CALIBRATION);

    useEffect(() => {
    const loadCalibration = async () => {
      const stored = await AsyncStorage.getItem(CALIBRATION_KEY);
      if (stored) setCalibration(stored);
    };
    loadCalibration();
  }, []);

   const handleEndEditing = async () => {
    const num = parseFloat(calibration);
    if (!isNaN(num) && num >= 400 && num <= 480) {
      await AsyncStorage.setItem(CALIBRATION_KEY, calibration);
    } else {
      Alert.alert("Invalid Value", "Calibration must be between 400 and 480 Hz.");
      setCalibration(DEFAULT_CALIBRATION); // Optionally reset
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Calibration (Hz)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={calibration}
        onChangeText={setCalibration}
        onEndEditing={handleEndEditing}
        maxLength={5}
        placeholder="440"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  label: {
    ...globalStyles.settingsLabel,
        color: colors.backgroundLight
    
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    
  },
});