import { usePurchase } from "@/lib/purchaseProvider";
import { colors, globalStyles, radii, spacing } from "@/lib/themes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";

export const CALIBRATION_KEY = '@tuner_calibration';
const DEFAULT_CALIBRATION = '440';

export default function CalibrationInput() {
  const  isProUser = usePurchase();
      const [calibration, setCalibration] = useState(DEFAULT_CALIBRATION);

    useEffect(() => {
    const loadCalibration = async () => {
      const stored = await AsyncStorage.getItem(CALIBRATION_KEY);
      if (stored) setCalibration(stored);
    };
    loadCalibration();
  }, []);

   const handleEndEditing = async () => {
    if (!isProUser) {
      Alert.alert("Alternative calibrations are only available for premium users. To make a purchase or restore purchase, navigate to the Premium tab on the bottom of your screen.")
      return;
    }
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
    marginVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.backgroundLabel,
    borderRadius: radii.sm,
    padding: spacing.sm
  },
  label: {
    ...globalStyles.settingsLabel,
    
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