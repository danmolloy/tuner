import { StyleSheet } from "react-native";

export const colors = {
  primary: "#1d3557", // Main accent, interface background
  secondary: "#e63946", // Supporting accents, meter accent
  backgroundLight: "#f1faee", // off white, cards background
  text: "#457b9d", // off black, text & borders
  //backgroundDark: "#1F2937",
  backgroundPrimary: "#1b263b",
  darkShade: "#415a77",
  white: "#ffffff",
  lightShade: "#e5e5e5",
  accent: "red",
  
  textPrimary: "#38192d",
  labelText: "#a8dadc",
  textSecondary: "#a8dadc", // Less important text

  backgroundRed: "#F44336",
  meterPanelYellow: "#FDD421",
  buttonPanelTeal: "#23BDD1",
  accentBlue: "#1690F3",
  buttonRed: "#E53935",
  backgroundCream: "#FFF8E1",
  black: "#000000"
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
   fontRegular: "PlaypenSans_400Regular",
      fontMedium: "PlaypenSans_500Medium",
      fontSemiBold:"PlaypenSans_600SemiBold",
  fontBold: "PlaypenSans_700Bold",
  fontExtraBold: "PlaypenSans_800ExtraBold",
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
  xl: 6,
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
  panelOuter: {
      backgroundColor: colors.black,
      // Outer border for the recessed effect
      borderWidth: 1,
      borderTopColor: '#a0a0a0', // Darker on top
      borderLeftColor: '#a0a0a0', // Darker on left
      borderRightColor: '#f8f8f8', // Lighter on right
      borderBottomColor: '#f8f8f8', // Lighter on bottom
      // Inner shadow effect
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2, // For Android
      overflow: 'hidden',
    },
    panelInner: {
      width: '100%',
      backgroundColor: colors.white, 
      borderWidth: borderWidths.lg,
      borderColor: colors.black,
      borderRadius: radii.sm
      //borderTopColor: '#f0f0f0',
      //borderLeftColor: '#f0f0f0',
      //borderRightColor: '#c0c0c0',
      //borderBottomColor: '#c0c0c0',
      
    },
  globalCard: {
    //borderWidth: borderWidths.sm,
       // borderColor: colors.text,
        borderRadius: radii.lg,
        flexDirection: 'column',
    alignItems: 'center',
  },
  pageView: {
    padding: spacing.lg,
        backgroundColor: 'white',
    
  },
  headerText: {
    fontSize: typography.fontSize.xl,
    fontWeight: '700',
    marginBottom: 16
  },
  settingsContainer: {
     marginBottom: 16,
          marginTop: 8,

    paddingHorizontal: 16,
    borderColor: colors.black,
    borderWidth: borderWidths.lg    

  },
  settingsLabel: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontBold,
    marginVertical: 4,
  }
})