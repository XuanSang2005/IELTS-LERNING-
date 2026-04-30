import { useQuery } from '@tanstack/react-query'
import type { LexiconDiscipline } from '@shared/schemas/lexicon'
import type { BandLevel } from '@shared/schemas/practice'
import type { TodayQueue } from '@shared/schemas/srs'
import { apiFetch } from '@/lib/api-client'
import { useAuthStore } from '@/stores/auth-store'

export function useTodayQueue(discipline: LexiconDiscipline, level: BandLevel) {
  const token = useAuthStore((s) => s.token)
  return useQuery({
    queryKey: ['lexicon', 'srs', 'today', discipline, level],
    queryFn: () =>
      apiFetch<TodayQueue>(`/lexicon/srs/me/today?discipline=${discipline}&level=${level}`),
    enabled: Boolean(token),
    staleTime: 30_000,
  })
}
