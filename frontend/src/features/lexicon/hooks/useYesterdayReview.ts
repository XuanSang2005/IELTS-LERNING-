import { useQuery } from '@tanstack/react-query'
import type { YesterdayReview } from '@shared/schemas/srs'
import { apiFetch } from '@/lib/api-client'
import { useAuthStore } from '@/stores/auth-store'

/**
 * Items the user introduced yesterday in their local timezone, plus a flag
 * indicating whether they have any SRS history at all (Day 1 detection).
 * Backend hydrates each card with its item's display fields.
 */
export function useYesterdayReview() {
  const token = useAuthStore((s) => s.token)
  return useQuery({
    queryKey: ['lexicon', 'srs', 'yesterday'],
    queryFn: () => apiFetch<YesterdayReview>('/lexicon/srs/me/yesterday'),
    enabled: Boolean(token),
    staleTime: 5 * 60_000,
  })
}
