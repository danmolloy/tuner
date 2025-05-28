import { globalStyles } from '@/lib/themes';
import Fontisto from '@expo/vector-icons/Fontisto';
import { Dimensions, Pressable, StyleSheet, View } from "react-native";

export default function RecordingBtn({recording, stopRecording, startRecording, tunerMode, playDrone, setPlayDrone}: {
  tunerMode: "Detect" | "Target" | "Drone"
  playDrone: boolean;
  setPlayDrone: () => void;
   recording: boolean;
stopRecording: () => void;
    startRecording: () => void;
}) {
  return (
    <View style={styles.container}>
    {tunerMode === "Drone" 
    ? <Pressable
      style={styles.pressable}
                 onPress={() => setPlayDrone()}
               >
               {playDrone === true 
               ? <Fontisto name="pause" size={24} color={"black"} style={{ marginRight: 5}} />
               : <Fontisto name="play" size={24} color={"black"} style={{ marginRight: 5}} />}
               </Pressable>
    :<Pressable
      style={styles.pressable}
                 onPress={recording ? stopRecording : startRecording}
               >
               <Fontisto name="record" size={24} color={"red"} style={{ opacity: recording ? 1 :.5, marginRight: 5}} />
               </Pressable>}
               
              
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
  container: {
    ...globalStyles.globalCard,
    width: Dimensions.get('screen').width * .92,
    height: 72,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 4,
    
  }
})