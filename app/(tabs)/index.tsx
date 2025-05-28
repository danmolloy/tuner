import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import { Dimensions, StyleSheet, View } from 'react-native';

import { useCallback, useEffect, useMemo, useState } from 'react';

import DroneSynth from '@/components/drone';
import Meter from '@/components/meter';
import ModeSelect from '@/components/modeSelect';
import Pitch from '@/components/pitch';
import RecordingBtn from '@/components/recordingBtn';
import { CALIBRATION_KEY } from '@/components/settings/calibration';
import { TEMPERAMENT_KEY, TEMPERAMENT_ROOT } from '@/components/settings/temperament';
import { TUNER_TYPE_KEY } from '@/components/settings/tunerSelect';
import StringSelect from '@/components/stringSelect';
import TemperamentCalibration from '@/components/temperament';
import { centsFromNote, freqToNote, noteToFreq } from '@/lib/functions';
import { bassTunings, guitarTunings, StringNumber } from '@/lib/gtrTunings';
import { usePurchase } from '@/lib/purchaseProvider';
import { colors, spacing, typography } from '@/lib/themes';
import { Buffer } from 'buffer';
import { useFocusEffect } from 'expo-router';
import { PitchDetector } from 'pitchy';
import AudioRecord from 'react-native-audio-record';

const detector = PitchDetector.forFloat32Array(1024);
export const globalBorderWidth = 2;

export default function HomeScreen() {
  const [recording, setRecording] = useState(false);
  const [frequency, setFrequency] = useState<any>(null)
  const [clarity, setClarity] = useState<number|null>(null)
  const [sampleBuffer, setSampleBuffer] = useState<Float32Array>(new Float32Array(0));
  const [smoothedCents, setSmoothedCents] = useState<number | null>(null);
  const [calibration, setCalibration] = useState<number>(440)
  const [temperament, setTemperament] = useState<"Equal" | "Just">("Equal")
  const [temperamentRoot, setTemperamentRoot] = useState<string|null>(null)
  const [tunerType, setTunerType] = useState<string|null>(null)
  const [tunerMode, setTunerMode] = useState<"Detect"|"Target"|"Drone">("Detect")
  const [selectedPitch, setSelectedPitch] = useState("C")
  const [selectedOctave, setSelectedOctave] = useState<number|null>(null)
  const [selectedString, setSelectedString] = useState<number>(1)
  const [playDrone, setPlayDrone] = useState<boolean>(false)
  const { isProUser } = usePurchase();
  
  const getData = async () => {
  try {
    const savedCalibration = await AsyncStorage.getItem(CALIBRATION_KEY);
    if (savedCalibration !== null) {
      setCalibration(Number(savedCalibration))
    }
    const savedTemperament = await AsyncStorage.getItem(TEMPERAMENT_KEY);
    const savedTempRoot = await AsyncStorage.getItem(TEMPERAMENT_ROOT);
    if (savedTemperament === "Just") {
      setTemperament(savedTemperament)
      setTemperamentRoot(savedTempRoot)
    } else if (savedTemperament === "Equal") {
      setTemperament(savedTemperament)
      setTemperamentRoot(null)
    }
  
    const savedTunerType = await AsyncStorage.getItem(TUNER_TYPE_KEY);
    if (savedTunerType) {
      setTunerType(savedTunerType)
      setSelectedString(1);
      const tuning = [...guitarTunings, ...bassTunings].find(i => i.name === savedTunerType)
      setSelectedOctave(tuning?.tuning[1].octave!)
      setSelectedPitch(tuning?.tuning[1].note!)

      if (savedTunerType === "Chromatic") {
              setTunerMode("Detect")

      }
    } else {
      setTunerType("Chromatic")
      setTunerMode("Detect")
    }
  } catch (e) {
    // error reading value
  }
};

useEffect(() => {
  Audio.setAudioModeAsync({
    playsInSilentModeIOS: true, // Allow sound even if iOS is muted
    staysActiveInBackground: false,
    shouldDuckAndroid: true,
    playThroughEarpieceAndroid: false,
  });
}, []);


   useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );


  useEffect(() => {
    getData()
    const setup = async () => {
      const options = {
        sampleRate: 44100,
        channels: 1,
        bitsPerSample: 16,
        audioSource: 6,
        wavFile: 'test.wav'
      };
  
      AudioRecord.init(options);
    };
  
    setup();
  }, []);

  const note = useMemo(() => {
    if (frequency) {
      return freqToNote(frequency, calibration, temperament);
    }
    return null;
  }, [frequency])

  useEffect(() => {
    if (frequency && note) {
      if (tunerMode === "Detect" && tunerType !== "Chromatic") {
        const tuningEntry = [...guitarTunings, ...bassTunings].find(i => i.name === tunerType)
  || guitarTunings[0];

const currentTuning = tuningEntry.tuning;
      

    let closestString = 1;
let smallestDiff = Infinity;

for (const stringNumber in currentTuning) {
const stringInfo = currentTuning[Number(stringNumber) as StringNumber];

  if (stringInfo) {
    const { note: stdNote, octave: stdOctave } = stringInfo;
    const stdFreq = noteToFreq(stdNote, stdOctave, calibration, temperament);
    const diff = Math.abs(frequency - stdFreq);

    if (diff < smallestDiff) {
      smallestDiff = diff;
      closestString = Number(stringNumber);
    }
  }
}

const matched = currentTuning[closestString as StringNumber];
if (matched) {
  setSelectedString(closestString);
  setSelectedPitch(matched.note);
  setSelectedOctave(matched.octave);
}
      } 
       if (tunerMode === "Target") {
         const targetFreq = noteToFreq(selectedPitch, selectedOctave||4, calibration, temperament, );
         const rawCents = centsFromNote(frequency, targetFreq);
         setSmoothedCents(prev => {
          if (prev === null) return rawCents;
          const alpha = 0.2;
          return alpha * rawCents + (1 - alpha) * prev;
        });

       } else {
         const targetFreq = noteToFreq(note.note, note.octave, calibration, temperament, );
         const rawCents = centsFromNote(frequency, targetFreq);
         setSmoothedCents(prev => {
          if (prev === null) return rawCents;
          const alpha = 0.2;
          return alpha * rawCents + (1 - alpha) * prev;
        });
       }
      
    } else {
      setSmoothedCents(null);
    }
  }, [frequency, note]);


  const startRecording = async () => {
    
      setRecording(true);
      AudioRecord.start();

      AudioRecord.on('data', (data) => {
        const raw = Buffer.from(data, 'base64');
        const int16Array = new Int16Array(raw.buffer, raw.byteOffset, raw.length / 2);
        const float32Array = new Float32Array(int16Array.length);
      
        for (let i = 0; i < int16Array.length; i++) {
          float32Array[i] = int16Array[i] / 32768;
        }
      
        // Append new data to buffer
        const combined = new Float32Array(sampleBuffer.length + float32Array.length);
        combined.set(sampleBuffer);
        combined.set(float32Array, sampleBuffer.length);
      
        // Process in 1024-sample chunks
        if (combined.length >= 1024) {
          const chunk = combined.slice(0, 1024);
          detectFrequency(chunk, 44100);
      
          // Save leftover samples for next round
          const leftover = combined.slice(1024);
          setSampleBuffer(leftover);
        } else {
          setSampleBuffer(combined); // Still accumulating
        }
      });
  };


const detectFrequency = (buffer: any, sampleRate: any) => {
  const [pitch, clarity] = detector.findPitch(buffer, sampleRate);
  
  const minFreq = selectedOctave !== null ? noteToFreq('B', selectedOctave - 1, calibration, temperament) : 30;  
  const maxFreq = selectedOctave !== null ? noteToFreq('C', selectedOctave + 1, calibration, temperament) : 2000;

  setClarity(clarity);
  if (clarity > 0.9 && pitch > minFreq && pitch < maxFreq) {
    setFrequency(pitch);
  } else {
    setFrequency(null);
  }
};

  const stopRecording = async () => {
    if (recording) {
      setRecording(false);
      AudioRecord.stop();
    }
  };
  

  return (
    <View
      style={styles.indexContainer}
      >
      <Meter note={note}  setSelectedPitch={(arg) => setSelectedPitch(arg)}  selectedPitch={selectedPitch} tunerType={tunerType} clarity={clarity}  setSelectedOctave={(arg) => setSelectedOctave(arg)}  selectedOctave={selectedOctave}  cents={Math.round(smoothedCents || 0)} />
      <Pitch note={note}  setSelectedPitch={(arg) => setSelectedPitch(arg)}  selectedPitch={selectedPitch} />
           <StringSelect selectedString={selectedString} setSelectedString={(arg: number) => setSelectedString(arg)} note={note} tunerType={tunerType} tunerMode={tunerMode} setSelectedPitch={(arg) => setSelectedPitch(arg)} setSelectedOctave={(arg) => setSelectedOctave(arg)} selectedPitch={selectedPitch} selectedOctave={selectedOctave}/>
        <View style={{ marginTop: Dimensions.get("window").width * 0.05, width: Dimensions.get("window").width * 0.95, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: "center"}}>
{/*       <Pitch note={note}  tunerMode={tunerMode} setSelectedPitch={(arg) => setSelectedPitch(arg)} setSelectedOctave={(arg) => setSelectedOctave(arg)} selectedPitch={selectedPitch} selectedOctave={selectedOctave}/>
 */}        
      <TemperamentCalibration calibration={calibration} temperament={temperament} temperamentRoot={temperamentRoot}/>
 <ModeSelect tunerType={tunerType} tunerMode={tunerMode} setTunerMode={(arg) => {setTunerMode(arg); arg !== "Target" && setPlayDrone(false)}} stopRecording={() => stopRecording()} />
      </View>
      <RecordingBtn tunerMode={tunerMode} playDrone={playDrone} setPlayDrone={() => {setPlayDrone(!playDrone)}} stopRecording={() => stopRecording()} recording={recording}  startRecording={() => startRecording()}/>
 {(tunerMode === "Drone" && playDrone === true)&& <DroneSynth note={`${selectedPitch}${selectedOctave}`}/>}
</View>
      
  );
}

const styles = StyleSheet.create({

  indexContainer: {
    fontFamily: typography.fontFamily,
    flex: 1, 
    gap: spacing.md,
    overflow: 'hidden',
    backgroundColor: colors.primary,
zIndex: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: spacing.xl,
    padding: spacing.sm
  },

  stepContainer: {
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  recBtnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  
});
