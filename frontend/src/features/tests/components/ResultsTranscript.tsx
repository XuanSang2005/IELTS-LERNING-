import type { Test } from '@shared/schemas/test'

interface ResultsTranscriptProps {
  test: Test
}

export function ResultsTranscript({ test }: ResultsTranscriptProps) {
  if (test.skill !== 'listening' || !test.sections) return null
  return (
    <div className="space-y-10">
      {test.sections.map((section) => (
        <section key={section.id}>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-claret">
            SECTION 0{section.number} / IV · {section.title.toUpperCase()}
          </p>
          <p className="mt-5 whitespace-pre-wrap font-fraunces text-[20px] leading-[1.7] text-ink">
            {section.transcript}
          </p>
        </section>
      ))}
    </div>
  )
}
