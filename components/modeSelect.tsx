import { globalStyles } from "@/lib/themes";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";

export default function ModeSelect({ 
  tunerType,
  stopRecording,  
  tunerMode, 
  setTunerMode}: {
    tunerType: string|null
    tunerMode: "Detect"|"Target"|"Drone";
    setTunerMode: (arg: "Detect"|"Target"|"Drone") => void; 
    stopRecording: () => void;
}) {
  return (
    <View style={styles.iconContainer}>
      <Pressable onPress={() => setTunerMode("Detect")}>
        <FontAwesome style={{padding: 2 }}  name="microphone" size={24} color={tunerMode === "Detect" ? "black" : "gray"} />
      </Pressable>
            <Pressable onPress={() => {stopRecording(); setTunerMode("Drone")}}>
      <FontAwesome style={{padding: 2}} name="volume-down" size={24} color={tunerMode === "Drone" ? "black" : "gray"} />
      </Pressable>
            {tunerType !== "Chromatic" && <Pressable onPress={() => setTunerMode("Target")}>
      <Entypo style={{padding: 2 }}  name="note" size={24} color={tunerMode === "Target" ? "black" : "gray"} />
      </Pressable>}
    </View>
  )
}

const styles = StyleSheet.create({
   iconContainer: {
        ...globalStyles.globalCard,
    alignItems: "center",
    flexDirection: 'row',
    justifyContent: "space-evenly",
            width: Dimensions.get("window").width * 0.45,
        height: 60

  },
})