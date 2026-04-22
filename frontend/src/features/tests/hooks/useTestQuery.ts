import { useQuery } from '@tanstack/react-query'
import type { Test } from '@shared/schemas/test'
import { apiFetch } from '@/lib/api-client'

export const testQueryKey = (testId: string) => ['tests', testId] as const

/** Single test by id, auth-required. */
export function useTestQuery(testId: string | undefined) {
  return useQuery({
    queryKey: testQueryKey(testId ?? '_'),
    enabled: Boolean(testId),
    queryFn: () => apiFetch<Test>(`/tests/${testId}`),
    staleTime: 5 * 60 * 1000,
  })
}
