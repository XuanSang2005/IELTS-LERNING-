import type { BandLevel, BandRange, PerformanceMetrics } from '../schemas/practice'

// Learning-path ranges per the Meridian method:
//   foundation    5.0 – 5.5
//   intermediate  6.0 – 6.5
//   advanced      7.0 – 7.5
//   mastery       8.0 – 9.0
const LEVEL_TO_RANGE: Record<BandLevel, [number, number]> = {
  foundation: [5.0, 5.5],
  intermediate: [6.0, 6.5],
  advanced: [7.0, 7.5],
  mastery: [8.0, 9.0],
}

export function levelToRange(level: BandLevel): [number, number] {
  return LEVEL_TO_RANGE[level]
}

export function levelToMidBand(level: BandLevel): number {
  const [lo, hi] = LEVEL_TO_RANGE[level]
  return roundToIeltsHalf((lo + hi) / 2)
}

// Official IELTS rounding:
//   .25  → round up to .5   (e.g. 5.75 → 6.0, 6.25 → 6.5)
//   .75  → round up to 1.0
export function roundToIeltsHalf(n: number): number {
  const whole = Math.floor(n)
  const frac = n - whole
  if (frac < 0.25) return whole
  if (frac < 0.75) return whole + 0.5
  return whole + 1
}

function bandToLevel(estimated: number): BandLevel {
  if (estimated < 5.75) return 'foundation'
  if (estimated < 6.75) return 'intermediate'
  if (estimated < 7.75) return 'advanced'
  return 'mastery'
}

function rangeAroundEstimate(estimated: number): [number, number] {
  const mid = roundToIeltsHalf(estimated)
  return [Math.max(4, mid - 0.5), Math.min(9, mid + 0.5)]
}

/**
 * Estimate a new band from rolling performance signals.
 *
 * Inputs the algorithm weighs:
 *   - writing bands (most recent 4 entries — heaviest signal)
 *   - listening/reading weekly band scores (recent 4)
 *   - review accuracy rate (scaled onto 5.0–8.5 range as a proxy)
 *
 * If we have less than 3 data points in total, we return the current band
 * unchanged with confidence lowered to `low`.
 */
export function calculateBand(
  current: BandRange,
  perf: PerformanceMetrics,
  currentWeek: number,
): BandRange {
  const writingSamples = perf.writingBands.slice(-4).map((w) => w.band)
  const testSamples = perf.weeklyTestScores.slice(-4).map((t) => t.band)

  const accuracyBand = perf.reviewAccuracy.length
    ? reviewAccuracyToBand(perf.reviewAccuracy.slice(-4))
    : null

  const signals: number[] = []
  // Writing counts twice — it is the most informative single signal.
  for (const b of writingSamples) {
    signals.push(b, b)
  }
  signals.push(...testSamples)
  if (accuracyBand !== null) signals.push(accuracyBand)

  if (signals.length < 3) {
    return {
      ...current,
      confidence: 'low',
      setBy: 'algorithm',
      updatedAt: new Date().toISOString(),
    }
  }

  const avg = signals.reduce((s, v) => s + v, 0) / signals.length
  const estimated = roundToIeltsHalf(avg)
  const level = bandToLevel(estimated)
  const range = rangeAroundEstimate(estimated)

  const confidence: BandRange['confidence'] =
    signals.length >= 8 ? 'high' : signals.length >= 5 ? 'medium' : 'low'

  return {
    level,
    estimatedBand: estimated,
    range,
    confidence: currentWeek < 2 ? 'low' : confidence,
    setBy: 'algorithm',
    updatedAt: new Date().toISOString(),
  }
}

function reviewAccuracyToBand(samples: PerformanceMetrics['reviewAccuracy']): number {
  const total = samples.reduce((s, r) => s + r.totalCount, 0)
  if (total === 0) return 5.5
  const correct = samples.reduce((s, r) => s + r.correctCount, 0)
  const rate = correct / total // 0..1
  // Map [0.5 .. 0.95] onto [5.0 .. 8.5] linearly; clamp outside that window.
  const clamped = Math.max(0.5, Math.min(0.95, rate))
  const t = (clamped - 0.5) / (0.95 - 0.5)
  return 5.0 + t * 3.5
}
