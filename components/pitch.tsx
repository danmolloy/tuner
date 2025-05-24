import { defaultFont } from "@/app/_layout";
import { noteNames } from "@/lib/functions";
import { Picker } from "@react-native-picker/picker";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import GuitarPitch from "./guitarPitch";

export default function Pitch({note, tunerType, selectedString, setSelectedString, tunerMode, selectedOctave, selectedPitch, setSelectedPitch, setSelectedOctave}: {
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
    <View style={styles.container}>
      {tunerType && <Text style={styles.tunerTypeText}>{tunerType.toUpperCase()}</Text>}
        {(tunerType === "Guitar (Standard)" || tunerType === "Bass (Standard)")
        ? <GuitarPitch selectedString={selectedString} setSelectedString={(arg: number) => setSelectedString(arg)} note={note} tunerType={tunerType} tunerMode={tunerMode} setSelectedPitch={(arg) => setSelectedPitch(arg)} setSelectedOctave={(arg) => setSelectedOctave(arg)} selectedPitch={selectedPitch} selectedOctave={selectedOctave}/>
               
         : <View style={styles.pitchContainer}>
         <Picker
          selectedValue={(tunerMode === "Target" || tunerMode === "Drone") ? selectedPitch : note?.note || "C"}
          onValueChange={(itemValue) => {
            return (tunerMode === "Target" || tunerMode === "Drone") ? setSelectedPitch(itemValue) : null
          }}
          style={styles.notePicker}
          itemStyle={styles.pickerItem}
          mode="dialog"
        >
          {noteNames.map((pitch) => (
            <Picker.Item key={pitch} label={pitch} value={pitch} />
          ))}
        </Picker>
        <Picker
          selectedValue={(tunerMode === "Target" || tunerMode === "Drone") ? selectedOctave : note?.octave ?? 4}
          onValueChange={(itemValue) => {
            return (tunerMode === "Target" || tunerMode === "Drone") ? setSelectedOctave(itemValue) : null
          }}
          style={styles.octavePicker}
          itemStyle={styles.pickerItem}
          mode="dropdown" // Add this for better mobile appearance
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((oct) => (
            <Picker.Item key={oct} label={oct.toString()} value={oct} />
          ))}
        </Picker>
      </View>}
    </View>
  )
}

const styles = StyleSheet.create({
  notePicker: {
    width: 100, // Increased width
  height: 120,
  },
  container: {
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    width: Dimensions.get("window").width * 0.45,
    paddingVertical: 8,
  },
  tunerTypeText: {
    fontSize: 16,
    marginBottom: 4,
  },
  pitchContainer: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'center',
    width: '100%',
  },
  noteText: {
    fontSize: 48, 
    fontFamily: defaultFont,
    marginRight: 8, // Add spacing between note and picker
  },
  octavePicker: {
    width: 80,
    height: 120, // Give it enough height
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }], // Optional: scale if too large
  },
  pickerItem: {
    fontFamily: defaultFont,
    height: 120, // Match picker height
  },
});
