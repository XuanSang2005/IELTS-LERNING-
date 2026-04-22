import type { Test } from '@shared/schemas/test'
import type {
  SpeakingTestSubmission,
  CriterionFeedback,
} from '@shared/schemas/test-ai-submission'
import { z } from 'zod'
import { SpeakingTestSubmissionSchema } from '@shared/schemas/test-ai-submission'

/**
 * Temporary client-side mock for Speaking tests. Speaking will move to
 * backend + real grading in a follow-up spec (audio upload, transcription,
 * Claude grading). Until then, this keeps the Speaking scaffold functional
 * as a frontend-only demo.
 *
 * This file is NOT the pattern to copy — Writing already lives on the
 * backend. When Speaking's backend spec lands, delete this entire file
 * and migrate to the backend API.
 */

const SPEAKING_CRITERIA_NAMES = [
  'Fluency & Coherence',
  'Lexical Resource',
  'Grammatical Range & Accuracy',
  'Pronunciation',
] as const

function clampBand(n: number): number {
  const rounded = Math.round(n * 2) / 2
  if (rounded < 4) return 4
  if (rounded > 8) return 8
  return rounded
}

export async function gradeSpeaking(
  test: Test,
  input: { partDurations: number[] },
): Promise<SpeakingTestSubmission> {
  await new Promise((r) => setTimeout(r, 300))
  const total = input.partDurations.reduce((a, b) => a + b, 0)
  const overall = clampBand(5.5 + Math.min(1, total / (14 * 60)) * 2)
  const mock = test.mockFeedback ?? {
    summary: 'Mock Speaking feedback — backend integration is in the next spec.',
    criteriaOffsets: [0, 0, 0, 0] as const,
    criteriaFeedback: [
      'Fluency mock.',
      'Lexical mock.',
      'Grammar mock.',
      'Pronunciation mock.',
    ] as [string, string, string, string],
  }
  const criteria = [0, 1, 2, 3].map((i): CriterionFeedback => ({
    name: SPEAKING_CRITERIA_NAMES[i]!,
    band: clampBand(overall + mock.criteriaOffsets[i]!),
    feedback: mock.criteriaFeedback[i]!,
  })) as [CriterionFeedback, CriterionFeedback, CriterionFeedback, CriterionFeedback]

  return {
    id: crypto.randomUUID(),
    testId: test.id,
    skill: 'speaking',
    submittedAt: new Date().toISOString(),
    partDurations: input.partDurations,
    overall,
    criteria,
    summary: mock.summary,
  }
}

// ─── Tiny localStorage store for speaking submissions ──────────────────────
const KEY = 'meridian-speaking-mock-submissions-v1'
const StoreSchema = z.array(SpeakingTestSubmissionSchema)

function read(): SpeakingTestSubmission[] {
  if (typeof localStorage === 'undefined') return []
  const raw = localStorage.getItem(KEY)
  if (!raw) return []
  try {
    const parsed = StoreSchema.safeParse(JSON.parse(raw))
    return parsed.success ? parsed.data : []
  } catch {
    return []
  }
}

function write(all: SpeakingTestSubmission[]): void {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(KEY, JSON.stringify(all))
  } catch {
    // ignore quota
  }
}

export function saveSpeakingMockSubmission(s: SpeakingTestSubmission): void {
  const all = read()
  all.unshift(s)
  write(all.slice(0, 20))
}

export function findSpeakingMockSubmissionById(
  id: string,
): SpeakingTestSubmission | undefined {
  return read().find((s) => s.id === id)
}

export function findLatestSpeakingMockSubmission(
  testId: string,
): SpeakingTestSubmission | undefined {
  return read().find((s) => s.testId === testId)
}
