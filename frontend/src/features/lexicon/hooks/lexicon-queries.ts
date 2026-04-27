import { useQuery } from '@tanstack/react-query'
import type { Collocation, CollocationPattern } from '@shared/schemas/collocation'
import type { LinkingDevice, LinkingFunction } from '@shared/schemas/linking-device'
import type { VocabWord } from '@shared/schemas/vocabulary'
import { apiFetch } from '@/lib/api-client'
import { useAuthStore } from '@/stores/auth-store'

type Register = 'B1' | 'B2' | 'C1'
type Frequency = 'high' | 'medium' | 'low'

export interface VocabularyFilter {
  register?: Register
  frequency?: Frequency
  topic?: string
  q?: string
}

export interface CollocationsFilter {
  pattern?: CollocationPattern
  register?: Register
  topic?: string
  q?: string
}

export interface LinkingFilter {
  function?: LinkingFunction
  register?: Register
  q?: string
}

function appendIfTruthy(params: URLSearchParams, key: string, value: string | undefined) {
  if (value) params.set(key, value)
}

function toQs(params: URLSearchParams): string {
  const s = params.toString()
  return s ? `?${s}` : ''
}

function vocabularyQs(filter: VocabularyFilter): string {
  const p = new URLSearchParams()
  appendIfTruthy(p, 'register', filter.register)
  appendIfTruthy(p, 'frequency', filter.frequency)
  appendIfTruthy(p, 'topic', filter.topic)
  appendIfTruthy(p, 'q', filter.q)
  return toQs(p)
}

function collocationsQs(filter: CollocationsFilter): string {
  const p = new URLSearchParams()
  appendIfTruthy(p, 'pattern', filter.pattern)
  appendIfTruthy(p, 'register', filter.register)
  appendIfTruthy(p, 'topic', filter.topic)
  appendIfTruthy(p, 'q', filter.q)
  return toQs(p)
}

function linkingQs(filter: LinkingFilter): string {
  const p = new URLSearchParams()
  appendIfTruthy(p, 'function', filter.function)
  appendIfTruthy(p, 'register', filter.register)
  appendIfTruthy(p, 'q', filter.q)
  return toQs(p)
}

export function useVocabulary(filter: VocabularyFilter = {}, enabled = true) {
  const token = useAuthStore((s) => s.token)
  return useQuery({
    queryKey: ['lexicon', 'vocabulary', filter],
    queryFn: () => apiFetch<VocabWord[]>(`/vocabulary${vocabularyQs(filter)}`),
    enabled: Boolean(token) && enabled,
    staleTime: 5 * 60_000,
  })
}

export function useCollocations(filter: CollocationsFilter = {}, enabled = true) {
  const token = useAuthStore((s) => s.token)
  return useQuery({
    queryKey: ['lexicon', 'collocations', filter],
    queryFn: () => apiFetch<Collocation[]>(`/collocations${collocationsQs(filter)}`),
    enabled: Boolean(token) && enabled,
    staleTime: 5 * 60_000,
  })
}

export function useLinking(filter: LinkingFilter = {}, enabled = true) {
  const token = useAuthStore((s) => s.token)
  return useQuery({
    queryKey: ['lexicon', 'linking', filter],
    queryFn: () => apiFetch<LinkingDevice[]>(`/linking${linkingQs(filter)}`),
    enabled: Boolean(token) && enabled,
    staleTime: 5 * 60_000,
  })
}
