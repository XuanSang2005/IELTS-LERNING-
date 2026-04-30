import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { LexiconDisciplineSchema, type LexiconDiscipline } from '@shared/schemas/lexicon'

interface LexiconDisciplineState {
  active: LexiconDiscipline
  setActive: (discipline: LexiconDiscipline) => void
}

export const useLexiconDiscipline = create<LexiconDisciplineState>()(
  persist(
    (set) => ({
      active: 'vocabulary',
      setActive: (discipline) => set({ active: discipline }),
    }),
    {
      name: 'meridian-lexicon-discipline-v1',
      storage: createJSONStorage(() => localStorage),
      merge: (persisted, current) => {
        if (!persisted || typeof persisted !== 'object') return current
        const candidate = persisted as { active?: unknown }
        const parsed = LexiconDisciplineSchema.safeParse(candidate.active)
        if (!parsed.success) return current
        return { ...current, active: parsed.data }
      },
    },
  ),
)
