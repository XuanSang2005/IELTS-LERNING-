import type {
  DiagnosticAnswerValue,
  DiagnosticTest,
} from '@shared/schemas/diagnostic'
import type { Question } from '@shared/schemas/test'

/**
 * Map correct-out-of-5 to a half-band score. Same table for listening + reading
 * given that v1 uses 5-question banks per skill. If banks change size, update here.
 */
const SCORE_TABLE: ReadonlyArray<{ correct: number; band: number }> = [
  { correct: 5, band: 8.0 },
  { correct: 4, band: 7.0 },
  { correct: 3, band: 6.0 },
  { correct: 2, band: 5.0 },
  { correct: 1, band: 4.5 },
  { correct: 0, band: 4.0 },
]

export function correctToBand(correct: number, total: number): number {
  // Clamp; if a question pool grows past 5 in v2, scale linearly.
  if (total === 0) return 4.0
  if (total === 5) {
    return SCORE_TABLE.find((row) => row.correct === correct)?.band ?? 4.0
  }
  // Generic linear scale, half-band rounded.
  const ratio = correct / total
  const raw = 4.0 + ratio * 4.0
  return Math.round(raw * 2) / 2
}

interface GradeOutcome {
  correct: number
  total: number
  band: number
}

/**
 * Score a section of question answers against the question pool. Answers
 * must be keyed by question.id. Missing or malformed answers are scored
 * incorrect (no penalty / no partial credit in v1).
 */
export function gradeSection(
  questions: ReadonlyArray<Question>,
  answers: Record<string, DiagnosticAnswerValue>,
): GradeOutcome {
  let correct = 0
  for (const q of questions) {
    const submitted = answers[q.id]
    if (isQuestionCorrect(q, submitted)) correct += 1
  }
  return { correct, total: questions.length, band: correctToBand(correct, questions.length) }
}

function normaliseText(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, ' ')
}

function textMatches(submitted: string, expected: string, variants: ReadonlyArray<string>): boolean {
  const candidate = normaliseText(submitted)
  if (candidate === normaliseText(expected)) return true
  return variants.some((v) => candidate === normaliseText(v))
}

function isQuestionCorrect(q: Question, submitted: DiagnosticAnswerValue | undefined): boolean {
  if (submitted === undefined || submitted === null) return false

  switch (q.type) {
    case 'multiple-choice':
      return typeof submitted === 'string' && submitted === q.correctAnswer
    case 'multi-select': {
      if (!Array.isArray(submitted)) return false
      if (submitted.length !== q.correctAnswers.length) return false
      const submittedSet = new Set(submitted)
      return q.correctAnswers.every((a) => submittedSet.has(a))
    }
    case 'true-false-not-given':
    case 'yes-no-not-given':
      return typeof submitted === 'string' && submitted === q.correctAnswer
    case 'short-answer':
    case 'sentence-completion':
      return (
        typeof submitted === 'string' &&
        textMatches(submitted, q.correctAnswer, q.acceptableVariants ?? [])
      )
    case 'matching':
    case 'plan-map-diagram': {
      if (typeof submitted !== 'object' || Array.isArray(submitted)) return false
      const expected = q.correctMapping
      const expectedKeys = Object.keys(expected)
      if (expectedKeys.length === 0) return false
      return expectedKeys.every((k) => submitted[k] === expected[k])
    }
    case 'matching-information':
    case 'matching-headings':
      return typeof submitted === 'string' && submitted === q.correctAnswer
    case 'summary-completion':
    case 'form-completion':
    case 'note-table-completion':
    case 'flow-chart-completion': {
      if (typeof submitted !== 'object' || Array.isArray(submitted)) return false
      // All blanks must match.
      return q.blanks.every((blank) => {
        const value = submitted[blank.id]
        if (typeof value !== 'string') return false
        return textMatches(value, blank.correctAnswer, blank.acceptableVariants ?? [])
      })
    }
    default: {
      // Exhaustiveness placeholder.
      const _exhaustive: never = q
      return _exhaustive
    }
  }
}

/** Helper used by callers to spot-check a v1 test pool has the expected shape. */
export function diagnosticPoolSummary(test: DiagnosticTest): {
  listening: number
  reading: number
} {
  return {
    listening: test.listening.questions.length,
    reading: test.reading.questions.length,
  }
}
