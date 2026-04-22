import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { CreateSubmissionDto, Submission } from '@shared/schemas/submission'
import { SubmissionSchema } from '@shared/schemas/submission'
import { apiFetch } from '@/lib/api-client'

export const submissionKeys = {
  all: ['submissions'] as const,
  byId: (id: string) => ['submissions', 'byId', id] as const,
  latest: ['submissions', 'latest'] as const,
  today: (date: string) => ['submissions', 'today', date] as const,
}

function parseSubmission(raw: unknown): Submission {
  return SubmissionSchema.parse(raw)
}

function parseNullableSubmission(raw: unknown): Submission | null {
  if (raw == null) return null
  return SubmissionSchema.parse(raw)
}

export function useSubmissionQuery(id: string | null) {
  return useQuery({
    queryKey: id ? submissionKeys.byId(id) : submissionKeys.all,
    queryFn: async () => {
      if (!id) return null
      const raw = await apiFetch<Submission>(`/submissions/${id}`)
      return parseSubmission(raw)
    },
    enabled: !!id,
    // Poll while grading is in progress.
    refetchInterval: (query) => {
      const data = query.state.data as Submission | null | undefined
      return data?.status === 'grading' || data?.status === 'submitted' ? 3000 : false
    },
  })
}

export function useLatestSubmissionQuery() {
  return useQuery({
    queryKey: submissionKeys.latest,
    queryFn: async () => {
      const raw = await apiFetch<Submission | null>('/submissions/latest')
      return parseNullableSubmission(raw)
    },
    refetchInterval: (query) => {
      const data = query.state.data as Submission | null | undefined
      return data?.status === 'grading' || data?.status === 'submitted' ? 3000 : false
    },
  })
}

export function useTodaySubmissionQuery(isoDate?: string) {
  const date = isoDate ?? new Date().toISOString().slice(0, 10)
  return useQuery({
    queryKey: submissionKeys.today(date),
    queryFn: async () => {
      const raw = await apiFetch<Submission | null>(`/submissions/today?date=${encodeURIComponent(date)}`)
      return parseNullableSubmission(raw)
    },
    refetchInterval: (query) => {
      const data = query.state.data as Submission | null | undefined
      return data?.status === 'grading' || data?.status === 'submitted' ? 3000 : false
    },
  })
}

export function useCreateSubmissionMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (dto: CreateSubmissionDto) => {
      const raw = await apiFetch<Submission>('/submissions', {
        method: 'POST',
        body: JSON.stringify(dto),
      })
      return parseSubmission(raw)
    },
    onSuccess: (submission) => {
      qc.setQueryData(submissionKeys.byId(submission.id), submission)
      void qc.invalidateQueries({ queryKey: submissionKeys.latest })
      void qc.invalidateQueries({ queryKey: submissionKeys.today(submission.sessionDate) })
    },
  })
}

export function useRetryGradingMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (submissionId: string) => {
      const raw = await apiFetch<Submission>(`/submissions/${submissionId}/grade`, {
        method: 'POST',
      })
      return parseSubmission(raw)
    },
    onSuccess: (submission) => {
      qc.setQueryData(submissionKeys.byId(submission.id), submission)
    },
  })
}
