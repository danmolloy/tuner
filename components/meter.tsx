import { Dimensions, StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

export default function Meter({cents}: {
  cents: number;
}) {
  const size = Dimensions.get("screen").width * .80;
  const radius = size/2 - 20;
  const centre = size / 2;

  const clamped = Math.max(-50, Math.min(50, cents));
  
  
  const angle = clamped * (Math.PI / 50);

  const x = centre + radius * Math.sin(angle);
  const y = centre - radius * Math.cos(angle);

  const arcPath = `
    M ${centre + radius} ${centre}
    A ${radius} ${radius} 0 1 1 ${centre - radius} ${centre}
    A ${radius} ${radius} 0 1 1 ${centre + radius} ${centre}
  `;

  
  const startAngle = 0;
  const endAngle = angle;
  
  // Determine sweep direction
  const sweepFlag = endAngle > startAngle ? 1 : 0;
  const largeArcFlag = Math.abs(endAngle - startAngle) > Math.PI ? 1 : 0;

  const x0 = centre + radius * Math.sin(startAngle);
  const y0 = centre - radius * Math.cos(startAngle);

  const filledArcPath = `
    M ${x0} ${y0}
    A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${x} ${y}
  `;

  return (
      <View style={styles.meterContainer}>
        <Svg width={size} height={size}>
          {/* Full circle background */}
          <Path
            d={arcPath}
            stroke="#ccc"
            strokeWidth={15}
            fill="none"
          />
          {/* Active arc */}
          <Path
            d={filledArcPath}
            stroke="#4caf50"
            strokeWidth={15}
            fill="none"
          />
          {/* Needle */}
          <Circle cx={x} cy={y} r={8} fill="#4caf50" />
          
          {/* Position markers */}
          <Circle cx={centre} cy={centre - radius} r={4} fill="#f00" />
          <Circle cx={centre + radius} cy={centre} r={4} fill="#f00" />
          <Circle cx={centre} cy={centre + radius} r={4} fill="#f00" />
          <Circle cx={centre - radius} cy={centre} r={4} fill="#f00" />
        </Svg>
        
        {/* Centered text overlay */}
        <View style={[StyleSheet.absoluteFill, styles.textContainer]}>
          <Text style={styles.centsText}>{cents || 0}</Text>
          <Text style={styles.centsLabel}>CENTS</Text>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({

  meterContainer: {
    borderWidth: 3,
    borderColor: 'black',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: Dimensions.get("screen").width * .90,
    height: Dimensions.get("screen").width * .80,
    position: 'relative',
    padding: 3
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centsText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  centsLabel: {
    fontSize: 12,
    marginTop: -8, // Adjust this to bring the label closer to the number
  }
});