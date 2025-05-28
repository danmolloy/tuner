import { colors, globalStyles } from '@/lib/themes';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HowToUsePage() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageHeader}>Using This App</Text>
      <Text>This tuner is designed to be both accurate and approachable — offering flexibility for experienced musicians while remaining intuitive for newcomers.</Text>
      <View style={styles.pageSection}>
      <Text style={styles.h2}>Modes</Text>
      <Text style={styles.h3} >DETECT MODE</Text>
      <Text>The tuner automatically detects the pitch of the note you play. The meter shows the nearest note name, octave, and how many cents sharp or flat you are (100 cents = 1 semitone).</Text>
      <Text style={styles.h3} >TARGET MODE</Text>
      <Text>Manually select a target note.</Text>
      <Text>This is useful when you are far from the desired pitch, such as on a newly strung instrument.</Text>
      <Text style={styles.h3} >DRONE MODE (Premium)</Text>
      <Text>The tuner plays a continuous tone at your selected pitch. Use this to match pitch by ear or improve intonation and listening skills. More information about how to use this feature can be found in "Tuning Basics".</Text>
    </View>
    <View style={styles.pageSection}>
      <Text style={styles.h2}>Tuner Type</Text>
      <Text style={styles.h3} >Chromatic</Text>
      <Text>This is the default tuner.</Text>
      <Text style={styles.h3} >Guitar & Bass Guitar</Text>
      <Text>In Target mode, select a string to tune.</Text>
      <Text>In detect mode, the tuner will assume you are tuning the nearest string and guide you towards it.</Text>
        </View>
    <View style={styles.pageSection}>
    <Text style={styles.h2}>Calibration & Temperament</Text>
    <Text style={styles.h3}>CALIBRATION (Premium)</Text>
    <Text>Adjust from A=415 to A=450 Hz. If unsure, use A=440 Hz (modern standard). Learn more about calibration in "Tuning Basics".</Text>
    <Text style={styles.h3}>TEMPERAMENT (Premium)</Text>
    <Text>Choose from a variety of historical and alternative temperaments. Equal Temperament is the modern default, however this app offers the possibility to explore other temperaments for period-accuracy or tonal variety. . Learn more about temperament in "Tuning Basics".</Text>
    </View>
    <View style={styles.pageSection}>
    <Text style={styles.h2}>Interface & Preferences</Text>
    <Text style={{marginTop: 16}}>This app offers alternative meter interfaces for premium users, available in Settings.</Text>
    </View>
    <View style={styles.pageSection}>
    <Text style={styles.h2}>Final Notes</Text>
    <Text style={{marginTop: 16}}>If you enjoy the app, please consider leaving a review! This project was created to help beginners get comfortable with tuning, as well as allowing advanced users with fine-tune precision.</Text>
    <Text>Thanks for tuning in!</Text>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.pageView,
    backgroundColor: colors.backgroundLight,
  },
  pageHeader: {
    ...globalStyles.headerText,
    fontSize: 24
  },
  pageSection: {
    marginVertical: 16,
  },

  h2: {
    fontSize: 24,
    fontWeight: '600'
  },
  h3: {
    fontSize: 16,
    fontWeight: '400',
    marginTop: 16
  },
})