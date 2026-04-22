import type { NoticingItem, ReviewQuality } from '@shared/schemas/practice'

export interface Sm2Result {
  interval: number
  ease: number
  retired: boolean
  reviewCount: number
}

const QUALITY_MAP: Record<ReviewQuality, number> = {
  forgot: 0,
  hard: 2,
  good: 4,
  easy: 5,
}

export function applySm2(
  item: Pick<NoticingItem, 'interval' | 'ease' | 'reviewCount'>,
  quality: ReviewQuality,
): Sm2Result {
  const q = QUALITY_MAP[quality]
  let interval = item.interval
  let reviewCount = item.reviewCount
  let ease = item.ease

  if (q < 3) {
    interval = 1
    reviewCount = 0
  } else {
    if (reviewCount === 0) interval = 1
    else if (reviewCount === 1) interval = 6
    else interval = Math.round(interval * ease)
    reviewCount += 1
  }

  ease = ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  ease = Math.max(1.3, Math.min(2.8, ease))

  const retired = reviewCount >= 6 && ease >= 2.5

  return { interval, ease, retired, reviewCount }
}

export function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

export function isoDaysFromNow(days: number): string {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}
