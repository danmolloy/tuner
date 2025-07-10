import { usePurchase } from '@/lib/purchaseProvider';
import { borderWidths, colors, radii, spacing } from '@/lib/themes';
import Fontisto from '@expo/vector-icons/Fontisto';

import React from 'react';
import { Alert, Dimensions, Pressable, StyleSheet, View } from "react-native";
import ModeSwitch from './modeSwitch';

export default function RecordingBtn({setTunerMode, tunerMode, tunerType, recording, stopRecording, startRecording, playDrone, setPlayDrone}: {
  playDrone: boolean;
  tunerType: string;
  tunerMode: "Detect"|"Target"|"Drone";
  setTunerMode: (mode: "Detect" | "Target" | "Drone") => void;
  setPlayDrone: (arg: boolean) => void;
   recording: boolean;
stopRecording: () => void;
    startRecording: () => void;
}) {
  const isProUser = usePurchase();

  return (
    <View style={styles.container}>
    {tunerMode === "Drone" 
    ? <Pressable
      style={styles.pressable}
                 onPress={() => {
                  !isProUser 
                  ? Alert.alert("Drone mode is available for premium users only. To make a purchase or restore purchase, navigate to the Premium tab on the bottom of your screen.")
                  : setPlayDrone(playDrone === true ? false : true);
                }}
               >
                              <Fontisto name="power" size={24} color={playDrone ? colors.accent : colors.lightShade} style={{ marginRight: 5, padding: 1}} />

               </Pressable>
    :<Pressable
      style={styles.pressable}
                 onPress={recording ? stopRecording : startRecording}
               >
               <Fontisto name="power" size={24} color={recording ? colors.buttonRed : colors.backgroundCream} style={{ marginRight: 5, padding: 1}} />
               </Pressable>}
               <ModeSwitch setTunerMode={(arg) => setTunerMode(arg)} stopRecording={() => stopRecording()} tunerMode={tunerMode} tunerType={tunerType} setPlayDrone={(arg) => setPlayDrone(arg)}/>
      {/* {tunerType === "Chromatic" && <Pressable onPress={() => {setTunerMode("Detect"); setPlayDrone(false);}}>
                  {tunerMode == "Detect" 
                  ? <MaterialCommunityIcons name="microphone" size={32} color={colors.white} />
                  : <MaterialCommunityIcons name="microphone-outline" size={32} color={colors.lightShade} />
                  }
      </Pressable>}
                
            <Pressable onPress={() => {stopRecording(); setTunerMode("Drone")}}>
              {tunerMode === "Drone" 
              ? <Ionicons name="volume-low" size={32} color={colors.white} />
              :<Ionicons name="volume-low-outline" size={32} color={colors.lightShade} />}
      </Pressable>
            {tunerType !== "Chromatic" && <Pressable onPress={() => setTunerMode("Target")}>
      <Entypo style={{padding: 2 }}  name="note" size={26} color={tunerMode === "Target" ? "black" : "gray"} />
      </Pressable>} */}
               
              
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
    backgroundColor: colors.buttonPanelTeal,    
    //borderColor: colors.backgroundPanel,
    //borderWidth: 2,
    width: Dimensions.get('window').width * .95,
    height: 72,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 4,
    alignItems: 'center',
borderRadius: radii.sm,
          paddingVertical: spacing.sm,
                    borderColor: colors.black,
                    borderWidth: borderWidths.lg,
  }
})