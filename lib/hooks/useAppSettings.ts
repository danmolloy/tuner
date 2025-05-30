import { CALIBRATION_KEY } from "@/components/settings/calibration";
import { METER_TYPE_KEY } from "@/components/settings/meterSelect";
import { TEMPERAMENT_KEY, TEMPERAMENT_ROOT } from "@/components/settings/temperament";
import { TUNER_TYPE_KEY } from "@/components/settings/tunerSelect";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Temperament } from "../functions";


export function useAppSettings() {
  const [calibration, setCalibration] = useState(440);
  const [temperament, setTemperament] = useState<Temperament>("Equal");
  const [temperamentRoot, setTemperamentRoot] = useState<string>("C");
  const [tunerType, setTunerType] = useState<string>("Chromatic");
  const [meterType, setMeterType] = useState<string>("Default");
  
  useFocusEffect(
    useCallback(() => {
      const loadSettings = async () => {
        const savedCalibration = await AsyncStorage.getItem(CALIBRATION_KEY);
        if (savedCalibration) setCalibration(Number(savedCalibration));
        const meter = await AsyncStorage.getItem(METER_TYPE_KEY);
        if (meter) setMeterType(meter)
        const temp = await AsyncStorage.getItem(TEMPERAMENT_KEY) as Temperament;
        
        const root = await AsyncStorage.getItem(TEMPERAMENT_ROOT);
        if (temp) {
          setTemperament(temp);
          setTemperamentRoot(root || "C");
        }
        

        const type = await AsyncStorage.getItem(TUNER_TYPE_KEY);
        if (type) setTunerType(type);
      };

      loadSettings();
    }, [])
  );

  return {
    calibration,
    temperament,
    temperamentRoot,
    tunerType,
    setTunerType,
    setMeterType,
    meterType
  };
}