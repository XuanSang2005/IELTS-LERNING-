interface LiteraryInterludeProps {
  /** The featured quote text. */
  quote: string
  /** Optional attribution. */
  attribution?: string
}

/**
 * Full-width literary quote inserted between word groups to give the lesson
 * editorial breathing room. Visual rest stop, not extra reading.
 */
export function LiteraryInterlude({ quote, attribution }: LiteraryInterludeProps) {
  return (
    <aside className="my-12 border-y border-claret/30 bg-tint/40 px-6 py-10 md:my-16 md:px-12 md:py-14">
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-claret">
        ◆ INTERLUDE
      </p>
      <blockquote className="mt-5 max-w-[68ch] font-fraunces text-[22px] italic leading-[1.4] text-ink md:text-[28px]">
        &ldquo;{quote}&rdquo;
      </blockquote>
      {attribution && (
        <footer className="mt-4 font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
          — {attribution}
        </footer>
      )}
    </aside>
  )
}
