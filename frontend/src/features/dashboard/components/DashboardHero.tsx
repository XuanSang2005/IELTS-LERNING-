import { motion } from 'framer-motion'
import { OrnamentPlate } from '@/components/ornaments/OrnamentPlate'
import { Polaroid } from '@/components/ui/Polaroid'
import { formatUKDate, greeting, nextFridayLabel, toRoman } from '../utils/format'

interface DashboardHeroProps {
  firstName: string
  weekNumber: number
  dueCount: number
}

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

/**
 * Asymmetric editorial hero, mirroring landing/Hero.tsx pattern. Greeting +
 * editorial quote on left (7 cols), Polaroid stack with drifting feather on
 * right (5 cols). OrnamentPlate "PL. 0N" anchors the top-left.
 */
export function DashboardHero({ firstName, weekNumber, dueCount }: DashboardHeroProps) {
  const weekStr = String(weekNumber).padStart(2, '0')
  const editorialQuote =
    dueCount === 0
      ? 'Nothing due today. A quiet library — the notebook lies open, waiting.'
      : `${dueCount} ${dueCount === 1 ? 'item' : 'items'} await review. The notebook is open; the library is warm.`

  return (
    <section className="relative">
      <div className="relative z-10 mx-auto w-full max-w-[1720px] px-6 py-10 md:px-10 md:py-14 xl:px-14">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* LEFT — 7 cols */}
          <div className="lg:col-span-7">
            <FadeUp>
              <div className="flex items-center gap-4">
                <OrnamentPlate
                  figure={`PL. ${String(weekNumber).padStart(2, '0')}`}
                  className="hidden md:block md:[&_svg]:h-16 md:[&_svg]:w-16 md:[&_p]:hidden"
                />
                <p className="font-mono text-[10px] uppercase tracking-[0.32em]">
                  <span className="text-claret">◆ THE NOTEBOOK</span>
                  <span className="mx-2 text-line">·</span>
                  <span className="text-graphite">{formatUKDate()}</span>
                  <span className="mx-2 text-line">·</span>
                  <span className="text-graphite">
                    WEEK <span className="text-claret">{weekStr}</span> / XII
                  </span>
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <h1 className="mt-8 font-fraunces text-[clamp(48px,6vw,88px)] font-normal leading-[0.95] tracking-[-0.02em] text-ink">
                {greeting()},{' '}
                <span className="relative inline-block">
                  <em className="font-normal italic">{firstName}</em>
                  <svg
                    className="pointer-events-none absolute -bottom-1 left-0 h-[10px] w-full"
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
                <span className="text-claret">.</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.32}>
              <blockquote className="mt-8 max-w-[60ch] border-l-2 border-claret pl-5 font-fraunces text-[clamp(18px,1.5vw,22px)] italic leading-[1.5] text-graphite">
                &ldquo;{editorialQuote}&rdquo;
              </blockquote>
              <p className="mt-3 pl-5 font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
                — EDITORIAL NOTE · LIBRARY {nextFridayLabel()}
              </p>
            </FadeUp>
          </div>

          {/* RIGHT — 5 cols, polaroid pinned to right edge */}
          <div className="relative hidden lg:col-span-5 lg:block">
            <FadeUp delay={0.4}>
              <div className="relative ml-auto flex w-full max-w-[320px] justify-end">
                {/* Back polaroid — peeks behind */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease, delay: 0.55 }}
                  className="pointer-events-none absolute -left-10 -top-4 z-0 w-[55%]"
                >
                  <Polaroid
                    src="/images/editions/edition-01.jpg"
                    alt="Library stacks"
                    edition="ED. № I"
                    tint="sage"
                    rotate={-7}
                  />
                </motion.div>
                {/* Front polaroid */}
                <div className="relative z-10">
                  <Polaroid
                    src="/images/editions/edition-03.jpg"
                    alt="A tall arched window with late-afternoon sun streaming through."
                    tint="claret"
                    edition={`EDITION № ${toRoman(weekNumber)}`}
                    rotate={3}
                    className="w-[220px]"
                  />
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}
