import { noteNames } from "@/lib/functions";
import { colors } from "@/lib/themes";
import React, { useEffect, useRef } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";



const ITEM_WIDTH = 60; 
const COMPONENT_WIDTH = ITEM_WIDTH * 3; // Enough to clearly center one item
const CENTER_OFFSET = (COMPONENT_WIDTH - ITEM_WIDTH) / 2;


export default function Pitch({ note, selectedPitch, setSelectedPitch }: {
    selectedPitch: string|null
    setSelectedPitch: (arg: string) => void
    note: {
    note: string;
    octave: number;
  } | null
}) {
  const flatListRef = useRef<FlatList>(null);

useEffect(() => {
  const index = noteNames.indexOf(selectedPitch!) || Math.floor(noteNames.length / 2);
  if (index !== -1 && flatListRef.current) {
    flatListRef.current.scrollToIndex({
      index,
      animated: false,
      viewPosition: 0.5,
    });
  }
}, []);

const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
  const offsetX = e.nativeEvent.contentOffset.x;
  let index = Math.round(offsetX / ITEM_WIDTH);

  index = Math.max(0, Math.min(noteNames.length - 1, index));

  const note = noteNames[index];
  if (note && note !== selectedPitch) {
    setSelectedPitch(note);
  }
};

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: CENTER_OFFSET }}
        data={noteNames}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Pressable
  onPress={() => {
  const index = noteNames.indexOf(item);
  setSelectedPitch(item);
  if (flatListRef.current) {
    flatListRef.current.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    });
  }
}}
  style={[styles.itemContainer, selectedPitch === item && styles.selected]}
>
  <Text style={styles.itemText}>{item}</Text>
</Pressable>
        )}
        onMomentumScrollEnd={handleScrollEnd}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    justifyContent: "center",
    backgroundColor: colors.backgroundLight,
    width: COMPONENT_WIDTH,
    marginBottom: -24
  },
  itemContainer: {
    width: ITEM_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
  selected: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary || "blue",
  },
  itemText: {
    fontSize: 24,
    color: "black",
  },
});