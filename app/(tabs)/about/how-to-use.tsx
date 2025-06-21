import { colors, globalStyles } from '@/lib/themes';
import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HowToUsePage() {
  return (
    <ScrollView style={styles.container}>
      <Text style={{...globalStyles.headerText}}>About</Text>
      <Text>This tuner is designed to be approachable for beginner musicians as well as accurate and rebust enough for professionals. It utilises a highly effective pitch detection library named <Link style={styles.link} href="https://www.npmjs.com/package/pitchy">Pitchy</Link>, built upon the <Link style={styles.link} href='http://www.cs.otago.ac.nz/tartini/papers/A_Smarter_Way_to_Find_Pitch.pdf'>McLeod Pitch Method</Link>.</Text>
      <View style={styles.pageSection}>
      <Text style={styles.h2}>Modes</Text>
      <Text style={styles.h3} >DETECT MODE</Text>
      <Text>For most users, this is the default mode. The tuner automatically detects the pitch of the note you play. The meter shows the nearest note name, octave, and how many cents sharp or flat you are (100 cents = 1 semitone). For further accuracy, the detected and target frequencies are shown to three decimal points.</Text>
      <Text style={styles.h3} >TARGET MODE</Text>
      <Text>Manually select a target pitch and octave (or in Guitar/Bass mode, select a string). The meter will lock into the prescribed pitch. Tune slowly and use this setting with caution! You may seem far away but can very quickly overshoot your pitch.</Text>
      <Text>This mode is particularly useful when you are far from the desired pitch, such as on a newly strung instrument.</Text>
      <Text style={styles.h3} >DRONE MODE (Premium)</Text>
      <Text>The tuner plays a continuous tone at your selected pitch. Use this to match pitch by ear or improve intonation and listening skills.</Text>
    </View>
    <View style={styles.pageSection}>
      <Text style={styles.h2}>Tuner Type</Text>
      <Text style={styles.h3} >Chromatic</Text>
      <Text>This is the default tuner and generally suggested to all users unless tuning a guitar or bass guitar.</Text>
      <Text style={styles.h3} >Guitar & Bass Guitar</Text>
      <Text>The default mode is Target Mode (see above).</Text>
    </View>
    <View style={styles.pageSection}>
    <Text style={styles.h2}>Calibration & Temperament</Text>
    <Text style={styles.h3}>CALIBRATION (Premium)</Text>
    <Text>Adjust from A=415 to A=450 Hz. If unsure, use A=440 Hz (modern standard).</Text>
    <Text style={styles.h3}>TEMPERAMENT (Premium)</Text>
    <Text>Choose from a variety of historical and alternative temperaments. Equal Temperament is the modern default, however this app offers the possibility to explore other temperaments for period-accuracy or tonal variety.</Text>
    </View>
    <View style={styles.pageSection}>
    <Text style={styles.h2}>Interface & Preferences</Text>
    <Text style={{marginTop: 16}}>This app currently offers alternative meter interfaces for all users, available in Settings.</Text>
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
  link: {
    color: 'blue'
  },
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