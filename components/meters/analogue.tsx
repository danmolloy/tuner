import { colors, radii } from "@/lib/themes";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

export default function AnalogueMeter({ cents }: { cents: number }) {
  const TICK_COUNT = 51;
  const meterWidth = Dimensions.get("window").width * 0.95;
  const SIDE_PADDING = 10;
  const drawingWidth = meterWidth - SIDE_PADDING * 2;
  const spacing = drawingWidth / (TICK_COUNT - 1);

  // Initialize needle at center position (index 25)
  const needleX = useRef(new Animated.Value(SIDE_PADDING + 25 * spacing)).current;

  useEffect(() => {
    const clamped = Math.max(-25, Math.min(25, cents));
    const needleIndex = clamped + 25;
    const left = SIDE_PADDING + needleIndex * spacing;

    Animated.timing(needleX, {
      toValue: left,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [cents]);
  return (
    <View style={[styles.container, { width: meterWidth }]}>
      {/* Tick marks */}
      {Array.from({ length: TICK_COUNT }).map((_, i) => {
        const isMajor = i % 5 === 0;
        return (
          <View
            key={i}
            style={[
              styles.tick,
              {
                left: SIDE_PADDING + i * spacing,
                height: i === 25 ? 75 : isMajor ? 50 : 30,
              },
            ]}
          />
        );
      })}

     <Animated.View
        style={[
          styles.needle,
          {
            left: 0, // Start from left edge
            transform: [{ translateX: needleX }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderColor: "black",
    height: 120,
    justifyContent: "center",
    alignItems: "flex-end",
    position: "relative",
    paddingHorizontal: 1,
    marginTop: 48,
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