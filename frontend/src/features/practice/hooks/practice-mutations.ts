import { useMutation, useQueryClient } from '@tanstack/react-query'
import type {
  AddNoticingItemDto,
  BandLevel,
  BandRange,
  DailyLog,
  NoticingItem,
  PracticeStateShape,
  ReviewQuality,
  StepNumber,
  UpdateNoticingItemDto,
} from '@shared/schemas/practice'
import { apiFetch } from '@/lib/api-client'
import { applySm2 } from '@/features/practice/utils/sm2'
import { isoDaysFromNow, todayIso } from '@/features/practice/utils/dates'
import { practiceStateKey } from './practice-queries'

type State = PracticeStateShape

function tmpId(prefix: string): string {
  return `${prefix}-tmp-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

function patchTodayLog(state: State, patch: (log: DailyLog) => DailyLog): State {
  const today = todayIso()
  const exists = state.dailyLogs.some((l) => l.date === today)
  const next: DailyLog[] = exists
    ? state.dailyLogs.map((l) => (l.date === today ? patch(l) : l))
    : [
        patch({
          date: today,
          stepsCompleted: [] as StepNumber[],
          itemsCaptured: 0,
          wordsWritten: 0,
          minutesSpent: 0,
        }),
        ...state.dailyLogs,
      ]
  return { ...state, dailyLogs: next }
}

export function useAddNoticingItemMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: AddNoticingItemDto) =>
      apiFetch<NoticingItem>('/practice/noticing-items', {
        method: 'POST',
        body: JSON.stringify(dto),
      }),
    onMutate: async (dto) => {
      await qc.cancelQueries({ queryKey: practiceStateKey })
      const previous = qc.getQueryData<State>(practiceStateKey)
      if (previous) {
        const today = todayIso()
        const optimistic: NoticingItem = {
          id: tmpId('item'),
          text: dto.text,
          category: dto.category,
          context: dto.context,
          source: 'user',
          sourceRef: dto.sourceRef,
          note: dto.note,
          capturedDate: today,
          nextReviewDate: isoDaysFromNow(1),
          interval: 0,
          ease: 2.5,
          reviewCount: 0,
          retired: false,
        }
        const withItem: State = {
          ...previous,
          noticingItems: [...previous.noticingItems, optimistic],
        }
        const withLog = patchTodayLog(withItem, (l) => ({
          ...l,
          itemsCaptured: l.itemsCaptured + 1,
        }))
        qc.setQueryData<State>(practiceStateKey, withLog)
      }
      return { previous }
    },
    onError: (_err, _dto, ctx) => {
      if (ctx?.previous) qc.setQueryData(practiceStateKey, ctx.previous)
    },
    onSettled: () => {
      void qc.invalidateQueries({ queryKey: practiceStateKey })
    },
  })
}

export function useReviewItemMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, quality }: { id: string; quality: ReviewQuality }) =>
      apiFetch<NoticingItem>(`/practice/noticing-items/${id}/review`, {
        method: 'PATCH',
        body: JSON.stringify({ quality }),
      }),
    onMutate: async ({ id, quality }) => {
      await qc.cancelQueries({ queryKey: practiceStateKey })
      const previous = qc.getQueryData<State>(practiceStateKey)
      if (previous) {
        const next: State = {
          ...previous,
          noticingItems: previous.noticingItems.map((item) => {
            if (item.id !== id) return item
            const result = applySm2(item, quality)
            return {
              ...item,
              interval: result.interval,
              ease: result.ease,
              reviewCount: result.reviewCount,
              retired: result.retired,
              nextReviewDate: isoDaysFromNow(result.interval),
            }
          }),
        }
        qc.setQueryData<State>(practiceStateKey, next)
      }
      return { previous }
    },
    onError: (_err, _v, ctx) => {
      if (ctx?.previous) qc.setQueryData(practiceStateKey, ctx.previous)
    },
    onSettled: () => {
      void qc.invalidateQueries({ queryKey: practiceStateKey })
    },
  })
}


export function useCompleteStepMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (step: StepNumber) =>
      apiFetch<DailyLog>(`/practice/daily-logs/today/steps/${step}`, {
        method: 'POST',
      }),
    onMutate: async (step) => {
      await qc.cancelQueries({ queryKey: practiceStateKey })
      const previous = qc.getQueryData<State>(practiceStateKey)
      if (previous) {
        const next = patchTodayLog(previous, (l) =>
          l.stepsCompleted.includes(step)
            ? l
            : { ...l, stepsCompleted: [...l.stepsCompleted, step].sort((a, b) => a - b) },
        )
        qc.setQueryData<State>(practiceStateKey, next)
      }
      return { previous }
    },
    onError: (_err, _s, ctx) => {
      if (ctx?.previous) qc.setQueryData(practiceStateKey, ctx.previous)
    },
    onSettled: () => {
      void qc.invalidateQueries({ queryKey: practiceStateKey })
    },
  })
}

export function useIncrementWordsMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (n: number) =>
      apiFetch<DailyLog>('/practice/daily-logs/today/words', {
        method: 'POST',
        body: JSON.stringify({ n }),
      }),
    onMutate: async (n) => {
      await qc.cancelQueries({ queryKey: practiceStateKey })
      const previous = qc.getQueryData<State>(practiceStateKey)
      if (previous) {
        const next = patchTodayLog(previous, (l) => ({
          ...l,
          wordsWritten: l.wordsWritten + n,
        }))
        qc.setQueryData<State>(practiceStateKey, next)
      }
      return { previous }
    },
    onError: (_err, _n, ctx) => {
      if (ctx?.previous) qc.setQueryData(practiceStateKey, ctx.previous)
    },
    onSettled: () => {
      void qc.invalidateQueries({ queryKey: practiceStateKey })
    },
  })
}

export function useUpdateNoticingItemMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: UpdateNoticingItemDto }) =>
      apiFetch<NoticingItem>(`/practice/noticing-items/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(patch),
      }),
    onSuccess: (updated) => {
      qc.setQueryData<State>(practiceStateKey, (prev) =>
        prev
          ? {
              ...prev,
              noticingItems: prev.noticingItems.map((item) =>
                item.id === updated.id ? updated : item,
              ),
            }
          : prev,
      )
    },
    onSettled: () => {
      void qc.invalidateQueries({ queryKey: practiceStateKey })
    },
  })
}

export function useDeleteNoticingItemMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) =>
      apiFetch<void>(`/practice/noticing-items/${id}`, { method: 'DELETE' }),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: practiceStateKey })
      const previous = qc.getQueryData<State>(practiceStateKey)
      if (previous) {
        qc.setQueryData<State>(practiceStateKey, {
          ...previous,
          noticingItems: previous.noticingItems.filter((item) => item.id !== id),
        })
      }
      return { previous }
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.previous) qc.setQueryData(practiceStateKey, ctx.previous)
    },
    onSettled: () => {
      void qc.invalidateQueries({ queryKey: practiceStateKey })
    },
  })
}

export function useSetNoteOnItemMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, note }: { id: string; note: string }) =>
      apiFetch<NoticingItem>(`/practice/noticing-items/${id}/note`, {
        method: 'PATCH',
        body: JSON.stringify({ note }),
      }),
    onSuccess: (updated) => {
      qc.setQueryData<State>(practiceStateKey, (prev) =>
        prev
          ? {
              ...prev,
              noticingItems: prev.noticingItems.map((item) =>
                item.id === updated.id ? updated : item,
              ),
            }
          : prev,
      )
    },
    onSettled: () => {
      void qc.invalidateQueries({ queryKey: practiceStateKey })
    },
  })
}

function applyBandToState(state: State, next: BandRange): State {
  return {
    ...state,
    profile: { ...state.profile, currentBand: next },
  }
}

export function useSetBandMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (level: BandLevel) =>
      apiFetch<BandRange>('/practice/band', {
        method: 'PATCH',
        body: JSON.stringify({ level }),
      }),
    onSuccess: (band) => {
      qc.setQueryData<State>(practiceStateKey, (prev) => (prev ? applyBandToState(prev, band) : prev))
    },
    onSettled: () => {
      void qc.invalidateQueries({ queryKey: practiceStateKey })
    },
  })
}

export function useReassessBandMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: () =>
      apiFetch<BandRange>('/practice/band/reassess', { method: 'POST' }),
    onSuccess: (band) => {
      qc.setQueryData<State>(practiceStateKey, (prev) => (prev ? applyBandToState(prev, band) : prev))
    },
    onSettled: () => {
      void qc.invalidateQueries({ queryKey: practiceStateKey })
    },
  })
}
