import { spacing, typography } from '@/lib/themes';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const premiumList: string[] = [
  "Adjustable calibration (415 to 450)",
  "Alternative temperaments",
  "Alternate tunings for guitar and bass",
  "Drone mode",
  "Alterative meters",
  "Alternative colour schemes",
  "Interactive about section",
]

export default function UpgradePage() {
  return (
    <ScrollView>
      <Text style={styles.pageHeader}>Premium</Text>
      <View>
        {premiumList.map((text, index) => (
          <View key={index} style={styles.listItem}>
            <FontAwesome name="check-circle" size={24} color="black" style={{marginRight: 12}} />
            <Text style={{fontSize: typography.fontSize.md}}>{text}</Text>
          </View>
        ))}
      </View>
      <Pressable>
        <Text>
        Upgrade
        </Text>
        </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
pageHeader: {
  padding: spacing.lg,
  fontSize: typography.fontSize.xl
},
  listItem: {
    flexDirection: 'row',
    padding: spacing.sm,
    paddingLeft: spacing.md,
    alignItems: 'center',
  }
})