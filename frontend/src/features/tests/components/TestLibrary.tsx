import { useMemo, useState } from 'react'
import type { Test } from '@shared/schemas/test'
import { useTestsQuery } from '@/features/tests/hooks/useTestsQuery'
import { Polaroid } from '@/components/ui/Polaroid'
import { FilterBar, type TestFilters } from './FilterBar'
import { TestCard } from './TestCard'
import { ProgressStrip } from './ProgressStrip'

const DEFAULT_FILTERS: TestFilters = {
  skill: 'all',
  difficulty: 'all',
  includePro: true,
}

function matches(test: Test, f: TestFilters): boolean {
  if (f.skill !== 'all' && test.skill !== f.skill) return false
  if (f.difficulty !== 'all' && test.difficulty !== f.difficulty) return false
  if (!f.includePro && test.isPro) return false
  return true
}

export function TestLibrary() {
  const { data: tests = [], isPending } = useTestsQuery()
  const [filters, setFilters] = useState<TestFilters>(DEFAULT_FILTERS)

  const visible = useMemo(() => tests.filter((t) => matches(t, filters)), [tests, filters])

  return (
    <div>
      {/* Masthead */}
      <header className="border-b border-line">
        <div className="mx-auto grid max-w-[1720px] grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-[1fr_480px] md:gap-16 md:px-10 xl:px-14">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-claret">
              ◆ PRACTICE TESTS · EDITION VIII
            </p>
            <h1 className="mt-4 font-fraunces text-[clamp(44px,6vw,84px)] leading-[0.95] tracking-tight text-ink">
              The practice hall.
            </h1>
            <blockquote className="mt-8 max-w-[48ch] border-l-2 border-claret pl-5 font-fraunces text-[22px] italic leading-relaxed text-graphite md:text-[24px]">
              "The examiner is a question. Your answer is a pattern."
            </blockquote>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
              — EDITORIAL NOTE, VOL. VIII
            </p>
          </div>
          <Polaroid
            src="/images/editions/edition-01.jpg"
            alt="A library aisle lined with bookshelves."
            tint="claret"
            edition="EDITION № VIII"
            orientation="landscape"
            rotate={4}
            className="mx-auto hidden w-full max-w-[440px] md:block"
          />
        </div>
      </header>

      <ProgressStrip />
      <FilterBar value={filters} onChange={setFilters} />

      <section className="mx-auto max-w-[1720px] px-6 py-10 md:px-10 xl:px-14">
        {isPending ? (
          <p className="py-16 text-center font-fraunces text-[24px] italic text-graphite">
            Opening the library…
          </p>
        ) : visible.length === 0 ? (
          <p className="py-16 text-center font-fraunces text-[24px] italic text-graphite">
            The library is quiet here. Try another filter.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((t, i) => (
              <TestCard key={t.id} test={t} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
