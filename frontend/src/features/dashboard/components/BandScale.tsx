import { Link } from '@tanstack/react-router'
import type { UserProfile } from '@/schemas/practice'
import { ChapterHeader } from './primitives/ChapterHeader'
import { SIGNATURE_BUTTON_CLASS, SignatureContent } from './primitives/SignatureButton'

interface BandScaleProps {
  profile: UserProfile
}

/**
 * Pull-quote (band descriptor) → headline + target → ruler 4.0–9.0 → 4-skill
 * mini-strip → recalibrate CTA. No panel framing; everything sits on ivory.
 */
export function BandScale({ profile }: BandScaleProps) {
  const b = profile.currentBand
  const lo = ((b.range[0] - 4) / 5) * 100
  const hi = ((b.range[1] - 4) / 5) * 100
  const targetPct = ((profile.targetBand - 4) / 5) * 100

  // Descriptor lookup, banded by lower bound
  const descriptor = bandDescriptor(b.range[0])

  return (
    <section>
      <div className="mx-auto w-full max-w-[1720px] px-6 py-14 md:px-10 md:py-16 xl:px-14">
        <ChapterHeader
          chapter="IV"
          eyebrow="YOUR LEVEL"
          headline="Your level"
          tagline="Your working range, against the band you intend to reach."
        />

        <div className="mx-auto mt-12 max-w-[1500px]">
          {/* Pull quote — band descriptor */}
          <blockquote className="mx-auto max-w-[60ch] text-center font-fraunces text-[clamp(20px,2vw,28px)] italic leading-[1.4] text-graphite">
            &ldquo;{descriptor.summary}&rdquo;
          </blockquote>
          <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
            — IELTS BAND {descriptor.label} DESCRIPTOR
          </p>

          {/* Headline + target */}
          <div className="mt-12 flex items-baseline justify-between gap-6">
            <h4 className="font-fraunces text-[clamp(48px,6vw,80px)] leading-none text-ink">
              <span className="text-claret">{b.range[0].toFixed(1)}</span>
              <span className="text-[clamp(28px,3.5vw,44px)] italic text-graphite">
                {' '}
                – {b.range[1].toFixed(1)}
              </span>
            </h4>
            <div className="text-right">
              <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
                TARGET
              </span>
              <span className="block font-fraunces text-[clamp(24px,3vw,40px)] text-claret">
                {profile.targetBand.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Ruler */}
          <div className="relative mt-8 h-[60px]">
            <div className="absolute left-0 right-0 top-5 h-px bg-ink" />
            {Array.from({ length: 11 }).map((_, i) => {
              const v = 4 + i * 0.5
              const isMajor = v % 1 === 0
              const l = ((v - 4) / 5) * 100
              return (
                <span key={i}>
                  <div
                    className={`absolute w-px bg-ink ${isMajor ? 'top-3 h-4' : 'top-4 h-2'}`}
                    style={{ left: `${l}%` }}
                  />
                  {isMajor && (
                    <span
                      className="absolute top-8 -translate-x-1/2 font-mono text-[10px] tracking-[0.22em] text-graphite"
                      style={{ left: `${l}%` }}
                    >
                      {v.toFixed(1)}
                    </span>
                  )}
                </span>
              )
            })}
            <div
              className="absolute top-[18px] h-[5px] bg-claret"
              style={{ left: `${lo}%`, width: `${hi - lo}%` }}
            />
            <div
              className="absolute top-2 h-6 w-0.5 bg-claret"
              style={{ left: `${targetPct}%`, transform: 'translateX(-1px)' }}
            />
          </div>

          {/* Confidence + source */}
          <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
            CONFIDENCE <span className="text-ink">{b.confidence.toUpperCase()}</span>
            &nbsp;·&nbsp; SOURCE <span className="text-ink">{b.setBy.toUpperCase()}</span>
          </p>

          {/* 4-skill mini strip */}
          <ul className="mt-12 grid grid-cols-2 border-y border-line md:grid-cols-4">
            {descriptor.skills.map((s, i) => (
              <li
                key={s.skill}
                className={`flex flex-col gap-2 px-5 py-5 ${
                  i < descriptor.skills.length - 1 ? 'border-b border-line md:border-b-0 md:border-r' : ''
                } ${i % 2 === 1 && i < descriptor.skills.length - 1 ? 'border-b' : ''}`}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-claret">
                  {s.skill}
                </span>
                <span className="font-fraunces text-[15px] italic leading-snug text-graphite md:text-[16px]">
                  {s.summary}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex justify-center">
            <Link
              to="/onboarding/band"
              search={{ redirect: '/app' }}
              className={SIGNATURE_BUTTON_CLASS}
            >
              <SignatureContent>Recalibrate your band</SignatureContent>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

interface BandDescriptor {
  label: string
  summary: string
  skills: ReadonlyArray<{ skill: string; summary: string }>
}

function bandDescriptor(lower: number): BandDescriptor {
  if (lower >= 8) {
    return {
      label: '8.0+',
      summary: 'Fully operational command. Occasional unsystematic inaccuracies; handles unfamiliar topics well.',
      skills: [
        { skill: 'LISTENING', summary: 'Detailed understanding of complex texts.' },
        { skill: 'READING', summary: 'Reads with sustained accuracy of nuance.' },
        { skill: 'WRITING', summary: 'Wide range, naturally cohesive.' },
        { skill: 'SPEAKING', summary: 'Fluent, with subtle and sustained pronunciation.' },
      ],
    }
  }
  if (lower >= 7) {
    return {
      label: '7.0–7.5',
      summary: 'Operational command. Misunderstandings in unfamiliar situations; handles complex language well.',
      skills: [
        { skill: 'LISTENING', summary: 'Catches detail; pace is no longer an obstacle.' },
        { skill: 'READING', summary: 'Reads at speed; infers what is implied.' },
        { skill: 'WRITING', summary: 'Position clear; range supports nuance.' },
        { skill: 'SPEAKING', summary: 'Fluent without strain; range of discourse markers.' },
      ],
    }
  }
  if (lower >= 6) {
    return {
      label: '6.0–6.5',
      summary: 'Effective command. Inaccuracies and misunderstandings, but generally understands and uses fairly complex language.',
      skills: [
        { skill: 'LISTENING', summary: 'Follows main ideas; loses some detail.' },
        { skill: 'READING', summary: 'Understands gist; slows on complex argument.' },
        { skill: 'WRITING', summary: 'Position visible; cohesion sometimes mechanical.' },
        { skill: 'SPEAKING', summary: 'Conveys ideas; hesitation slows fluency.' },
      ],
    }
  }
  return {
    label: '5.0–5.5',
    summary: 'Partial command. Copes with overall meaning in most situations; many mistakes; can handle basic communication.',
    skills: [
      { skill: 'LISTENING', summary: 'Catches main idea; loses detail.' },
      { skill: 'READING', summary: 'Slow with academic register.' },
      { skill: 'WRITING', summary: 'Limited range; cohesion weak.' },
      { skill: 'SPEAKING', summary: 'Hesitant; basic structures only.' },
    ],
  }
}
