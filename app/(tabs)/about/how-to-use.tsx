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
        style={{ width: 1024/3, height: 228/3, }}
      />  
      <View style={styles.textContainer}>
      <Text style={{...styles.textBody}}>THIS TUNER IS DESIGNED TO BE APPROACHABLE FOR BEGINNER MUSICIANS AS WELL AS ACCURATE AND REBUST ENOUGH FOR PROFESSIONALS. IT UTILISES A HIGHLY EFFECTIVE PITCH DETECTION LIBRARY NAMED <Link style={styles.link} href="https://www.npmjs.com/package/pitchy">PITCHY</Link>, BUILT UPON THE <Link style={styles.link} href='http://www.cs.otago.ac.nz/tartini/papers/A_Smarter_Way_to_Find_Pitch.pdf'>MCLEOD PITCH METHOD</Link>.</Text>
      </View>
      <View style={styles.pageSection}>
      <Text style={styles.h2}>MODES</Text>
            <View style={styles.textContainer}>
      <Text style={styles.h3} >DETECT MODE</Text>
      <Text style={styles.textBody}>FOR MOST USERS, THIS IS THE DEFAULT MODE. THE TUNER AUTOMATICALLY DETECTS THE PITCH OF THE NOTE YOU PLAY. THE METER SHOWS THE NEAREST NOTE NAME, OCTAVE, AND HOW MANY CENTS SHARP OR FLAT YOU ARE (100 CENTS = 1 SEMITONE). FOR FURTHER ACCURACY, THE DETECTED AND TARGET FREQUENCIES ARE SHOWN TO THREE DECIMAL POINTS.</Text>
      <Text style={styles.h3} >TARGET MODE</Text>
      <Text style={styles.textBody}>MANUALLY SELECT A TARGET PITCH AND OCTAVE (OR IN GUITAR/BASS MODE, SELECT A STRING). THE METER WILL LOCK INTO THE PRESCRIBED PITCH. TUNE SLOWLY AND USE THIS SETTING WITH CAUTION! YOU MAY SEEM FAR AWAY BUT CAN VERY QUICKLY OVERSHOOT YOUR PITCH.</Text>
      <Text style={styles.textBody}>THIS MODE IS PARTICULARLY USEFUL WHEN YOU ARE FAR FROM THE DESIRED PITCH, SUCH AS ON A NEWLY STRUNG INSTRUMENT.</Text>
      <Text style={styles.h3} >DRONE MODE</Text>
      <Text style={styles.textBody}>THE TUNER PLAYS A CONTINUOUS TONE AT YOUR SELECTED PITCH. USE THIS TO MATCH PITCH BY EAR OR IMPROVE INTONATION AND LISTENING SKILLS.</Text>
    </View>
    <View style={styles.pageSection}>
      <Text style={styles.h2}>TUNER TYPE</Text>
                  <View style={styles.textContainer}>

      <Text style={styles.h3} >CHROMATIC</Text>
      <Text style={styles.textBody}>THIS IS THE DEFAULT TUNER AND GENERALLY SUGGESTED TO ALL USERS UNLESS TUNING A GUITAR OR BASS GUITAR.</Text>
      <Text style={styles.h3} >GUITAR & BASS GUITAR</Text>
      <Text style={styles.textBody}>THE DEFAULT MODE IS TARGET MODE (SEE ABOVE).</Text>
      </View>
    </View>
    <View style={styles.pageSection}>
    <Text style={styles.h2}>CALIBRATION & TEMPERAMENT</Text>
                      <View style={styles.textContainer}>

    <Text style={styles.h3}>CALIBRATION</Text>
    <Text style={styles.textBody}>ADJUST FROM A=415 TO A=450 HZ. IF UNSURE, USE A=440 HZ (MODERN STANDARD).</Text>
    <Text style={styles.h3}>TEMPERAMENT</Text>
    <Text style={styles.textBody}>CHOOSE FROM A VARIETY OF HISTORICAL AND ALTERNATIVE TEMPERAMENTS. EQUAL TEMPERAMENT IS THE MODERN DEFAULT, HOWEVER THIS APP OFFERS THE POSSIBILITY TO EXPLORE OTHER TEMPERAMENTS FOR PERIOD-ACCURACY OR TONAL VARIETY.</Text>
    </View></View>
    {/* <View style={styles.pageSection}>
    <Text style={styles.h2}>Interface & Preferences</Text>
    <Text style={styles.textBody}>This app currently offers alternative meter interfaces for all users, available in Settings.</Text>
    </View> */}
    <View style={styles.pageSection}>
    <Text style={styles.h2}>FINAL NOTES</Text>
                          <View style={styles.textContainer}>

    <Text style={styles.textBody}>IF YOU ENJOY THE APP, PLEASE CONSIDER LEAVING A REVIEW! THIS PROJECT WAS CREATED TO HELP BEGINNERS GET COMFORTABLE WITH TUNING, AS WELL AS ALLOWING ADVANCED USERS WITH FINE-TUNE PRECISION. THANKS FOR TUNING IN!</Text>
    </View>
    </View></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  link: {
    color: 'blue'
  },
  textBody: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontExtraBold,
    marginVertical: spacing.sm
  },
  textContainer: {
         paddingHorizontal: spacing.sm,
        borderRadius: radii.md,
        borderWidth: borderWidths.lg,
        backgroundColor: colors.meterPanelYellow,
        borderColor: colors.black,
        marginHorizontal: -8,
        marginVertical: 12
  },
  container: {
    ...globalStyles.pageView,
    backgroundColor: colors.backgroundRed
    
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