import CalibrationInput from "@/components/settings/calibration";
import MeterSelect from "@/components/settings/meterSelect";
import TemperamentSelect from "@/components/settings/temperament";
import TunerSelect from "@/components/settings/tunerSelect";
import { borderWidths, colors, globalStyles, radii, spacing } from "@/lib/themes";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
export default function SettingsScreen() {

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Settings</Text>
      <View style={styles.settingContainer}>
      <MeterSelect />
      <CalibrationInput />
      <TemperamentSelect />
      <TunerSelect />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.pageView,
    backgroundColor: colors.backgroundPrimary
    
  },
  headerText: {
    ...globalStyles.headerText,
    color: colors.backgroundLight,
  },
  settingContainer: {
    borderColor: 'gray',
    backgroundColor: colors.backgroundLight,
            borderWidth: borderWidths.sm,
             padding: spacing.md,
            borderRadius: radii.md,
            marginHorizontal: -8,
            marginVertical: 12
  }
})