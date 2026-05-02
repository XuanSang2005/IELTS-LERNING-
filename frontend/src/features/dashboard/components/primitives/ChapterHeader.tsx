interface ChapterHeaderProps {
  /** Roman numeral, e.g. "II". Renders as `CH. II`. */
  chapter: string
  /** Section name in the eyebrow, e.g. "THE PHASE". */
  eyebrow: string
  /** Section headline, e.g. "Diagnosis". A claret period is appended. */
  headline: string
  /** Italic Fraunces tagline below the headline. Optional. */
  tagline?: string
  /** Right-side meta label, e.g. "WEEK 01 / XII". Optional. */
  meta?: string
}

/**
 * Centred chapter-opener header. Eyebrow + headline + tagline + claret hairline.
 * The single visual language for every dashboard section header — replaces the
 * old stitched-leather ChapterDivider pill.
 */
export function ChapterHeader({
  chapter,
  eyebrow,
  headline,
  tagline,
  meta,
}: ChapterHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.32em]">
        <span className="text-claret">◆ CH. {chapter}</span>
        <span className="mx-2 text-line">·</span>
        <span className="text-graphite">{eyebrow}</span>
        {meta && (
          <>
            <span className="mx-2 text-line">·</span>
            <span className="text-graphite">{meta}</span>
          </>
        )}
      </p>

      <h2 className="mt-5 font-fraunces text-[clamp(36px,4.5vw,64px)] font-normal leading-[0.95] tracking-[-0.02em] text-ink">
        {headline}
        <span className="text-claret">.</span>
      </h2>

      {tagline && (
        <p className="mt-5 max-w-[52ch] font-fraunces text-[16px] italic leading-relaxed text-graphite md:text-[18px]">
          {tagline}
        </p>
      )}

      <span aria-hidden="true" className="mt-7 block h-px w-12 bg-claret" />
    </header>
  )
}
