import CalibrationInput from "@/components/settings/calibration";
import TemperamentSelect from "@/components/settings/temperament";
import TunerSelect from "@/components/settings/tunerSelect";
import { ScrollView } from "react-native";

export default function SettingsScreen() {

  return (
    <ScrollView>
      <CalibrationInput />
      <TemperamentSelect />
      <TunerSelect />
    </ScrollView>
  )
}