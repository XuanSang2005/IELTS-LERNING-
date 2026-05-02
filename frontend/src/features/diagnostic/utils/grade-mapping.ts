/**
 * Frontend mirror of the backend grade table. Used for in-flight progress
 * displays only; the server is always authoritative on the final band.
 */
const SCORE_TABLE: ReadonlyArray<{ correct: number; band: number }> = [
  { correct: 5, band: 8.0 },
  { correct: 4, band: 7.0 },
  { correct: 3, band: 6.0 },
  { correct: 2, band: 5.0 },
  { correct: 1, band: 4.5 },
  { correct: 0, band: 4.0 },
]

export function correctToBand(correct: number, total: number): number {
  if (total === 0) return 4.0
  if (total === 5) {
    return SCORE_TABLE.find((row) => row.correct === correct)?.band ?? 4.0
  }
  const ratio = correct / total
  const raw = 4.0 + ratio * 4.0
  return Math.round(raw * 2) / 2
}

/** Word count used by the writing step submit-gating + display. */
export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

/** Format a half-band number as "6.5" / "8.0". */
export function formatBand(band: number): string {
  return band.toFixed(1)
}
