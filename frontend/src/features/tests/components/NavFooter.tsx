import type { Question } from '@shared/schemas/test'

interface NavFooterProps {
  questions: Question[]
  answers: Record<string, unknown>
  flagged: Record<string, boolean>
  activeQuestionId: string | null
  onJump: (questionId: string) => void
  onPrev: () => void
  onNext: () => void
  onFlagActive: () => void
  onSubmit: () => void
  canPrev: boolean
  canNext: boolean
}

export function NavFooter({
  questions,
  answers,
  flagged,
  activeQuestionId,
  onJump,
  onPrev,
  onNext,
  onFlagActive,
  onSubmit,
  canPrev,
  canNext,
}: NavFooterProps) {
  return (
    <div className="shrink-0 border-t border-line bg-ivory">
      <div className="flex w-full flex-wrap items-center justify-between gap-3 px-4 py-3 md:gap-4 md:px-10 md:py-4 xl:px-14">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrev}
            disabled={!canPrev}
            className="border border-line px-4 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-graphite transition-colors hover:border-ink hover:text-ink disabled:cursor-not-allowed disabled:opacity-50 md:py-2.5"
          >
            ← PREV
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!canNext}
            className="border border-line px-4 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-graphite transition-colors hover:border-ink hover:text-ink disabled:cursor-not-allowed disabled:opacity-50 md:py-2.5"
          >
            NEXT →
          </button>
        </div>

        <div className="-mx-4 order-3 flex flex-1 basis-full snap-x snap-mandatory items-center gap-2 overflow-x-auto px-4 [scrollbar-width:none] md:order-2 md:mx-0 md:basis-auto md:flex-wrap md:justify-center md:overflow-visible md:px-0">
          {questions.map((q) => {
            const answered = Boolean(answers[q.id])
            const isFlagged = Boolean(flagged[q.id])
            const active = q.id === activeQuestionId
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => onJump(q.id)}
                title={`Question ${q.number}`}
                aria-label={`Question ${q.number}${answered ? ' answered' : ''}${isFlagged ? ' flagged' : ''}`}
                className={`flex h-11 w-11 shrink-0 snap-start items-center justify-center border font-mono text-[14px] transition-colors md:h-9 md:w-9 md:text-[13px] ${
                  active
                    ? 'border-ink bg-ink text-ivory'
                    : answered
                      ? 'border-claret bg-claret text-ivory'
                      : isFlagged
                        ? 'border-sage text-sage'
                        : 'border-line text-graphite hover:border-ink hover:text-ink'
                }`}
              >
                {q.number}
              </button>
            )
          })}
        </div>

        <div className="order-2 flex items-center gap-2 md:order-3">
          <button
            type="button"
            onClick={onFlagActive}
            disabled={!activeQuestionId}
            className="border border-line px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-graphite transition-colors hover:border-sage hover:text-sage disabled:cursor-not-allowed disabled:opacity-50"
          >
            FLAG
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="group relative inline-flex items-center gap-2 overflow-hidden bg-ink-warm px-6 py-3 font-geist text-[12px] md:py-2.5 font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)]"
          >
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
            <span className="relative z-10">Submit</span>
            <span className="relative z-10 text-claret">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}
