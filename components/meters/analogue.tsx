import { centsFromNote } from "@/lib/functions";
import { useAppSettings } from "@/lib/hooks/useAppSettings";
import { colors, globalStyles, radii, spacing } from "@/lib/themes";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import InputSignal from "../inputSignal";
import Octave from "../octave";


export default function AnalogueMeter({ setSelectedOctave, selectedOctave, note, clarity }: { 
  clarity: number|null;
  note: {
    note: string;
    octave: number;
    detectedFrequency: number
    targetFrequency: number
  } | null
  selectedPitch: string|null
  setSelectedPitch: (arg: string) => void
  setSelectedOctave: (arg: number| null) => void
  selectedOctave: number|null }) {

        const { tunerType, calibration } = useAppSettings();
    

  const TICK_COUNT = 51;
  const meterWidth = Dimensions.get("window").width * 0.85;
  const SIDE_PADDING = 10;
  const drawingWidth = meterWidth - SIDE_PADDING * 2;
  const spacing = drawingWidth / (TICK_COUNT - 1);

  // Initialize needle at center position (index 25)
  const needleX = useRef(new Animated.Value(SIDE_PADDING + 25 * spacing)).current;

  useEffect(() => {
  if (!note || !note.detectedFrequency || clarity == null || clarity < 0.9) return;

  const cents = centsFromNote(note.detectedFrequency, note.targetFrequency);
 const clamped = Math.max(-25, Math.min(25, cents));
  const needleIndex = clamped + 25; // shift to [0, 50]
  const left = SIDE_PADDING + needleIndex * spacing;

  /* Animated.timing(needleX, {
    toValue: left,
    duration: 100,
    useNativeDriver: false,
  }).start(); */
   Animated.spring(needleX, {
      toValue: left,
  stiffness: 150,
  damping: 20,
  mass: 1,
  useNativeDriver: false,
    }).start();

}, [note, clarity, calibration]);





  return (
    <View style={styles.panelContainer}>
      <View style={{alignSelf: 'flex-end', marginBottom: -12, marginRight: 5}}>
                <InputSignal clarity={clarity} />
</View>
            <Text style={{color: 'gray', }}>{tunerType === "Chromatic" && tunerType.toUpperCase()}</Text>
      
  <View style={[styles.container, { width: meterWidth }]}>
  {/* Tick marks + labels */}
  {Array.from({ length: TICK_COUNT }).map((_, i) => {
    const isMajor = (i + 5) % 10 === 0;
    const isCenter = i === 25;
    const leftPos = SIDE_PADDING + i * spacing;
    const label = -25 + i;

    return (
      <React.Fragment key={i}>
        {/* Tick */}
        <View
          style={[
            styles.tick,
            {
              left: leftPos,
              height: isCenter ? 75 : isMajor ? 50 : 30,
            },
          ]}
        />

        {/* Label */}
        {isMajor && (
          <Text
            style={{
              position: 'absolute',
              left: leftPos - 10,
              top: 0,
              fontSize: 10,
              width: 20,
              textAlign: 'center',
              color: 'black',
            }}
          >
            {label}
          </Text>
        )}
      </React.Fragment>
    );
  })}

  {/* Needle */}
  <Animated.View
    style={[
      styles.needle,
      {
        left: 0,
        transform: [{ translateX: needleX }],
      },
    ]}
  />
</View>
      <Octave note={note} setSelectedOctave={(arg) => setSelectedOctave(arg)}  selectedOctave={selectedOctave}/>

    </View>
  );
}

const styles = StyleSheet.create({
  panelContainer: {
        ...globalStyles.globalCard,
        flexDirection: "column",
        justifyContent: 'center',
        width: Dimensions.get("screen").width * 0.9,
        height: Dimensions.get("screen").width * 0.75,
        position: "relative",
        padding: spacing.xs,
        marginTop: 24,

  },
  container: {
    borderWidth:1,
    borderColor: "black",
    height: 120,
    justifyContent: "center",
    alignItems: "flex-end",
    position: "relative",
    paddingHorizontal: 1,
    backgroundColor: colors.backgroundLight,
    borderRadius: radii.md
  },
  tick: {
    width: 2,
    position: "absolute",
    bottom: 0,
    backgroundColor: "black",
  },
  needle: {
    position: "absolute",
    width: 2,
    height: 90,
    backgroundColor: "red",
    bottom: 0,
  },
});