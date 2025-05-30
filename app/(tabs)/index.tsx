import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';


import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import DroneSynth from '@/components/drone';
import Meter from '@/components/meter';
import AnalogueMeter from '@/components/meters/analogue';
import ModeSelect from '@/components/modeSelect';
import Pitch from '@/components/pitch';
import RecordingBtn from '@/components/recordingBtn';
import { CALIBRATION_KEY } from '@/components/settings/calibration';
import { TEMPERAMENT_KEY, TEMPERAMENT_ROOT } from '@/components/settings/temperament';
import { TUNER_TYPE_KEY } from '@/components/settings/tunerSelect';
import TemperamentCalibration from '@/components/temperament';
import { centsFromNote, freqToNote, noteToFreq, Temperament } from '@/lib/functions';
import { bassTunings, guitarTunings, StringNumber } from '@/lib/gtrTunings';
import { usePurchase } from '@/lib/purchaseProvider';
import { colors, spacing, typography } from '@/lib/themes';
import { Buffer } from 'buffer';
import { useFocusEffect } from 'expo-router';
import { PitchDetector } from 'pitchy';
import AudioRecord from 'react-native-audio-record';

const detector = PitchDetector.forFloat32Array(1024);
export const globalBorderWidth = 2;

export const appName = "Tuner"

export default function HomeScreen() {
  const [recording, setRecording] = useState(false);
  const [frequency, setFrequency] = useState<any>(null)
  const [clarity, setClarity] = useState<number|null>(null)
  const [sampleBuffer, setSampleBuffer] = useState<Float32Array>(new Float32Array(0));
  const [smoothedCents, setSmoothedCents] = useState<number | null>(null);
  const [calibration, setCalibration] = useState<number>(440)
  const [temperament, setTemperament] = useState<Temperament>("Equal")
  const [temperamentRoot, setTemperamentRoot] = useState<string>("C")
  const [tunerType, setTunerType] = useState<string|null>(null)
  const [tunerMode, setTunerMode] = useState<"Detect"|"Target"|"Drone">("Detect")
  const [selectedPitch, setSelectedPitch] = useState("C")
  const [selectedOctave, setSelectedOctave] = useState<number|null>(null)
  const [selectedString, setSelectedString] = useState<number>(1)
  const [playDrone, setPlayDrone] = useState<boolean>(false)
  const { isProUser } = usePurchase();
  
const lastClarityRef = useRef<number | null>(null);
const lastFrequencyRef = useRef<number | null>(null);
const clarityThreshold = 0.01;

  const getData = async () => {
  try {
    const savedCalibration = await AsyncStorage.getItem(CALIBRATION_KEY);
    if (savedCalibration !== null) {
      setCalibration(Number(savedCalibration))
    }
    const savedTemperament = await AsyncStorage.getItem(TEMPERAMENT_KEY) as Temperament;
    const savedTempRoot = await AsyncStorage.getItem(TEMPERAMENT_ROOT);
    if (savedTemperament === "Just"
      || savedTemperament === "Meantone" 
      || savedTemperament === "Pythagorean" 
      || savedTemperament === "Werckmeister") {
        
      setTemperament(savedTemperament)
      setTemperamentRoot(savedTempRoot|| "C")
    } else if (savedTemperament === "Equal") {
      setTemperament(savedTemperament)
      setTemperamentRoot("C")
    }
  
    const savedTunerType = await AsyncStorage.getItem(TUNER_TYPE_KEY);
    if (savedTunerType) {
      setTunerType(savedTunerType)
      setSelectedString(1);
      const tuning = [...guitarTunings, ...bassTunings].find(i => i.name === savedTunerType)
      setSelectedOctave(tuning?.tuning[1].octave! || null)
      setSelectedPitch(tuning?.tuning[1].note! || "C")

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
    const stdFreq = noteToFreq({note:stdNote, octave:stdOctave, calibration, temperament, temperamentRoot});
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
         const targetFreq = noteToFreq({note: selectedPitch, octave: selectedOctave||4, calibration, temperament, temperamentRoot} );
         const rawCents = centsFromNote(frequency, targetFreq);
         setSmoothedCents(prev => {
          if (prev === null) return rawCents;
          const alpha = 0.2;
          return alpha * rawCents + (1 - alpha) * prev;
        });

       } else {
         const targetFreq = noteToFreq({note: note.note, octave: note.octave, calibration, temperament, temperamentRoot});
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


  const lastBufferRef = useRef<Float32Array>(new Float32Array(0));

useEffect(() => {
  AudioRecord.on('data', (data) => {
    const raw = Buffer.from(data, 'base64');
    const int16Array = new Int16Array(raw.buffer, raw.byteOffset, raw.length / 2);
    const float32Array = new Float32Array(int16Array.length);

    for (let i = 0; i < int16Array.length; i++) {
      float32Array[i] = int16Array[i] / 32768;
    }

    // Use a ref instead of state to avoid re-renders
    const prevBuffer = lastBufferRef.current;
    const combined = new Float32Array(prevBuffer.length + float32Array.length);
    combined.set(prevBuffer);
    combined.set(float32Array, prevBuffer.length);

    if (combined.length >= 1024) {
      const chunk = combined.slice(0, 1024);
      detectFrequency(chunk, 44100);

      const leftover = combined.slice(1024);
      lastBufferRef.current = leftover;
    } else {
      lastBufferRef.current = combined;
    }
  });
}, []);

const startRecording = async () => {
  setRecording(true);
  AudioRecord.start();
};




const detectFrequency = (buffer: any, sampleRate: any) => {
  const [pitch, clarity] = detector.findPitch(buffer, sampleRate);
  const minFreq = selectedOctave !== null
    ? noteToFreq({note: 'B', octave: selectedOctave - 1, calibration, temperament, temperamentRoot})
    : 30;
  const maxFreq = selectedOctave !== null
    ? noteToFreq({note:'C', octave: selectedOctave + 1, calibration, temperament, temperamentRoot})
    : 2000;

  // Only update clarity if it changed meaningfully
  if (
    lastClarityRef.current === null ||
    Math.abs(lastClarityRef.current - clarity) > clarityThreshold
  ) {
    lastClarityRef.current = clarity;
    setClarity(clarity);
  }

  // Only update frequency if it changed meaningfully
  if (clarity > 0.9 && pitch > minFreq && pitch < maxFreq) {
    if (
      lastFrequencyRef.current === null ||
      Math.abs(lastFrequencyRef.current - pitch) > 0.5 // ~0.5 Hz threshold
    ) {
      lastFrequencyRef.current = pitch;
      setFrequency(pitch);
    }
  } else {
    if (lastFrequencyRef.current !== null) {
      lastFrequencyRef.current = null;
      setFrequency(null);
    }
  }
};
  const stopRecording = async () => {
    if (recording) {
      setRecording(false);
      AudioRecord.stop();
    }
  };
  

  return (
    <ScrollView>
      <View
      style={styles.indexContainer}
      >
      <AnalogueMeter cents={Math.round(smoothedCents || 0)} />
      <Meter note={note}  setSelectedPitch={(arg) => setSelectedPitch(arg)}  selectedPitch={selectedPitch} tunerType={tunerType} clarity={clarity}  setSelectedOctave={(arg) => setSelectedOctave(arg)}  selectedOctave={selectedOctave}  cents={Math.round(smoothedCents || 0)} />
      <Pitch selectedString={selectedString} setSelectedString={(arg: number) => setSelectedString(arg)} note={note} tunerType={tunerType} tunerMode={tunerMode} setSelectedPitch={(arg) => setSelectedPitch(arg)} setSelectedOctave={(arg) => setSelectedOctave(arg)} selectedPitch={selectedPitch} selectedOctave={selectedOctave} />
        <View style={{ marginTop: Dimensions.get("window").width * 0.05, width: Dimensions.get("window").width * 0.95, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: "center"}}>
      <TemperamentCalibration calibration={calibration} temperament={temperament} temperamentRoot={temperamentRoot}/>
 <ModeSelect tunerType={tunerType} tunerMode={tunerMode} setTunerMode={(arg) => {setTunerMode(arg); arg !== "Target" && setPlayDrone(false)}} stopRecording={() => stopRecording()} />
      </View>
      <RecordingBtn tunerMode={tunerMode} playDrone={playDrone} 
        setPlayDrone={(arg) => {setPlayDrone(arg); arg === true ? setSelectedOctave(4) : setSelectedOctave(null)}} 
        stopRecording={() => stopRecording()} 
        recording={recording}  
        startRecording={() => startRecording()}/>
 {<DroneSynth note={`${selectedPitch}${selectedOctave}`} playDrone={playDrone}/>}
</View>
          </ScrollView>

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
    justifyContent: "center",
    alignItems: 'center',
    paddingTop: spacing.sm,
    padding: spacing.sm,
      marginBottom: 50,

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
