import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import type { VocabWord } from '@shared/schemas/vocabulary'
import { Polaroid } from '@/components/ui/Polaroid'
import { useVocabulary, type VocabularyFilter } from '../hooks/vocabulary-queries'

const REGISTERS: Array<'all' | 'B1' | 'B2' | 'C1'> = ['all', 'B1', 'B2', 'C1']

const REGISTER_TINT: Record<'B1' | 'B2' | 'C1', string> = {
  B1: 'text-graphite',
  B2: 'text-sage',
  C1: 'text-claret',
}

function entryNumeral(n: number): string {
  return `№ ${String(n + 1).padStart(2, '0')}`
}

function VocabEntry({ word, index }: { word: VocabWord; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.02 }}
      className="border-b border-line py-10 md:py-12"
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
        {/* Left: headword + POS + definition */}
        <div className="md:col-span-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-graphite">
            {entryNumeral(index)}
            <span className="mx-2 text-ochre">◆</span>
            <span className="text-claret">{word.partOfSpeech.toUpperCase()}</span>
            <span className="mx-2">·</span>
            <span className={REGISTER_TINT[word.register]}>{word.register}</span>
          </p>
          <h3 className="mt-3 font-fraunces text-[48px] italic leading-none text-ink md:text-[56px]">
            {word.headword}
            <em className="not-italic text-claret">.</em>
          </h3>
          <p className="mt-4 max-w-[32ch] font-fraunces text-[17px] italic leading-snug text-graphite md:text-[18px]">
            {word.definition}
          </p>
          {word.topic && (
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
              TOPIC · {word.topic}
            </p>
          )}
        </div>

        {/* Middle: example — shifted one column left */}
        <div className="md:col-span-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
            ◆ EXAMPLE
          </p>
          <blockquote className="mt-3 border-l-2 border-claret pl-5 font-fraunces text-[19px] italic leading-[1.5] text-ink md:text-[21px]">
            {word.example}
          </blockquote>
        </div>

        {/* Right: synonyms ledger */}
        <div className="md:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
            ◆ SYNONYMS · {word.synonyms.length}
          </p>
          <ul className="mt-3 space-y-3">
            {word.synonyms.map((s) => (
              <li
                key={s.word}
                className="grid grid-cols-[1fr_auto] items-baseline gap-3 border-b border-dashed border-line pb-2.5"
              >
                <span>
                  <span className="font-fraunces text-[22px] text-ink md:text-[24px]">
                    {s.word}
                  </span>
                  {s.nuance && (
                    <span className="ml-2 font-fraunces text-[14px] italic text-graphite md:text-[15px]">
                      — {s.nuance}
                    </span>
                  )}
                </span>
                <span
                  className={`font-mono text-[11px] uppercase tracking-[0.22em] ${REGISTER_TINT[s.register]}`}
                >
                  {s.register}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  )
}

export function VocabularyPage() {
  const [register, setRegister] = useState<'all' | 'B1' | 'B2' | 'C1'>('all')
  const [q, setQ] = useState('')

  const filter: VocabularyFilter = useMemo(() => {
    const f: VocabularyFilter = {}
    if (register !== 'all') f.register = register
    if (q.trim()) f.q = q.trim()
    return f
  }, [register, q])

  const { data, isPending, isError } = useVocabulary(filter)

  return (
    <div className="w-full pb-20">
      {/* Masthead */}
      <header className="border-b-2 border-line">
        <div className="mx-auto grid w-full max-w-[1720px] grid-cols-1 items-center gap-10 px-6 pb-16 pt-11 md:grid-cols-12 md:gap-14 md:px-10 xl:px-14">
          <div className="md:col-span-7">
            <p className="font-mono text-[12px] uppercase tracking-[0.3em] md:text-[13px]">
              <span className="mr-2 text-claret">◆</span>
              <span className="text-claret">THE LEXICON</span>
              <span className="mx-2 text-graphite">·</span>
              <span className="text-graphite">FIFTY HEADWORDS, TWO HUNDRED SYNONYMS</span>
            </p>
            <h1 className="mt-5 font-fraunces text-[clamp(52px,6.4vw,88px)] font-normal leading-[0.95] tracking-[-0.02em] text-ink">
              The lexicon.
            </h1>
            <blockquote className="mt-6 border-l-2 border-claret pl-5 font-fraunces text-[clamp(20px,1.6vw,28px)] italic leading-[1.4] text-graphite">
              &ldquo;A Band 6 essay says <em className="not-italic text-claret">important</em> four
              times. A Band 7 essay says it once — then reaches for
              <em className="not-italic text-claret"> crucial</em>,
              <em className="not-italic text-claret"> pivotal</em>,
              <em className="not-italic text-claret"> instrumental</em>.&rdquo;
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
              edition="LEXICON № I"
              rotate={3}
              className="w-full max-w-[320px]"
            />
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1720px] px-6 md:px-10 xl:px-14">
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-6 border-b border-line py-6 md:py-7">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-graphite">
              REGISTER
            </span>
            <div className="flex gap-1.5">
              {REGISTERS.map((r) => {
                const active = r === register
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRegister(r)}
                    className={`border px-3.5 py-1.5 font-mono text-[12px] uppercase tracking-[0.22em] transition-colors duration-150 md:text-[13px] ${
                      active
                        ? 'border-ink bg-ink text-ivory'
                        : 'border-line bg-transparent text-ink hover:border-ink'
                    }`}
                  >
                    {r === 'all' ? 'ALL' : r}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex flex-1 items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-graphite">
              SEARCH
            </span>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="headword or synonym…"
              className="w-full max-w-[520px] border-b border-line bg-transparent py-2 font-fraunces text-[20px] italic text-ink placeholder:text-graphite/60 focus:border-ink focus:outline-none md:text-[22px]"
            />
          </div>

          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-graphite">
            {data ? `${data.length} ENTRIES` : ''}
          </p>
        </div>

        {/* Body */}
        {isPending && (
          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-14 font-fraunces text-[30px] italic text-graphite md:text-[34px]"
          >
            Opening the lexicon…
          </motion.p>
        )}

        {isError && (
          <p className="mt-14 font-fraunces text-[24px] italic text-claret md:text-[26px]">
            The lexicon is momentarily out of reach. Please refresh.
          </p>
        )}

        {data && data.length === 0 && (
          <p className="mt-14 font-fraunces text-[24px] italic text-graphite md:text-[26px]">
            Nothing matches. Loosen the filter, or try another word.
          </p>
        )}

        {data && data.length > 0 && (
          <div>
            {data.map((w, i) => (
              <VocabEntry key={w.id} word={w} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
