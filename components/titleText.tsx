import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import { Image } from 'expo-image';
const imageSrc = require("../assets/images/title.png")

export default function TitleText() {
  return (
    <View style={styles.container}>
<Image
  source={imageSrc}
  contentFit="contain"
  style={{ width: 977/2.25, height: 134/2.25, }}
/>    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: -24,
    width: Dimensions.get("window").width,
    flexDirection: "column",
    alignItems: "center",
  },
});