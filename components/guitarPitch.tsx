import { defaultFont } from "@/app/_layout";
import { noteNames } from "@/lib/functions";
import { Picker } from "@react-native-picker/picker";
import { Dimensions, StyleSheet, View } from "react-native";

type NoteInfo = {
  note: string;
  octave: number;
};

type GuitarStringNumber = 1 | 2 | 3 | 4 | 5 | 6;
type BassStringNumber = 1 | 2 | 3 | 4;
type Tuning = Record<number, NoteInfo>;




const guitarStandardStrings: Tuning = {
  1: {
    note: "E",
    octave: 4,
  },
  2: {
    note: "B",
    octave: 3
  },
  3: {
    note: "G",
    octave: 3
  },
  4:{
    note: "D",
    octave: 3
  },
  5: {
    note: "A",
    octave: 2
  },
  6: {
    note: "E",
    octave: 2
  },
}

const bassStandardStrings: Tuning = {
  1: { note: "G", octave: 2 },
  2: { note: "D", octave: 2 },
  3: { note: "A", octave: 1 },
  4: { note: "E", octave: 1 },
};

export const tuningsList: Record<string, Tuning>= {
  "Guitar (Standard)": guitarStandardStrings,
  "Bass (Standard)": bassStandardStrings
}

export default function GuitarPitch({note, tunerType, selectedString, setSelectedString, tunerMode, selectedOctave, selectedPitch, setSelectedPitch, setSelectedOctave}: {
  selectedOctave: number;
  selectedPitch: string;
  selectedString: number;
  setSelectedString: (arg: number) => void
  setSelectedPitch: (arg: string) => void
  setSelectedOctave: (arg: number) => void
  tunerMode: "Detect"|"Drone"|"Target"
  tunerType: string |null
  note: {
    note: string;
    octave: number;
  } | null
}) {

  const getTuning = (type: string | null): Tuning => {
  if (type === "Bass (Standard)") return bassStandardStrings;
  return guitarStandardStrings;
};

  return (
    <View style={styles.pitchContainer}>
        <Picker
          selectedValue={ selectedPitch  || "C"}
          onValueChange={(itemValue) => {
            /* return (tunerMode === "Target" || tunerMode === "Drone") ? setSelectedPitch(itemValue) : */ null
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
  selectedValue={selectedString || 1}
  onValueChange={(itemValue: number) => {
    if (tunerMode === "Target" || tunerMode === "Drone") {
      const tuning = getTuning(tunerType);
      const stringInfo = tuning[itemValue as GuitarStringNumber|BassStringNumber];
      if (stringInfo) {
        setSelectedString(itemValue);
        setSelectedPitch(stringInfo.note);
        setSelectedOctave(stringInfo.octave);
      }
    }
  }}
  style={styles.octavePicker}
  itemStyle={styles.pickerItem}
  mode="dropdown"
>
  {Object.keys(getTuning(tunerType)).map((key) => (
    <Picker.Item key={key} label={key} value={Number(key)} />
  ))}
</Picker>
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
