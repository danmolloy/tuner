import { noteNames } from "@/lib/functions";
import { useAppSettings } from "@/lib/hooks/useAppSettings";
import { borderWidths, colors, radii } from "@/lib/themes";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import StringSelect from "./stringSelect";

const ITEM_WIDTH = 60; 
const COMPONENT_WIDTH = ITEM_WIDTH * 3;
const CENTER_OFFSET = (COMPONENT_WIDTH - ITEM_WIDTH) / 2;
const BUFFER_MULTIPLIER = 20; // Number of repetitions for infinite effect
const NOTE_COUNT = noteNames.length;

export default function Pitch({ 
  note,
  setSelectedPitch,
  selectedString,
  setSelectedString,
  tunerMode,
  setSelectedOctave,
  selectedOctave,
  selectedPitch
}: {
  selectedOctave: number|null;
  selectedPitch: string;
  selectedString: number;
  setSelectedString: (arg: number) => void;
  setSelectedOctave: (arg: number) => void;
  tunerMode: "Detect"|"Drone"|"Target";
  setSelectedPitch: (arg: string) => void;
  note: {
    note: string;
    octave: number;
  } | null;
}) {
  const flatListRef = useRef<FlatList>(null);
  const didInitialScroll = useRef(false);
  const [data] = useState(() => Array(BUFFER_MULTIPLIER).fill(noteNames).flat());
  const currentIndex = useRef(0);

  const { tunerType } = useAppSettings();
  
  const displayedPitch = tunerMode === "Detect" && note?.note ? note.note : selectedPitch;

  // Calculate initial position in the middle of the buffered data
  const middleIndex = Math.floor(data.length / 2);
  const initialIndex = middleIndex + noteNames.indexOf(selectedPitch);

const scrollToClosestNote = (targetNote: string, animated = true) => {
  const targetBaseIndex = noteNames.indexOf(targetNote);
  
  // Validate the note exists
  if (targetBaseIndex === -1) {
    console.warn(`Invalid note "${targetNote}" - defaulting to "A"`);
    return scrollToClosestNote("A", animated); // Fallback to a safe note
  }

  const currentBaseIndex = currentIndex.current % NOTE_COUNT;
  let delta = targetBaseIndex - currentBaseIndex;

  // Find the shortest path (forward or backward)
  if (Math.abs(delta) > NOTE_COUNT / 2) {
    delta = delta > 0 ? delta - NOTE_COUNT : delta + NOTE_COUNT;
  }

  const targetIndex = Math.max(0, Math.min(data.length - 1, currentIndex.current + delta));

  if (flatListRef.current) {
    flatListRef.current.scrollToIndex({
      index: targetIndex,
      animated,
    });
    currentIndex.current = targetIndex;
  }

  if (targetNote !== selectedPitch) {
    setSelectedPitch(targetNote);
  }
};


  // Handle automatic scrolling in Detect mode
  useEffect(() => {
    if (tunerMode === "Detect" && note?.note) {
      scrollToClosestNote(note.note, true);
    }
  }, [note?.note, tunerMode]);

  // Initial setup
useEffect(() => {
   if (!didInitialScroll.current && flatListRef.current) {
    const baseIndex = noteNames.indexOf(selectedPitch);
    const middleOffset = Math.floor((data.length / 2) / NOTE_COUNT) * NOTE_COUNT;
    const initialScrollIndex = middleOffset + baseIndex;

    flatListRef.current.scrollToIndex({
      index: initialScrollIndex,
      animated: false,
    });

    currentIndex.current = initialScrollIndex;
    didInitialScroll.current = true;
  }
}, []);

  // Handle manual scrolling
  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (tunerMode === "Detect") return;

    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / ITEM_WIDTH);
    currentIndex.current = index;

    const dataIndex = ((index % NOTE_COUNT) + NOTE_COUNT) % NOTE_COUNT; // Ensure positive modulo
    const note = noteNames[dataIndex];
    if (note && note !== selectedPitch) {
      setSelectedPitch(note);
    }
  };

  const getItemLayout = (data: any, index: number) => ({
    length: ITEM_WIDTH,
    offset: ITEM_WIDTH * index,
    index,
  });

  return (
    <View style={styles.panel}>
      <StringSelect 
        selectedString={selectedString} 
        setSelectedString={setSelectedString} 
        note={note} 
        tunerType={tunerType} 
        tunerMode={tunerMode} 
        setSelectedPitch={setSelectedPitch} 
        setSelectedOctave={setSelectedOctave} 
        selectedPitch={selectedPitch} 
        selectedOctave={selectedOctave}
      />

      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          getItemLayout={getItemLayout}
          horizontal
          initialScrollIndex={initialIndex}
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_WIDTH}
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: CENTER_OFFSET }}
          data={data}
          keyExtractor={(item, index) => `${item}-${index}`}
          onMomentumScrollEnd={handleScrollEnd}
          renderItem={({ item }) => (
            <Pressable
              disabled={tunerMode === "Detect"}
              onPress={() => scrollToClosestNote(item)}
              style={[
                styles.itemContainer,
                displayedPitch === item && styles.selected
              ]}
            >
              <Text style={{
                ...styles.itemText,
                fontWeight: displayedPitch === item ? "700" : "300",
              }}>
                {item[0]}
              </Text>
              {
  item.includes('#') ? (
    <MaterialCommunityIcons name="music-accidental-sharp" size={24} style={{marginLeft: -6, marginTop: -8, marginRight: -6, fontWeight: displayedPitch === item ? "700" : "300"}} color="black" />
  ) : item.includes('b') ? (
    <MaterialCommunityIcons name="music-accidental-flat" size={24} style={{marginLeft: -6, marginTop: -8, marginRight: -6, fontWeight: displayedPitch === item ? "700" : "300"}} color="black" />
  ) : (
    <MaterialCommunityIcons name="music-accidental-natural" size={24} style={{marginLeft: -6, marginTop: -8, marginRight: -6, fontWeight: displayedPitch === item ? "700" : "300"}} color="black" />
  
)}   
            </Pressable>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
        backgroundColor: colors.backgroundLight,
    width: Dimensions.get("screen").width * .90,
    borderRadius: radii.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    marginBottom: -24,
    
  },
  container: {
    height: 80,
    justifyContent: "center",
    backgroundColor: colors.backgroundLight,
    width: COMPONENT_WIDTH,
    borderRadius: radii.lg,
    borderColor: colors.primary,
    borderWidth: borderWidths.md,
    marginHorizontal: 4,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row'
  },
  selected: {
    
  },
  itemText: {
    fontSize: 24,
    color: colors.primary
  },
});