import { borderWidths, colors, globalStyles, radii, spacing, typography } from '@/lib/themes';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const premiumList: string[] = [
  "Adjustable calibration: 415Hz to 450Hz",
  "Alternative temperaments",
  "Alternate guitar and bass tunings",
  "Drone mode",
  /* "Alternative meters",
  "Alternative colour schemes",
  "Interactive about section", */
]

export default function UpgradePage() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headContainer}>
      {/* <View style={styles.iconContainer}>
       
       


      </View> */}
      <Text style={styles.pageHeader}>Get Premium</Text>
        <Text style={{textAlign: 'center', paddingHorizontal: 24, color: colors.backgroundLight}}>Unlock full access to all of our features with a one-off purchase.</Text>
      </View>
      <View style={styles.listContainer}>
        {premiumList.map((text, index) => (
          <View key={index} style={styles.listItem}>
            <FontAwesome name="check-circle" size={24} color="black" style={{marginRight: 12}} />
            <Text style={{fontSize: typography.fontSize.md, flexWrap: 'wrap',  flexShrink: 1}}>{text}</Text>
          </View>
        ))}
      </View>
      <Pressable style={styles.upgradeBtn}>
        <Text style={styles.upgradeText}>
        Continue
        </Text>
        </Pressable>
        <Pressable style={styles.restoreBtn}>
        <Text style={styles.restoreText}>
        Restore Purchase
        </Text>
        </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.pageView,
    flexDirection: "column",
    backgroundColor: colors.primary
  },
  headContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
      marginVertical: 16,

  },
  iconContainer: {
    borderColor: 'black',
    borderWidth: 1,
    width: 100,
    height: 100,
   
  },
pageHeader: {
  ...globalStyles.headerText,
  marginTop: 16,
  color: colors.backgroundLight
},
  listItem: {
    flexDirection: 'row',
    padding: spacing.sm,
    paddingLeft: spacing.sm,
    alignItems: 'center',
  },
  upgradeBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
    margin: spacing.sm,
    borderRadius: radii.md,
    backgroundColor: colors.secondary,
  },
  upgradeText: {
    fontSize: typography.fontSize.lg,
    fontWeight: "600",
    color: 'white'
  },
  restoreBtn: {
     alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
    margin: spacing.sm,
    borderRadius: radii.sm,
  },
  restoreText: {
    color: colors.backgroundLight

  },
  listContainer: {
     borderColor: 'gray',
    borderWidth: borderWidths.sm,
     padding: spacing.sm,
    margin: spacing.sm,
    borderRadius: radii.md,
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: colors.backgroundLight
  }
})