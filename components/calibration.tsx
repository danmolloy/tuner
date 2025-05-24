import { defaultFont } from "@/app/_layout";
import { Dimensions, StyleSheet, Text, View } from "react-native";

export default function Calibration({calibration}: 
  {calibration: number}) {
  return (
    <View style={styles.calibrationContainer}>
      <Text style={styles.calibText}>A = {calibration}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  calibrationContainer: {
     borderWidth: 3,
        borderColor: 'black',
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: 'center',
        width: Dimensions.get("window").width * 0.45,
        flexGrow: 1,
        marginBottom:  Dimensions.get("window").width * .05
  },
  calibText: {
    fontFamily: defaultFont,
        fontSize: 26,
        fontWeight: '700',
        textAlign: 'center'
  }
})