import { borderWidths, globalStyles, radii, spacing, typography } from '@/lib/themes';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const premiumList: string[] = [
  "Adjustable calibration: 415Hz to 450Hz",
  "Alternative temperaments",
  "Alternate guitar and bass tunings",
  "Drone mode",
  "Alterative meters",
  "Alternative colour schemes",
  "Interactive about section",
]

export default function UpgradePage() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageHeader}>Premium</Text>
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
        Upgrade
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
    ...globalStyles.pageView
  },
pageHeader: {
  ...globalStyles.headerText
},
  listItem: {
    flexDirection: 'row',
    padding: spacing.sm,
    paddingLeft: spacing.sm,
    alignItems: 'center',
  },
  upgradeBtn: {
    borderColor: 'black',
    borderWidth: borderWidths.md,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
    margin: spacing.sm,
    borderRadius: radii.sm
  },
  upgradeText: {
    fontSize: typography.fontSize.lg,
    fontWeight: "600"
  },
  restoreBtn: {
     alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
    margin: spacing.sm,
    borderRadius: radii.sm
  },
  restoreText: {

  },
  listContainer: {
     borderColor: 'black',
    borderWidth: borderWidths.md,
     padding: spacing.sm,
    margin: spacing.sm,
    borderRadius: radii.sm,
    flexDirection: 'column',
    flexWrap: 'wrap'
  }
})