import Calibration from '@/components/calibration';
import DroneSynth from '@/components/drone';
import InputSignal from '@/components/inputSignal';
import Meter from '@/components/meter';
import AnalogueMeter from '@/components/meters/analogue';
import Octave from '@/components/octave';
import PitchScroller from '@/components/pitchScroller';
import RecordingBtn from '@/components/recordingBtn';
import StringSelect from '@/components/stringSelect';
import Temperament from '@/components/temperament';
import TunerType from '@/components/tunerType';
import { freqToNote, noteToFreq } from '@/lib/functions';
import { useAppSettings } from '@/lib/hooks/useAppSettings';
import { useAudioProcessor } from '@/lib/hooks/useAudioProcessor';
import { colors, radii, spacing, typography } from '@/lib/themes';
import React, { useEffect, useMemo, useState } from 'react';
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
    tunerType,
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
        <View style={{flexDirection: 'column', marginBottom: -24}}>
        <TunerType />
       <View style={{ flexDirection: 'row', justifyContent: 'space-evenly'}}>
       <Calibration />
       <Temperament />
        </View>
       </View>
        <View style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.darkShade,
          borderRadius: radii.sm,
          paddingVertical: spacing.sm,
          //borderColor: colors.backgroundPanel,
          //borderWidth: 2,

        }}>
          <Octave tunerMode={tunerMode} note={note} setSelectedOctave={(arg) => setSelectedOctave(arg)} selectedOctave={selectedOctave}/>
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
        temperamentRoot={temperamentRoot}
        calibration={calibration}
        temperament={temperament}
          selectedString={selectedString}
          setSelectedString={(arg) => setSelectedString(arg)}
          tunerMode={tunerMode}
          selectedOctave={selectedOctave}
          setSelectedOctave={(arg) => setSelectedOctave(arg)}
          selectedPitch={selectedPitch}
          setSelectedPitch={(arg) => setSelectedPitch(arg)}
          note={note} />
          <View style={{flexDirection: 'row', justifyContent: 'flex-end', width: Dimensions.get("screen").width * .90, marginTop: -42, paddingBottom: 12}}>
  <InputSignal clarity={clarity} />
  
          </View>
          {/* <FrequencyDisplay note={note} /> */}
          <StringSelect 
                  selectedString={selectedString} 
                  setSelectedString={setSelectedString} 
                  note={note} 
                  tunerType={tunerType} 
                  tunerMode={tunerMode} 
                  setSelectedPitch={setSelectedPitch} 
                  setSelectedOctave={setSelectedOctave} 
                  selectedPitch={selectedPitch} 
                  selectedOctave={selectedOctave}
                />
          </View>

        <RecordingBtn
        tunerMode={tunerMode}
        tunerType={tunerType}
          playDrone={playDrone}
          setTunerMode={(mode) => setTunerMode(mode)}
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
    backgroundColor: colors.backgroundPrimary,
zIndex: 0,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: spacing.xs,
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
