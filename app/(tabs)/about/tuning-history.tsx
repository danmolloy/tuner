import { colors, globalStyles } from '@/lib/themes';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default function TuningHistory() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageHeader}>Tuning History</Text>

<Text style={styles.h3}>What is Temperament?</Text>
<Text>Temperament is the system used to tune the notes of a musical scale. Since tuning every interval perfectly (called "just intonation") creates conflicts when moving between keys, musicians and instrument makers developed **temperaments** — compromises that balance the tuning of intervals across the scale.</Text>
<Text style={styles.h3}>Equal Temperament (Today's Standard)</Text>
<Text>In equal temperament, the octave is divided into 12 equal steps. This allows musicians to play in any key without sounding "out of tune," which is why it became the standard in modern Western music.</Text>
<Text> All modern pianos are tuned in equal temperament — it’s versatile and consistent across all keys.</Text>


<Text style={styles.h3}>Historical Temperaments</Text>
<Text>Before equal temperament, various temperaments were used to favor certain keys over others. This includes Pythagorean, Meantone, Just and Well temperaments.</Text>
<Text>Fun fact: Bach's Well-Tempered Clavier was written to showcase music in all 24 keys, using a well temperament system — not equal temperament.</Text>

<Text style={styles.h3}> What is A=440? </Text>
<Text>Most modern tuner use A4 = 440Hz as the reference pitch. This means the A above middle C vibrates 440 times per second. There’s nothing magical about 440 — it was simply became the standard calibration in the 20th century. Before that, pitch varied a lot by region, era, and even instrument!</Text>

<Text style={styles.h3}>Historic Pitch Variations</Text>
<Text>In earlier centuries, pitch varied wildly from region to region — even from one organ to another! Baroque music often used A=415, and some ensembles today still tune to that for authenticity. Many German orchestras tune as high as 446 to achieve a 'brighter' sound.</Text>
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