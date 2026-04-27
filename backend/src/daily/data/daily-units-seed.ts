import type { DailyUnit } from '@shared/schemas/daily-unit'
import { FOUNDATION_UNITS } from './foundation-units'
import { INTERMEDIATE_UNITS } from './intermediate-units'

/**
 * Twenty mock daily units — 5 days × 4 levels.
 *
 * Phase 1B (this commit) — foundation + intermediate (10 units).
 * Phase 1C (next)        — advanced + mastery (10 units, still empty).
 *
 * The service seeds whichever units are present; advanced/mastery cycles
 * fall back to the empty-state UI until phase 1C lands.
 */
export const DAILY_UNITS_SEED: DailyUnit[] = [
  ...FOUNDATION_UNITS,
  ...INTERMEDIATE_UNITS,
]
