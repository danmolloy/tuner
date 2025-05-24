
export const noteNames = [
  'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B', 
];
export function freqToNote(frequency: number, calibration: number, temperament: "Equal"| "Just", justRoot?: string
): {
  note: string
  octave: number
} {
  const A4 = calibration;
  if (temperament === 'Just' && justRoot !== undefined) {
    const ratios = getJustRatiosForKey(justRoot);
    let closestNote = '';
    let closestFreq = 0;
    let closestDiff = Infinity;
    let closestOctave = 4;

    // Check a few octaves around middle C
    for (let octave = 0; octave <= 8; octave++) {
      for (const note of Object.keys(ratios)) {
        const testFreq = noteToFreq(note, octave, calibration, 'Just', justRoot);
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
    };
  }

  const n = Math.round(12 * Math.log2(frequency / A4));
  const midiNumber = 69 + n;

  const noteIndex = midiNumber % 12; 
  const octave = Math.floor(midiNumber / 12) - 1;
  const noteName = noteNames[noteIndex];

  return { 
    note: noteName, 
    octave: octave
  };
}

export function centsFromNote(frequency: number, targetFreq: number): number {
  return Math.round(1200 * Math.log2(frequency / targetFreq));
}

export function noteToFreq(note: string, octave: number, calibration: number, temperament: "Equal"| "Just", justRoot?: string
): number {
  const A4 = calibration;
  if (temperament === 'Just' && justRoot !== undefined) {
    const baseA4 = calibration;
    const baseC4 = baseA4 * Math.pow(2, -9 / 12); // C4 in equal temperament

    const ratios = getJustRatiosForKey(justRoot);
    const ratio = ratios[note];
    if (!ratio) throw new Error(`Missing ratio for note ${note} in key ${justRoot}`);

    const octaveDifference = octave - 4;
    const frequency = baseC4 * ratio * Math.pow(2, octaveDifference);
    return frequency;
  }
  const noteIndex = noteNames.indexOf(note);
  if (noteIndex < 0) throw new Error('Invalid note name');
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
  const noteOrder = [
    'C', 'C#', 'D', 'Eb', 'E', 'F',
    'F#', 'G', 'Ab', 'A', 'Bb', 'B'
  ];

  const baseRatios = justRatios;
  const keyIndex = noteOrder.indexOf(key);
  if (keyIndex === -1) throw new Error("Invalid key");

  const rotatedNotes = noteOrder.slice(keyIndex).concat(noteOrder.slice(0, keyIndex));
  const rotatedRatios = {} as Record<string, number>;

  const tonicRatio = baseRatios[key];

  rotatedNotes.forEach((note, i) => {
    const relativeNote = noteOrder[i];
    const rawRatio = baseRatios[relativeNote];
    rotatedRatios[note] = rawRatio / tonicRatio;
  });

  return rotatedRatios;
}
