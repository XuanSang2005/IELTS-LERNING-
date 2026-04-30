import { useQuery } from '@tanstack/react-query'
import type { LexiconDiscipline } from '@shared/schemas/lexicon'
import type { LexiconWeekProgress } from '@shared/schemas/lexicon-progress'
import type { BandLevel } from '@shared/schemas/practice'
import { apiFetch } from '@/lib/api-client'
import { useAuthStore } from '@/stores/auth-store'

export function useLexiconProgressQuery(discipline: LexiconDiscipline, level: BandLevel) {
  const token = useAuthStore((s) => s.token)
  return useQuery({
    queryKey: ['lexicon', 'progress', discipline, level],
    queryFn: () =>
      apiFetch<LexiconWeekProgress[]>(
        `/lexicon/progress/me?discipline=${discipline}&level=${level}`,
      ),
    enabled: Boolean(token),
    staleTime: 60_000,
  })
}
