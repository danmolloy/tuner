import { borderWidths, colors, radii, typography } from "@/lib/themes";
import React from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";

export default function Octave({tunerMode, selectedOctave, setSelectedOctave, note}: {
  setSelectedOctave: (arg: number | null) => void
  tunerMode: "Detect"|"Target"|"Drone"
  selectedOctave: number|null
  note: {
    note: string;
    octave: number;
  } | null
}) {

  return (
    <View style={{
      ...styles.panel,

  }}>
      
    <View style={styles.container}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((oct) => (
        <Pressable 
          style={{
            ...styles.octave, 
            backgroundColor: (selectedOctave === oct|| (selectedOctave === null && note?.octave === oct)) ? colors.backgroundCream :colors.accentBlue,
            borderWidth: borderWidths.md,

            borderColor: colors.black,
            
          }}
          key={oct} 
          onPress={() => {
            if (tunerMode !== "Drone") {
              return;
            }
            selectedOctave === oct 
            ? setSelectedOctave(null) 
            : setSelectedOctave(oct)}}>
            <Text style={{
              color: colors.black, 
              fontWeight: "400" , 
              fontFamily: typography.fontSemiBold
              
              }}>
            {oct.toString()}
            </Text>

          </Pressable>
        ))}
    </View></View>
  )
}

const styles = StyleSheet.create({
  panel: {
    flexDirection: 'column',
    alignItems: 'center',
    width: Dimensions.get('window').width * .80,
  },
  container: {
    flexDirection: 'row',
    width: 'auto',
    alignItems: 'center'
  },
  octave: {
    borderColor: colors.text,
    margin: 1,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.xl,
  }
})