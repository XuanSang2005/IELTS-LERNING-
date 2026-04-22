import type {
  Answer,
  AnswerValue,
  Question,
  ResultQuestion,
  Test,
  TestMode,
  TestResult,
} from '@shared/schemas/test'
import { convertRawToBand } from './band-conversion'

const LEADING_ARTICLE_RE = /^(the|a|an)\s+/i
const WHITESPACE_RE = /\s+/g

function normaliseText(input: string): string {
  return input.trim().toLowerCase().replace(WHITESPACE_RE, ' ')
}

function matchesText(
  userValue: string,
  correct: string,
  variants: string[],
  maxWords: number,
): boolean {
  const trimmed = userValue.trim()
  if (!trimmed) return false
  const wordCount = trimmed.split(/\s+/).filter(Boolean).length
  if (wordCount > maxWords) return false

  const candidates = [correct, ...variants].flatMap((v) => [v, v.replace(LEADING_ARTICLE_RE, '')])
  const normalisedUser = normaliseText(trimmed.replace(LEADING_ARTICLE_RE, ''))
  return candidates.some((c) => normaliseText(c) === normalisedUser)
}

function arraysEqualSet(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false
  const sortedA = [...a].sort()
  const sortedB = [...b].sort()
  return sortedA.every((v, i) => v === sortedB[i])
}

/** Returns the raw answer to display on the results page alongside user's input. */
export function correctAnswerFor(question: Question): AnswerValue {
  switch (question.type) {
    case 'multiple-choice':
    case 'true-false-not-given':
    case 'yes-no-not-given':
    case 'matching-information':
    case 'matching-headings':
    case 'sentence-completion':
    case 'short-answer':
      return question.correctAnswer
    case 'multi-select':
      return question.correctAnswers
    case 'matching':
    case 'plan-map-diagram':
      return question.correctMapping
    case 'form-completion':
    case 'note-table-completion':
    case 'flow-chart-completion':
    case 'summary-completion': {
      const map: Record<string, string> = {}
      for (const blank of question.blanks) map[blank.id] = blank.correctAnswer
      return map
    }
  }
}

/**
 * Score a single question. Returns whether the user's answer is correct.
 * Follows IELTS "no partial credit" rule: multi-select and mapping types
 * require all parts correct or they are marked wrong in full.
 */
export function scoreQuestion(
  question: Question,
  answerValue: AnswerValue | null | undefined,
): boolean {
  if (answerValue === null || answerValue === undefined) return false

  switch (question.type) {
    case 'multiple-choice':
    case 'true-false-not-given':
    case 'yes-no-not-given':
    case 'matching-information':
    case 'matching-headings':
      return typeof answerValue === 'string' && answerValue === question.correctAnswer

    case 'multi-select':
      return (
        Array.isArray(answerValue) && arraysEqualSet(answerValue, question.correctAnswers)
      )

    case 'sentence-completion':
    case 'short-answer':
      return (
        typeof answerValue === 'string' &&
        matchesText(
          answerValue,
          question.correctAnswer,
          question.acceptableVariants,
          question.maxWords,
        )
      )

    case 'matching':
    case 'plan-map-diagram': {
      if (Array.isArray(answerValue) || typeof answerValue === 'string') return false
      const map = answerValue as Record<string, string>
      return Object.entries(question.correctMapping).every(
        ([itemId, expected]) => map[itemId] === expected,
      )
    }

    case 'form-completion':
    case 'note-table-completion':
    case 'flow-chart-completion':
    case 'summary-completion': {
      if (Array.isArray(answerValue) || typeof answerValue === 'string') return false
      const map = answerValue as Record<string, string>
      return question.blanks.every((blank) =>
        matchesText(
          map[blank.id] ?? '',
          blank.correctAnswer,
          blank.acceptableVariants,
          blank.maxWords,
        ),
      )
    }
  }
}

export function flattenQuestions(test: Test): Question[] {
  if (test.skill === 'listening' && test.sections) {
    return test.sections.flatMap((s) => s.groups.flatMap((g) => g.questions))
  }
  if (test.skill === 'reading' && test.passages) {
    return test.passages.flatMap((p) => p.groups.flatMap((g) => g.questions))
  }
  return []
}

export interface ScoredTestInput {
  test: Test
  answers: Record<string, Answer>
  startedAt: string
  submittedAt: string
  mode: TestMode
}

export function scoreTest({
  test,
  answers,
  startedAt,
  submittedAt,
  mode,
}: ScoredTestInput): TestResult {
  const questions = flattenQuestions(test)
  const results: ResultQuestion[] = questions.map((q) => {
    const answer = answers[q.id]
    const value = answer?.value ?? null
    const isCorrect = scoreQuestion(q, value)
    return {
      questionId: q.id,
      userAnswer: value,
      correctAnswer: correctAnswerFor(q),
      isCorrect,
      explanation: q.explanation,
      questionType: q.type,
    }
  })

  const rawScore = results.filter((r) => r.isCorrect).length
  const totalQuestions = questions.length
  const { band, range } = convertRawToBand(rawScore, totalQuestions, test.skill)

  const byQuestionType = results.reduce<TestResult['byQuestionType']>(
    (acc, r) => {
      const current = acc[r.questionType] ?? { correct: 0, total: 0 }
      return {
        ...acc,
        [r.questionType]: {
          correct: current.correct + (r.isCorrect ? 1 : 0),
          total: current.total + 1,
        },
      }
    },
    {} as TestResult['byQuestionType'],
  )

  const started = new Date(startedAt).getTime()
  const submitted = new Date(submittedAt).getTime()
  const timeSpentSeconds = Math.max(0, Math.round((submitted - started) / 1000))

  return {
    id: `${test.id}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
    testId: test.id,
    submittedAt,
    rawScore,
    totalQuestions,
    estimatedBand: band,
    bandRange: range,
    timeSpentSeconds,
    mode,
    results,
    byQuestionType,
  }
}
