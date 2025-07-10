import CalibrationInput from "@/components/settings/calibration";
import TemperamentSelect from "@/components/settings/temperament";
import TunerSelect from "@/components/settings/tunerSelect";
import { colors, globalStyles, typography } from "@/lib/themes";
import { Image } from "expo-image";
import React from "react";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
export default function SettingsScreen() {

  return (
    <ScrollView style={styles.container}>
      <Image
              source={require("../../assets/images/settings.png")}
              contentFit="contain"
              style={{ width: 1024/3, height: 242/3, }}
            />  
      <CalibrationInput />
      <TemperamentSelect />
      <TunerSelect />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.pageView,
    backgroundColor: colors.backgroundRed,
    height: Dimensions.get("window").height,
  },
  headerText: {
    ...globalStyles.headerText,
    color: colors.black,
    marginBottom: 0, marginTop: 12, fontFamily: typography.fontExtraBold, fontSize: 36
  },
})