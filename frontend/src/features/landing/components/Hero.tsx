import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { SpecimenCard } from './SpecimenCard'
import { Polaroid } from '@/components/ui/Polaroid'
import { OrnamentPlate } from '@/components/ornaments/OrnamentPlate'
import { OrnamentFeather } from '@/components/ornaments/OrnamentFeather'

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

/* ───── Masthead rule ───── */

const MASTHEAD_ITEMS = [
  { label: 'TODAY', value: 'FRI 17 APR' },
  { label: 'ISSUE', value: '№ 008' },
  { label: 'SECTION', value: 'PROGRAMME GUIDE' },
  { label: 'VOL.', value: 'MMXXVI · II' },
] as const

function MastheadRule() {
  return (
    <div className="border-y border-line">
      <div className="mx-auto flex w-full max-w-[1720px] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-2.5 md:px-6 xl:px-8">
        {MASTHEAD_ITEMS.map((it, i) => (
          <Fragment key={it.label}>
            {i > 0 && (
              <span aria-hidden="true" className="hidden text-[9px] text-ochre md:inline">
                ◆
              </span>
            )}
            <div className="flex items-baseline gap-2.5">
              <span className="font-mono text-[clamp(9px,0.7vw,11px)] uppercase tracking-[0.28em] text-graphite">
                {it.label}
              </span>
              <span className="font-mono text-[clamp(10px,0.8vw,12px)] uppercase tracking-[0.22em] text-ink">
                {it.value}
              </span>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

/* ───── Postmark (cohort stamp) ───── */

function Postmark() {
  return (
    <motion.div
      aria-hidden="true"
      animate={{ y: [0, -6, 0], rotate: [-8, -5, -8] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className="flex h-[96px] w-[96px] items-center justify-center rounded-full border-2 border-claret bg-ivory/70 font-mono text-[9px] uppercase leading-tight tracking-[0.15em] text-claret opacity-95 shadow-sm backdrop-blur-sm"
    >
      <div className="text-center">
        Cohort
        <br />
        № 04
        <br />
        <span className="font-fraunces text-[12px] italic normal-case tracking-normal">est.</span>
        <br />
        MMXXIV
      </div>
    </motion.div>
  )
}

/* ───── Polaroid stack (library + pen + specimen + postmark) ───── */

function PolaroidStack() {
  return (
    <div className="relative mx-auto w-full max-w-[440px]">
      {/* Specimen card — primary, aligned to top of column.
          `relative z-10` lives on the animated wrapper itself: the transform
          animation creates its own stacking context, so a nested z-index
          would only compete inside that context, not with the sibling
          polaroids at the outer level. */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.55 }}
        className="relative z-10"
      >
        <SpecimenCard />
      </motion.div>

      {/* Back polaroid — peeks behind upper-right of specimen, extends outward */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.65 }}
        className="pointer-events-none absolute -right-24 -top-12 z-0 hidden w-[46%] lg:block"
      >
        <Polaroid
          src="/images/editions/edition-01.jpg"
          alt="Library stacks in late afternoon"
          edition="Edition № I"
          tint="claret"
          rotate={-8}
        />
      </motion.div>

      {/* Middle polaroid — peeks behind lower-right of specimen, extends outward */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.75 }}
        className="pointer-events-none absolute -bottom-16 -right-20 z-0 hidden w-[50%] lg:block"
      >
        <Polaroid
          src="/images/editions/edition-03.jpg"
          alt="Fountain pen on handwritten notes"
          edition="Edition № II"
          tint="sage"
          orientation="landscape"
          rotate={7}
        />
      </motion.div>

      {/* Postmark pinned to specimen's top-left. Same fix as the specimen:
          `absolute … z-20` must live on the animated wrapper itself. */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.45 }}
        className="absolute -left-8 -top-8 z-20 hidden lg:block"
      >
        <Postmark />
      </motion.div>
    </div>
  )
}

/* ───── Discipline strip (chapter-of-contents under hero) ───── */

interface Discipline {
  num: string
  label: string
  accent?: boolean
}

const DISCIPLINES: Discipline[] = [
  { num: 'I', label: 'Listening' },
  { num: 'II', label: 'Reading' },
  { num: 'III', label: 'Writing', accent: true },
  { num: 'IV', label: 'Speaking' },
]

function DisciplineStrip() {
  return (
    <div className="mx-auto hidden w-full max-w-[1720px] px-4 pb-16 md:px-6 xl:px-8 min-[1921px]:block">
      <ul className="flex flex-col border-y border-line md:flex-row">
        {DISCIPLINES.map((d, i) => (
          <li
            key={d.num}
            className={`group flex flex-1 items-baseline gap-4 px-5 py-4 transition-colors duration-300 ${
              d.accent ? 'bg-claret/[0.04]' : 'hover:bg-claret/[0.04]'
            } ${i < DISCIPLINES.length - 1 ? 'border-b border-line md:border-b-0 md:border-r' : ''}`}
          >
            <span
              className={`font-fraunces text-[clamp(22px,2.2vw,32px)] italic leading-none ${
                d.accent ? 'text-claret' : 'text-graphite group-hover:text-claret'
              }`}
            >
              {d.num}
            </span>
            <span
              className={`font-mono text-[clamp(10px,0.85vw,12px)] uppercase tracking-[0.25em] ${
                d.accent ? 'text-ink' : 'text-graphite group-hover:text-ink'
              }`}
            >
              {d.label}
            </span>
            {d.accent && (
              <span className="ml-auto font-mono text-[clamp(9px,0.7vw,11px)] uppercase tracking-[0.25em] text-claret">
                Begin here ↓
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ───── Hero ───── */

export function Hero() {
  return (
    <div className="relative flex flex-1 flex-col">
      <MastheadRule />

      <section className="relative mx-auto w-full min-h-0 max-w-[1720px] flex-1 px-4 py-6 md:px-6 md:py-8 xl:px-8 2xl:pt-24">
        {/* Drifting feather in right gutter */}
        <motion.div
          aria-hidden="true"
          animate={{ y: [0, -10, 0], rotate: [-2, 0, -2] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute right-4 top-24 z-0 hidden text-claret opacity-40 xl:block"
        >
          <OrnamentFeather className="h-[200px] w-[120px]" />
        </motion.div>

        <div className="relative z-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-8">
          {/* LEFT — 7 cols */}
          <div className="pt-6 md:pt-12 lg:col-span-7">
            <FadeUp>
              <div className="flex items-start gap-6">
                <OrnamentPlate figure="PL. I" className="hidden md:block" />
                <div className="pt-3">
                  <p className="font-mono text-[clamp(10px,0.85vw,12px)] uppercase tracking-[0.25em]">
                    <span className="text-graphite">CH. 00 —</span>{' '}
                    <span className="text-claret">The programme</span>
                  </p>
                  <p className="mt-3 max-w-[38ch] font-fraunces text-[clamp(15px,1.3vw,18px)] italic leading-relaxed text-graphite">
                    Being, in brief, an editorial approach to the examination — for candidates who
                    have read the guides and remained stuck.
                  </p>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <h1 className="mt-6 font-fraunces text-[clamp(42px,5vw,84px)] font-normal leading-[0.92] tracking-[-0.025em] text-ink [word-break:keep-all] hyphens-none">
                <span className="block">The quiet craft</span>
                <span className="block pl-[8%] md:pl-[12%]">of scoring</span>
                <span className="block">
                  <span className="relative inline-block">
                    <em className="font-normal italic">Band&nbsp;9</em>
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
                  ,
                </span>
              </h1>
              <p className="mt-2 pl-[14%] font-fraunces text-[clamp(22px,2.4vw,44px)] italic leading-[1.1] tracking-[-0.015em] text-graphite md:pl-[24%]">
                without the noise.
              </p>
            </FadeUp>

            <FadeUp delay={0.32}>
              <div className="mt-6 grid max-w-[780px] grid-cols-1 items-end gap-8 md:grid-cols-[1fr_auto] md:gap-10">
                <div className="border-l-2 border-claret pl-5">
                  <p className="font-geist text-[clamp(15px,1.15vw,18px)] leading-[1.6] text-graphite">
                    A considered programme for Band 7.5+ candidates.{' '}
                    <span className="text-ink">
                      One cohort of fourteen. Twelve weeks. Same-day written feedback.
                    </span>
                  </p>
                </div>
                <div className="min-w-[140px] border-l border-line pl-5">
                  <span className="block font-mono text-[clamp(9px,0.75vw,11px)] uppercase tracking-[0.25em] text-graphite">
                    Enrolment closes
                  </span>
                  <span className="mt-1 block font-fraunces text-[clamp(20px,2vw,26px)] text-ink">
                    07 May
                  </span>
                  <span className="block font-fraunces text-[clamp(13px,1.1vw,15px)] italic text-graphite">
                    nineteen places remain
                  </span>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.42}>
              <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
                <a
                  href="#assessment"
                  className="group relative inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-9 py-[17px] font-geist text-[clamp(12px,0.95vw,14px)] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)]"
                >
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
                  <span className="relative z-10">Begin your assessment</span>
                  <span className="relative z-10 text-[13px] text-claret transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
                <a
                  href="#method"
                  className="group inline-flex items-center gap-2 font-geist text-[clamp(14px,1.1vw,17px)] text-ink"
                >
                  <span className="relative">
                    Read the method
                    <span className="absolute -bottom-0.5 left-0 h-px w-full bg-line transition-colors duration-200 group-hover:bg-ink" />
                  </span>
                  <span className="text-[13px] transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-claret">
                    ↗
                  </span>
                </a>
                <a
                  href="#library"
                  className="group inline-flex items-center gap-2 font-geist text-[clamp(14px,1.1vw,17px)] text-ink"
                >
                  <span className="relative">
                    Attend Friday library
                    <span className="absolute -bottom-0.5 left-0 h-px w-full bg-line transition-colors duration-200 group-hover:bg-ink" />
                  </span>
                  <span className="text-[13px] transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-claret">
                    →
                  </span>
                </a>
              </div>
            </FadeUp>
          </div>

          {/* RIGHT — 5 cols, polaroid stack */}
          <div className="relative lg:col-span-5 lg:pt-24">
            <PolaroidStack />
          </div>
        </div>
      </section>

      <FadeUp delay={0.7}>
        <DisciplineStrip />
      </FadeUp>
    </div>
  )
}
