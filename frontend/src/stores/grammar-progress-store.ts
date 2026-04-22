import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { z } from 'zod'
import { BandLevelSchema, type BandLevel } from '@shared/schemas/practice'
import { DEFAULT_GRAMMAR_LEVEL } from '@shared/schemas/grammar-plan'

const WeekProgressSchema = z.object({
  lessonRead: z.boolean(),
  practiceScore: z.number().min(0).max(1).optional(),
  practiceCompletedAt: z.string().optional(),
  reviewPassed: z.boolean(),
})
export type WeekProgress = z.infer<typeof WeekProgressSchema>

type LevelWeeks = Record<number, WeekProgress>
type ProgressByLevel = Partial<Record<BandLevel, LevelWeeks>>

const LegacyShapeSchema = z.object({
  weeks: z.record(z.string(), WeekProgressSchema),
})
const ByLevelShapeSchema = z.object({
  byLevel: z.record(z.string(), z.record(z.string(), WeekProgressSchema)),
})

const EMPTY_WEEK: WeekProgress = {
  lessonRead: false,
  reviewPassed: false,
}

function mergeWeek(target: LevelWeeks, week: number, patch: Partial<WeekProgress>): LevelWeeks {
  return {
    ...target,
    [week]: { ...(target[week] ?? EMPTY_WEEK), ...patch },
  }
}

interface GrammarProgressState {
  byLevel: ProgressByLevel
  getWeek: (level: BandLevel, week: number) => WeekProgress
  markLessonRead: (level: BandLevel, week: number) => void
  recordPractice: (level: BandLevel, week: number, score: number) => void
  markReviewPassed: (level: BandLevel, week: number) => void
  resetWeek: (level: BandLevel, week: number) => void
}

function updateLevel(
  state: GrammarProgressState,
  level: BandLevel,
  transform: (weeks: LevelWeeks) => LevelWeeks,
): Pick<GrammarProgressState, 'byLevel'> {
  const current = state.byLevel[level] ?? {}
  return { byLevel: { ...state.byLevel, [level]: transform(current) } }
}

export const useGrammarProgress = create<GrammarProgressState>()(
  persist(
    (set, get) => ({
      byLevel: {},
      getWeek: (level, week) => get().byLevel[level]?.[week] ?? EMPTY_WEEK,
      markLessonRead: (level, week) =>
        set((state) =>
          updateLevel(state, level, (weeks) => mergeWeek(weeks, week, { lessonRead: true })),
        ),
      recordPractice: (level, week, score) =>
        set((state) =>
          updateLevel(state, level, (weeks) => {
            const prev = weeks[week]?.practiceScore ?? 0
            const next = Math.max(prev, Math.min(1, Math.max(0, score)))
            return mergeWeek(weeks, week, {
              practiceScore: next,
              practiceCompletedAt: new Date().toISOString(),
            })
          }),
        ),
      markReviewPassed: (level, week) =>
        set((state) =>
          updateLevel(state, level, (weeks) => mergeWeek(weeks, week, { reviewPassed: true })),
        ),
      resetWeek: (level, week) =>
        set((state) =>
          updateLevel(state, level, (weeks) => {
            const next = { ...weeks }
            delete next[week]
            return next
          }),
        ),
    }),
    {
      name: 'meridian-grammar-progress-v1',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ byLevel: s.byLevel }),
      merge: (persisted, current) => {
        if (!persisted || typeof persisted !== 'object') return current
        const candidate = persisted as Record<string, unknown>

        // New shape
        const byLevelParsed = ByLevelShapeSchema.safeParse({
          byLevel: candidate.byLevel ?? {},
        })
        if (byLevelParsed.success) {
          const byLevel: ProgressByLevel = {}
          for (const [levelKey, weekMap] of Object.entries(byLevelParsed.data.byLevel)) {
            const lvl = BandLevelSchema.safeParse(levelKey)
            if (!lvl.success) continue
            const weeks: LevelWeeks = {}
            for (const [weekKey, value] of Object.entries(weekMap)) {
              const n = Number(weekKey)
              if (Number.isInteger(n) && n >= 1 && n <= 12) weeks[n] = value
            }
            byLevel[lvl.data] = weeks
          }
          return { ...current, byLevel }
        }

        // Legacy shape → migrate under the default level
        const legacyParsed = LegacyShapeSchema.safeParse({ weeks: candidate.weeks ?? {} })
        if (!legacyParsed.success) return current
        const weeks: LevelWeeks = {}
        for (const [key, value] of Object.entries(legacyParsed.data.weeks)) {
          const n = Number(key)
          if (Number.isInteger(n) && n >= 1 && n <= 12) weeks[n] = value
        }
        return { ...current, byLevel: { [DEFAULT_GRAMMAR_LEVEL]: weeks } }
      },
    },
  ),
)
