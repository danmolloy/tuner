import { useAppSettings } from "@/lib/hooks/useAppSettings";
import { colors, spacing, typography } from "@/lib/themes";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Temperament() {
  const { temperament, temperamentRoot } = useAppSettings();

  return (
    <View style={styles.temperamentContainer}>
      <Text style={styles.tempText}>{temperament.toUpperCase()}{temperamentRoot && temperament !== "Equal" && ` (${temperamentRoot})`} TEMPERAMENT</Text>
    </View>
  )
}


const styles = StyleSheet.create({

  temperamentContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: spacing.xs
  },
  tempText: {

          color: colors.black,
fontSize: typography.fontSize.lg,
    fontFamily: typography.fontBold,    textAlign: 'center'
  }
})