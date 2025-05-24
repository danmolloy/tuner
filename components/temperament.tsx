import { defaultFont } from "@/app/_layout";
import { Dimensions, StyleSheet, Text, View } from "react-native";

export default function Temperament({temperament, temperamentRoot}: 
  {temperament: string, temperamentRoot: string | null}) {
  
  return (
    <View style={styles.temperamentContainer}>
      <Text style={styles.tempText}>{temperament}{temperamentRoot && ` (${temperamentRoot})`} Temperament</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  temperamentContainer: {
    borderWidth: 3,
        borderColor: 'black',
        borderRadius: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
        width: Dimensions.get("window").width * 0.45,
        flexGrow: 1
  },
  tempText: {
    fontFamily: defaultFont,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center'
  }
})