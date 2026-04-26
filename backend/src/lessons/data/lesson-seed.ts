import type { Lesson } from '@shared/schemas/lesson'
import { FOUNDATION_LESSONS } from './foundation-lessons'
import { INTERMEDIATE_LESSONS } from './intermediate-lessons'
import { ADVANCED_LESSONS } from './advanced-lessons'
import { MASTERY_LESSONS } from './mastery-lessons'

// Grammar lessons only. Four arcs of twelve weeks each, one lesson per week.
// Day numbers are assigned sequentially across arcs (foundation 1–12,
// intermediate 13–24, advanced 25–36, mastery 37–48) so `findByDay` remains
// unique. Other disciplines (vocabulary, collocations, linking) were removed
// end-to-end because no frontend surface consumes them — reintroduce entries
// here + their model registrations if those disciplines get their own pages.
export const LESSON_SEED: Lesson[] = [
  ...FOUNDATION_LESSONS,
  ...INTERMEDIATE_LESSONS,
  ...ADVANCED_LESSONS,
  ...MASTERY_LESSONS,
]
