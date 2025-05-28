
export type GuitarStringNumber = 1 | 2 | 3 | 4 | 5 | 6;
export type BassStringNumber = 1 | 2 | 3 | 4 | 5 | 6; // Some basses have 5 or 6 strings
export type StringNumber = GuitarStringNumber | BassStringNumber;

export type NoteInfo = {
  note: string;
  octave: number;
};

export type TuningMap = Record<StringNumber, NoteInfo>;

export type Tuning = {
  name: string;
  id: number;
  tuning: TuningMap;
};

export const guitarTunings = [
  {
    name: "Guitar: Standard",
    id: 0,
    tuning: {
      1: {note: "E", octave: 4,},
      2: {note: "B", octave: 3},
      3: {note: "G", octave: 3},
      4:{note: "D", octave: 3},
      5: {note: "A",octave: 2},
      6: {note: "E",octave: 2},
    }
  },
  {
    name: "Guitar: Drop D",
    id: 1,
    tuning: {
       1: { note: "E", octave: 4 },
  2: { note: "B", octave: 3 },
  3: { note: "G", octave: 3 },
  4: { note: "D", octave: 3 },
  5: { note: "A", octave: 2 },
  6: { note: "D", octave: 2 },
    }
  },
  {
    name: "Guitar: Drop C",
    id: 2,
    tuning: {
      1: { note: "D", octave: 4 },
  2: { note: "A", octave: 3 },
  3: { note: "F", octave: 3 },
  4: { note: "C", octave: 3 },
  5: { note: "G", octave: 2 },
  6: { note: "C", octave: 2 },
    }
  },
  {
    name: "Guitar: Half-tone Down",
    id: 3,
    tuning: {
      1: { note: "Eb", octave: 4 },
  2: { note: "Bb", octave: 3 },
  3: { note: "F#", octave: 3 },
  4: { note: "C#", octave: 3 },
  5: { note: "Ab", octave: 2 },
  6: { note: "Eb", octave: 2 },
    }
  },
  {
    name: "Guitar: Whole Tone Down",
    id: 4,
    tuning: {
       1: { note: "D", octave: 4 },
  2: { note: "A", octave: 3 },
  3: { note: "F", octave: 3 },
  4: { note: "C", octave: 3 },
  5: { note: "G", octave: 2 },
  6: { note: "D", octave: 2 },
    }
  },
  {
    name: "Guitar: Open D",
    id: 5,
    tuning: {
       1: { note: "D", octave: 4 },
  2: { note: "A", octave: 3 },
  3: { note: "F#", octave: 3 },
  4: { note: "D", octave: 3 },
  5: { note: "A", octave: 2 },
  6: { note: "D", octave: 2 },
    }
  },
  {
    name: "Guitar: Open G",
    id: 6,
    tuning: {
       1: { note: "D", octave: 4 },
  2: { note: "B", octave: 3 },
  3: { note: "G", octave: 3 },
  4: { note: "D", octave: 3 },
  5: { note: "G", octave: 2 },
  6: { note: "D", octave: 2 },
    }
  },
  {
    name: "Guitar: Open C",
    id: 7,
    tuning: {
       1: { note: "E", octave: 4 },
  2: { note: "C", octave: 4 },
  3: { note: "G", octave: 3 },
  4: { note: "C", octave: 3 },
  5: { note: "G", octave: 2 },
  6: { note: "C", octave: 2 },
    }
  },
  {
    name: "Guitar: DADGAD",
    id: 8,
    tuning: {
       1: { note: "D", octave: 4 },
  2: { note: "A", octave: 3 },
  3: { note: "G", octave: 3 },
  4: { note: "D", octave: 3 },
  5: { note: "A", octave: 2 },
  6: { note: "D", octave: 2 },
    }
  },
  {
    name: "Guitar: NST",
    id: 9,
    tuning: {
      1: { note: "G", octave: 4 },
  2: { note: "E", octave: 4 },
  3: { note: "C", octave: 4 },
  4: { note: "A", octave: 3 },
  5: { note: "G", octave: 2 },
  6: { note: "C", octave: 2 },
    }
  }
]



/* BASS */

export const bassTunings = [
  {
    name: "Bass: Standard",
    id: 0,
    tuning: {
      1: { note: "G", octave: 2 },
      2: { note: "D", octave: 2 },
      3: { note: "A", octave: 1 },
      4: { note: "E", octave: 1 },
    }
  },
  {
    name: "Bass: Half-Tone Down",
    id: 1,
    tuning: {
      1: { note: "F#", octave: 2 },
      2: { note: "C#", octave: 2 },
      3: { note: "Ab", octave: 1 },
      4: { note: "Eb", octave: 1 },
    }
  },
  {
    name: "Bass: Drop-D",
    id: 2,
    tuning: {
      1: { note: "G", octave: 2 },
      2: { note: "D", octave: 2 },
      3: { note: "A", octave: 1 },
      4: { note: "D", octave: 1 },
    }
  },
  {
    name: "Bass (Whole-Tone Down)",
    id: 3,
    tuning: {
      1: { note: "F", octave: 2 },
      2: { note: "C", octave: 2 },
      3: { note: "G", octave: 1 },
      4: { note: "D", octave: 1 },
    }
  },
  {
    name: "Bass: BEAD",
    id: 4,
    tuning: {
  1: { note: "D", octave: 2 },
  2: { note: "A", octave: 1 },
  3: { note: "E", octave: 1 },
  4: { note: "B", octave: 0 },
}
  },
  {
    name: "Bass: Drop C",
    id: 5,
    tuning: {
  1: { note: "F", octave: 2 },
  2: { note: "C", octave: 2 },
  3: { note: "G", octave: 1 },
  4: { note: "C", octave: 1 },
}
  },
  {
    name: "Bass (Standard 5)",
    id: 6,
    tuning: {
  1: { note: "G", octave: 2 },
  2: { note: "D", octave: 2 },
  3: { note: "A", octave: 1 },
  4: { note: "E", octave: 1 },
  5: { note: "B", octave: 0 },
}
  },
  {
    name: "Bass (Standard 6",
    id: 7,
    tuning: {
  1: { note: "C", octave: 3 },
  2: { note: "G", octave: 2 },
  3: { note: "D", octave: 2 },
  4: { note: "A", octave: 1 },
  5: { note: "E", octave: 1 },
  6: { note: "B", octave: 0 },
}
  }
]

