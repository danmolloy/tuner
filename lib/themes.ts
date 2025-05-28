import { StyleSheet } from "react-native";

export const colors = {
  primary: "#1d3557", // Main accent, interface background
  secondary: "#e63946", // Supporting accents, meter accent
  backgroundLight: "#f1faee", // off white, cards background
  text: "#457b9d", // off black, text & borders
  textSecondary: "#a8dadc", // Less important text
  //backgroundDark: "#1F2937",
};

export const radii = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 20,
};


export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const typography = {
  fontFamily: "SpaceMono",
  fontSize: {
    sm: 12,
    md: 16,
    lg: 24,
    xl: 36,
  },
};


export const borderWidths = {
  none: 0,
  hairline: StyleSheet.hairlineWidth,
  sm: 1,
  md: 2,
  lg: 4,
};

export const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
};

export const globalStyles = StyleSheet.create({
  globalCard: {
    //borderWidth: borderWidths.sm,
       // borderColor: colors.text,
        backgroundColor: colors.backgroundLight,
        borderRadius: radii.lg,
        flexDirection: 'column',
    alignItems: 'center',
  },
  pageView: {
    padding: spacing.lg,
    marginBottom: 50,
        backgroundColor: 'white',
    
  },
  headerText: {
    fontSize: typography.fontSize.xl,
    fontWeight: '700',
    marginBottom: 16
  },
  settingsContainer: {
     marginVertical: 16,
    paddingHorizontal: 16,
  },
  settingsLabel: {
    fontSize: typography.fontSize.md,
    fontWeight: '500',
    marginVertical: 12,
  }
})