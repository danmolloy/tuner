import { borderWidths, colors, radii, spacing } from "@/lib/themes";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Octave({selectedOctave, setSelectedOctave, note}: {
  setSelectedOctave: (arg: number | null) => void
  selectedOctave: number|null
  note: {
    note: string;
    octave: number;
  } | null
}) {
  return (
    <View>
      <Text style={{color: 'gray'}}>OCTAVE</Text>
    <View style={styles.container}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((oct) => (
        <Pressable 
          style={{
            ...styles.octave, 
            backgroundColor: (selectedOctave === oct || ( selectedOctave === null && note?.octave === oct)) 
            ? colors.textSecondary 
            : colors.backgroundLight,
            borderWidth: selectedOctave === oct ? borderWidths.sm : borderWidths.hairline,

          }}
          key={oct} 
          onPress={() => {selectedOctave === oct ? setSelectedOctave(null) : setSelectedOctave(oct)}}>
            <Text style={{fontWeight: (selectedOctave === oct|| (selectedOctave === null && note?.octave === oct)) ? '700' : '400' ,}}>
            {oct.toString()}
            </Text>

          </Pressable>
        ))}
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 'auto'
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