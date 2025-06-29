import { centsFromNote, noteNames, noteToFreq, Temperament } from "@/lib/functions";
import { colors, globalStyles, radii } from "@/lib/themes";
import FontAwesome from '@expo/vector-icons/FontAwesome';
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


const ITEM_WIDTH = 60; 
const COMPONENT_WIDTH = ITEM_WIDTH * 3;
const CENTER_OFFSET = (COMPONENT_WIDTH - ITEM_WIDTH) / 2 -2.5; // -2 for border offset!
const BUFFER_MULTIPLIER = 20; // Number of repetitions for infinite effect
const NOTE_COUNT = noteNames.length;

export default function PitchScroller({ 
  note,
  setSelectedPitch,
  temperament,
  tunerMode,
  calibration,
  selectedPitch,
  temperamentRoot
}: {
  calibration: number;
  temperamentRoot: string;
  temperament: Temperament;
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
    detectedFrequency: number
  } | null;
}) {
  
  const flatListRef = useRef<FlatList>(null);
  const didInitialScroll = useRef(false);
  const [data] = useState(() => Array(BUFFER_MULTIPLIER).fill(noteNames).flat());
  const currentIndex = useRef(0);

  
  const displayedPitch = tunerMode === "Detect" && note?.note ? note.note : selectedPitch;

  // Calculate initial position in the middle of the buffered data
  const middleIndex = Math.floor(data.length / 2);
  const initialIndex = middleIndex + noteNames.indexOf(selectedPitch);

const scrollToClosestNote = (
  targetNote: string,
  animated = true,
  centOffset = 0 // cents: -50 (flat) to +50 (sharp)
) => {
  const targetBaseIndex = noteNames.indexOf(targetNote);
  if (targetBaseIndex === -1) {
    console.warn(`Invalid note "${targetNote}" - defaulting to "A"`);
    return scrollToClosestNote("A", animated, centOffset);
  }

  const currentBaseIndex = currentIndex.current % NOTE_COUNT;
  let delta = targetBaseIndex - currentBaseIndex;

  // Minimize movement
  if (Math.abs(delta) > NOTE_COUNT / 2) {
    delta = delta > 0 ? delta - NOTE_COUNT : delta + NOTE_COUNT;
  }

  const targetIndex = currentIndex.current + delta;

  // Cents offset in fractional item widths
  const fractionalOffset = centOffset / 100; // 50 cents => 0.5
  const scrollOffset = (targetIndex + fractionalOffset) * ITEM_WIDTH;

  if (flatListRef.current) {
    flatListRef.current.scrollToOffset({
      offset: scrollOffset,
      animated,
    });
    currentIndex.current = targetIndex; // Keep integer index to snap to on user scroll
  }

  if (targetNote !== selectedPitch) {
    setSelectedPitch(targetNote);
  }
};

useEffect(() => {
  if (tunerMode === "Drone") {
    scrollToClosestNote(selectedPitch)
  }
}, [tunerMode])


  // Handle automatic scrolling in Detect mode
  useEffect(() => {
  if (tunerMode === "Detect" && note?.note && note.detectedFrequency != null) {
    const centOffset = (() => {
      try {
        const targetFreq = noteToFreq({
          note: note.note,
          octave: note.octave,
          calibration,
          temperament,
          temperamentRoot: temperament !== "Equal" ? temperamentRoot ?? "C" : "C",
        });
        return centsFromNote(note.detectedFrequency, targetFreq);
      } catch (e) {
        console.warn("Error calculating cents:", e);
        return 0;
      }
    })();

    scrollToClosestNote(note.note, true, centOffset);
  }
}, [note?.note, note?.detectedFrequency, tunerMode]);


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

  useEffect(() => {
    scrollToClosestNote(selectedPitch);

  }, [selectedPitch])

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
      

      <View style={{...globalStyles.panelOuter, ...styles.container}}>
        <View style={{...globalStyles.panelInner, height: 90}}>
        <FlatList
          ref={flatListRef}
          getItemLayout={getItemLayout}
          horizontal
          initialScrollIndex={initialIndex}
          showsHorizontalScrollIndicator={false}
snapToInterval={tunerMode !== "Detect" ? ITEM_WIDTH : undefined}
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
  <View style={{ alignItems: "center", }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
    <Text
      style={{
        ...styles.itemText,
        fontWeight: displayedPitch === item ? "700" : "300",
      }}
    >
      {item[0]}
    </Text>
    {
      item.includes("#") ? (
        <MaterialCommunityIcons
          name="music-accidental-sharp"
          size={24}
          style={styles.accidental}
          color="black"
        />
      ) : item.includes("b") ? (
        <MaterialCommunityIcons
          name="music-accidental-flat"
          size={24}
          style={styles.accidental}
          color="black"
        />
      ) : null/* (
        <MaterialCommunityIcons
          name="music-accidental-natural"
          size={24}
          style={styles.accidental}
          color="black"
        />
      ) */
    }
    </View>
    <View style={styles.tickMark} />
  </View>
</Pressable>
          )}
        />
          <FontAwesome style={{alignSelf: 'center'}} name="caret-up" size={24} color={colors.accent} />
      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    width: Dimensions.get("screen").width * .90,
    borderRadius: radii.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    
  },
  tickMark: {
  width: 2,
  height: 24,
  backgroundColor: 'black',
  marginBottom: -24,
  zIndex: 24,
  overflowY: 'visible'

},
accidental: {
  marginLeft: -6,
  marginTop: -8,
  marginRight: -6,
},
  container: {
    justifyContent: "center",
    backgroundColor: colors.white,
    width: COMPONENT_WIDTH,
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
    color: 'black'
  },
});