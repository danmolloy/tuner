import { globalStyles } from "@/lib/themes";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import GuitarPitch from "./guitarPitch";

export default function StringSelect({note, tunerType, selectedString, setSelectedString, tunerMode, selectedOctave, selectedPitch, setSelectedPitch, setSelectedOctave}: {
  selectedOctave: number;
  selectedPitch: string;
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
      {tunerType && <Text style={{}}>{tunerType.toUpperCase()}</Text>}
      {(tunerType === "Guitar (Standard)" || tunerType === "Bass (Standard)")
             && <GuitarPitch selectedString={selectedString} setSelectedString={(arg: number) => setSelectedString(arg)} note={note} tunerType={tunerType} tunerMode={tunerMode} setSelectedPitch={(arg) => setSelectedPitch(arg)} setSelectedOctave={(arg) => setSelectedOctave(arg)} selectedPitch={selectedPitch} selectedOctave={selectedOctave}/>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  calibrationContainer: {
      ...globalStyles.globalCard,
        flexDirection: 'column',  
        alignItems: "center",
        justifyContent: 'center',
        width: Dimensions.get("window").width * 0.45,
        flexGrow: 1,
        marginBottom:  Dimensions.get("window").width * .05
  },
  calibText: {
    
        fontSize: 26,
        fontWeight: '500',
        textAlign: 'center'
  }
})