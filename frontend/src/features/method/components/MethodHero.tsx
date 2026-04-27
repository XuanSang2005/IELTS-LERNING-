import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import { FadeUp } from './FadeUp'

const ease = [0.22, 1, 0.36, 1] as const

export function MethodHero() {
  return (
    <section className="mx-auto w-full max-w-[1720px] px-6 pb-24 pt-14 md:px-10 md:pb-32 md:pt-20 xl:px-14">
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

          <FadeUp delay={0.4}>
            <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-5">
              <Link
                to="/signup"
                className="group relative inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-9 py-[17px] font-sans text-[12px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)]"
              >
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
                <span className="relative z-10">Begin the programme</span>
                <span className="relative z-10 text-[13px] text-claret transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                to="/study"
                className="group inline-flex items-center gap-2 font-sans text-[14px] text-ink"
              >
                <span className="relative">
                  Browse the library
                  <span className="absolute -bottom-0.5 left-0 h-px w-full bg-line transition-colors duration-200 group-hover:bg-ink" />
                </span>
                <span
                  aria-hidden="true"
                  className="text-[13px] transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-claret"
                >
                  ↗
                </span>
              </Link>
            </div>
          </FadeUp>
        </div>

        <div className="hidden lg:col-span-4 lg:flex lg:items-end lg:justify-end">
          <FadeUp delay={0.5}>
            <motion.figure
              className="w-[320px] rotate-[3deg] border border-line bg-bone p-3 shadow-[0_30px_60px_-20px_rgba(20,18,16,0.35)]"
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
