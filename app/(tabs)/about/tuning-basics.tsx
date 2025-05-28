import { colors, globalStyles } from '@/lib/themes';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function TuningBasics() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageHeader}>Tuning Basics</Text>
      <View style={styles.pageSection}>
      <Text style={styles.h2}>Why Tuning and Intonation Matters</Text>
      <Text>To put it bluntly, poor tuning accuracy can lead to unpleasant dissonances and a disappointing listening experience.
Good intonation is particularly important in ensembles.
</Text>
      
{/* _Want to hear the difference?_ Check out our interactive example:  
**Good vs Bad Intonation.** 🎧 *(Coming soon)* */}
</View>
<View style={styles.pageSection}>
  <Text style={styles.h2}>How to Tune your Instrument</Text>
  <Text>1. **Play a sustained note** — the tuner detects the pitch (give it time to settle).</Text>
    <Text>2. **Adjust slowly** — especially on stringed or wind instruments.</Text>
  <Text>3. **Be patient** — small changes matter.</Text>
  <Text>4. **Tune frequently** - Tuning your instrument before each practice will improve your perception of pitch as well as help the instrument maintain the pitch (particularly for string instruments).</Text>
</View>
<View style={styles.pageSection}>
  <Text style={styles.h2}>Tuning Accurately: Tips</Text>
    <Text>- Tune in a **quiet environment**</Text>
  <Text>- Make sure your signal is **clear and clean**</Text>
  <Text>- **Let the note ring** — avoid fast, plucky tuning</Text>
  <Text>- For stringed instruments, try **octave harmonics** for greater accuracy</Text>

</View>
<View style={styles.pageSection}>
  <Text style={styles.h2}>Improve Your Intonation</Text>
  <Text>Tuning is not just a setup step — it’s a pathway to better musicianship. A chromatic tuner can help you build awareness of pitch and train your ear over time.</Text>
  <Text>- **Play scales or arpeggios slowly**</Text>
    <Text>- Aim to **center the needle** on every note</Text>
  <Text>- **Note patterns** — do certain notes tend to be sharp or flat?</Text>
  <Text>- Don’t become dependent — the tuner is a **mirror**, not a crutch</Text>
</View>
<View style={styles.pageSection}>
  <Text style={styles.h2}>Practice with a Drone</Text>
  <Text>A drone provides a constant reference pitch to practice intonation against. It can help tune intervals purely, as well as improving muscle memory and strengthening ones ear.</Text>
  <Text>How to practice with it:  </Text>
  <Text>1. Choose a drone pitch (e.g. A or D)</Text>
  <Text>2. Play scales, intervals, or melodies **over the drone**</Text>
  <Text>3. Adjust your pitch to eliminate 'beats' 3. Adjust your pitch to eliminate **beats** — this is wavering or pulsing sound caused by two pitches being slightly out of tune</Text>
<Text>Practicing with a tuner builds more than just tuning accuracy — it deepens your musical ear. Use these tools consistently, and you’ll develop more confidence, precision, and musicality over time.
</Text>
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