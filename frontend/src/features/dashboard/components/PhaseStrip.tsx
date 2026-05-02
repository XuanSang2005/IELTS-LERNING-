import type { UserProfile } from '@/schemas/practice'
import { ChapterHeader } from './primitives/ChapterHeader'

const PHASE_NAME: Record<1 | 2 | 3 | 4, { numeral: string; name: string }> = {
  1: { numeral: 'I', name: 'Diagnosis' },
  2: { numeral: 'II', name: 'Foundations' },
  3: { numeral: 'III', name: 'Polish' },
  4: { numeral: 'IV', name: 'Examination' },
}

const PHASE_WEEKS: Record<1 | 2 | 3 | 4, ReadonlyArray<number>> = {
  1: [1, 2],
  2: [3, 4, 5, 6],
  3: [7, 8, 9, 10],
  4: [11, 12],
}

const WEEK_THEMES: Record<number, { theme: string; tagline: string }> = {
  1: { theme: 'Diagnostic mock', tagline: 'Find your ceiling.' },
  2: { theme: 'Reading speed', tagline: 'Build the page rate.' },
  3: { theme: 'Listening transfer', tagline: 'Catch the answer in real time.' },
  4: { theme: 'Writing structures', tagline: 'Templates that hold.' },
  5: { theme: 'Speaking fluency', tagline: 'Hesitation, removed.' },
  6: { theme: 'Common errors', tagline: 'The Vietnamese-learner traps.' },
  7: { theme: 'Complex argument', tagline: 'Two-sided essays at speed.' },
  8: { theme: 'Register precision', tagline: 'C1 over B2 — every clause.' },
  9: { theme: 'Mock paper I', tagline: 'Under timed conditions.' },
  10: { theme: "Examiner's eye", tagline: 'Read your own band descriptors.' },
  11: { theme: 'Mock paper II', tagline: 'The dress rehearsal.' },
  12: { theme: 'Test-day rehearsal', tagline: 'The morning, simulated.' },
}

interface PhaseStripProps {
  profile: UserProfile
}

/**
 * The roadmap — single full-width composition. Centred chapter header → "where
 * you are" status band → 4-column proportional roadmap with current week
 * highlighted → 3-cell context grid (this week / next week / phase ends).
 */
export function PhaseStrip({ profile }: PhaseStripProps) {
  const currentWeek = profile.currentWeek
  const currentPhase = profile.phase
  const currentPhaseName = PHASE_NAME[currentPhase].name
  const weekStr = String(currentWeek).padStart(2, '0')

  const isLastWeek = currentWeek >= 12
  const nextWeek = isLastWeek ? null : currentWeek + 1
  const nextWeekTheme = nextWeek ? WEEK_THEMES[nextWeek] : null

  const currentPhaseWeeks = PHASE_WEEKS[currentPhase]
  const phaseEndsAtWeek = currentPhaseWeeks[currentPhaseWeeks.length - 1]
  const nextPhase = currentPhase < 4 ? ((currentPhase + 1) as 2 | 3 | 4) : null
  const nextPhaseName = nextPhase ? PHASE_NAME[nextPhase].name : null

  const thisWeekTheme = WEEK_THEMES[currentWeek]

  return (
    <section>
      <div className="mx-auto w-full max-w-[1720px] px-6 py-12 md:px-10 md:py-14 xl:px-14">
        <ChapterHeader
          chapter="II"
          eyebrow="THE ROADMAP"
          headline="Twelve weeks"
          tagline="Four phases. One arc."
        />

        {/* "Where you are" status band */}
        <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-[0.32em] text-graphite">
          <span className="text-line">──</span>
          <span className="mx-3">WHERE YOU ARE:</span>
          <span className="text-claret">
            PHASE {PHASE_NAME[currentPhase].numeral}, WEEK {weekStr}
          </span>
          <span className="ml-3 text-line">──</span>
        </p>

        {/* The roadmap */}
        <div className="mx-auto mt-8 max-w-[1500px] border border-line bg-ivory">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_4fr_4fr_2fr]">
            {([1, 2, 3, 4] as const).map((p, pi) => {
              const isCurrentPhase = p === currentPhase
              return (
                <div
                  key={p}
                  className={`flex flex-col ${pi < 3 ? 'md:border-r md:border-line' : ''} ${pi > 0 ? 'border-t border-line md:border-t-0' : ''}`}
                >
                  {/* Phase header band */}
                  <div
                    className={`border-b px-4 py-3 ${
                      isCurrentPhase ? 'border-claret' : 'border-line'
                    }`}
                  >
                    <p
                      className={`font-mono text-[10px] uppercase tracking-[0.28em] ${
                        isCurrentPhase ? 'text-claret' : 'text-graphite'
                      }`}
                    >
                      PHASE {PHASE_NAME[p].numeral}
                    </p>
                    <p
                      className={`mt-1 font-fraunces text-[15px] leading-tight md:text-[16px] ${
                        isCurrentPhase ? 'text-ink' : 'text-graphite'
                      }`}
                    >
                      {PHASE_NAME[p].name}
                    </p>
                  </div>

                  {/* Week cells */}
                  <ol className="flex flex-1 items-stretch gap-px bg-line p-px">
                    {PHASE_WEEKS[p].map((wk) => {
                      const isCurrent = wk === currentWeek
                      const isPast = wk < currentWeek
                      const cellTone = isCurrent
                        ? 'bg-claret text-ivory ring-2 ring-claret/15 ring-offset-1 ring-offset-ivory'
                        : isPast
                          ? 'bg-sage/85 text-ivory'
                          : 'bg-ivory text-graphite/60'
                      return (
                        <li
                          key={wk}
                          className="relative flex flex-1 flex-col items-center"
                        >
                          <div
                            className={`flex h-12 w-full items-center justify-center font-fraunces text-[18px] md:text-[20px] ${cellTone}`}
                          >
                            {String(wk).padStart(2, '0')}
                          </div>
                          {isCurrent && (
                            <span className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-claret">
                              ↑ HERE
                            </span>
                          )}
                        </li>
                      )
                    })}
                  </ol>
                </div>
              )
            })}
          </div>
        </div>

        {/* Three contextual labels */}
        <div className="mx-auto mt-10 grid max-w-[1500px] grid-cols-1 border-t border-line md:grid-cols-3">
          {/* THIS WEEK */}
          <div className="border-b border-line p-6 md:border-b-0 md:border-r md:p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-claret">
              ◆ THIS WEEK · {weekStr}
            </p>
            <p className="mt-3 font-fraunces text-[22px] leading-tight text-ink md:text-[24px]">
              {thisWeekTheme?.theme ?? `Week ${weekStr}`}
              <span className="text-claret">.</span>
            </p>
            <p className="mt-2 font-fraunces text-[15px] italic leading-snug text-graphite md:text-[16px]">
              {thisWeekTheme?.tagline ?? ''}
            </p>
          </div>

          {/* NEXT WEEK */}
          <div className="border-b border-line p-6 md:border-b-0 md:border-r md:p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-graphite">
              <span className="text-claret">◆</span> NEXT WEEK
              {nextWeek && ` · ${String(nextWeek).padStart(2, '0')}`}
            </p>
            {nextWeekTheme ? (
              <>
                <p className="mt-3 font-fraunces text-[22px] leading-tight text-ink md:text-[24px]">
                  {nextWeekTheme.theme}
                  <span className="text-claret">.</span>
                </p>
                <p className="mt-2 font-fraunces text-[15px] italic leading-snug text-graphite md:text-[16px]">
                  {nextWeekTheme.tagline}
                </p>
              </>
            ) : (
              <p className="mt-3 font-fraunces text-[18px] italic leading-snug text-graphite md:text-[20px]">
                Programme complete.
              </p>
            )}
          </div>

          {/* PHASE ENDS */}
          <div className="p-6 md:p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-graphite">
              <span className="text-claret">◆</span> PHASE ENDS · {String(phaseEndsAtWeek).padStart(2, '0')}
            </p>
            {nextPhaseName ? (
              <>
                <p className="mt-3 font-fraunces text-[22px] leading-tight text-ink md:text-[24px]">
                  Then: {nextPhaseName}
                  <span className="text-claret">.</span>
                </p>
                <p className="mt-2 font-fraunces text-[15px] italic leading-snug text-graphite md:text-[16px]">
                  Closing {currentPhaseName.toLowerCase()}; opening the next chapter.
                </p>
              </>
            ) : (
              <>
                <p className="mt-3 font-fraunces text-[22px] leading-tight text-ink md:text-[24px]">
                  Examiner's eye
                  <span className="text-claret">.</span>
                </p>
                <p className="mt-2 font-fraunces text-[15px] italic leading-snug text-graphite md:text-[16px]">
                  The arc closes. The paper opens.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
