import { borderWidths, colors, globalStyles, radii, spacing, typography } from '@/lib/themes';
import React from 'react';
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


const styles = StyleSheet.create({
  container: {
    ...globalStyles.pageView,
    height: Dimensions.get("window").height - 50,
    backgroundColor: '#f5f3f4'
  },
  headerText: {
    ...globalStyles.headerText,
    color: colors.backgroundPrimary
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