import { Temperament } from "@/lib/functions";
import { usePurchase } from "@/lib/purchaseProvider";
import { TEMPERAMENT_KEY, TEMPERAMENT_ROOT } from "@/lib/settingsKeys";
import { colors, globalStyles, typography } from "@/lib/themes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";


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
      <Text style={styles.label}>TEMPERAMENT</Text>
      <Picker
        selectedValue={temperament}
        onValueChange={(itemValue: Temperament) => handleSelect(itemValue)}
        style={styles.picker}
      >
        <Picker.Item style={styles.pickerItem} label="EQUAL TEMPERAMENT" value="Equal" />
        <Picker.Item style={styles.pickerItem} label="JUST TEMPERAMENT (C)" value="Just" />
                <Picker.Item style={styles.pickerItem} label="PYTHAGOREAN TEMPERAMENT (C)" value="Pythagorean" />
        <Picker.Item style={styles.pickerItem} label="MEANTONE TEMPERAMENT (C)" value="Meantone" />
        <Picker.Item style={styles.pickerItem} label="WERCKMEISTER TEMPERAMENT (C)" value="Werckmeister" />

      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {


  },
  label: {
    ...globalStyles.settingsLabel,
  },
  picker: {
         ...globalStyles.settingsContainer,
    backgroundColor: colors.backgroundCream,
    borderRadius: 8,
        fontFamily: typography.fontBold,
        padding: 4,
        paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 24,

  },
  pickerItem: {
    color: colors.backgroundLight,
    fontFamily: typography.fontBold,
paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 24,  }
});