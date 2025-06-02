import { useAppSettings } from "@/lib/hooks/useAppSettings";
import { colors, globalStyles, radii, spacing } from "@/lib/themes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { Alert, StyleSheet, Text, View } from "react-native";

export const METER_TYPE_KEY = '@meter_type';

const DEFAULT_METER_TYPE = 'Default';

export default function MeterSelect() {
const { meterType, setMeterType } = useAppSettings();

  const handleSelect = async (value: string) => {
    if (value === "Default" || value === "Analogue") {
      await AsyncStorage.setItem(METER_TYPE_KEY, value);
      setMeterType(value)
    } else {
      Alert.alert("Invalid Value", "Temperament must be Equal or Just");
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Meter Type</Text>
      <Picker
        selectedValue={meterType}
        onValueChange={(itemValue: string) => handleSelect(itemValue)}
        style={styles.picker}
      >
        <Picker.Item style={styles.pickerItem} label="Default" value="Default" />
                <Picker.Item style={styles.pickerItem} label="Analogue" value="Analogue" />
        
      </Picker>
     
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
     ...globalStyles.settingsContainer,
         backgroundColor: colors.backgroundLight,
         borderRadius: radii.sm,
         padding: spacing.sm
  },
  label: {
    ...globalStyles.settingsLabel,
  },
  picker: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 8,
    color: colors.backgroundLight
  },
  pickerItem: {
    color: colors.backgroundLight,
    
  }
})