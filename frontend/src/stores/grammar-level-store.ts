import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { BandLevelSchema, type BandLevel } from '@shared/schemas/practice'
import { DEFAULT_GRAMMAR_LEVEL } from '@shared/schemas/grammar-plan'

interface GrammarLevelState {
  level: BandLevel
  setLevel: (level: BandLevel) => void
}

export const useGrammarLevel = create<GrammarLevelState>()(
  persist(
    (set) => ({
      level: DEFAULT_GRAMMAR_LEVEL,
      setLevel: (level) => set({ level }),
    }),
    {
      name: 'meridian-grammar-level-v1',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ level: s.level }),
      merge: (persisted, current) => {
        if (!persisted || typeof persisted !== 'object') return current
        const candidate = persisted as { level?: unknown }
        const parsed = BandLevelSchema.safeParse(candidate.level)
        if (!parsed.success) return current
        return { ...current, level: parsed.data }
      },
    },
  ),
)
