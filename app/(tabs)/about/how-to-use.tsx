import { borderWidths, colors, globalStyles, radii, spacing, typography } from '@/lib/themes';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HowToUsePage() {
  return (
   <ScrollView style={styles.container}>
  <Image
    source={require("../../../assets/images/about.png")}
    contentFit="contain"
    style={{ width: 1024 / 3, height: 228 / 3 }}
  />  
  <View style={styles.textContainer}>
    <Text style={{ ...styles.textBody }}>
      This tuner is designed to be approachable for beginner musicians as well
      as accurate and robust enough for professionals. It utilises a highly
      effective pitch detection library named{" "}
      <Link style={styles.link} href="https://www.npmjs.com/package/pitchy">
        Pitchy
      </Link>
      , built upon the{" "}
      <Link
        style={styles.link}
        href="http://www.cs.otago.ac.nz/tartini/papers/A_Smarter_Way_to_Find_Pitch.pdf"
      >
        McLeod Pitch Method
      </Link>
      .
    </Text>
  </View>
  <View style={styles.pageSection}>
    <Text style={styles.h2}>Modes</Text>
    <View style={styles.textContainer}>
      <Text style={styles.h3}>Detect Mode</Text>
      <Text style={styles.textBody}>
        For most users, this is the default mode. The tuner automatically detects
        the pitch of the note you play. The meter shows the nearest note name,
        octave, and how many cents sharp or flat you are (100 cents = 1
        semitone). For further accuracy, the detected and target frequencies are
        shown to three decimal points.
      </Text>
      <Text style={styles.h3}>Target Mode</Text>
      <Text style={styles.textBody}>
        Manually select a target pitch and octave (or in guitar/bass mode, select
        a string). The meter will lock into the prescribed pitch. Tune slowly and
        use this setting with caution! You may seem far away but can very quickly
        overshoot your pitch.
      </Text>
      <Text style={styles.textBody}>
        This mode is particularly useful when you are far from the desired pitch,
        such as on a newly strung instrument.
      </Text>
      <Text style={styles.h3}>Drone Mode</Text>
      <Text style={styles.textBody}>
        The tuner plays a continuous tone at your selected pitch. Use this to
        match pitch by ear or improve intonation and listening skills.
      </Text>
    </View>
    <View style={styles.pageSection}>
      <Text style={styles.h2}>Tuner Type</Text>
      <View style={styles.textContainer}>
        <Text style={styles.h3}>Chromatic</Text>
        <Text style={styles.textBody}>
          This is the default tuner and generally suggested to all users unless
          tuning a guitar or bass guitar.
        </Text>
        <Text style={styles.h3}>Guitar & Bass Guitar</Text>
        <Text style={styles.textBody}>
          The default mode is target mode (see above).
        </Text>
      </View>
    </View>
    <View style={styles.pageSection}>
      <Text style={styles.h2}>Calibration & Temperament</Text>
      <View style={styles.textContainer}>
        <Text style={styles.h3}>Calibration</Text>
        <Text style={styles.textBody}>
          Adjust from A=415 to A=450 Hz. If unsure, use A=440 Hz (modern
          standard).
        </Text>
        <Text style={styles.h3}>Temperament</Text>
        <Text style={styles.textBody}>
          Choose from a variety of historical and alternative temperaments. Equal
          temperament is the modern default, however this app offers the
          possibility to explore other temperaments for period-accuracy or tonal
          variety.
        </Text>
      </View>
    </View>
    {/* <View style={styles.pageSection}>
    <Text style={styles.h2}>Interface & Preferences</Text>
    <Text style={styles.textBody}>This app currently offers alternative meter interfaces for all users, available in Settings.</Text>
    </View> */}
    <View style={styles.pageSection}>
      <Text style={styles.h2}>Final Notes</Text>
      <View style={styles.textContainer}>
        <Text style={styles.textBody}>
          If you enjoy the app, please consider leaving a review! This project was
          created to help beginners get comfortable with tuning, as well as
          allowing advanced users fine-tune precision. Thanks for tuning in!
        </Text>
      </View>
    </View>
  </View>
</ScrollView>
  );
}

const styles = StyleSheet.create({
  link: {
    color: 'blue'
  },
  textBody: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontMedium,
    marginVertical: spacing.sm
  },
  textContainer: {
         paddingHorizontal: spacing.sm,
        borderRadius: radii.md,
        borderWidth: borderWidths.md,
        backgroundColor: colors.backgroundCream,
        borderColor: colors.black,
        marginHorizontal: -8,
        marginVertical: 12
  },
  container: {
    ...globalStyles.pageView,
    backgroundColor: colors.meterPanelYellow
    
  },
  pageHeader: {
    ...globalStyles.headerText,
  },
  pageSection: {
    marginVertical: 24,
  },

  h2: {
    fontSize: 32,
    fontFamily: typography.fontExtraBold,
    marginBottom: -6
  },
  h3: {
    fontSize: 24,
    fontFamily: typography.fontExtraBold,
    marginVertical: 12,
  },
})