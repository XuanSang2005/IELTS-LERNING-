import { useQuery } from '@tanstack/react-query'
import type { LexiconDiscipline } from '@shared/schemas/lexicon'
import type { LexiconPlan } from '@shared/schemas/lexicon-plan'
import type { BandLevel } from '@shared/schemas/practice'
import { apiFetch } from '@/lib/api-client'
import { useAuthStore } from '@/stores/auth-store'

export function useLexiconPlan(discipline: LexiconDiscipline, level: BandLevel) {
  const token = useAuthStore((s) => s.token)
  return useQuery({
    queryKey: ['lexicon', 'plan', discipline, level],
    queryFn: () =>
      apiFetch<LexiconPlan>(`/lexicon/plan?discipline=${discipline}&level=${level}`),
    enabled: Boolean(token),
    staleTime: 30 * 60_000,
  })
}
