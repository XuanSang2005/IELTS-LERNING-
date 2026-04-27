import { useQuery } from '@tanstack/react-query'
import type { DailyReviewSet, DailyUnit } from '@shared/schemas/daily-unit'
import type { BandLevel } from '@shared/schemas/practice'
import { apiFetch } from '@/lib/api-client'
import { useAuthStore } from '@/stores/auth-store'

interface DailyTodayResponse {
  unit: DailyUnit | null
}

interface DailyReviewResponse {
  review: DailyReviewSet | null
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

/** Today's full daily unit for the user's current band level. */
export function useDailyToday(level: BandLevel | undefined, enabled: boolean = true) {
  const token = useAuthStore((s) => s.token)
  const date = todayIso()
  return useQuery({
    queryKey: ['daily', 'today', level, date],
    queryFn: async (): Promise<DailyUnit | null> => {
      const res = await apiFetch<DailyTodayResponse>(`/daily/today?level=${level}&date=${date}`)
      return res?.unit ?? null
    },
    enabled: Boolean(token) && enabled && Boolean(level),
    staleTime: 30 * 60_000,
  })
}

/** Yesterday's review surface — vocab deck + grammar focus only. */
export function useDailyReview(level: BandLevel | undefined, enabled: boolean = true) {
  const token = useAuthStore((s) => s.token)
  const date = todayIso()
  return useQuery({
    queryKey: ['daily', 'review', level, date],
    queryFn: async (): Promise<DailyReviewSet | null> => {
      const res = await apiFetch<DailyReviewResponse>(`/daily/review?level=${level}&date=${date}`)
      return res?.review ?? null
    },
    enabled: Boolean(token) && enabled && Boolean(level),
    staleTime: 30 * 60_000,
  })
}

/** Day-of-cycle (1-5) for a given ISO date. Mirrors backend logic so the UI can label sidebar/masthead before the fetch resolves. */
export function dailyDayFromIsoDate(isoDate: string): 1 | 2 | 3 | 4 | 5 {
  const days = Math.floor(new Date(isoDate).getTime() / 86_400_000)
  const idx = ((days % 5) + 5) % 5
  return ((idx + 1) as 1 | 2 | 3 | 4 | 5)
}
