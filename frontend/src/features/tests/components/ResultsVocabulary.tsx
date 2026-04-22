import type { Test } from '@shared/schemas/test'

interface ResultsVocabularyProps {
  test: Test
}

export function ResultsVocabulary({ test }: ResultsVocabularyProps) {
  if (test.skill !== 'reading' || !test.passages) return null
  const passages = test.passages.filter((p) => p.vocabulary.length > 0)
  if (passages.length === 0) {
    return (
      <p className="font-fraunces text-[20px] italic text-graphite">
        No vocabulary highlights for this test. The passages are self-explanatory.
      </p>
    )
  }
  return (
    <div className="space-y-10">
      {passages.map((passage) => (
        <section key={passage.id}>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-claret">
            PASSAGE 0{passage.number} · {passage.title.toUpperCase()}
          </p>
          <dl className="mt-5 space-y-5">
            {passage.vocabulary.map((v) => (
              <div key={v.term} className="border-t border-line pt-5 first:border-t-0 first:pt-0">
                <dt className="font-fraunces text-[24px] italic text-ink">{v.term}</dt>
                <dd className="mt-2 font-fraunces text-[19px] leading-relaxed text-graphite">
                  {v.definition}
                </dd>
                {v.translation && (
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-claret">
                    {v.translation}
                  </p>
                )}
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  )
}
