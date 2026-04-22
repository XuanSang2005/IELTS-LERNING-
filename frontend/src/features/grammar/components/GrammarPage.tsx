import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Lesson, LessonSummary } from '@shared/schemas/lesson'
import { Polaroid } from '@/components/ui/Polaroid'
import { useGrammarLessons, useLessonById } from '../hooks/grammar-queries'

const REGISTER_TINT: Record<'B1' | 'B2' | 'C1', string> = {
  B1: 'text-graphite',
  B2: 'text-sage',
  C1: 'text-claret',
}

function toRoman(n: number): string {
  const map: [number, string][] = [
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ]
  let out = ''
  let v = n
  for (const [val, sym] of map) {
    while (v >= val) {
      out += sym
      v -= val
    }
  }
  return out || 'I'
}

function LessonRow({
  lesson,
  index,
  open,
  onToggle,
}: {
  lesson: LessonSummary
  index: number
  open: boolean
  onToggle: () => void
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.03 }}
      className="border-b border-line"
    >
      <button
        type="button"
        onClick={onToggle}
        className="group grid w-full grid-cols-[80px_1fr_auto] items-baseline gap-6 py-6 text-left transition-colors duration-200 hover:bg-bone/40"
      >
        <span className="font-fraunces text-[32px] italic text-claret">
          CH. {toRoman(lesson.day)}
        </span>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em]">
            <span className="text-graphite">DAY {String(lesson.day).padStart(2, '0')}</span>
            <span className="mx-2 text-ochre">◆</span>
            <span className={REGISTER_TINT[lesson.level === 'foundation' ? 'B1' : lesson.level === 'mastery' ? 'C1' : 'B2']}>
              {lesson.level.toUpperCase()}
            </span>
            <span className="mx-2 text-graphite">·</span>
            <span className="text-graphite">WEEK {String(lesson.week).padStart(2, '0')}</span>
          </p>
          <h3 className="mt-2 font-fraunces text-[28px] italic leading-none text-ink">
            {lesson.title}
          </h3>
          <p className="mt-2 max-w-[64ch] font-fraunces text-[16px] italic leading-snug text-graphite">
            {lesson.subtitle}
          </p>
        </div>
        <span className="text-right">
          <span className="block font-mono text-[11px] uppercase tracking-[0.22em] text-graphite">
            {lesson.estimatedMinutes} MIN
          </span>
          <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-claret transition-transform duration-200 group-hover:translate-x-1">
            {open ? '— CLOSE' : 'READ →'}
          </span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && <LessonDetail id={lesson.id} />}
      </AnimatePresence>
    </motion.article>
  )
}

function LessonDetail({ id }: { id: string }) {
  const { data, isPending, isError } = useLessonById(id)

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden"
    >
      <div className="grid grid-cols-1 gap-10 border-t border-dashed border-line px-1 py-8 lg:grid-cols-12">
        {isPending && (
          <p className="col-span-full font-fraunces text-[20px] italic text-graphite">
            Opening the lesson…
          </p>
        )}
        {isError && (
          <p className="col-span-full font-fraunces text-[20px] italic text-claret">
            The lesson is momentarily out of reach.
          </p>
        )}
        {data && <LessonBody lesson={data} />}
      </div>
    </motion.div>
  )
}

function LessonBody({ lesson }: { lesson: Lesson }) {
  return (
    <>
      {/* Hook + theory */}
      <div className="lg:col-span-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-claret">§ I · HOOK</p>
        <p className="mt-3 font-fraunces text-[20px] italic leading-[1.45] text-ink">
          {lesson.hook}
        </p>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.28em] text-claret">
          § II · THEORY
        </p>
        <p className="mt-3 font-geist text-[15px] leading-[1.7] text-ink">{lesson.theory}</p>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.28em] text-claret">
          § III · EXAMPLES
        </p>
        <ul className="mt-3 space-y-3">
          {lesson.examples.map((ex, i) => (
            <li
              key={i}
              className="grid grid-cols-[40px_1fr] gap-4 border-b border-dashed border-line pb-3"
            >
              <span
                className={`font-mono text-[11px] uppercase tracking-[0.22em] ${REGISTER_TINT[ex.register]}`}
              >
                {ex.register}
              </span>
              <span className="font-fraunces text-[17px] italic leading-snug text-ink">
                {ex.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Mistakes + practice + extension + noticing */}
      <div className="lg:col-span-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-claret">
          § IV · COMMON MISTAKES
        </p>
        <ul className="mt-3 space-y-4">
          {lesson.mistakes.map((m, i) => (
            <li key={i} className="border-b border-dashed border-line pb-3">
              <p className="font-fraunces text-[16px] italic leading-snug text-graphite line-through decoration-claret/60">
                {m.wrong}
              </p>
              <p className="mt-1 font-fraunces text-[17px] italic leading-snug text-ink">
                {m.right}
              </p>
              <p className="mt-1 font-geist text-[13px] leading-relaxed text-graphite">{m.why}</p>
            </li>
          ))}
        </ul>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.28em] text-claret">
          § V · PRACTICE · {lesson.practice.length} EXERCISES
        </p>
        <ol className="mt-3 space-y-4">
          {lesson.practice.map((ex, i) => (
            <li key={ex.id} className="border-b border-dashed border-line pb-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
                № {String(i + 1).padStart(2, '0')} · {ex.kind.toUpperCase()}
              </p>
              <p className="mt-1 font-geist text-[14px] leading-[1.6] text-ink">{ex.prompt}</p>
              {ex.choices && (
                <ul className="mt-2 space-y-1 pl-4 font-geist text-[13px] text-graphite">
                  {ex.choices.map((c) => (
                    <li key={c}>— {c}</li>
                  ))}
                </ul>
              )}
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-sage">
                ANSWER · <span className="normal-case tracking-normal text-ink">{ex.answer}</span>
              </p>
              {ex.explanation && (
                <p className="mt-1 font-fraunces text-[14px] italic leading-snug text-graphite">
                  {ex.explanation}
                </p>
              )}
            </li>
          ))}
        </ol>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.28em] text-claret">
          § VI · EXTENSION · TASK 2
        </p>
        <p className="mt-3 font-fraunces text-[16px] italic leading-snug text-ink">
          {lesson.extension.prompt}
        </p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
          MIN. WORDS · {lesson.extension.minWords}
        </p>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.28em] text-claret">
          § VII · NOTICING
        </p>
        <ul className="mt-3 space-y-2">
          {lesson.noticing.map((n, i) => (
            <li key={i} className="border-l-2 border-claret pl-4">
              <p className="font-fraunces text-[17px] italic leading-snug text-ink">{n.text}</p>
              <p className="mt-0.5 font-geist text-[13px] italic leading-snug text-graphite">
                {n.context}
              </p>
              {n.note && (
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
                  NOTE · <span className="normal-case tracking-normal">{n.note}</span>
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export function GrammarPage() {
  const { data, isPending, isError } = useGrammarLessons()
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="mx-auto w-full max-w-[1720px] px-10 pb-20 pt-11">
      {/* Masthead */}
      <header className="grid grid-cols-1 items-center gap-10 pb-6 md:grid-cols-12 md:gap-14">
        <div className="md:col-span-7">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em]">
            <span className="mr-2 text-claret">◆</span>
            <span className="text-claret">THE GRAMMAR ROOM</span>
            <span className="mx-2 text-graphite">·</span>
            <span className="text-graphite">CHAPTERS I — X</span>
          </p>
          <h1 className="mt-5 font-fraunces text-[clamp(52px,6.4vw,88px)] font-normal leading-[0.95] tracking-[-0.02em] text-ink">
            The grammar room.
          </h1>
          <blockquote className="mt-6 border-l-2 border-claret pl-5 font-fraunces text-[clamp(18px,1.5vw,24px)] italic leading-[1.4] text-graphite">
            "Grammar is not a cage.
            <em className="not-italic text-claret"> It is a scaffold.</em>
            Master the shape, and the sentence writes itself."
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
      </header>

      {/* Double hairline separator — matches the tests page */}
      <div className="mt-10 border-t border-line" />
      <div className="h-4 border-b border-line" />

      {/* Body */}
      <section className="mt-8">
        {isPending && (
          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="font-fraunces text-[28px] italic text-graphite"
          >
            Opening the grammar room…
          </motion.p>
        )}
        {isError && (
          <p className="font-fraunces text-[22px] italic text-claret">
            The grammar room is momentarily out of reach. Please refresh.
          </p>
        )}
        {data && data.length === 0 && (
          <p className="font-fraunces text-[22px] italic text-graphite">
            No chapters published yet. Return tomorrow.
          </p>
        )}
        {data && data.length > 0 && (
          <div>
            {data.map((lesson, i) => (
              <LessonRow
                key={lesson.id}
                lesson={lesson}
                index={i}
                open={openId === lesson.id}
                onToggle={() => setOpenId(openId === lesson.id ? null : lesson.id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
