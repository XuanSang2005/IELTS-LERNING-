import { useQuery } from '@tanstack/react-query'
import type { Test } from '@shared/schemas/test'
import { apiFetch } from '@/lib/api-client'

export const testsQueryKey = ['tests', 'all'] as const

/** List every test in the library. */
export function useTestsQuery() {
  return useQuery({
    queryKey: testsQueryKey,
    queryFn: () => apiFetch<Test[]>('/tests'),
    staleTime: 5 * 60 * 1000, // tests rarely change mid-session
  })
}
