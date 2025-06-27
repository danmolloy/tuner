import { Temperament } from "@/lib/functions";
import { usePurchase } from "@/lib/purchaseProvider";
import { colors, globalStyles, radii, spacing } from "@/lib/themes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

export const TEMPERAMENT_KEY = '@tuner_temperament';
export const TEMPERAMENT_ROOT = '@tuner_root';

const DEFAULT_TEMPERAMENT = 'Equal';

export default function TemperamentSelect() {
  const isProUser = usePurchase();
       const [temperament, setTemperament] = useState<Temperament>(DEFAULT_TEMPERAMENT);

  useEffect(() => {
    const loadTemperament = async () => {
      const stored = await AsyncStorage.getItem(TEMPERAMENT_KEY) as Temperament;
      if (stored) setTemperament(stored);
    };
    loadTemperament();
  }, []);

  const handleSelect = async (value: Temperament) => {
    if (!isProUser) {
      Alert.alert("Alternative and historical temperaments are only available for premium users. To make a purchase or restore purchase, navigate to the Premium tab on the bottom of your screen.")
      return;
    }
    if (value === "Just" || value === "Pythagorean" ||value ===  "Meantone" ||value ===  "Werckmeister") {
      setTemperament(value);
      await AsyncStorage.setItem(TEMPERAMENT_KEY, value);
      await AsyncStorage.setItem(TEMPERAMENT_ROOT, "C");
    } else if (value === "Equal") {
      setTemperament(value);
      await AsyncStorage.setItem(TEMPERAMENT_KEY, value);
      await AsyncStorage.removeItem(TEMPERAMENT_ROOT);
    } else {
      Alert.alert("Invalid Value", "Temperament must be Equal or Just");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Temperament</Text>
      <Picker
        selectedValue={temperament}
        onValueChange={(itemValue: Temperament) => handleSelect(itemValue)}
        style={styles.picker}
      >
        <Picker.Item style={styles.pickerItem} label="Equal Temperament" value="Equal" />
        <Picker.Item style={styles.pickerItem} label="Just Temperament (C)" value="Just" />
                <Picker.Item style={styles.pickerItem} label="Pythagorean Temperament (C)" value="Pythagorean" />
        <Picker.Item style={styles.pickerItem} label="Meantone Temperament (C)" value="Meantone" />
        <Picker.Item style={styles.pickerItem} label="Werckmeister Temperament (C)" value="Werckmeister" />

      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
     ...globalStyles.settingsContainer,

              backgroundColor: colors.backgroundLabel,
              borderRadius: radii.sm,
              padding: spacing.sm
  },
  label: {
    ...globalStyles.settingsLabel,
  },
  picker: {
              backgroundColor: colors.backgroundLight,
    borderRadius: 8,

  },
  pickerItem: {
    color: colors.backgroundLight,
    
  }
});