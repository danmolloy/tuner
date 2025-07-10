import { usePurchase } from "@/lib/purchaseProvider";
import { CALIBRATION_KEY } from "@/lib/settingsKeys";
import { colors, globalStyles, typography } from "@/lib/themes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";

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
      <Text style={styles.label}>CALIBRATION (HZ)</Text>
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
   paddingBottom: 12,
  },
  label: {
    ...globalStyles.settingsLabel,
    
  },
  input: {
       ...globalStyles.settingsContainer,
    
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 24,
    fontFamily: typography.fontBold,
    backgroundColor: colors.meterPanelYellow
    
  },
});