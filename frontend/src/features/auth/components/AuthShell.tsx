import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'

interface AuthShellProps {
  eyebrow: string
  /** Pre-italic portion of the headline. */
  headingLead: string
  /** The word that gets italicised and hand-drawn claret underlined. */
  headingItalic: string
  /** Trailing fragment after the italic word (usually "."). */
  headingTail?: string
  quote: string
  attribution: string
  children: ReactNode
}

const ease = [0.22, 1, 0.36, 1] as const

function HandUnderline() {
  return (
    <svg
      aria-hidden="true"
      className="absolute -bottom-2 left-0 h-[12px] w-full"
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
    >
      <path
        d="M2,7 Q50,2 100,5 T198,5"
        stroke="#6B1F1A"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

function Postmark() {
  return (
    <motion.div
      aria-hidden="true"
      className="flex h-[96px] w-[96px] items-center justify-center rounded-full border-2 border-claret font-mono text-[9px] uppercase leading-tight tracking-[0.18em] text-claret opacity-80"
      animate={{ y: [0, -6, 0], rotate: [-6, -3, -6] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="text-center">
        Admission
        <br />
        № 24
        <br />
        <span className="font-fraunces text-[12px] italic normal-case tracking-normal">est.</span>
        <br />
        MMXXIV
      </div>
    </motion.div>
  )
}

export function AuthShell({
  eyebrow,
  headingLead,
  headingItalic,
  headingTail,
  quote,
  attribution,
  children,
}: AuthShellProps) {
  return (
    <div className="relative min-h-screen bg-ivory">
      <div className="mx-auto grid min-h-screen w-full max-w-[1720px] grid-cols-1 lg:grid-cols-12">
        {/* LEFT — editorial side panel */}
        <motion.aside
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease }}
          className="relative flex min-h-[35vh] flex-col justify-between overflow-hidden bg-bone px-8 py-10 md:px-14 md:py-14 lg:col-span-6 lg:min-h-screen lg:p-20"
        >
          <Link to="/" className="relative z-10 inline-flex self-start">
            <span className="font-fraunces text-[24px] font-medium leading-none tracking-tight md:text-[24px]">
              <span className="text-claret">M</span>
              <span className="text-ink">eridian</span>
            </span>
          </Link>

          <div className="relative z-10 mt-6 max-w-[22ch] lg:mt-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-claret">
              {eyebrow}
            </p>
            <h2 className="mt-4 font-fraunces text-[clamp(44px,6.5vw,92px)] font-normal leading-[0.95] tracking-[-0.02em] text-ink [word-break:keep-all] hyphens-none">
              <span className="block">{headingLead}</span>
              <span className="relative inline-block">
                <em className="font-normal italic">{headingItalic}</em>
                <HandUnderline />
              </span>
              {headingTail ? <span>{headingTail}</span> : null}
            </h2>

            <blockquote className="mt-10 border-l-2 border-claret pl-5">
              <p className="font-fraunces text-[22px] italic leading-[1.55] text-graphite md:text-[24px]">
                "{quote}"
              </p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
                {attribution}
              </p>
            </blockquote>
          </div>

          <div className="relative z-10 mt-8 hidden items-end justify-end lg:flex">
            <Postmark />
          </div>

          {/* Amber radial glow (bottom-right) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-10 -right-10 h-[380px] w-[380px] rounded-full opacity-[0.2] blur-3xl"
            style={{ background: 'radial-gradient(circle, #B58A3C 0%, transparent 70%)' }}
          />
        </motion.aside>

        {/* RIGHT — form column */}
        <motion.section
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="flex items-center justify-center bg-ivory px-6 py-10 md:p-14 lg:col-span-6 lg:min-h-screen"
        >
          <div className="w-full max-w-[440px]">{children}</div>
        </motion.section>
      </div>
    </div>
  )
}
