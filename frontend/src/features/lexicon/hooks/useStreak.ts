import { useQuery } from '@tanstack/react-query'
import { apiFetch } from '@/lib/api-client'
import { useAuthStore } from '@/stores/auth-store'

interface StreakResponse {
  days: number
}

/** Derives the user's consecutive-day review streak from srs_cards. */
export function useStreak() {
  const token = useAuthStore((s) => s.token)
  return useQuery({
    queryKey: ['lexicon', 'srs', 'streak'],
    queryFn: () => apiFetch<StreakResponse>('/lexicon/srs/me/streak'),
    enabled: Boolean(token),
    staleTime: 60_000 * 5,
  })
}
