import type { BandLevel } from '@shared/schemas/practice'

/** Apply official IELTS overall-band rounding to a 4-skill arithmetic mean. */
export function ieltsRound(raw: number): number {
  // Round to nearest 0.25 first to detect the exact .25/.75 boundaries.
  const quarter = Math.round(raw * 4) / 4
  // .25 → up to .5, .75 → up to next whole. Else round-half-up to nearest 0.5.
  const fractional = quarter - Math.floor(quarter)
  if (fractional === 0.25) return Math.floor(quarter) + 0.5
  if (fractional === 0.75) return Math.floor(quarter) + 1.0
  // Round to nearest 0.5 normally
  return Math.round(quarter * 2) / 2
}

/** Heuristic — speaking is rarely available in v1. Estimate from writing. */
export function estimateSpeakingFromWriting(writingBand: number): number {
  return clampBand(writingBand - 0.5)
}

export function clampBand(b: number): number {
  if (b < 4.0) return 4.0
  if (b > 9.0) return 9.0
  return b
}

/** Map an overall band to a recommended programme level. */
export function bandToLevel(overall: number): BandLevel {
  if (overall < 5.5) return 'foundation'
  if (overall < 6.5) return 'intermediate'
  if (overall < 7.5) return 'advanced'
  return 'mastery'
}

/** Build the BandRange tuple shown on the dashboard from an overall point band. */
export function rangeFromOverall(overall: number): [number, number] {
  return [clampBand(overall - 0.5), clampBand(overall + 0.5)]
}
