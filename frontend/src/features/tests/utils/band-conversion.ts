import type { Skill } from '@shared/schemas/test'

interface BandBucket {
  min: number
  max: number
  band: number
}

// Official IELTS Listening raw-to-band table (rounded to 0.5).
const LISTENING: BandBucket[] = [
  { min: 39, max: 40, band: 9.0 },
  { min: 37, max: 38, band: 8.5 },
  { min: 35, max: 36, band: 8.0 },
  { min: 32, max: 34, band: 7.5 },
  { min: 30, max: 31, band: 7.0 },
  { min: 26, max: 29, band: 6.5 },
  { min: 23, max: 25, band: 6.0 },
  { min: 18, max: 22, band: 5.5 },
  { min: 16, max: 17, band: 5.0 },
  { min: 13, max: 15, band: 4.5 },
  { min: 10, max: 12, band: 4.0 },
  { min: 8, max: 9, band: 3.5 },
  { min: 6, max: 7, band: 3.0 },
  { min: 4, max: 5, band: 2.5 },
  { min: 0, max: 3, band: 2.0 },
]

// Official IELTS Reading (Academic) raw-to-band table.
const READING: BandBucket[] = [
  { min: 39, max: 40, band: 9.0 },
  { min: 37, max: 38, band: 8.5 },
  { min: 35, max: 36, band: 8.0 },
  { min: 33, max: 34, band: 7.5 },
  { min: 30, max: 32, band: 7.0 },
  { min: 27, max: 29, band: 6.5 },
  { min: 23, max: 26, band: 6.0 },
  { min: 19, max: 22, band: 5.5 },
  { min: 15, max: 18, band: 5.0 },
  { min: 13, max: 14, band: 4.5 },
  { min: 10, max: 12, band: 4.0 },
  { min: 8, max: 9, band: 3.5 },
  { min: 6, max: 7, band: 3.0 },
  { min: 4, max: 5, band: 2.5 },
  { min: 0, max: 3, band: 2.0 },
]

interface BandConversion {
  band: number
  range: [number, number]
}

function tableFor(skill: Skill): BandBucket[] {
  return skill === 'listening' ? LISTENING : READING
}

/**
 * Convert a raw score to a band number and a presentable range.
 * Range logic: the band itself is always included, and the adjacent
 * band is added when the raw score is near the bucket boundary (±1 mark),
 * matching the "Band 6.0 – 6.5" display rule.
 */
export function convertRawToBand(
  rawScore: number,
  totalQuestions: number,
  skill: Skill,
): BandConversion {
  // Scale when taking a short test (fewer than 40 questions).
  const scaled =
    totalQuestions === 40
      ? rawScore
      : Math.round((rawScore / Math.max(1, totalQuestions)) * 40)

  const table = tableFor(skill)
  const bucket = table.find((b) => scaled >= b.min && scaled <= b.max) ?? {
    band: 2.0,
    min: 0,
    max: 0,
  }
  const bucketIndex = table.indexOf(bucket)
  const upper = bucketIndex > 0 ? table[bucketIndex - 1].band : bucket.band
  const lower =
    bucketIndex < table.length - 1 ? table[bucketIndex + 1].band : bucket.band

  const nearUpper = bucket.max - scaled <= 1
  const nearLower = scaled - bucket.min <= 1

  let rangeLow = bucket.band
  let rangeHigh = bucket.band
  if (nearUpper) rangeHigh = upper
  if (nearLower) rangeLow = lower
  if (rangeLow > rangeHigh) [rangeLow, rangeHigh] = [rangeHigh, rangeLow]

  return { band: bucket.band, range: [rangeLow, rangeHigh] }
}

export function formatBand(band: number): string {
  return band.toFixed(1).replace(/\.0$/, '.0')
}

export function formatBandRange(range: [number, number]): string {
  const [lo, hi] = range
  return lo === hi ? `Band ${formatBand(lo)}` : `Band ${formatBand(lo)} – ${formatBand(hi)}`
}
