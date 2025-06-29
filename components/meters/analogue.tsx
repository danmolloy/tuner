import { centsFromNote, noteToFreq } from "@/lib/functions";
import { useAppSettings } from "@/lib/hooks/useAppSettings";
import { colors, globalStyles, radii, spacing } from "@/lib/themes";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";


export default function AnalogueMeter({ selectedPitch, setSelectedOctave, selectedOctave, note, clarity }: { 
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
        const { tunerType, calibration, temperament, temperamentRoot } = useAppSettings();

  const TICK_COUNT = 51;
  const meterWidth = Dimensions.get("window").width * 0.90;
  const SIDE_PADDING = 10;
  const drawingWidth = meterWidth - SIDE_PADDING * 2;
  const spacing = drawingWidth / (TICK_COUNT - 1);

  // Initialize needle at center position (index 25)
  const needleX = useRef(new Animated.Value(SIDE_PADDING + 25 * spacing)).current;

  useEffect(() => {
  if (!note || !note.detectedFrequency || clarity == null || clarity < 0.9) return;

    const targetFreq = !note || note.detectedFrequency == null ? 0 : noteToFreq({
        note: selectedPitch? selectedPitch :note.note,
        octave: selectedOctave ? selectedOctave : note.octave,
        calibration,
        temperament,
        temperamentRoot: temperament !== "Equal" ? temperamentRoot ?? "C" : "C",
      });

  const cents = centsFromNote(note.detectedFrequency, targetFreq);

  if (Math.abs(cents) > 100 && tunerType === "Chromatic") return;

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
  stiffness: 15,
  damping: 100,
  mass: 1,
  overshootClamping: true,
  useNativeDriver: false,
    }).start();

}, [note, clarity, calibration]);





  return (
  <View style={styles.panelContainer}>
   
    {/* Meter with recessed effect */}
    <View style={{...globalStyles.panelOuter, ...styles.container, width: meterWidth }}>
      {/* Meter surface */}
      <View style={{...globalStyles.panelInner, ...styles.meterSurface}} />
      
      {/* Tick marks + labels */}
      {Array.from({ length: TICK_COUNT }).map((_, i) => {
        const isMajor = (i + 5) % 10 === 0;
        const isCenter = i === 25;
        const leftPos = SIDE_PADDING + i * spacing;
        const label = -25 + i;

        return (
          <React.Fragment key={i}>
            <View
              style={[
                styles.tick,
                {
                  left: leftPos,
                  height: isCenter ? 75 : isMajor ? 50 : 30,
                },
              ]}
            />
            {isMajor && (
              <Text
                style={{
                  position: 'absolute',
                  left: leftPos - 10,
                  top: 2,
                  fontSize: 12,
                  width: 25,
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
    
  </View>
);
}

const styles = StyleSheet.create({
 panelContainer: {
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: "center",
    padding: spacing.sm,
    width: Dimensions.get("screen").width * 0.95,
    position: "relative",
  },
  container: {
    width: '100%',
    height: 150,
    justifyContent: "center",
    alignItems: "flex-end",
    position: "relative",
    paddingHorizontal: 1,
    borderRadius: radii.sm
  },
  meterSurface: {
    position: 'absolute',
    top: 2,
    left: 2,
    right: 2,
    bottom: 2,
    backgroundColor: colors.white,
    borderRadius: radii.sm ,
    // Inner highlight

  },
  tick: {
    width: 1,
    position: "absolute",
    bottom: 3,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  needle: {
    position: "absolute",
    width: 2,
    height: 90,
    backgroundColor: colors.accent,
    bottom: 3,
    zIndex: 10,
  },
  
  frequencyDisplay: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    width: 150,
    padding: 2,
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
});