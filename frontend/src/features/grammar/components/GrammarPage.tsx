import { Polaroid } from '@/components/ui/Polaroid'
import { useUserBandLevel } from '@/features/practice/hooks/practice-queries'
import { PhasesRoadmap } from './PhasesRoadmap'

export function GrammarPage() {
  const level = useUserBandLevel()

  return (
    <div className="w-full pb-20">
      {/* Masthead */}
      <header className="border-b-2 border-line">
        <div className="mx-auto grid w-full max-w-[1720px] grid-cols-1 items-center gap-10 px-6 pb-16 pt-11 md:grid-cols-12 md:gap-14 md:px-10 xl:px-14">
          <div className="md:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em]">
              <span className="mr-2 text-claret">◆</span>
              <span className="text-claret">THE GRAMMAR ROOM</span>
              <span className="mx-2 text-graphite">·</span>
              <span className="text-graphite">WEEKS I — XII · FOUR LEVELS</span>
            </p>
            <h1 className="mt-5 font-fraunces text-[clamp(52px,6.4vw,88px)] font-normal leading-[0.95] -tracking-[0.02em] text-ink">
              The grammar <span className="italic">room.</span>
            </h1>
            <blockquote className="mt-6 border-l-2 border-claret pl-5 font-fraunces text-[clamp(18px,1.5vw,24px)] italic leading-[1.4] text-graphite">
              &ldquo;Grammar is not a cage.
              <em className="not-italic text-claret"> It is a scaffold.</em> Master the shape, and
              the sentence writes itself.&rdquo;
            </blockquote>
            <p className="mt-3 pl-5 font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
              — EDITORIAL NOTE, VOL. I
            </p>
          </div>
          <div className="hidden md:col-span-5 md:flex md:justify-end">
            <Polaroid
              src="/images/editions/edition-01.jpg"
              alt="A writing desk with an open notebook, fountain pen, and late afternoon light."
              tint="claret"
              edition="GRAMMAR № I"
              rotate={-3}
              className="w-full max-w-[320px]"
            />
          </div>
        </div>
      </header>

      {/* Colophon — how the twelve weeks run */}
      <section className="border-b border-line">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-6 py-14 text-center md:px-10 md:py-16 xl:px-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
            ◆ THE TWELVE-WEEK ARC
          </p>
          <div className="max-w-[62ch] font-fraunces text-[20px] leading-relaxed text-ink md:text-[22px]">
            <p>
              One grammar structure every week. Twelve structures per level, arranged in four
              phases — from the architecture of the clause to the concession patterns that carry a
              Task 2 essay upward.
            </p>
            <p className="mt-4 font-geist text-[16px] leading-relaxed text-graphite">
              Each week has three doors. The first is the lesson — theory, examples, and the three
              mistakes Vietnamese candidates make most often at this level. The second is practice:
              six to eight exercises, marked and explained. The third is review: a short recap the
              day after, and the week after, and again in the mixed-error drill of Week XII.
            </p>
          </div>
        </div>
      </section>

      <PhasesRoadmap level={level} />

      {/* Footer */}
      <footer className="border-t-2 border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-14 text-center md:px-10 md:py-16 xl:px-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
            ◆ A NOTE ON PACE
          </p>
          <p className="mt-5 max-w-[62ch] font-fraunces text-[19px] italic leading-relaxed text-graphite md:text-[21px]">
            The programme is twelve weeks because twelve is how long it takes to move a grammar
            point from recognition to instinct. Change levels if the work sits too far above or
            below your range — the library remembers where you were when you return.
          </p>
        </div>
      </footer>
    </div>
  )
}
