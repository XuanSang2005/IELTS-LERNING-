import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

export function FeaturedLesson() {
  return (
    <section className="my-16 border-y border-line py-14">
      <div className="mx-auto grid w-full max-w-[1720px] grid-cols-1 gap-10 px-6 md:px-10 lg:grid-cols-12 xl:px-14">
        {/* Left — text (7 cols) */}
        <div className="lg:col-span-7">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-claret">
            THIS WEEK · COVER LESSON
          </p>
          <h2 className="mt-4 font-fraunces text-[clamp(36px,4.5vw,64px)] font-normal leading-[1.05] tracking-[-0.01em] text-ink">
            The art of conceding <em className="italic">gracefully</em>: nuanced contrast
            connectors.
          </h2>
          <p className="mt-4 max-w-[50ch] font-fraunces text-[22px] italic leading-relaxed text-graphite">
            Why <em>granted</em>, <em>admittedly</em>, and <em>whilst</em> aren't interchangeable —
            and how Band 8+ candidates use them.
          </p>
          <p className="mt-6 max-w-[58ch] font-geist text-[19px] leading-relaxed text-graphite">
            Contrast connectors signal to the examiner that you understand complexity. But the
            examiner also hears when you reach for the wrong one. This lesson walks through five
            connectors, their registers, and the precise situations each unlocks.
          </p>

          {/* Meta row */}
          <div className="mt-8 flex flex-wrap items-center gap-x-4 font-mono text-[11px] uppercase tracking-[0.25em] text-graphite">
            <span>45 MIN</span>
            <span aria-hidden="true" className="text-claret">◆</span>
            <span>INTERMEDIATE+</span>
            <span aria-hidden="true" className="text-claret">◆</span>
            <span>CH. IV — LINKING DEVICES</span>
          </div>

          <a
            href="#lesson-lin-003"
            className="group mt-8 inline-flex items-center gap-2 bg-ink px-7 py-3.5 font-geist text-[19px] text-ivory transition-colors"
          >
            <span>Begin lesson</span>
            <span className="transition-all duration-200 group-hover:translate-x-1 group-hover:text-claret">
              →
            </span>
          </a>
        </div>

        {/* Right — duotone photo (5 cols) */}
        <div className="lg:col-span-5">
          <motion.figure
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
            className="relative mx-auto max-w-[460px] rotate-[-2deg] bg-ivory p-3 shadow-[0_25px_50px_-12px_rgba(20,18,16,0.25)]"
          >
            <div className="relative overflow-hidden bg-claret">
              <img
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=700&q=80&auto=format&fit=crop"
                alt="Open books on a library desk"
                className="h-full w-full object-cover mix-blend-multiply"
                style={{ filter: 'grayscale(1) sepia(0.55) contrast(1.05)' }}
                loading="lazy"
              />
            </div>
            <figcaption className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
              PL. 08 / LIBRARY STILL LIFE, 2026
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  )
}
