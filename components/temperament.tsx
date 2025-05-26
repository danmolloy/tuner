import { globalStyles } from "@/lib/themes";
import { Dimensions, StyleSheet, Text, View } from "react-native";

export default function TemperamentCalibration({temperament, temperamentRoot, calibration}: 
  {temperament: string, temperamentRoot: string | null, calibration: number}) {
  
  return (
    <View style={styles.temperamentContainer}>
      <Text>A4 = {calibration}</Text>
      <Text style={styles.tempText}>{temperament.toUpperCase()}{temperamentRoot && ` (${temperamentRoot})`} TEMPERAMENT</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  temperamentContainer: {
      ...globalStyles.globalCard,
        flexDirection: 'column',
        justifyContent: 'center',
        width: Dimensions.get("window").width * 0.45,
        flexGrow: 1
  },
  tempText: {
    textAlign: 'center'
  }
})