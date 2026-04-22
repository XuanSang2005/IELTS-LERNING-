import type { ReadingPassage } from '@shared/schemas/test'

interface PassageReaderProps {
  passage: ReadingPassage
}

export function PassageReader({ passage }: PassageReaderProps) {
  return (
    <article className="prose-none">
      <h2 className="font-fraunces text-[clamp(26px,3vw,36px)] leading-tight text-ink">
        {passage.title}
      </h2>
      <div
        className="mt-6 space-y-5 font-fraunces text-[20px] leading-[1.65] text-ink [&_em]:italic [&_strong]:text-claret [&_strong]:font-medium"
        dangerouslySetInnerHTML={{ __html: passage.bodyHtml }}
      />
    </article>
  )
}
