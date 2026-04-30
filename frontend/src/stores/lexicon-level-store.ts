import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { LexiconDiscipline } from '@shared/schemas/lexicon'
import { DEFAULT_LEXICON_LEVEL } from '@shared/schemas/lexicon-plan'
import { BandLevelSchema, type BandLevel } from '@shared/schemas/practice'

/**
 * Persisted level choice per discipline. Mirror of useGrammarLevel but keyed
 * on discipline so the user can sit at Intermediate vocab while testing
 * Foundation linking.
 */
interface LexiconLevelState {
  byDiscipline: Record<LexiconDiscipline, BandLevel>
  setLevel: (discipline: LexiconDiscipline, level: BandLevel) => void
}

const DEFAULT_BY_DISCIPLINE: Record<LexiconDiscipline, BandLevel> = {
  vocabulary: DEFAULT_LEXICON_LEVEL,
  collocations: DEFAULT_LEXICON_LEVEL,
  linking: DEFAULT_LEXICON_LEVEL,
}

export const useLexiconLevel = create<LexiconLevelState>()(
  persist(
    (set) => ({
      byDiscipline: DEFAULT_BY_DISCIPLINE,
      setLevel: (discipline, level) =>
        set((state) => ({
          byDiscipline: { ...state.byDiscipline, [discipline]: level },
        })),
    }),
    {
      name: 'meridian-lexicon-level-v1',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ byDiscipline: s.byDiscipline }),
      merge: (persisted, current) => {
        if (!persisted || typeof persisted !== 'object') return current
        const candidate = persisted as { byDiscipline?: unknown }
        const raw = candidate.byDiscipline
        if (!raw || typeof raw !== 'object') return current
        const next: Record<LexiconDiscipline, BandLevel> = { ...DEFAULT_BY_DISCIPLINE }
        for (const discipline of ['vocabulary', 'collocations', 'linking'] as const) {
          const parsed = BandLevelSchema.safeParse((raw as Record<string, unknown>)[discipline])
          if (parsed.success) next[discipline] = parsed.data
        }
        return { ...current, byDiscipline: next }
      },
    },
  ),
)
