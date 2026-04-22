import type { BandLevel } from '@shared/schemas/practice'

export interface BandOption {
  level: BandLevel
  label: string
  range: string
  body: string
}

export const BAND_OPTIONS: BandOption[] = [
  {
    level: 'foundation',
    label: 'Foundation',
    range: 'Band 5.0 – 5.5',
    body: 'I understand spoken English in short exchanges and write simple sentences.',
  },
  {
    level: 'intermediate',
    label: 'Intermediate',
    range: 'Band 6.0 – 6.5',
    body: 'I follow most academic content but make frequent errors in Writing.',
  },
  {
    level: 'advanced',
    label: 'Advanced',
    range: 'Band 7.0 – 7.5',
    body: "My fluency is strong; I'm aiming to eliminate small inconsistencies.",
  },
  {
    level: 'mastery',
    label: 'Mastery',
    range: 'Band 8.0+',
    body: 'Near-native command; polishing range and precision.',
  },
]
