import CalibrationInput from "@/components/settings/calibration";
import MeterSelect from "@/components/settings/meterSelect";
import TemperamentSelect from "@/components/settings/temperament";
import TunerSelect from "@/components/settings/tunerSelect";
import { globalStyles } from "@/lib/themes";
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
    paddingBottom: 60
  },
  headerText: {
    ...globalStyles.headerText
  }
})