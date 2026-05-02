import { Polaroid } from '@/components/ui/Polaroid'

interface ArchiveCard {
  src: string
  alt: string
  edition: string
  caption: string
  rotate: number
  tint: 'claret' | 'sage'
}

const ARCHIVE_CARDS: ReadonlyArray<ArchiveCard> = [
  {
    src: '/images/editions/edition-01.jpg',
    alt: 'Library stacks in late afternoon',
    edition: 'EDITION № I',
    caption: 'Last writing — graded 6.5',
    rotate: -3,
    tint: 'claret',
  },
  {
    src: '/images/editions/edition-02.jpg',
    alt: 'Open notebook on desk',
    edition: 'EDITION № II',
    caption: 'Saved · 12 phrases',
    rotate: 2,
    tint: 'sage',
  },
  {
    src: '/images/editions/edition-04.jpg',
    alt: 'Fountain pen on handwritten notes',
    edition: 'EDITION № III',
    caption: 'Mock 02 · 6.0 overall',
    rotate: -2,
    tint: 'claret',
  },
]

/**
 * Closing strip — three small Polaroids in a row showing recent activity.
 * Pure visual texture; gives the page a satisfying close instead of trailing
 * off after the band scale.
 */
export function ArchiveStrip() {
  return (
    <section>
      <div className="mx-auto w-full max-w-[1720px] px-6 py-14 md:px-10 md:py-16 xl:px-14">
        <header className="flex flex-col items-center text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em]">
            <span className="text-claret">◆ FROM THE ARCHIVE</span>
            <span className="mx-2 text-line">·</span>
            <span className="text-graphite">RECENT EDITIONS</span>
          </p>
          <p className="mt-5 max-w-[52ch] font-fraunces text-[16px] italic leading-relaxed text-graphite md:text-[18px]">
            What you have made, kept, and carried forward.
          </p>
        </header>

        <div className="mx-auto mt-12 grid max-w-[1100px] grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
          {ARCHIVE_CARDS.map((c) => (
            <figure key={c.edition} className="flex flex-col items-center">
              <Polaroid
                src={c.src}
                alt={c.alt}
                tint={c.tint}
                edition={c.edition}
                rotate={c.rotate}
                className="w-[200px]"
              />
              <figcaption className="mt-5 text-center font-fraunces text-[15px] italic leading-snug text-graphite md:text-[16px]">
                {c.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
