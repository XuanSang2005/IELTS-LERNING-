import { useState } from 'react'
import type { DailyVocabItem } from '@shared/schemas/daily-unit'
import { DAILY_STEPS } from '../data/step-config'
import { DailyShell } from './DailyShell'
import { Flashcard } from './Flashcard'

const STEP = DAILY_STEPS[3]

const REGISTER_TINT: Record<'B1' | 'B2' | 'C1', string> = {
  B1: 'text-graphite',
  B2: 'text-sage',
  C1: 'text-claret',
}

interface Step4VocabProps {
  deck: DailyVocabItem[] | null | undefined
  onAdvance: () => void
  onPrev: () => void
}

type Mark = 'known' | 'practise'

export function Step4Vocab({ deck, onAdvance, onPrev }: Step4VocabProps) {
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [marks, setMarks] = useState<Record<number, Mark>>({})

  if (!deck || deck.length === 0) {
    return (
      <DailyShell step={STEP} onContinue={onAdvance} onPrev={onPrev}>
        <div className="max-w-[64ch] border-l-2 border-claret pl-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-claret">
            ◆ DECK NOT YET ASSEMBLED
          </p>
          <h3 className="mt-4 font-fraunces text-[26px] leading-tight text-ink">
            Today’s ten words are still in proof.
          </h3>
          <p className="mt-3 font-fraunces text-[20px] italic leading-relaxed text-graphite">
            They arrive bundled with the reading passage. Continue to the writing step — the
            deck will be here on the next issue.
          </p>
        </div>
      </DailyShell>
    )
  }

  const total = deck.length
  const item = deck[index]
  const allMarked = Object.keys(marks).length === total
  const knownCount = Object.values(marks).filter((m) => m === 'known').length

  const advanceCard = () => {
    if (index < total - 1) {
      setIndex((i) => i + 1)
      setRevealed(false)
    }
  }

  const mark = (m: Mark) => {
    setMarks((prev) => ({ ...prev, [index]: m }))
    advanceCard()
  }

  const footnote = allMarked
    ? `${knownCount} of ${total} marked as known. The rest will return tomorrow.`
    : `${total - Object.keys(marks).length} cards remaining.`

  return (
    <DailyShell
      step={STEP}
      canContinue={allMarked}
      onContinue={onAdvance}
      onPrev={onPrev}
      footnote={footnote}
    >
      <div className="mx-auto max-w-[760px]">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
          ◆ TEN WORDS FROM TODAY’S READING
        </p>

        <div className="mt-6">
          <Flashcard
            eyebrow={`CARD ${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`}
            front={
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
                  <span className="text-claret">{item.partOfSpeech.toUpperCase()}</span>
                  <span className="mx-2">·</span>
                  <span className={REGISTER_TINT[item.register]}>{item.register}</span>
                </p>
                <h3 className="mt-3 font-fraunces text-[clamp(48px,5.5vw,72px)] italic leading-none text-ink">
                  {item.term}
                </h3>
              </div>
            }
            back={
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-claret">
                  ◆ DEFINITION
                </p>
                <p className="mt-2 font-fraunces text-[20px] leading-relaxed text-ink md:text-[22px]">
                  {item.definition}
                </p>
                <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.28em] text-claret">
                  ◆ EXAMPLE FROM THE READING
                </p>
                <blockquote className="mt-2 border-l-2 border-claret pl-4 font-fraunces text-[19px] italic leading-relaxed text-graphite md:text-[21px]">
                  {item.example}
                </blockquote>
                {item.vi && (
                  <p className="mt-4 font-fraunces text-[15px] italic text-graphite">
                    VN — {item.vi}
                  </p>
                )}
              </div>
            }
            revealed={revealed}
            onReveal={() => setRevealed(true)}
            rating={
              revealed && marks[index] === undefined ? (
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
                    HOW WELL DID YOU KNOW IT?
                  </span>
                  <button
                    type="button"
                    onClick={() => mark('practise')}
                    className="border border-line bg-ivory px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-graphite transition-colors hover:border-claret hover:text-claret"
                  >
                    Need more practice
                  </button>
                  <button
                    type="button"
                    onClick={() => mark('known')}
                    className="border border-ink bg-ivory px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink transition-colors hover:bg-ink hover:text-ivory"
                  >
                    Known
                  </button>
                </div>
              ) : revealed && marks[index] !== undefined && index < total - 1 ? (
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
                  ◆ NEXT CARD LOADING…
                </p>
              ) : revealed && index === total - 1 && marks[index] !== undefined ? (
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-sage">
                  ◆ DECK COMPLETE
                </p>
              ) : undefined
            }
          />
        </div>

        {/* Mini progress */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {deck.map((_, i) => {
            const isCurrent = i === index
            const m = marks[i]
            const tone =
              m === 'known'
                ? 'bg-sage border-sage'
                : m === 'practise'
                  ? 'bg-claret/40 border-claret'
                  : isCurrent
                    ? 'border-ink'
                    : 'border-line'
            return <span key={i} className={`block h-2 w-8 border ${tone}`} aria-hidden="true" />
          })}
        </div>
      </div>
    </DailyShell>
  )
}
