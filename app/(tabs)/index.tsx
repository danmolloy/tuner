import DroneSynth from '@/components/drone';
import Meter from '@/components/meter';
import AnalogueMeter from '@/components/meters/analogue';
import ModeSelect from '@/components/modeSelect';
import PitchScroller from '@/components/pitchScroller';
import RecordingBtn from '@/components/recordingBtn';
import TemperamentCalibration from '@/components/temperament';
import { freqToNote, noteToFreq } from '@/lib/functions';
import { useAppSettings } from '@/lib/hooks/useAppSettings';
import { useAudioProcessor } from '@/lib/hooks/useAudioProcessor';
import { colors, spacing, typography } from '@/lib/themes';
import { useEffect, useMemo, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';

if (!global.atob) {
  global.atob = atob;
}
export const globalBorderWidth = 2;

export const appName = "Tuner"

export default function HomeScreen() {
  const {
    calibration,
    temperament,
    temperamentRoot,
    meterType,
    tunerMode,
    setTunerMode
  } = useAppSettings();

  const [frequency, setFrequency] = useState<number | null>(null);
  const [clarity, setClarity] = useState<number | null>(null);
  const [recording, setRecording] = useState(true);
  const [playDrone, setPlayDrone] = useState(false);
  const [selectedOctave, setSelectedOctave] = useState<number|null>(null)
  const [selectedPitch, setSelectedPitch] = useState<string>("A");
  const [selectedString, setSelectedString] = useState(1);



  const { start, stop, ready } = useAudioProcessor({
    onFrequencyDetected: (freq, clar) => {
      setFrequency(freq);
      setClarity(clar);
    }
  });



  useEffect(() => {
    if (ready) {
      handleStart();

    }
  }, [ready])

  const handleStart = async () => {
    setRecording(true);
    await start();

  };

  const handleStop = async () => {
    setRecording(false);
    await stop();
  };

   const note = useMemo(() => {
    return frequency
      ? freqToNote({frequency, calibration, temperament, temperamentRoot})
      : null;
  }, [frequency, calibration, temperament, temperamentRoot]);

  useEffect(() => {
    if (tunerMode === "Detect") {
      setSelectedOctave(null)
    }
  }, [tunerMode])
 
  return (
    <ScrollView>
      <View style={styles.indexContainer}>
        {meterType === "Analogue" 
        ? <AnalogueMeter 
          clarity={clarity} 
          selectedPitch={selectedPitch}
          setSelectedPitch={(arg) => setSelectedPitch(arg)}
          setSelectedOctave={(arg) => setSelectedOctave(arg)}
          selectedOctave={selectedOctave}
          note={note} 
        />
        :<Meter
          clarity={clarity} 
          selectedPitch={selectedPitch}
          setSelectedPitch={(arg) => setSelectedPitch(arg)}
          setSelectedOctave={(arg) => setSelectedOctave(arg)}
          selectedOctave={selectedOctave}
          note={note} 
        /> }
        <PitchScroller
          selectedString={selectedString}
          setSelectedString={(arg) => setSelectedString(arg)}
          tunerMode={tunerMode}
          selectedOctave={selectedOctave}
          setSelectedOctave={(arg) => setSelectedOctave(arg)}
          selectedPitch={selectedPitch}
          setSelectedPitch={(arg) => setSelectedPitch(arg)}
          note={note} />
          <View style={{ marginTop: spacing.md, width: Dimensions.get("window").width * 0.95, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: "center"}}>
       <TemperamentCalibration
          calibration={calibration}
          temperament={temperament}
          temperamentRoot={temperamentRoot}
        />
        <ModeSelect
          stopDrone={() => setPlayDrone(false)}
          stopRecording={handleStop} 
          tunerMode={tunerMode}
          setTunerMode={setTunerMode} />
          </View>
        <RecordingBtn
          tunerMode={tunerMode}
          playDrone={playDrone}
          setPlayDrone={(arg) => {setPlayDrone(arg); setSelectedOctave(4)}}
          recording={recording}
          startRecording={handleStart}
          stopRecording={handleStop}
        />
      </View>
      <DroneSynth playDrone={playDrone} note={
        String(noteToFreq({
          note: selectedPitch,
          octave: selectedOctave || 4,
          temperament: temperament,
          calibration: calibration,
          temperamentRoot: temperamentRoot
        }))} />
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
    height: Dimensions.get("screen").height - 50,
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
