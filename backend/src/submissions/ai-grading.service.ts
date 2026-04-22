import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Anthropic from '@anthropic-ai/sdk'
import { ModelGradingResultSchema, type GradingResult } from '@shared/schemas/submission'
import type { WritingTestSubmission } from '@shared/schemas/test-ai-submission'
import type { WritingPrompt } from '@shared/schemas/test'
import { TASK2_GRADING_SYSTEM_PROMPT } from './prompts/task2-grading'
import { WRITING_TEST_GRADING_SYSTEM_PROMPT } from './prompts/writing-test-grading'

const MODEL_VERSION = 'claude-sonnet-4-5-20250929'

interface WritingTestGradeInput {
  testId: string
  task1: WritingPrompt
  task2: WritingPrompt
  task1Text: string
  task2Text: string
}

/**
 * Output shape matches the frontend-facing `WritingTestSubmission` except
 * the persisted fields (id, testId, submittedAt, skill, task texts) which
 * the caller stamps on. We only return the AI-produced part here.
 */
export type WritingTestAiResult = Pick<WritingTestSubmission, 'overall' | 'criteria' | 'summary'>

@Injectable()
export class AiGradingService {
  private readonly logger = new Logger(AiGradingService.name)
  private readonly client: Anthropic | null

  constructor(private readonly config: ConfigService) {
    const apiKey = this.config.get<string>('ANTHROPIC_API_KEY')
    if (!apiKey) {
      this.logger.warn(
        'ANTHROPIC_API_KEY is not set; grading calls will return deterministic mock output.',
      )
      this.client = null
    } else {
      this.client = new Anthropic({ apiKey })
    }
  }

  /** True only when the server has a real API key configured. */
  get hasRealClient(): boolean {
    return this.client !== null
  }

  async gradeTask2(input: { prompt: string; essay: string }): Promise<GradingResult> {
    if (!this.client) {
      this.logger.warn('[gradeTask2] no key, returning mock')
      return mockTask2Grade(input.essay)
    }

    const userMessage = `Task 2 prompt:\n${input.prompt}\n\nCandidate's essay:\n${input.essay}`

    const response = await this.client.messages.create({
      model: MODEL_VERSION,
      max_tokens: 2000,
      system: TASK2_GRADING_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    })

    const text = extractText(response)
    const cleaned = stripCodeFences(text)

    let parsed: unknown
    try {
      parsed = JSON.parse(cleaned)
    } catch {
      this.logger.error('AI response was not valid JSON', { sample: cleaned.slice(0, 200) })
      throw new Error('Grader returned malformed JSON.')
    }

    const validation = ModelGradingResultSchema.safeParse(parsed)
    if (!validation.success) {
      this.logger.error('AI response failed schema validation', {
        issues: validation.error.issues.slice(0, 5),
      })
      throw new Error('Grader response did not match the expected shape.')
    }

    const tokensUsed = (response.usage?.input_tokens ?? 0) + (response.usage?.output_tokens ?? 0)

    return {
      ...validation.data,
      gradedAt: new Date().toISOString(),
      modelVersion: MODEL_VERSION,
      tokensUsed,
    }
  }

  async gradeWritingTest(input: WritingTestGradeInput): Promise<WritingTestAiResult> {
    if (!this.client) {
      this.logger.warn('[gradeWritingTest] no key, returning mock')
      return mockWritingTestGrade(input)
    }

    const userMessage = [
      'Task 1 prompt:',
      input.task1.prompt,
      '',
      "Candidate's Task 1 response:",
      input.task1Text,
      '',
      '---',
      '',
      'Task 2 prompt:',
      input.task2.prompt,
      '',
      "Candidate's Task 2 response:",
      input.task2Text,
    ].join('\n')

    const response = await this.client.messages.create({
      model: MODEL_VERSION,
      max_tokens: 2000,
      system: WRITING_TEST_GRADING_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    })

    const text = extractText(response)
    const cleaned = stripCodeFences(text)

    let parsed: WritingTestAiResult
    try {
      parsed = JSON.parse(cleaned) as WritingTestAiResult
    } catch {
      this.logger.error('AI response was not valid JSON', { sample: cleaned.slice(0, 200) })
      throw new Error('Grader returned malformed JSON.')
    }

    if (
      typeof parsed.overall !== 'number' ||
      !Array.isArray(parsed.criteria) ||
      parsed.criteria.length !== 4 ||
      typeof parsed.summary !== 'string'
    ) {
      this.logger.error('Writing test grading response shape invalid', {
        sample: cleaned.slice(0, 300),
      })
      throw new Error('Grader response did not match the expected shape.')
    }

    return parsed
  }
}

function extractText(response: Anthropic.Message): string {
  return response.content
    .filter((block): block is Anthropic.TextBlock => block.type === 'text')
    .map((block) => block.text)
    .join('')
    .trim()
}

function stripCodeFences(text: string): string {
  return text
    .replace(/^```json\s*/i, '')
    .replace(/```\s*$/, '')
    .trim()
}

// ─── Deterministic mock fallback ────────────────────────────────────────────
// Same heuristic the frontend mock used pre-backend, ported server-side. Used
// only when ANTHROPIC_API_KEY is absent. When a key IS configured, these
// functions are never called.

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function clampHalfBand(n: number): number {
  const rounded = Math.round(n * 2) / 2
  if (rounded < 4) return 4
  if (rounded > 8) return 8
  return rounded
}

function mockTask2Grade(essay: string): GradingResult {
  const words = countWords(essay)
  const overall = clampHalfBand(5.5 + Math.max(0, words - 250) / 250)
  return {
    taskResponse: { band: overall, notes: 'Mock — addresses the task; depth could go further.' },
    coherenceCohesion: {
      band: overall,
      notes: 'Mock — paragraphing clear; transitions mechanical.',
    },
    lexicalResource: {
      band: clampHalfBand(overall + 0.5),
      notes: 'Mock — some topic range; aim for less common collocations.',
    },
    grammaticalRange: {
      band: clampHalfBand(overall - 0.5),
      notes: 'Mock — complex structures attempted; occasional tense slips.',
    },
    overallBand: overall,
    overallNote: 'Mock grading — configure ANTHROPIC_API_KEY to enable real Claude examination.',
    annotations: [],
    gradedAt: new Date().toISOString(),
    modelVersion: 'mock',
    tokensUsed: 0,
  }
}

function mockWritingTestGrade(input: WritingTestGradeInput): WritingTestAiResult {
  const task1Words = countWords(input.task1Text)
  const task2Words = countWords(input.task2Text)
  const task1Score = Math.max(0, task1Words - 150) / 150
  const task2Score = Math.max(0, task2Words - 250) / 250
  const overall = clampHalfBand(5.5 + task1Score * 1.25 + task2Score * 1.5)

  return {
    overall,
    criteria: [
      {
        name: 'Task Response',
        band: overall,
        feedback:
          'Your response addresses the task but some key features are under-developed. Aim to cover every element the prompt asks for, with evidence or examples to support each.',
      },
      {
        name: 'Coherence & Cohesion',
        band: overall,
        feedback:
          'Ideas are generally linked, though transitions can feel mechanical. Vary your cohesive devices rather than repeating "Moreover" and "However".',
      },
      {
        name: 'Lexical Resource',
        band: clampHalfBand(overall + 0.5),
        feedback:
          'A reasonable range of topic vocabulary. Aim for more precise collocations — you used "big problem" where "pressing concern" or "acute issue" would lift the register.',
      },
      {
        name: 'Grammatical Range & Accuracy',
        band: clampHalfBand(overall - 0.5),
        feedback:
          'Sentence structures are mostly accurate with occasional slips in tense and article use. Mixed conditionals are attempted but not always controlled.',
      },
    ],
    summary:
      'Mock grading — configure ANTHROPIC_API_KEY on the backend to enable real Claude examiner feedback.',
  }
}
