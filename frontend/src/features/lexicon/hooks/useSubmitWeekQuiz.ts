import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { LexiconDiscipline } from '@shared/schemas/lexicon'
import type { SubmitWeekQuizDto } from '@shared/schemas/lexicon-progress'
import type { BandLevel } from '@shared/schemas/practice'
import { apiFetch } from '@/lib/api-client'

export function useSubmitWeekQuiz(opts: {
  discipline: LexiconDiscipline
  level: BandLevel
}) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dto: SubmitWeekQuizDto) =>
      apiFetch<{ reviewPassed: boolean }>('/lexicon/progress/me/week-quiz', {
        method: 'POST',
        body: JSON.stringify(dto),
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['lexicon', 'progress', opts.discipline, opts.level],
      })
    },
  })
}
