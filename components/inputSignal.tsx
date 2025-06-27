import { colors } from "@/lib/themes";
import React from "react";
import { StyleSheet, View } from "react-native";


export default function InputSignal({clarity}:    
  {
    clarity: number|null;
  }) {
  return (
     <View style={styles.container}>
                   <View style={{
                    flexDirection: 'row',
                    alignItems: "flex-end"
                   }}>
                    {new Array(5).fill(null).map((_, index) => (
                      <View key={index} style={{
                        width: 8, 
                        height: 8 * index, 
                        margin: 2, 
                        backgroundColor: clarity! > (index * 0.01 + .94) ? colors.backgroundPanel : '',
                        borderRadius: 1,
                        borderWidth: 1,
                        borderColor: colors.backgroundPanel,
    
                      }}/>
                    ))}
                   </View>
                   </View>
  )
}

const styles= StyleSheet.create({
  container: {}
})