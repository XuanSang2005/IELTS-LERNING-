import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from '@tanstack/react-router'
import type { Collocation } from '@shared/schemas/collocation'
import type { LexiconDiscipline } from '@shared/schemas/lexicon'
import type { LinkingDevice } from '@shared/schemas/linking-device'
import type { VocabWord } from '@shared/schemas/vocabulary'
import { Polaroid } from '@/components/ui/Polaroid'
import { Route as VocabularyRoute } from '@/routes/app.vocabulary'
import { DISCIPLINE_CONFIG } from '../data/discipline-config'
import {
  useCollocations,
  useLinking,
  useVocabulary,
  type CollocationsFilter,
  type LinkingFilter,
  type VocabularyFilter,
} from '../hooks/lexicon-queries'
import { DisciplineNav } from './DisciplineNav'
import { VocabularyEntry } from './VocabularyEntry'
import { CollocationEntry } from './CollocationEntry'
import { LinkingEntry } from './LinkingEntry'

export function LexiconPage() {
  const search = VocabularyRoute.useSearch()
  const navigate = useNavigate()
  const active: LexiconDiscipline = search.discipline ?? 'vocabulary'

  // Free-text search is the only filter exposed in the UI.
  const [q, setQ] = useState('')

  const config = DISCIPLINE_CONFIG[active]

  function setActive(next: LexiconDiscipline) {
    void navigate({
      to: '/app/vocabulary',
      search: next === 'vocabulary' ? {} : { discipline: next },
      replace: true,
    })
  }

  // Build per-discipline filters. Memoised so query keys don't churn.
  const vocabFilter = useMemo<VocabularyFilter>(() => {
    const f: VocabularyFilter = {}
    if (q.trim()) f.q = q.trim()
    return f
  }, [q])

  const collocationsFilter = useMemo<CollocationsFilter>(() => {
    const f: CollocationsFilter = {}
    if (q.trim()) f.q = q.trim()
    return f
  }, [q])

  const linkingFilterValue = useMemo<LinkingFilter>(() => {
    const f: LinkingFilter = {}
    if (q.trim()) f.q = q.trim()
    return f
  }, [q])

  // Only the active discipline's query is `enabled` — keeps the network quiet.
  const vocabQuery = useVocabulary(vocabFilter, active === 'vocabulary')
  const collocationsQuery = useCollocations(collocationsFilter, active === 'collocations')
  const linkingQuery = useLinking(linkingFilterValue, active === 'linking')

  const activeQuery =
    active === 'vocabulary'
      ? vocabQuery
      : active === 'collocations'
        ? collocationsQuery
        : linkingQuery

  return (
    <div className="w-full pb-20">
      {/* ── Masthead ───────────────────────────────────────────────────────── */}
      <header className="border-b-2 border-line">
        <div className="mx-auto grid w-full max-w-[1720px] grid-cols-1 items-center gap-10 px-6 pb-16 pt-11 md:grid-cols-12 md:gap-14 md:px-10 xl:px-14">
          <div className="md:col-span-7">
            <p className="font-mono text-[12px] uppercase tracking-[0.3em] md:text-[13px]">
              <span className="mr-2 text-claret">◆</span>
              <span className="text-claret">THE LEXICON</span>
              <span className="mx-2 text-graphite">·</span>
              <span className="text-graphite">{config.metaSuffix}</span>
            </p>
            <h1 className="mt-5 font-fraunces text-[clamp(52px,6.4vw,88px)] font-normal leading-[0.95] tracking-[-0.02em] text-ink">
              {config.headline}
            </h1>
            <blockquote className="mt-6 border-l-2 border-claret pl-5 font-fraunces text-[clamp(20px,1.6vw,28px)] italic leading-[1.4] text-graphite">
              &ldquo;{config.quote}&rdquo;
            </blockquote>
            <p className="mt-3 pl-5 font-mono text-[11px] uppercase tracking-[0.28em] text-graphite">
              — EDITORIAL NOTE, VOL. I
            </p>
          </div>
          <div className="hidden md:col-span-5 md:flex md:justify-end">
            <Polaroid
              src="/images/editions/edition-02.jpg"
              alt="A library reading room in low light, ranks of spines on dark timber shelves."
              tint="sage"
              edition={config.edition}
              rotate={3}
              className="w-full max-w-[320px]"
            />
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1720px] px-6 md:px-10 xl:px-14">
        {/* ── Single control row: DISCIPLINE + SEARCH + count ──────────── */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-5 border-b border-line py-7 md:py-8">
          <DisciplineNav active={active} onChange={setActive} />

          <div className="flex flex-1 items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-graphite">
              SEARCH
            </span>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="phrase, headword, or alternative…"
              className="w-full max-w-[520px] border-b border-line bg-transparent py-2 font-fraunces text-[20px] italic text-ink placeholder:text-graphite/60 focus:border-ink focus:outline-none md:text-[22px]"
            />
          </div>

          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-graphite">
            {activeQuery.data ? `${activeQuery.data.length} ${config.unitLabel}` : ''}
          </p>
        </div>

        {/* ── Body ────────────────────────────────────────────────────────── */}
        <Body active={active} config={config} query={activeQuery} />
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────── */
/* Body — switches the entry renderer per discipline. Pulled out of the    */
/* page component so the loading/error/empty states are written once.      */
/* ──────────────────────────────────────────────────────────────────────── */

interface BodyProps {
  active: LexiconDiscipline
  config: { emptyState: string }
  query: {
    data?: unknown[]
    isPending: boolean
    isError: boolean
  }
}

function Body({ active, config, query }: BodyProps) {
  if (query.isPending) {
    return (
      <motion.p
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="mt-14 font-fraunces text-[30px] italic text-graphite md:text-[34px]"
      >
        Opening the lexicon…
      </motion.p>
    )
  }

  if (query.isError) {
    return (
      <p className="mt-14 font-fraunces text-[24px] italic text-claret md:text-[26px]">
        The lexicon is momentarily out of reach. Please refresh.
      </p>
    )
  }

  if (!query.data || query.data.length === 0) {
    return (
      <p className="mt-14 font-fraunces text-[24px] italic text-graphite md:text-[26px]">
        {config.emptyState}
      </p>
    )
  }

  if (active === 'vocabulary') {
    return (
      <div>
        {(query.data as VocabWord[]).map((w, i) => (
          <VocabularyEntry key={w.id} word={w} index={i} />
        ))}
      </div>
    )
  }

  if (active === 'collocations') {
    return (
      <div>
        {(query.data as Collocation[]).map((c, i) => (
          <CollocationEntry key={c.id} item={c} index={i} />
        ))}
      </div>
    )
  }

  return (
    <div>
      {(query.data as LinkingDevice[]).map((d, i) => (
        <LinkingEntry key={d.id} item={d} index={i} />
      ))}
    </div>
  )
}

