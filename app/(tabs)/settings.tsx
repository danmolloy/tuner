import CalibrationInput from "@/components/settings/calibration";
import MeterSelect from "@/components/settings/meterSelect";
import TemperamentSelect from "@/components/settings/temperament";
import TunerSelect from "@/components/settings/tunerSelect";
import { colors, globalStyles } from "@/lib/themes";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function SettingsScreen() {

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Settings</Text>
      <CalibrationInput />
      <TemperamentSelect />
      <TunerSelect />
      <MeterSelect />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.pageView,
    backgroundColor: colors.backgroundLight
    
  },
  headerText: {
    ...globalStyles.headerText,
  }
})