import { globalStyles } from '@/lib/themes';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import { Dimensions, Pressable, StyleSheet, View } from "react-native";

export default function RecordingBtn({recording, stopRecording, startRecording, clarity, tunerMode, setTunerMode}: {
  tunerMode: "Detect"|"Target"|"Drone"
  setTunerMode: (arg: "Detect"|"Target"|"Drone") => void; 
  recording: boolean;
    clarity: number|null;
stopRecording: () => void;
    startRecording: () => void;
}) {
  return (
    <View style={styles.container}>
    <Pressable
      style={styles.pressable}
                 onPress={recording ? stopRecording : startRecording}
               >
               <Fontisto name="record" size={24} color={"red"} style={{ opacity: recording ? 1 :.5, marginRight: 5}} />
               </Pressable>
               <View style={styles.iconContainer}>
      <Pressable onPress={() => setTunerMode("Detect")}>
        <FontAwesome style={{padding: 2, marginHorizontal: 4 }}  name="microphone" size={24} color={tunerMode === "Detect" ? "black" : "gray"} />
      </Pressable>
            <Pressable onPress={() => {stopRecording(); setTunerMode("Drone")}}>
      <FontAwesome style={{padding: 2, marginHorizontal: 4}} name="volume-down" size={24} color={tunerMode === "Drone" ? "black" : "gray"} />
      </Pressable>
            <Pressable onPress={() => setTunerMode("Target")}>
      <Entypo style={{padding: 2, marginHorizontal: 4 }}  name="note" size={24} color={tunerMode === "Target" ? "black" : "gray"} />
      </Pressable>
    </View>
               <View style={styles.clarity}>
               <View style={{
                flexDirection: 'row',
                alignItems: "flex-end"
               }}>
                {new Array(5).fill(null).map((_, index) => (
                  <View key={index} style={{
                    width: 8, 
                    height: 8 * index, 
                    margin: 2, 
                    backgroundColor: clarity! > (index * 0.01 + .94) ? 'black': 'gray',

                  }}/>
                ))}
               </View>
               </View>
               </View>
  )
}

const styles = StyleSheet.create({
   iconContainer: {
    alignItems: "baseline",
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clarity: {},
  container: {
    ...globalStyles.globalCard,
    width: Dimensions.get('screen').width * .95,
    height: 72,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 4
  }
})