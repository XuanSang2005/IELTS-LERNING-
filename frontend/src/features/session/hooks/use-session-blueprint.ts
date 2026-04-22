import { useMemo } from 'react'
import { planSession, type SessionBlueprint } from '@/features/practice/utils/session-planner'
import {
  useNoticingItems,
  useProfile,
  usePracticeState,
} from '@/features/practice/hooks/practice-queries'

export function useSessionBlueprint(): SessionBlueprint | null {
  const profile = useProfile()
  const items = useNoticingItems()
  const { data } = usePracticeState()
  const dailyLogs = data?.dailyLogs

  return useMemo(() => {
    if (!profile) return null
    return planSession(profile, items, dailyLogs ?? [])
  }, [profile, items, dailyLogs])
}
