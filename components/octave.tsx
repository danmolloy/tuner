import { useAppSettings } from "@/lib/hooks/useAppSettings";
import { borderWidths, colors, radii, spacing } from "@/lib/themes";
import React from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";

export default function Octave({selectedOctave, setSelectedOctave, note}: {
  setSelectedOctave: (arg: number | null) => void
  selectedOctave: number|null
  note: {
    note: string;
    octave: number;
  } | null
}) {
  const { tunerMode} = useAppSettings();
  return (
    <View style={{
      ...styles.panel,

  }}>
      
      <Text style={{color: colors.backgroundPanel, alignSelf: 'flex-start', marginLeft: spacing.md}}>OCTAVE</Text>
    <View style={styles.container}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((oct) => (
        <Pressable 
          style={{
            ...styles.octave, 
            backgroundColor: (selectedOctave === oct || ( selectedOctave === null && note?.octave === oct)) 
            ? colors.backgroundPanel 
            : colors.backgroundPanel,
            borderWidth: selectedOctave === oct ? borderWidths.sm : borderWidths.hairline,

          }}
          key={oct} 
          onPress={() => {
            if (tunerMode !== "Drone") {
              return;
            }
            selectedOctave === oct 
            ? setSelectedOctave(null) 
            : setSelectedOctave(oct)}}>
            <Text style={{fontWeight: (selectedOctave === oct|| (selectedOctave === null && note?.octave === oct)) ? '700' : '400' ,}}>
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
    width: Dimensions.get('screen').width * .80,
  },
  container: {
    flexDirection: 'row',
    width: 'auto',
    alignItems: 'center'
  },
  octave: {
    borderColor: colors.text,
    padding: spacing.xs,
    margin: 4,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.xl
  }
})