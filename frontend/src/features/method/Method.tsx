import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import { Nav } from '@/features/landing/components/Nav'

const ease = [0.22, 1, 0.36, 1] as const

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

export function Method() {
  return (
    <div className="min-h-screen bg-ivory">
      <Nav />
      <MethodHero />
      <FivePrinciples />
      <FourDisciplines />
      <TwelveWeekArc />
      <DailyLoops />
      <BandRange />
      <MethodClosing />
      <MethodFooter />
    </div>
  )
}

/* ───────────────── Hero ───────────────── */

function MethodHero() {
  return (
    <section className="mx-auto w-full max-w-[1540px] px-6 pb-24 pt-14 md:px-10 md:pb-32 md:pt-20 xl:px-14">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8">
          <FadeUp>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em]">
              <span className="text-graphite">CH. 00 —</span>{' '}
              <span className="text-claret">The Method</span>
            </p>
          </FadeUp>

          <FadeUp delay={0.12}>
            <h1 className="mt-6 font-fraunces text-[clamp(44px,5.6vw,84px)] font-normal leading-[0.95] tracking-[-0.02em] text-ink">
              <span className="block">The quiet</span>
              <span className="block">
                <span className="relative inline-block">
                  <em className="font-normal italic">method</em>
                  <svg
                    className="absolute -bottom-1 left-0 h-[10px] w-full"
                    viewBox="0 0 200 10"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2,6 Q50,2 100,5 T198,4"
                      stroke="#6B1F1A"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                .
              </span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.22}>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.3em] text-claret">
              Four disciplines · Twelve weeks · One programme
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="mt-10 max-w-[54ch] border-l-2 border-claret pl-6">
              <p className="font-fraunces text-[clamp(19px,1.5vw,23px)] italic leading-relaxed text-ink">
                “The candidate who plateaus does not lack effort. They lack a system.”
              </p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
                — Editorial note
              </p>
            </div>
          </FadeUp>
        </div>

        <div className="hidden lg:col-span-4 lg:flex lg:items-end lg:justify-end">
          <FadeUp delay={0.5}>
            <motion.figure
              className="w-[260px] rotate-[3deg] border border-line bg-bone p-3 shadow-[0_30px_60px_-20px_rgba(20,18,16,0.35)]"
              whileHover={{ rotate: 0, scale: 1.03 }}
              transition={{ duration: 0.4, ease }}
            >
              <div className="aspect-[3/4] overflow-hidden bg-claret">
                <img
                  src="https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=480&q=80&auto=format&fit=crop"
                  alt="Cambridge examination booklet"
                  className="h-full w-full object-cover mix-blend-multiply grayscale-[0.3] sepia-[0.2]"
                  loading="lazy"
                />
              </div>
              <figcaption className="mt-2 block text-center font-mono text-[9px] uppercase tracking-[0.2em] text-graphite">
                PL. 03 — Programme Guide
              </figcaption>
            </motion.figure>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

/* ──────────── CH. I · Five Principles ──────────── */

const PRINCIPLES = [
  { num: 'I', title: 'Diagnose.', body: 'Find the plateau before breaking it.' },
  { num: 'II', title: 'Chunks, not words.', body: 'Multi-word units, always.' },
  { num: 'III', title: 'Feedback in minutes.', body: 'AI grading, same-day review.' },
  { num: 'IV', title: 'Examiner’s eye.', body: 'Read your work as Cambridge does.' },
  { num: 'V', title: 'Repetition over breadth.', body: 'Narrower programme, practised deeper.' },
] as const

function FivePrinciples() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto w-full max-w-[1540px] px-6 py-24 md:px-10 md:py-32 xl:px-14">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-14">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em]">
              <span className="text-graphite">CH. I —</span>{' '}
              <span className="text-claret">Principles</span>
            </p>
            <h2 className="mt-6 whitespace-nowrap font-fraunces text-[clamp(32px,4vw,60px)] leading-[1.02] tracking-[-0.01em] text-ink">
              Five rules that <em className="italic">govern</em> the work.
            </h2>
          </div>
          <p
            aria-hidden="true"
            className="font-fraunces text-[clamp(80px,10vw,140px)] leading-none text-line"
          >
            05
          </p>
        </div>

        <ol className="mt-16 grid grid-cols-2 gap-px bg-line md:grid-cols-3 lg:grid-cols-5">
          {PRINCIPLES.map((p) => (
            <li key={p.num} className="flex flex-col bg-ivory p-6 md:p-8">
              <span
                aria-hidden="true"
                className="font-fraunces text-[clamp(48px,5vw,80px)] italic leading-none text-claret/80"
              >
                {p.num}
              </span>
              <h3 className="mt-6 font-fraunces text-[clamp(20px,1.6vw,24px)] leading-tight text-ink">
                {p.title}
              </h3>
              <p className="mt-3 font-fraunces text-[15px] italic leading-relaxed text-graphite md:text-[16px]">
                {p.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ──────────── CH. II · Four Disciplines ──────────── */

const DISCIPLINES = [
  { num: 'I', name: 'Grammar', tag: 'Architecture' },
  { num: 'II', name: 'Vocabulary', tag: 'Range' },
  { num: 'III', name: 'Collocations', tag: 'Natural pairing' },
  { num: 'IV', name: 'Linking', tag: 'Cohesion' },
] as const

function FourDisciplines() {
  return (
    <section className="border-t border-line bg-bone/50">
      <div className="mx-auto w-full max-w-[1540px] px-6 py-24 md:px-10 md:py-32 xl:px-14">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-14">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em]">
              <span className="text-graphite">CH. II —</span>{' '}
              <span className="text-claret">Disciplines</span>
            </p>
            <h2 className="mt-6 whitespace-nowrap font-fraunces text-[clamp(32px,4vw,60px)] leading-[1.02] tracking-[-0.01em] text-ink">
              Four domains, <em className="italic">rotated</em> weekly.
            </h2>
          </div>
          <p className="max-w-[32ch] font-fraunces text-[17px] italic leading-relaxed text-graphite md:text-[19px]">
            A day never stays in one place long enough to be memorised.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
          {DISCIPLINES.map((d) => (
            <article key={d.num} className="flex flex-col bg-ivory p-6 md:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-claret">
                CH. {d.num}
              </p>
              <h3 className="mt-6 font-fraunces text-[clamp(32px,3.6vw,48px)] leading-[1.02] text-ink">
                {d.name}
              </h3>
              <p className="mt-4 font-fraunces text-[17px] italic text-graphite md:text-[19px]">
                {d.tag}.
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ──────────── CH. III · Twelve Weeks ──────────── */

const PHASES = [
  { num: 'I', weeks: 'Week 01', title: 'Orientation', body: 'Diagnostic. Band descriptors.' },
  { num: 'II', weeks: 'Weeks 02 — 05', title: 'Foundations', body: 'Rotation. Templates.' },
  { num: 'III', weeks: 'Weeks 06 — 09', title: 'Refinement', body: 'Error drills. Two mocks.' },
  { num: 'IV', weeks: 'Weeks 10 — 12', title: 'Examination', body: 'Weekly mocks. Rehearsal.' },
] as const

function TwelveWeekArc() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto w-full max-w-[1540px] px-6 py-24 md:px-10 md:py-32 xl:px-14">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-14">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em]">
              <span className="text-graphite">CH. III —</span>{' '}
              <span className="text-claret">The Arc</span>
            </p>
            <h2 className="mt-6 whitespace-nowrap font-fraunces text-[clamp(32px,4vw,60px)] leading-[1.02] tracking-[-0.01em] text-ink">
              A programme in <em className="italic">four</em> movements.
            </h2>
          </div>
          <p
            aria-hidden="true"
            className="font-fraunces text-[clamp(80px,10vw,140px)] leading-none text-line"
          >
            12
          </p>
        </div>

        <ol className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {PHASES.map((p) => (
            <li key={p.num} className="border-t-2 border-ink pt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-claret">
                PHASE {p.num} · {p.weeks}
              </p>
              <h3 className="mt-4 font-fraunces text-[clamp(26px,2.4vw,34px)] leading-tight text-ink">
                {p.title}
              </h3>
              <p className="mt-3 font-fraunces text-[17px] italic leading-relaxed text-graphite md:text-[18px]">
                {p.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ──────────── CH. IV · The Daily Loop ──────────── */

const ESSENTIAL = ['Input', 'Apply', 'Review'] as const
const COMPLETE = ['Input', 'Notice', 'Recall', 'Apply', 'Feedback', 'Review'] as const

function DailyLoops() {
  return (
    <section className="border-t border-line bg-bone/50">
      <div className="mx-auto w-full max-w-[1540px] px-6 py-24 md:px-10 md:py-32 xl:px-14">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em]">
            <span className="text-graphite">CH. IV —</span>{' '}
            <span className="text-claret">The Loop</span>
          </p>
          <h2 className="mt-6 whitespace-nowrap font-fraunces text-[clamp(32px,4vw,60px)] leading-[1.02] tracking-[-0.01em] text-ink">
            Two loops. <em className="italic">One</em> commitment.
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          <LoopCard
            label="Essential"
            minutes="30 min"
            steps={ESSENTIAL}
            sub="For weekdays. Keeps the muscle warm."
          />
          <LoopCard
            label="Complete"
            minutes="90 min"
            steps={COMPLETE}
            sub="For weekends. Where the band moves."
          />
        </div>
      </div>
    </section>
  )
}

function LoopCard({
  label,
  minutes,
  steps,
  sub,
}: {
  label: string
  minutes: string
  steps: ReadonlyArray<string>
  sub: string
}) {
  return (
    <article className="border-t-2 border-ink bg-ivory p-8 md:p-12">
      <div className="flex items-baseline justify-between gap-6">
        <h3 className="font-fraunces text-[clamp(32px,3.6vw,44px)] leading-none text-ink">
          {label}.
        </h3>
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-claret">
          {minutes}
        </span>
      </div>

      <ol className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-2">
        {steps.map((step, i) => (
          <li key={step} className="flex items-baseline gap-3">
            {i > 0 && (
              <span aria-hidden="true" className="font-mono text-[14px] text-claret">
                →
              </span>
            )}
            <span className="font-fraunces text-[clamp(20px,1.9vw,26px)] italic text-ink">
              {step}
            </span>
          </li>
        ))}
      </ol>

      <p className="mt-10 font-fraunces text-[16px] italic leading-relaxed text-graphite md:text-[17px]">
        {sub}
      </p>
    </article>
  )
}

/* ──────────── CH. V · Band, a range ──────────── */

const RANGES = [
  { band: '5.0 – 5.5', level: 'Foundation', line: 'The architecture, taught explicitly.' },
  { band: '6.0 – 6.5', level: 'Intermediate', line: 'Fluency, precision, nerve.' },
  { band: '7.0 – 7.5', level: 'Advanced', line: 'Register and idiom, under pressure.' },
  { band: '8.0 +', level: 'Mastery', line: 'The final, examiner-aware edges.' },
] as const

function BandRange() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto w-full max-w-[1540px] px-6 py-24 md:px-10 md:py-32 xl:px-14">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em]">
            <span className="text-graphite">CH. V —</span>{' '}
            <span className="text-claret">Band, a range</span>
          </p>
          <h2 className="mt-6 whitespace-nowrap font-fraunces text-[clamp(28px,3.6vw,56px)] leading-[1.02] tracking-[-0.01em] text-ink">
            Band is a <em className="italic">range</em>, never a number.
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px bg-line md:grid-cols-2 lg:grid-cols-4">
          {RANGES.map((r) => (
            <article key={r.level} className="bg-ivory p-6 md:p-8">
              <p className="font-fraunces text-[clamp(30px,3.2vw,42px)] leading-none text-ink">
                {r.band}
              </p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-claret">
                {r.level}
              </p>
              <p className="mt-4 font-fraunces text-[16px] italic leading-relaxed text-graphite md:text-[17px]">
                {r.line}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-10 max-w-[54ch] font-mono text-[10px] uppercase leading-relaxed tracking-[0.25em] text-graphite">
          .25 rounds up to .5 · .75 rounds up to the next whole.
        </p>
      </div>
    </section>
  )
}

/* ──────────── Closing note ──────────── */

function MethodClosing() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto w-full max-w-[1540px] px-6 py-24 md:px-10 md:py-32 xl:px-14">
        <div className="mx-auto max-w-[640px] text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em]">
            <span className="text-graphite">§ —</span>{' '}
            <span className="text-claret">Editorial Note</span>
          </p>
          <p className="mt-8 font-fraunces text-[clamp(26px,2.8vw,40px)] italic leading-[1.15] text-ink">
            “No fast path to Band 9. Only a considered one, and an unconsidered one.”
          </p>
          <p className="mt-6 font-fraunces text-[18px] italic text-graphite">
            — The founder, Band 8.5 Overall
          </p>

          <div className="mt-14">
            <Link
              to="/signup"
              className="group relative inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-9 py-[17px] font-sans text-[12px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)]"
            >
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
              <span className="relative z-10">Begin your assessment</span>
              <span className="relative z-10 text-[13px] text-claret transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ──────────── Footer ──────────── */

const FOOTER_ITEMS = [
  { label: 'EDITION', value: '№ 08' },
  { label: 'PUBLISHED', value: 'WEEKLY' },
  { label: 'COHORT', value: 'IV' },
  { label: 'OFFICE', value: 'LONDON — MMXXIV' },
] as const

function MethodFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-[1540px] flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-6 md:justify-between md:px-10 xl:px-14">
        {FOOTER_ITEMS.map(({ label, value }, i) => (
          <div key={label} className="flex items-center gap-4">
            {i > 0 && (
              <span aria-hidden="true" className="hidden text-[10px] text-claret md:inline">
                ◆
              </span>
            )}
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
                {label}
              </span>
              <span className="mt-0.5 block font-fraunces text-[20px] text-ink">{value}</span>
            </div>
          </div>
        ))}
      </div>
    </footer>
  )
}
