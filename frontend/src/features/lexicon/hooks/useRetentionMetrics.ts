import { useQuery } from '@tanstack/react-query'
import type { LexiconDiscipline } from '@shared/schemas/lexicon'
import type { RetentionMetrics } from '@shared/schemas/srs'
import { apiFetch } from '@/lib/api-client'
import { useAuthStore } from '@/stores/auth-store'

export function useRetentionMetrics(discipline: LexiconDiscipline) {
  const token = useAuthStore((s) => s.token)
  return useQuery({
    queryKey: ['lexicon', 'metrics', discipline],
    queryFn: () => apiFetch<RetentionMetrics>(`/lexicon/metrics/me?discipline=${discipline}`),
    enabled: Boolean(token),
    staleTime: 60_000,
  })
}
