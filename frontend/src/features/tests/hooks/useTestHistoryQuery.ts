import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { TestResultSchema, type TestResult } from '@shared/schemas/test'

const HISTORY_KEY = 'meridian-test-history-v1'
export const historyQueryKey = ['tests', 'history'] as const

function readHistory(): TestResult[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed
      .map((item) => TestResultSchema.safeParse(item))
      .filter((r): r is { success: true; data: TestResult } => r.success)
      .map((r) => r.data)
  } catch {
    return []
  }
}

function writeHistory(results: TestResult[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(HISTORY_KEY, JSON.stringify(results))
}

export function useTestHistoryQuery() {
  return useQuery({
    queryKey: historyQueryKey,
    queryFn: async () => readHistory(),
    staleTime: 10_000,
  })
}

export function useSaveResultMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (result: TestResult) => {
      // TODO(backend-swap): POST /api/tests/:id/results
      const history = readHistory()
      const next = [result, ...history.filter((r) => r.id !== result.id)]
      writeHistory(next.slice(0, 50))
      return result
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: historyQueryKey })
    },
  })
}

export function findResultById(id: string): TestResult | undefined {
  return readHistory().find((r) => r.id === id)
}

export function findLatestResultForTest(testId: string): TestResult | undefined {
  return readHistory()
    .filter((r) => r.testId === testId)
    .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))[0]
}
