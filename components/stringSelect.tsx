import { borderWidths, colors, radii, typography } from "@/lib/themes";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import GuitarPitch from "./guitarPitch";

export default function StringSelect({note, tunerType, selectedString, setSelectedString, tunerMode, selectedOctave, selectedPitch, setSelectedPitch, setSelectedOctave}: {
  selectedOctave: number|null;
  selectedPitch: string|null;
  selectedString: number;
  setSelectedString: (arg: number) => void;
  setSelectedPitch: (arg: string) => void
  setSelectedOctave: (arg: number) => void
  tunerMode: "Detect"|"Drone"|"Target"
  tunerType: string |null
  note: {
    note: string;
    octave: number;
  } | null
}) {
  return (
    <View style={styles.calibrationContainer}>
      {tunerType && tunerType !== "Chromatic" && <Text style={styles.calibText}>{tunerType.toUpperCase()}</Text>}
      {tunerType !== "Chromatic" && <GuitarPitch selectedString={selectedString} setSelectedString={(arg: number) => setSelectedString(arg)} note={note} tunerType={tunerType} tunerMode={tunerMode} setSelectedPitch={(arg) => setSelectedPitch(arg)} setSelectedOctave={(arg) => setSelectedOctave(arg)} selectedPitch={selectedPitch} selectedOctave={selectedOctave||4}/>}
      
    </View>
  )
}

const styles = StyleSheet.create({
  calibrationContainer: {
        flexDirection: 'column',  
        alignItems: "center",
        justifyContent: 'center',
        flexWrap: 'wrap',
        backgroundColor: colors.accentBlue,
        borderWidth: borderWidths.lg,
        marginVertical: -32,
        padding: 4,
          width: Dimensions.get("window").width * .95,
        borderRadius: radii.sm,

  },
  calibText: {
            

        fontSize: 12,
        fontFamily: typography.fontMedium,
        textAlign: 'center',
        color: colors.lightShade
  }
})