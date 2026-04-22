import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import type { Test } from '@shared/schemas/test'
import { findLatestResultForTest } from '@/features/tests/hooks/useTestHistoryQuery'
import { formatBand } from '@/features/tests/utils/band-conversion'

interface TestCardProps {
  test: Test
  index?: number
}

const DIFFICULTY_LABEL: Record<Test['difficulty'], string> = {
  foundation: 'FOUNDATION',
  intermediate: 'INTERMEDIATE',
  advanced: 'ADVANCED',
}

const SKILL_LABEL: Record<Test['skill'], string> = {
  listening: 'LISTENING',
  reading: 'READING',
  writing: 'WRITING',
  speaking: 'SPEAKING',
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`
  return n.toString()
}

function partsCount(test: Test): number {
  switch (test.skill) {
    case 'listening':
      return test.sections?.length ?? 0
    case 'reading':
      return test.passages?.length ?? 0
    case 'writing':
      return test.tasks?.length ?? 0
    case 'speaking':
      return test.parts?.length ?? 0
  }
}

export function TestCard({ test, index = 0 }: TestCardProps) {
  const latest = findLatestResultForTest(test.id)
  const parts = partsCount(test)
  const hasStats = test.participantsCount !== undefined || test.playsCount !== undefined

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
      className="flex h-full flex-col border border-line bg-bone p-6 transition-shadow duration-200 hover:shadow-[0_20px_40px_-15px_rgba(107,31,26,0.15)]"
    >
      {/* Eyebrow row — skill on the left, single right-aligned badge */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.25em] text-graphite">
          {latest ? (
            <span aria-hidden="true" className="flex h-4 w-4 items-center justify-center rounded-full border border-sage text-sage">
              <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2.5 6 L5 8.5 L9.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          ) : null}
          <span>{SKILL_LABEL[test.skill]}</span>
        </div>
        {latest ? (
          <span className="font-mono text-[13px] uppercase tracking-[0.2em] text-sage">
            BAND {formatBand(latest.estimatedBand)}
          </span>
        ) : test.isPro ? (
          <span className="bg-claret px-2 py-0.5 font-mono text-[13px] uppercase tracking-[0.2em] text-ivory">
            PRO
          </span>
        ) : null}
      </div>

      {/* Title */}
      <h3 className="mt-5 font-fraunces text-[26px] leading-tight text-ink">{test.title}</h3>

      {/* Single compact meta line */}
      <p className="mt-5 font-mono text-[14px] uppercase tracking-[0.2em] text-graphite">
        {test.fullDurationMinutes} MIN
        {parts > 0 && (
          <>
            <span aria-hidden="true" className="mx-2 text-line">·</span>
            {parts} PART{parts === 1 ? '' : 'S'}
          </>
        )}
        <span aria-hidden="true" className="mx-2 text-line">·</span>
        {test.totalQuestions}&nbsp;Q
        <span aria-hidden="true" className="mx-2 text-line">·</span>
        <span className="text-ink">{DIFFICULTY_LABEL[test.difficulty]}</span>
      </p>

      {/* Popularity — shown only if at least one stat is present */}
      {hasStats && (
        <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[14px] uppercase tracking-[0.2em] text-graphite">
          {test.participantsCount !== undefined && (
            <span className="inline-flex items-center gap-1.5">
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.2">
                <circle cx="8" cy="6" r="2.8" />
                <path d="M2.5 13.5 C 3.5 10.5 6 10 8 10 C 10 10 12.5 10.5 13.5 13.5" strokeLinecap="round" />
              </svg>
              {formatCount(test.participantsCount)} TAKEN
            </span>
          )}
          {test.playsCount !== undefined && (
            <span className="inline-flex items-center gap-1.5">
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M4 3 L12 8 L4 13 Z" strokeLinejoin="round" />
              </svg>
              {formatCount(test.playsCount)} PLAYS
            </span>
          )}
        </p>
      )}

      {/* Tags */}
      {test.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {test.tags.map((tag) => (
            <span
              key={tag}
              className="border border-line px-2.5 py-1 font-mono text-[14px] uppercase tracking-[0.16em] text-graphite"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* CTA pinned to bottom */}
      <div className="mt-auto pt-6">
        <Link
          to="/tests/$testId"
          params={{ testId: test.id }}
          className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden bg-ink-warm px-5 py-3 font-geist text-[18px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)]"
        >
          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
          <span className="relative z-10">{latest ? 'View results' : 'Begin test'}</span>
        </Link>
      </div>
    </motion.article>
  )
}
