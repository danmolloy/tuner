import { centsFromNote, noteToFreq } from "@/lib/functions";
import { useAppSettings } from "@/lib/hooks/useAppSettings";
import { colors, globalStyles, spacing, typography } from "@/lib/themes";
import { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming
} from "react-native-reanimated";
import Svg, { Circle, Path } from "react-native-svg";
import InputSignal from "./inputSignal";
import Octave from "./octave";


const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function Meter({ selectedPitch, setSelectedOctave, selectedOctave, note, clarity }: { 
  clarity: number|null;
  note: {
    note: string;
    octave: number;
    detectedFrequency: number
  } | null
  selectedPitch: string|null
  setSelectedPitch: (arg: string) => void
  setSelectedOctave: (arg: number| null) => void
  selectedOctave: number|null }) {

    const { tunerType, temperament, calibration, temperamentRoot } = useAppSettings();

    
    const targetFreq = (!note || note.detectedFrequency == null|| note.detectedFrequency < 16.35) ? 0 : noteToFreq({
      note: selectedPitch? selectedPitch :note.note,
      octave: selectedOctave ? selectedOctave : note.octave,
      calibration,
      temperament,
      temperamentRoot: temperament !== "Equal" ? temperamentRoot ?? "C" : "C",
    });

const cents = (() => {
  if (!note || note.detectedFrequency == null) return 0;
  try {
    const result =  centsFromNote(note.detectedFrequency, targetFreq);
if (Math.abs(result) > 100 && tunerType === "Chromatic") return 0;
    return result
  } catch (e) {
    console.warn("Error calculating cents:", e);
    return 0;
  }
})();
        


  const size = Dimensions.get("screen").width * 0.65;
  const radius = size / 2 - 20;
  const centre = size / 2;
  
  // 270-degree arc configuration
  const startAngle = -135; // degrees (left extreme)
  const endAngle = 135;    // degrees (right extreme)
  const maxCents = 50;     // ±50 cents limit

  const animatedCents = useSharedValue(0);

  // Worklet-converted helper functions
  const degToRad = (deg: number) => {
    'worklet';
    return deg * (Math.PI / 180);
  };

  const getPointOnCircle = (angleDeg: number) => {
    'worklet';
    const angleRad = degToRad(angleDeg);
    return {
      x: centre + radius * Math.sin(angleRad),
      y: centre - radius * Math.cos(angleRad),
    };
  };

  const needleProps = useAnimatedProps(() => {
    'worklet';
    // Convert cents to angle (0° = top, -50° = left, +50° = right)
    const angle = (animatedCents.value / maxCents) * 135;
    const { x, y } = getPointOnCircle(angle);
    return { cx: x, cy: y };
  });

  // Non-worklet version for static background path
  const getPointOnCircleJS = (angleDeg: number) => {
    const angleRad = angleDeg * (Math.PI / 180);
    return {
      x: centre + radius * Math.sin(angleRad),
      y: centre - radius * Math.cos(angleRad),
    };
  };

  const arcBackgroundPath = `
    M ${getPointOnCircleJS(startAngle).x} ${getPointOnCircleJS(startAngle).y}
    A ${radius} ${radius} 0 1 1 ${getPointOnCircleJS(endAngle).x} ${getPointOnCircleJS(endAngle).y}
  `;

const pulse = useSharedValue(1);

const backgroundArcProps = useAnimatedProps(() => ({
  strokeOpacity: pulse.value,
}));

useEffect(() => {
  pulse.value = withRepeat(
    withTiming(.75, {
      duration: 1500, // half the 2s cycle
      easing: Easing.inOut(Easing.ease),
    }),
    -1,
    true // reverse (1 -> 0.5 -> 1)
  );
}, []);

useEffect(() => {
  const clamped = Math.max(-maxCents, Math.min(maxCents, cents));
  animatedCents.value = withTiming(clamped, { duration: 300 });
}, [note]);

  

  return (
    <View style={styles.meterContainer}>
      <Text style={{color: 'gray', }}>{tunerType === "Chromatic" && tunerType.toUpperCase()}</Text>
      <Svg width={size} height={size / 1.2}>
        {/* Background arc */}
<AnimatedPath
  animatedProps={backgroundArcProps}
  d={arcBackgroundPath}
  stroke={colors.textSecondary}
  strokeWidth={16} // Keep this fixed
  fill="none"
  strokeLinecap="round"
/>
        
        {/* Needle */}
        <AnimatedCircle 
          animatedProps={needleProps} 
          r={8} 
          fill={"white"} 
          stroke={'black'}  
          strokeWidth={2}
        />
      </Svg>
      
      <View style={[StyleSheet.absoluteFill, styles.textContainer]}>
<Text style={styles.centsText}>{Math.round(cents) || 0}</Text>
        <Text style={styles.centsLabel}>CENTS</Text>
        <View style={{alignItems: 'flex-start', flexDirection: 'column',  width: 160,  padding: 2, borderRadius: 6, }}>
              
        <Text style={{fontSize: typography.fontSize.md}}>DETECTED: {note?.detectedFrequency.toFixed(2)}</Text>
        <Text style={{fontSize: typography.fontSize.md}}>TARGET: {targetFreq !== 0 && targetFreq.toFixed(2)}</Text>
            </View>
       
      </View>
      <View style={{
        alignSelf: "flex-end",
        marginTop: -32,
        marginRight: 12
      }}>
      <InputSignal clarity={clarity} />
      </View>
      <Octave note={note} setSelectedOctave={(arg) => setSelectedOctave(arg)}  selectedOctave={selectedOctave}/>
    </View>
  );
}

const styles = StyleSheet.create({
  meterContainer: {
    ...globalStyles.globalCard,
    flexDirection: "column",
    justifyContent: 'center',
    width: Dimensions.get("screen").width * 0.9,
    height: Dimensions.get("screen").width * 0.75,
    position: "relative",
    padding: spacing.xs,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0
  },
  centsText: {
    fontSize: typography.fontSize.lg,
    fontWeight: "500",
    marginTop: 12
  },
  centsLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: "500",
  },
  note: {
    fontSize: typography.fontSize.xl,
    fontWeight: "bold",
    marginTop: 20
  }
});