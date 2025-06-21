
export const noteNames = [
  'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B', 
];

const enharmonicMap: Record<string, string> = {
  'Db': 'C#',
  'D#': 'Eb',
  'Gb': 'F#',
  'G#': 'Ab',
  'A#': 'Bb',
  'Cb': 'B',
  'Fb': 'E',
  'E#': 'F',
  'B#': 'C'
};

function normalizeNote(note: string): string {
  return enharmonicMap[note] || note;
}

export type Temperament = "Equal" | "Just" | "Pythagorean" | "Meantone" | "Werckmeister";

function getTemperamentRatios(temperament: Temperament, key: string): Record<string, number> {
  switch (temperament) {
    case "Just":
      return getJustRatiosForKey(key);
    case "Pythagorean":
      return getPythagoreanRatiosForKey(key)
    case "Meantone":
      return getMeantoneRatiosForKey(key);
    case "Werckmeister":
      return getWerckmeisterRatiosForKey(key);
    default:
      throw new Error(`Temperament ${temperament} not implemented`);
  }
}


export function freqToNote({frequency, calibration, temperament, temperamentRoot }:{frequency: number, calibration: number, temperament: Temperament, temperamentRoot?: string}
): {
  note: string
  octave: number
  detectedFrequency: number
    targetFrequency: number;

}|null {

  if (!frequency || frequency < 16.35) {
  return null; // or { note: null, octave: null, ... }
}

  const A4 = calibration;
  if (temperament !== 'Equal' && temperamentRoot !== undefined) {
    const ratios = getTemperamentRatios(temperament, temperamentRoot);
    let closestNote = '';
    let closestFreq = 0;
    let closestDiff = Infinity;
    let closestOctave = 4;

    // Check a few octaves around middle C
    for (let octave = 0; octave <= 8; octave++) {
      for (const note of Object.keys(ratios)) {
        const testFreq = noteToFreq({note, octave, calibration, temperament, temperamentRoot});
        const diff = Math.abs(testFreq - frequency);
        if (diff < closestDiff) {
          closestDiff = diff;
          closestNote = note;
          closestFreq = testFreq;
          closestOctave = octave;
        }
      }
    }

    return {
      note: closestNote,
      octave: closestOctave,
      detectedFrequency: frequency,
      targetFrequency:  closestFreq
    };
  }

  const n = Math.round(12 * Math.log2(frequency / A4));
  const midiNumber = 69 + n;

  const noteIndex = midiNumber % 12; 
  const octave = Math.floor(midiNumber / 12) - 1;
  
  const noteName = noteNames[noteIndex];

  const targetFrequency = noteToFreq({
    note: noteName,
    octave,
    calibration,
    temperament: "Equal",
    temperamentRoot: "A", // Any value is fine here; it's ignored in Equal temperament
  });

  return { 
    note: noteName, 
    octave: octave,
    detectedFrequency: frequency,
    targetFrequency:  targetFrequency
  };
}

export function centsFromNote(frequency: number, targetFreq: number): number {
  return Math.round(1200 * Math.log2(frequency / targetFreq));
}

export function noteToFreq({note, octave, calibration, temperament, temperamentRoot}:{note: string, octave: number, calibration: number, temperament: Temperament, temperamentRoot: string}
): number {
  const A4 = calibration;
  if (temperament !== 'Equal' && !temperamentRoot) {
  throw new Error(`${temperament} temperament requires a root note`);
}
  if (temperament !== 'Equal' && temperamentRoot !== undefined) {
    const baseA4 = calibration;
    const baseC4 = baseA4 * Math.pow(2, -9 / 12); // C4 in equal temperament

    const ratios = getTemperamentRatios(temperament, temperamentRoot);
    const ratio = ratios[normalizeNote(note)];
    if (!ratio) throw new Error(`Missing ratio for note ${note} in key ${temperamentRoot}`);

    const octaveDifference = octave - 4;
    const frequency = baseC4 * ratio * Math.pow(2, octaveDifference);
    return frequency;
  }
  const noteIndex = noteNames.indexOf(note);
  if (noteIndex < 0) {
   
    throw new Error('Invalid note name');
  }
  const midiNumber = (octave + 1) * 12 + noteIndex;

  const frequency = A4 * Math.pow(2, (midiNumber - 69) / 12);
  return frequency;
}

const justRatios: Record<string, number> = {
  'C': 1/1,
  'D': 9/8,
  'E': 5/4,
  'F': 4/3,
  'G': 3/2,
  'A': 5/3,
  'B': 15/8,
  'C#': 25/24,
  'Eb': 6/5,
  'F#': 45/32,
  'Ab': 8/5,
  'Bb': 9/5,
};


function getJustRatiosForKey(key: string): Record<string, number> {
  const semitoneOffsets: Record<string, number> = {
    'C': 0,  'C#': 1,  'D': 2,  'Eb': 3,  'E': 4,  'F': 5,
    'F#': 6, 'G': 7,  'Ab': 8, 'A': 9, 'Bb': 10, 'B': 11,
  };

  const keyRatio = justRatios[key];
  if (!keyRatio) throw new Error(`Invalid root note for Just Intonation: ${key}`);

  const transposedRatios: Record<string, number> = {};
  for (const note in justRatios) {
    transposedRatios[note] = justRatios[note] / keyRatio;
  }

  return transposedRatios;
}


function getPythagoreanRatiosForKey(key: string): Record<string, number> {
  const baseRatios: Record<string, number> = {
    'C': 1.0,
    'G': 3 / 2,
    'D': 9 / 8,
    'A': 27 / 16,
    'E': 81 / 64,
    'B': 243 / 128,
    'F#': 729 / 512,
    'Db': 1024 / 729,
    'Ab': 2048 / 2187,
    'Eb': 4096 / 6561,
    'Bb': 8192 / 6561,
    'F': 4 / 3,
    'C#': 2187 / 2048,
    'G#': 6561 / 4096,
  };

  // Normalize ratios relative to the root
  const rootRatio = baseRatios[key];
  if (!rootRatio) throw new Error(`Invalid root note for Pythagorean temperament: ${key}`);

  const normalized: Record<string, number> = {};
  for (const note in baseRatios) {
    normalized[note] = baseRatios[note] / rootRatio;
  }

  return normalized;
}


const meantoneRatios: Record<string, number> = {
  'C': 1.0,
  'C#': 1.0696,
  'D': 1.1180,
  'Eb': 1.1963,
  'E': 1.2500,
  'F': 1.3375,
  'F#': 1.4238,
  'G': 1.4953,
  'Ab': 1.5802,
  'A': 1.6719,
  'Bb': 1.7818,
  'B': 1.8692,
};


function getMeantoneRatiosForKey(key: string): Record<string, number> {
  const baseRatios: Record<string, number> = {
    'C': 1.0,
    'C#': 1.0696,
    'D': 1.1180,
    'Eb': 1.1963,
    'E': 1.2500,
    'F': 1.3375,
    'F#': 1.4238,
    'G': 1.4953,
    'Ab': 1.5802,
    'A': 1.6719,
    'Bb': 1.7818,
    'B': 1.8692,
  };

  const rootRatio = baseRatios[key];
  if (!rootRatio) throw new Error(`Invalid root note for Meantone temperament: ${key}`);

  const normalized: Record<string, number> = {};
  for (const note in baseRatios) {
    normalized[note] = baseRatios[note] / rootRatio;
  }

  return normalized;
}

const werckmeisterIII: Record<string, number> = {
  'C': 1.0,
  'C#': 1.059,    // slightly smaller than ET
  'D': 1.122,
  'Eb': 1.185,
  'E': 1.250,
  'F': 1.335,
  'F#': 1.414,
  'G': 1.498,
  'Ab': 1.580,
  'A': 1.667,
  'Bb': 1.778,
  'B': 1.866,
};

function getWerckmeisterRatiosForKey(key: string): Record<string, number> {
  const baseRatios: Record<string, number> = {
    'C': 1.0,
    'C#': 1.059,
    'D': 1.122,
    'Eb': 1.185,
    'E': 1.250,
    'F': 1.335,
    'F#': 1.414,
    'G': 1.498,
    'Ab': 1.580,
    'A': 1.667,
    'Bb': 1.778,
    'B': 1.866,
  };

  const rootRatio = baseRatios[key];
  if (!rootRatio) throw new Error(`Invalid root note for Werckmeister temperament: ${key}`);

  const normalized: Record<string, number> = {};
  for (const note in baseRatios) {
    normalized[note] = baseRatios[note] / rootRatio;
  }

  return normalized;
}

