import { useQuery } from '@tanstack/react-query'
import type { VocabWord } from '@shared/schemas/vocabulary'
import { apiFetch } from '@/lib/api-client'
import { useAuthStore } from '@/stores/auth-store'

export interface VocabularyFilter {
  register?: 'B1' | 'B2' | 'C1'
  frequency?: 'high' | 'medium' | 'low'
  topic?: string
  q?: string
}

function toQueryString(filter: VocabularyFilter): string {
  const params = new URLSearchParams()
  if (filter.register) params.set('register', filter.register)
  if (filter.frequency) params.set('frequency', filter.frequency)
  if (filter.topic) params.set('topic', filter.topic)
  if (filter.q) params.set('q', filter.q)
  const s = params.toString()
  return s ? `?${s}` : ''
}

export function useVocabulary(filter: VocabularyFilter = {}) {
  const token = useAuthStore((s) => s.token)
  return useQuery({
    queryKey: ['vocabulary', filter],
    queryFn: () => apiFetch<VocabWord[]>(`/vocabulary${toQueryString(filter)}`),
    enabled: Boolean(token),
    staleTime: 5 * 60_000,
  })
}
