import {
  requestRecordingPermissionsAsync,
  setAudioModeAsync
} from "expo-audio";
import { PitchDetector } from "pitchy";
import { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import AudioRecord from "react-native-audio-record";

export function useAudioProcessor({
  onFrequencyDetected,
}: {
  onFrequencyDetected: (frequency: number | null, clarity: number | null) => void;
}) {
  const detector = useRef(PitchDetector.forFloat32Array(1024)).current;
  const bufferRef = useRef<Float32Array>(new Float32Array(0));
  const lastFreqRef = useRef<number | null>(null);
  const lastClarityRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { granted } = await requestRecordingPermissionsAsync();
      if (!granted) {
        Alert.alert(
          "Microphone Access Denied",
          "Please enable microphone access in your settings to use this tuner."
        );
        return;
      }

      await setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
        shouldPlayInBackground: false,
        interruptionMode: 'doNotMix',
      });

      AudioRecord.init({
        sampleRate: 44100,
        channels: 1,
        bitsPerSample: 16,
        audioSource: 6,
        wavFile: "test.wav",
      });

      AudioRecord.on("data", (data: string) => {
        try {
          const binaryString = global.atob(data);
          const rawLength = binaryString.length;
          const arrayBuffer = new ArrayBuffer(rawLength);
          const view = new Uint8Array(arrayBuffer);

          for (let i = 0; i < rawLength; i++) {
            view[i] = binaryString.charCodeAt(i);
          }

          const int16Array = new Int16Array(arrayBuffer);
          const float32Array = Float32Array.from(int16Array, (x) => x / 32768);

          const prev = bufferRef.current;
          const combined = new Float32Array(prev.length + float32Array.length);
          combined.set(prev);
          combined.set(float32Array, prev.length);

          if (combined.length >= 1024) {
            const chunk = combined.slice(0, 1024);
            const [pitch, clarity] = detector.findPitch(chunk, 44100);

            const changed =
              Math.abs((lastFreqRef.current ?? 0) - pitch) > 0.5 ||
              Math.abs((lastClarityRef.current ?? 0) - clarity) > 0.01;

            if (changed) {
              lastFreqRef.current = pitch;
              lastClarityRef.current = clarity;
              onFrequencyDetected(clarity > 0.9 ? pitch : null, clarity);
            }

            bufferRef.current = combined.slice(1024);
          } else {
            bufferRef.current = combined;
          }
        } catch (err) {
          console.error("Audio decoding error:", err);
        }
      });

      setReady(true);
    };

    init();
  }, []);

  const start = async () => {
    AudioRecord.start();
  };

  const stop = async () => {
    await AudioRecord.stop();

    await setAudioModeAsync({
      allowsRecording: true,
      playsInSilentMode: true,
      shouldPlayInBackground: false,
      interruptionMode: 'doNotMix',
    });

    console.log("Stopped recording and reset audio mode.");
  };

  return { start, stop, ready };
}