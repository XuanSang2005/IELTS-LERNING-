import { useMemo, useState } from 'react'
import type { Family, FamilyFilter } from '@shared/schemas/atlas'
import { Nav } from '@/features/landing/components/Nav'
import { Polaroid } from '@/components/ui/Polaroid'
import { ATLAS_VOLUME } from '@/features/atlas/data/seed-specimens'
import { FamilyIndex } from './FamilyIndex'
import { FilterBar } from './FilterBar'
import { SpecimenCard } from './SpecimenCard'

export function AtlasPage() {
  const specimens = ATLAS_VOLUME.specimens
  const [filter, setFilter] = useState<FamilyFilter>('all')

  const counts = useMemo<Record<Family, number>>(() => {
    const base: Record<Family, number> = { I: 0, II: 0, III: 0, IV: 0, V: 0 }
    for (const s of specimens) base[s.family] += 1
    return base
  }, [specimens])

  const visible = useMemo(
    () => (filter === 'all' ? specimens : specimens.filter((s) => s.family === filter)),
    [specimens, filter],
  )

  return (
    <div>
      <Nav />

      {/* Masthead */}
      <header className="border-b-2 border-line">
        <div className="mx-auto grid max-w-[1720px] grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-[1fr_440px] md:gap-16 md:px-10 md:py-20 xl:px-14">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
              ◆ ATLAS OF MISTAKES · VOLUME I
            </p>
            <h1 className="mt-5 font-fraunces text-[clamp(44px,6vw,88px)] leading-[0.95] -tracking-[0.02em] text-ink">
              The atlas of <span className="italic">mistakes.</span>
            </h1>
            <blockquote className="mt-8 max-w-[48ch] border-l-2 border-claret pl-5 font-fraunces text-[22px] italic leading-relaxed text-graphite md:text-[24px]">
              &ldquo;Every error is a map of the language you haven&rsquo;t yet learned.&rdquo;
            </blockquote>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
              — EDITORIAL NOTE, VOL. I · MMXXVI
            </p>
          </div>
          <Polaroid
            src="/images/editions/edition-01.jpg"
            alt="A page from a botanical atlas, annotated in claret ink."
            tint="claret"
            edition="VOLUME № I"
            orientation="portrait"
            rotate={-3}
            className="mx-auto hidden w-full max-w-[400px] md:block"
          />
        </div>
      </header>

      {/* Colophon — how to use this volume */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-6 py-14 md:grid-cols-[180px_1fr] md:gap-14 md:px-10 md:py-16 xl:px-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
            ◆ COLOPHON
          </p>
          <div className="max-w-[62ch] font-fraunces text-[20px] leading-relaxed text-ink md:text-[22px]">
            <p>
              This atlas catalogues {specimens.length} specimens of error, observed across
              essays submitted to Meridian between MMXXIV and MMXXVI. Each entry is
              annotated with its frequency, its cost in band points, and — where relevant
              — its origin in the grammar of Vietnamese.
            </p>
            <p className="mt-4 font-geist text-[16px] leading-relaxed text-graphite">
              Volumes are organised by the source of the error, not the skill it touches.
              Five families, ordered by how the examiner reads them: from the literal
              translation through to the syntactic echo. Read one family at a sitting, or
              consult a specimen when you meet it in your own writing.
            </p>
          </div>
        </div>
      </section>

      <FamilyIndex counts={counts} active={filter} onSelect={setFilter} />

      <FilterBar
        value={filter}
        onChange={setFilter}
        total={specimens.length}
        shown={visible.length}
      />

      {/* Specimen grid */}
      <section className="mx-auto max-w-[1720px] px-6 py-14 md:px-10 md:py-20 xl:px-14">
        {visible.length === 0 ? (
          <p className="py-16 text-center font-fraunces text-[24px] italic text-graphite">
            No specimens in this family yet. Volume II is in preparation.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-10 md:gap-12 lg:grid-cols-2">
            {visible.map((s, i) => (
              <SpecimenCard key={s.plate} specimen={s} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Footer colophon */}
      <footer className="border-t-2 border-line">
        <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-10 md:py-16 xl:px-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
            ◆ COMPILED BY
          </p>
          <p className="mt-5 max-w-[62ch] font-fraunces text-[19px] italic leading-relaxed text-graphite md:text-[21px]">
            Hà Linh Nguyễn, Band 8.5 Overall, between Cohort I and Cohort IV. Submissions
            for Volume II are open — send your essay through your Pro account and a new
            specimen may take its plate in the next edition.
          </p>
        </div>
      </footer>
    </div>
  )
}
