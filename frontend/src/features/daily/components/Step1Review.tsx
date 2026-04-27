import { useMemo, useState } from 'react'
import type { DailyReviewSet, DailyVocabItem } from '@shared/schemas/daily-unit'
import { DAILY_STEPS } from '../data/step-config'
import { DailyShell } from './DailyShell'

const STEP = DAILY_STEPS[0]

const REGISTER_TINT: Record<'B1' | 'B2' | 'C1', string> = {
  B1: 'text-graphite',
  B2: 'text-sage',
  C1: 'text-claret',
}

const LETTERS = ['A', 'B', 'C', 'D'] as const

interface Step1ReviewProps {
  review: DailyReviewSet | null | undefined
  isLoading: boolean
  onAdvance: () => void
}

interface Choice {
  key: string
  text: string
  correct: boolean
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildVocabChoicesPerCard(vocab: DailyVocabItem[]): Choice[][] {
  return vocab.map((card, i) => {
    const distractors = shuffle(vocab.filter((_, j) => j !== i))
      .slice(0, 3)
      .map((o) => o.definition)
    const pool: Choice[] = [
      { key: '_correct', text: card.definition, correct: true },
      ...distractors.map((text, k) => ({ key: `_d${k}`, text, correct: false })),
    ]
    return shuffle(pool).map((c, idx) => ({ ...c, key: LETTERS[idx] }))
  })
}

function buildGrammarChoices(review: DailyReviewSet): Choice[] {
  const correct = review.grammarFocus.examples[0]
  const distractors = shuffle(review.vocab.map((v) => v.example))
    .filter((s) => !review.grammarFocus.examples.includes(s))
    .slice(0, 3)
  const pool: Choice[] = [
    { key: '_correct', text: correct, correct: true },
    ...distractors.map((text, k) => ({ key: `_d${k}`, text, correct: false })),
  ]
  return shuffle(pool).map((c, idx) => ({ ...c, key: LETTERS[idx] }))
}

export function Step1Review({ review, isLoading, onAdvance }: Step1ReviewProps) {
  const [cardIndex, setCardIndex] = useState(0)
  const [vocabAnswers, setVocabAnswers] = useState<Record<number, string>>({})
  const [grammarAnswer, setGrammarAnswer] = useState<string | null>(null)

  const vocabChoices = useMemo(
    () => (review?.vocab ? buildVocabChoicesPerCard(review.vocab) : []),
    [review?.vocab],
  )
  const grammarChoices = useMemo(() => (review ? buildGrammarChoices(review) : []), [review])

  if (isLoading) {
    return (
      <DailyShell step={STEP} onContinue={onAdvance}>
        <p className="font-fraunces text-[24px] italic text-graphite">
          Opening yesterday’s pages…
        </p>
      </DailyShell>
    )
  }

  if (!review || review.vocab.length === 0) {
    return (
      <DailyShell step={STEP} onContinue={onAdvance}>
        <div className="max-w-[64ch] border-l-2 border-claret pl-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-claret">
            ◆ NOTHING TO REVIEW
          </p>
          <h3 className="mt-4 font-fraunces text-[28px] leading-tight text-ink">
            You are starting fresh.
          </h3>
          <p className="mt-3 font-fraunces text-[20px] italic leading-relaxed text-graphite">
            There is nothing to review yet because yesterday’s session has not been written.
            Continue to today’s reading and the words you meet there will be waiting for you
            here tomorrow.
          </p>
        </div>
      </DailyShell>
    )
  }

  const totalVocab = review.vocab.length
  const card = review.vocab[cardIndex]
  const cardChoices = vocabChoices[cardIndex] ?? []
  const cardAnswered = vocabAnswers[cardIndex] !== undefined

  const answeredCount = Object.keys(vocabAnswers).length
  const vocabAllAnswered = answeredCount === totalVocab
  const grammarAnswered = grammarAnswer !== null

  const correctCount = Object.entries(vocabAnswers).reduce((acc, [i, key]) => {
    const list = vocabChoices[Number(i)] ?? []
    const c = list.find((x) => x.key === key)
    return acc + (c?.correct ? 1 : 0)
  }, 0)

  const grammarCorrect =
    grammarAnswer !== null && grammarChoices.find((c) => c.key === grammarAnswer)?.correct === true

  const handleVocabAnswer = (key: string) => {
    if (cardAnswered) return
    setVocabAnswers((prev) => ({ ...prev, [cardIndex]: key }))
  }

  const advanceCard = () => {
    if (cardIndex < totalVocab - 1) setCardIndex((i) => i + 1)
  }

  const canContinue = vocabAllAnswered && grammarAnswered
  const footnote = canContinue
    ? `Score · ${correctCount} / ${totalVocab} vocab · grammar ${
        grammarCorrect ? 'correct' : 'incorrect'
      }.`
    : !vocabAllAnswered
      ? `${totalVocab - answeredCount} card${totalVocab - answeredCount === 1 ? '' : 's'} remaining.`
      : 'Answer the grammar question to continue.'

  return (
    <DailyShell step={STEP} canContinue={canContinue} onContinue={onAdvance} footnote={footnote}>
      <div className="flex flex-col gap-14">
        {/* Row 1 — Vocab MC quiz */}
        <section className="w-full">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
              ◆ YESTERDAY’S TEN
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
              SCORE · <span className="text-claret">{correctCount}</span> / {totalVocab}
              <span className="mx-2">·</span>
              ANSWERED <span className="text-ink">{answeredCount}</span> / {totalVocab}
            </p>
          </div>

          <article className="mt-4 border border-line bg-ivory p-8 shadow-[0_8px_28px_-12px_rgba(20,18,16,0.18)] md:p-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
              CARD {String(cardIndex + 1).padStart(2, '0')} /{' '}
              {String(totalVocab).padStart(2, '0')}
            </p>

            <div className="mt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
                <span className="text-claret">{card.partOfSpeech.toUpperCase()}</span>
                <span className="mx-2">·</span>
                <span className={REGISTER_TINT[card.register]}>{card.register}</span>
              </p>
              <h3 className="mt-3 font-fraunces text-[clamp(40px,4vw,56px)] italic leading-none text-ink">
                {card.term}
              </h3>
            </div>

            <div className="mt-10 border-t border-line pt-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
                ◆ WHICH MEANING MATCHES?
              </p>

              <ul className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                {cardChoices.map((c) => {
                  const picked = vocabAnswers[cardIndex] === c.key
                  const tone = !cardAnswered
                    ? 'border-line text-ink hover:border-ink hover:bg-bone/40'
                    : c.correct
                      ? 'border-sage bg-sage/10 text-ink'
                      : picked
                        ? 'border-claret bg-claret/10 text-claret'
                        : 'border-line text-graphite/70'
                  return (
                    <li key={c.key}>
                      <button
                        type="button"
                        disabled={cardAnswered}
                        onClick={() => handleVocabAnswer(c.key)}
                        className={`flex w-full items-start gap-4 border ${tone} px-5 py-4 text-left transition-colors duration-200 disabled:cursor-default`}
                      >
                        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-graphite">
                          {c.key}
                        </span>
                        <span className="font-fraunces text-[17px] italic leading-relaxed md:text-[18px]">
                          {c.text}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>

              {cardAnswered && (
                <div className="mt-7 border-t border-dashed border-line pt-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-claret">
                    ◆ EXAMPLE
                  </p>
                  <blockquote className="mt-2 border-l-2 border-claret pl-4 font-fraunces text-[18px] italic leading-relaxed text-graphite md:text-[20px]">
                    {card.example}
                  </blockquote>
                  {card.vi && (
                    <p className="mt-3 font-fraunces text-[15px] italic text-graphite">
                      VN — {card.vi}
                    </p>
                  )}

                  <div className="mt-6 flex items-center justify-end">
                    {cardIndex < totalVocab - 1 ? (
                      <button
                        type="button"
                        onClick={advanceCard}
                        className="group inline-flex items-center gap-2 font-geist text-[14px] text-ink"
                      >
                        <span className="relative">
                          Next card
                          <span className="absolute -bottom-0.5 left-0 h-px w-full bg-line transition-colors duration-200 group-hover:bg-ink" />
                        </span>
                        <span className="text-[13px] text-claret transition-all duration-200 group-hover:translate-x-0.5">
                          →
                        </span>
                      </button>
                    ) : (
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-sage">
                        ◆ DECK COMPLETE
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </article>
        </section>

        {/* Row 2 — Grammar MC quiz */}
        <section className="w-full">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
            ◆ THE GRAMMAR THAT CARRIED THEM
          </p>

          <article className="mt-4 border border-line bg-ivory p-8 shadow-[0_8px_28px_-12px_rgba(20,18,16,0.18)] md:p-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
              GRAMMAR · DAY {String(review.fromDay).padStart(2, '0')}
            </p>

            <h3 className="mt-6 font-fraunces text-[clamp(28px,3vw,38px)] italic leading-tight text-ink">
              {review.grammarFocus.topic}
            </h3>

            <p className="mt-5 max-w-[80ch] font-fraunces text-[19px] leading-relaxed text-graphite md:text-[21px]">
              {review.grammarFocus.ruleSummary}
            </p>

            <div className="mt-10 border-t border-line pt-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
                ◆ WHICH SENTENCE APPLIES THIS RULE?
              </p>

              <ul className="mt-5 grid grid-cols-1 gap-3">
                {grammarChoices.map((c) => {
                  const picked = grammarAnswer === c.key
                  const tone = !grammarAnswered
                    ? 'border-line text-ink hover:border-ink hover:bg-bone/40'
                    : c.correct
                      ? 'border-sage bg-sage/10 text-ink'
                      : picked
                        ? 'border-claret bg-claret/10 text-claret'
                        : 'border-line text-graphite/70'
                  return (
                    <li key={c.key}>
                      <button
                        type="button"
                        disabled={grammarAnswered}
                        onClick={() => setGrammarAnswer(c.key)}
                        className={`flex w-full items-start gap-4 border ${tone} px-5 py-4 text-left transition-colors duration-200 disabled:cursor-default`}
                      >
                        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-graphite">
                          {c.key}
                        </span>
                        <span className="font-fraunces text-[17px] italic leading-relaxed md:text-[18px]">
                          {c.text}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>

              {grammarAnswered && (
                <div className="mt-7 border-t border-dashed border-line pt-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-claret">
                    ◆ ALL EXAMPLES
                  </p>
                  <ul className="mt-2 space-y-2">
                    {review.grammarFocus.examples.map((ex, i) => (
                      <li
                        key={i}
                        className="border-b border-dashed border-line pb-2 font-fraunces text-[18px] italic leading-relaxed text-graphite md:text-[20px]"
                      >
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </article>
        </section>
      </div>
    </DailyShell>
  )
}
