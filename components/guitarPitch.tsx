import { BassStringNumber, bassTunings, GuitarStringNumber, guitarTunings } from "@/lib/gtrTunings";
import { borderWidths, colors, radii, spacing, typography } from "@/lib/themes";
import React from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";



export type NoteInfo = { note: string; octave: number };
type TuningMap = {
  [key: number]: NoteInfo | undefined;
};

const allTunings = [...guitarTunings, ...bassTunings];

export default function GuitarPitch({
  note,
  tunerType,
  selectedString,
  setSelectedString,
  tunerMode,
  setSelectedPitch,
  setSelectedOctave,
}: {
  selectedOctave: number;
  selectedPitch: string|null;
  selectedString: number;
  setSelectedString: (arg: number) => void;
  setSelectedPitch: (arg: string) => void;
  setSelectedOctave: (arg: number) => void;
  tunerMode: "Detect" | "Drone" | "Target";
  tunerType: string | null;
  note: {
    note: string;
    octave: number;
  } | null;
}) {

const getTuning = (type: string | null): TuningMap => {
  return allTunings.find((t) => t.name === type)?.tuning || {};
};

  const currentTuning = getTuning(tunerType);

  return (
    <View style={styles.pitchContainer}>
      
        {Object.keys(currentTuning).map((string) => (
          <Pressable
                    style={{
                      ...styles.string, 
                      borderColor: selectedString === Number(string) 
                      ?colors.white : colors.lightShade,
                      backgroundColor: selectedString === Number(string) 
                      ? colors.textSecondary 
                      : colors.darkShade,
                      borderWidth: selectedString === Number(string)  ? borderWidths.sm : borderWidths.hairline,
                    
                    }}
                    key={string} 
                    onPress={() => {
                      if (tunerMode === "Target" || tunerMode === "Drone") {
                        const tuning = getTuning(tunerType);
                        const stringInfo = tuning[Number(string) as GuitarStringNumber|BassStringNumber];
                        if (stringInfo) {
                          setSelectedString(Number(string));
                          setSelectedPitch(stringInfo.note);
                          setSelectedOctave(stringInfo.octave);
                        }
}
                      }}>
                      <Text style={{fontWeight: '400' , color:  selectedString !== Number(string) ? colors.white : colors.backgroundPrimary}}>
                      {string.toString()}
                      </Text>
          
                    </Pressable>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({

  
  string: {
      borderColor: colors.text,
      padding: spacing.xs,
      margin: 4,
      width: 24,
      height: 24,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radii.xl
    },
  tunerTypeText: {
    fontSize: 16,
    marginBottom: 4,
  },
  pitchContainer: {
  
     
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
      width: Dimensions.get('window').width * .95

  },
  noteText: {
    fontSize: 48, 
    fontFamily: typography.fontBold,
    marginRight: 8, // Add spacing between note and picker
  },


});


