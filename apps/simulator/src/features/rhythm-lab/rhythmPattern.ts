export interface RhythmStep {
  id: string;
  label: string;
  pattern: boolean[];
}

export const starterPattern: RhythmStep[] = [
  {
    id: 'kick',
    label: 'Kick',
    pattern: [true, false, false, false, true, false, false, false],
  },
  {
    id: 'clap',
    label: 'Clap',
    pattern: [false, false, true, false, false, false, true, false],
  },
  {
    id: 'hat',
    label: 'Hat',
    pattern: [false, true, false, true, false, true, false, true],
  },
  {
    id: 'bass',
    label: 'Bass',
    pattern: [true, false, false, true, false, false, true, false],
  },
];
