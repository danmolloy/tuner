import { useAppSettings } from "@/lib/hooks/useAppSettings";
import { colors, spacing } from "@/lib/themes";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Calibration() {
  const { calibration } = useAppSettings();
  
  return (
    <View style={styles.temperamentContainer}>
      <Text style={styles.tempText}>{calibration}</Text>
    </View>
  )
}

const styles = StyleSheet.create({

  temperamentContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: spacing.sm
  },
  tempText: {
          color: colors.backgroundPanel,

    textAlign: 'center'
  }
})