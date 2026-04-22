import type { Annotation } from '@shared/schemas/submission'

interface Props {
  text: string
  annotations: Annotation[]
  activeId: string | null
  onSelect: (annotation: Annotation) => void
}

interface Segment {
  text: string
  annotation?: Annotation
}

function splitSegments(text: string, annotations: Annotation[]): Segment[] {
  const valid = annotations
    .filter((a) => a.start >= 0 && a.end <= text.length && a.end > a.start)
    .sort((a, b) => a.start - b.start)

  const segments: Segment[] = []
  let cursor = 0

  for (const ann of valid) {
    // Skip overlaps \u2014 keep the first one, drop later ones that overlap.
    if (ann.start < cursor) continue
    if (ann.start > cursor) segments.push({ text: text.slice(cursor, ann.start) })
    segments.push({ text: text.slice(ann.start, ann.end), annotation: ann })
    cursor = ann.end
  }
  if (cursor < text.length) segments.push({ text: text.slice(cursor) })
  return segments
}

const SEVERITY_UNDERLINE: Record<Annotation['severity'], string> = {
  minor: 'decoration-line/50 decoration-2',
  moderate: 'decoration-claret/70 decoration-2',
  major: 'decoration-claret decoration-[3px]',
}

export function EssayWithAnnotations({ text, annotations, activeId, onSelect }: Props) {
  const segments = splitSegments(text, annotations)
  return (
    <p className="whitespace-pre-wrap font-fraunces text-[21px] leading-[1.9] text-ink">
      {segments.map((s, i) =>
        s.annotation ? (
          <button
            key={`${i}-${s.annotation.id}`}
            type="button"
            onClick={() => onSelect(s.annotation!)}
            data-severity={s.annotation.severity}
            className={`underline decoration-wavy underline-offset-[6px] transition-colors ${
              SEVERITY_UNDERLINE[s.annotation.severity]
            } ${activeId === s.annotation.id ? 'bg-claret/10' : 'hover:bg-claret/5'}`}
          >
            {s.text}
          </button>
        ) : (
          <span key={i}>{s.text}</span>
        ),
      )}
    </p>
  )
}
