import { Link } from '@tanstack/react-router'
import type { Discipline, UserProfile } from '@/schemas/practice'
import { ChapterHeader } from './primitives/ChapterHeader'
import { DisciplineGlyph } from './DisciplineGlyph'

const DISCIPLINE_LABELS: Record<Discipline, string> = {
  grammar: 'Grammar',
  vocabulary: 'Vocabulary',
  collocations: 'Collocations',
  linking: 'Linking Devices',
}

const DISCIPLINE_ORDER: Discipline[] = ['grammar', 'vocabulary', 'collocations', 'linking']

const DISCIPLINE_HINTS: Record<Discipline, string> = {
  grammar: 'Begin with conditionals',
  vocabulary: 'Academic clusters · C1 register',
  collocations: 'Natural word pairings',
  linking: 'Connectors for cohesion',
}

/**
 * Curriculum totals — the actual project structure (12-week arc per discipline).
 * Sourced from CLAUDE.md design + the locked Lexicon plan, not from the user
 * profile (which previously held stub numbers like 24/30/20/14).
 */
const DISCIPLINE_TOTAL_WEEKS = 12 as const

interface DisciplineGridProps {
  profile: UserProfile
}

/**
 * 4-card grid of the four disciplines. Each card carries a glyph above the
 * headline and a watermark numeral in the corner for editorial texture.
 */
export function DisciplineGrid({ profile }: DisciplineGridProps) {
  return (
    <section>
      <div className="mx-auto w-full max-w-[1720px] px-6 py-14 md:px-10 md:py-16 xl:px-14">
        <ChapterHeader
          chapter="III"
          eyebrow="THE FOUR DISCIPLINES"
          headline="The four disciplines"
          tagline="Each discipline runs its own twelve-week ledger. Open one to begin."
        />

        <div className="mx-auto mt-12 grid max-w-[1500px] grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {DISCIPLINE_ORDER.map((d, i) => {
            // Use the curriculum total (12 weeks) as the canonical denominator.
            // Profile-stored totals are stub data and don't match the real plan.
            const { completed: rawCompleted } = profile.disciplineProgress[d]
            const total = DISCIPLINE_TOTAL_WEEKS
            const completed = Math.min(rawCompleted, total)
            const pct = Math.round((completed / total) * 100)
            const started = completed > 0
            return (
              <Link
                key={d}
                to="/study"
                search={{ discipline: d }}
                className="group relative flex flex-col gap-5 overflow-hidden bg-ivory p-7 transition-colors duration-200 hover:bg-bone/60"
              >
                {/* Watermark numeral — top-right, faded */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 -top-4 select-none font-fraunces text-[120px] leading-none text-claret/[0.06]"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Hover claret bottom rule */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-claret transition-transform duration-300 group-hover:scale-x-100"
                />

                <div className="relative flex items-center justify-between">
                  <DisciplineGlyph discipline={d} className="h-7 w-7" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
                    {started ? 'IN PROGRESS' : 'NOT STARTED'}
                  </span>
                </div>

                <h4 className="relative m-0 font-fraunces text-[26px] leading-tight text-ink md:text-[28px]">
                  {DISCIPLINE_LABELS[d]}
                </h4>

                <div className="relative">
                  <p className="m-0 font-fraunces text-[40px] leading-none text-ink md:text-[48px]">
                    <span className="text-ink">{completed}</span>
                    <span className="text-graphite"> / {total}</span>
                  </p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
                    WEEKS · {pct}%
                  </p>
                </div>

                <div
                  className="relative h-[2px] bg-line"
                  role="progressbar"
                  aria-valuenow={pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${DISCIPLINE_LABELS[d]} progress`}
                >
                  <span
                    className="absolute inset-y-0 left-0 bg-claret transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <p className="relative mt-auto flex items-baseline justify-between gap-3 font-fraunces text-[15px] italic text-graphite">
                  <span>{DISCIPLINE_HINTS[d]}</span>
                  <span className="text-claret transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
