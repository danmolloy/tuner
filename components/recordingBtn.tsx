import { useAppSettings } from '@/lib/hooks/useAppSettings';
import { usePurchase } from '@/lib/purchaseProvider';
import { colors, radii, spacing } from '@/lib/themes';
import Entypo from '@expo/vector-icons/Entypo';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import React from 'react';
import { Alert, Dimensions, Pressable, StyleSheet, View } from "react-native";

export default function RecordingBtn({recording, stopRecording, startRecording, playDrone, setPlayDrone}: {
  playDrone: boolean;
  setPlayDrone: (arg: boolean) => void;
   recording: boolean;
stopRecording: () => void;
    startRecording: () => void;
}) {
  const isProUser = usePurchase();
  const { tunerMode, tunerType, setTunerMode } = useAppSettings();

  return (
    <View style={styles.container}>
      {tunerType === "Chromatic" && <Pressable onPress={() => {setTunerMode("Detect"); setPlayDrone(false);}}>
                  {tunerMode == "Detect" 
                  ? <MaterialCommunityIcons name="microphone" size={32} color={colors.backgroundPanel} />
                  : <MaterialCommunityIcons name="microphone-outline" size={32} color={colors.backgroundPanel} />
                  }
      </Pressable>}
    {tunerMode === "Drone" 
    ? <Pressable
      style={styles.pressable}
                 onPress={() => {
                  !isProUser 
                  ? Alert.alert("Drone mode is available for premium users only. To make a purchase or restore purchase, navigate to the Premium tab on the bottom of your screen.")
                  : setPlayDrone(playDrone === true ? false : true);
                }}
               >
                              <Fontisto name="power" size={24} color={"red"} style={{ opacity: playDrone ? 1 :.6, marginRight: 5, padding: 1}} />

               </Pressable>
    :<Pressable
      style={styles.pressable}
                 onPress={recording ? stopRecording : startRecording}
               >
               <Fontisto name="power" size={24} color={"red"} style={{ opacity: recording ? 1 :.6, marginRight: 5, padding: 1}} />
               </Pressable>}
                
            <Pressable onPress={() => {stopRecording(); setTunerMode("Drone")}}>
              {tunerMode === "Drone" 
              ? <Ionicons name="volume-low" size={32} color={colors.backgroundPanel} />
              :<Ionicons name="volume-low-outline" size={32} color={colors.backgroundPanel} />}
      </Pressable>
            {tunerType !== "Chromatic" && <Pressable onPress={() => setTunerMode("Target")}>
      <Entypo style={{padding: 2 }}  name="note" size={26} color={tunerMode === "Target" ? "black" : "gray"} />
      </Pressable>}
               
              
              </View>
  )
}

const styles = StyleSheet.create({
   iconContainer: {
    alignItems: "baseline",
    flexDirection: 'row',
    justifyContent: "space-between",

  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  container: {
    backgroundColor: colors.backgroundPrimary,    
    borderColor: colors.backgroundPanel,
    borderWidth: 2,
    width: Dimensions.get('screen').width * .95,
    height: 72,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 4,
    alignItems: 'center',
borderRadius: radii.sm,
          paddingVertical: spacing.sm,
          
  }
})