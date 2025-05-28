import { colors, globalStyles, spacing, typography } from "@/lib/themes";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
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

export default function Meter({ cents, setSelectedOctave, selectedOctave, note, clarity, tunerType }: { 
  tunerType: string|null
  clarity: number|null;
  cents: number, 
  note: {
    note: string;
    octave: number;
  } | null
  setSelectedOctave: (arg: number| null) => void
  selectedOctave: number|null }) {
  const size = Dimensions.get("screen").width * 0.6;
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
  }, [cents]);

  

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
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: "center"}}>
          <Text style={styles.note}>{note?.note[0]}</Text>
          <Text>
          {note?.note && (
  note.note.includes('#') ? (
    <MaterialCommunityIcons name="music-accidental-sharp" size={24} color="black" />
  ) : note.note.includes('b') ? (
    <MaterialCommunityIcons name="music-accidental-flat" size={24} color="black" />
  ) : (
    <MaterialCommunityIcons name="music-accidental-natural" size={24} color="black" />
  )
)}        </Text></View>
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
    marginTop: -50
  },
  centsText: {
    fontSize: typography.fontSize.md,
    fontWeight: "500",
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