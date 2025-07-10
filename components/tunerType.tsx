import { useAppSettings } from "@/lib/hooks/useAppSettings";
import { colors, spacing } from "@/lib/themes";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TunerType() {
  const { tunerType} = useAppSettings();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`${tunerType.toUpperCase()}${tunerType === "Chromatic" ? " TUNER" : ""}`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
        padding: spacing.xs
    
  },
  text: {
    color: colors.lightShade
  }
})