import { colors } from "@/lib/themes";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";

const BUTTON_WIDTH = 60;

export default function ModeSwitch({ 
  setTunerMode,
  setPlayDrone,
  tunerType,
  tunerMode,
  stopRecording,
}: {
  tunerType: string;
  tunerMode: "Detect" | "Target" | "Drone";
  setTunerMode: (mode: "Detect" | "Target" | "Drone") => void;
  setPlayDrone: (arg: boolean) => void;
  stopRecording: () => void;
}) {
  const translateX = useRef(new Animated.Value(0)).current;

  // Map mode to position index
  const getIndex = () => {
    if (tunerMode === "Drone") return 1;
    return 0
  };

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: getIndex() * BUTTON_WIDTH,
      useNativeDriver: true,
      stiffness: 180,
      damping: 20,
    }).start();
  }, [tunerMode, tunerType]);

  return (
    <View style={styles.container}>
      {/* Sliding background indicator */}
      <Animated.View
        style={[
          styles.slider,
          {
            transform: [{ translateX }],
          },
        ]}
      />

      {/* Buttons */}
      {tunerType === "Chromatic" ? (
        <Pressable
          onPress={() => {
            setTunerMode("Detect");
            setPlayDrone(false);
          }}
          style={styles.button}
        >
          <MaterialCommunityIcons
            name="microphone"
            size={24}
            color={tunerMode === "Detect" ? 'red' : colors.white}
          />
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            setTunerMode("Target");
            setPlayDrone(false);
          }}
          style={styles.button}
        >
          <Entypo
            name="note"
            size={24}
            color={tunerMode === "Target" ? 'red' : colors.white}
          />
        </Pressable>
      )}

      <Pressable
        onPress={() => {
          stopRecording();
          setTunerMode("Drone");
        }}
        style={styles.button}
      >
        <Ionicons
          name="volume-low"
          size={24}
          color={tunerMode === "Drone" ? 'red' : colors.white}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.backgroundPrimary,
    borderRadius: 20,
    padding: 2,
    width: BUTTON_WIDTH * 2,
    height: 50,
    position: "relative",
    overflow: "hidden",
  },
  slider: {
    position: "absolute",
    top: 2,
    left: 2,
    width: BUTTON_WIDTH - 4,
    height: 46,
    backgroundColor: colors.lightShade,
    borderRadius: 16,
    zIndex: 0,
  },
  button: {
    width: BUTTON_WIDTH,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
});