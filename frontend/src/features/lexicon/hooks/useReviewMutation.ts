import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { LexiconDiscipline } from '@shared/schemas/lexicon'
import type { BandLevel } from '@shared/schemas/practice'
import type { SrsCard, SubmitReviewDto } from '@shared/schemas/srs'
import { apiFetch } from '@/lib/api-client'

export function useReviewMutation(opts: {
  discipline: LexiconDiscipline
  level: BandLevel
}) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dto: SubmitReviewDto) =>
      apiFetch<SrsCard>('/lexicon/srs/me/review', {
        method: 'POST',
        body: JSON.stringify(dto),
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['lexicon', 'srs', 'today', opts.discipline, opts.level],
      })
      void queryClient.invalidateQueries({
        queryKey: ['lexicon', 'progress', opts.discipline, opts.level],
      })
    },
  })
}
