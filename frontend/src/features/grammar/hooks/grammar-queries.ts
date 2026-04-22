import { useQuery } from '@tanstack/react-query'
import type { Lesson, LessonSummary } from '@shared/schemas/lesson'
import type { BandLevel, Phase } from '@shared/schemas/practice'
import { apiFetch } from '@/lib/api-client'
import { useAuthStore } from '@/stores/auth-store'

export interface GrammarLessonFilter {
  level?: BandLevel
  week?: number
  phase?: Phase
}

function toQueryString(filter: GrammarLessonFilter): string {
  const params = new URLSearchParams()
  params.set('discipline', 'grammar')
  if (filter.level) params.set('level', filter.level)
  if (filter.week) params.set('week', String(filter.week))
  if (filter.phase) params.set('phase', String(filter.phase))
  return `?${params.toString()}`
}

export function useGrammarLessons(filter: GrammarLessonFilter = {}) {
  const token = useAuthStore((s) => s.token)
  return useQuery({
    queryKey: ['lessons', 'grammar', filter],
    queryFn: () => apiFetch<LessonSummary[]>(`/lessons${toQueryString(filter)}`),
    enabled: Boolean(token),
    staleTime: 5 * 60_000,
  })
}

export function useLessonById(id: string | null) {
  const token = useAuthStore((s) => s.token)
  return useQuery({
    queryKey: ['lessons', 'detail', id],
    queryFn: () => apiFetch<Lesson>(`/lessons/${id}`),
    enabled: Boolean(token) && !!id,
    staleTime: 10 * 60_000,
  })
}
