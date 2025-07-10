import { colors } from "@/lib/themes";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

export default function FrequencyDisplay({note}: {
  note: {
    note: string;
    octave: number;
    detectedFrequency: number
    targetFrequency: number
  } | null
}) {

  return (
    <View style={styles.frequencyDisplay}>
<Text style={{...styles.frequencyText, marginLeft: 28}}>
      TARGET: {note?.targetFrequency.toFixed(3)}
    </Text>
    <Text style={styles.frequencyText}>
      DETECTED: {note?.detectedFrequency.toFixed(3)}
    </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  frequencyDisplay: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    width: Dimensions.get("window").width *.40,
    padding: 2,
    backgroundColor: colors.backgroundLight
  },
  frequencyDisplayInner: {
    width: '100%',
    // Inner highlight
    borderWidth: 1,
    borderTopColor: '#f0f0f0',
    borderLeftColor: '#f0f0f0',
    borderRightColor: '#c0c0c0',
    borderBottomColor: '#c0c0c0',
  },
  frequencyText: {
    color: '#333', // Darker text for better contrast
    fontSize: 12,
    marginLeft: 12,
  },
})