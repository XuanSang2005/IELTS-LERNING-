import { useQuery } from '@tanstack/react-query'
import type { LexiconDiscipline } from '@shared/schemas/lexicon'
import type { LexiconItem } from '@shared/schemas/lexicon-items'
import type { BandLevel } from '@shared/schemas/practice'
import { apiFetch } from '@/lib/api-client'
import { useAuthStore } from '@/stores/auth-store'

export function useWeekItems(params: {
  discipline: LexiconDiscipline
  level: BandLevel
  week: number
}) {
  const token = useAuthStore((s) => s.token)
  const { discipline, level, week } = params
  return useQuery({
    queryKey: ['lexicon', 'items', 'week', discipline, level, week],
    queryFn: () =>
      apiFetch<LexiconItem[]>(
        `/lexicon/items?discipline=${discipline}&level=${level}&week=${week}`,
      ),
    enabled: Boolean(token),
    staleTime: 10 * 60_000,
  })
}
