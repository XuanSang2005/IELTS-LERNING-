import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import type {
  BandLevel,
  DailyLog,
  NoticingItem,
  PracticeStateShape,
  StepNumber,
  UserProfile,
} from '@shared/schemas/practice'
import { apiFetch } from '@/lib/api-client'
import { useAuthStore } from '@/stores/auth-store'

export const practiceStateKey = ['practice', 'state'] as const

export function usePracticeState() {
  const token = useAuthStore((s) => s.token)
  return useQuery({
    queryKey: practiceStateKey,
    queryFn: () => apiFetch<PracticeStateShape>('/practice/state'),
    enabled: Boolean(token),
    staleTime: 60_000,
  })
}

export function useProfile(): UserProfile | undefined {
  return usePracticeState().data?.profile
}

/**
 * Single source of truth for the user's BandLevel across Grammar, Lexicon,
 * and Daily Loop. Reads `profile.currentBand.level`, set by the diagnostic
 * (or by `/onboarding/band` Recalibrate). Falls back to `'intermediate'` —
 * matches the default in `defaultProfile()` on the backend — for the brief
 * window between mount and the first `/practice/state` response.
 */
export function useUserBandLevel(): BandLevel {
  return useProfile()?.currentBand.level ?? 'intermediate'
}

export function useNoticingItems(): NoticingItem[] {
  return usePracticeState().data?.noticingItems ?? EMPTY_ITEMS
}

export function useDailyLogs(): DailyLog[] {
  return usePracticeState().data?.dailyLogs ?? EMPTY_LOGS
}

const EMPTY_ITEMS: NoticingItem[] = []
const EMPTY_LOGS: DailyLog[] = []

function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

function isoDaysAgo(days: number): string {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() - days)
  return d.toISOString().slice(0, 10)
}

export function useDueItems(): NoticingItem[] {
  const items = useNoticingItems()
  return useMemo(() => {
    const today = todayIso()
    return items
      .filter((i) => !i.retired && i.nextReviewDate <= today)
      .sort((a, b) => a.nextReviewDate.localeCompare(b.nextReviewDate))
  }, [items])
}

export function useRecallQuizItems(): NoticingItem[] {
  const items = useNoticingItems()
  return useMemo(() => {
    const y = isoDaysAgo(1)
    return items.filter((i) => i.capturedDate === y)
  }, [items])
}

export function useItemsCapturedToday(): NoticingItem[] {
  const items = useNoticingItems()
  return useMemo(() => {
    const today = todayIso()
    return items.filter((i) => i.capturedDate === today)
  }, [items])
}

export function useTodayLog(): DailyLog {
  const logs = useDailyLogs()
  return useMemo(() => {
    const today = todayIso()
    return (
      logs.find((l) => l.date === today) ?? {
        date: today,
        stepsCompleted: [] as StepNumber[],
        itemsCaptured: 0,
        wordsWritten: 0,
        minutesSpent: 0,
      }
    )
  }, [logs])
}

