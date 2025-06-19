import { borderWidths, colors, globalStyles, radii, spacing, typography } from '@/lib/themes';
import { Dimensions, StyleSheet } from 'react-native';
import HowToUsePage from './how-to-use';


export const unstable_settings = {
  initialRouteName: 'index',
};

export const options = {
  headerShown: false,
};

export default function AboutIndex() {
  return (
    <HowToUsePage />
  );
}
{/* <View style={styles.container}>
  <Text style={styles.headerText}>About</Text>
  <Link style={styles.card} href="/about/how-to-use" asChild>
    <TouchableOpacity>
      <Text style={styles.cardLabel}>Using This App</Text>
    </TouchableOpacity>
  </Link>

  <Link style={styles.card} href="/about/tuning-basics" asChild>
    <TouchableOpacity>
      <Text style={styles.cardLabel}>Tuning Basics</Text>
    </TouchableOpacity>
  </Link>
  <Link style={styles.card} href="/about/tuning-history" asChild>
    <TouchableOpacity>
      <Text style={styles.cardLabel}>Tuning History</Text>
    </TouchableOpacity>
  </Link>
</View> */}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.pageView,
    height: Dimensions.get("screen").height - 50,
    backgroundColor: colors.primary
  },
  headerText: {
    ...globalStyles.headerText,
    color: colors.backgroundLight
  },
  card: {
    borderColor: colors.backgroundLight,
    backgroundColor: colors.backgroundLight,
    borderWidth: borderWidths.sm,
    margin: spacing.sm,
    padding: spacing.md,
    borderRadius: radii.md,
    alignItems: "center",
    flexDirection: 'column',
    
  },
  cardLabel: {
    fontSize: typography.fontSize.lg,
    fontWeight: '500'
  }
})