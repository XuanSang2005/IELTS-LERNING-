import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import Anthropic from '@anthropic-ai/sdk'
import {
  normalizeForCache,
  type TranslationExample,
  type TranslationResponse,
} from '@shared/schemas/translation'
import { Translation, TranslationDocument } from './schemas/translation.schema'
import { TRANSLATION_SYSTEM_PROMPT } from './prompts/translation'

const MODEL_VERSION = 'claude-haiku-4-5-20251001'

@Injectable()
export class TranslationService {
  private readonly logger = new Logger(TranslationService.name)
  private readonly client: Anthropic | null

  constructor(
    private readonly config: ConfigService,
    @InjectModel(Translation.name)
    private readonly model: Model<TranslationDocument>,
  ) {
    const apiKey = this.config.get<string>('ANTHROPIC_API_KEY')
    if (!apiKey) {
      this.logger.warn(
        'ANTHROPIC_API_KEY is not set; translation falls back to deterministic mock output.',
      )
      this.client = null
    } else {
      this.client = new Anthropic({ apiKey })
    }
  }

  async translate(text: string): Promise<TranslationResponse> {
    const normalized = normalizeForCache(text)

    // 1. Cache lookup.
    const cached = await this.model.findOne({ normalized }).lean().exec()
    if (cached) {
      return {
        text,
        normalized,
        vi: cached.vi,
        examples: cached.examples ?? [],
        fromCache: true,
      }
    }

    // 2. Cache miss — call Claude (or mock).
    const fresh = await this.fetchTranslation(normalized)

    // 3. Persist. Tolerate concurrent inserts via the unique index.
    try {
      await this.model.create({
        normalized,
        text,
        vi: fresh.vi,
        examples: fresh.examples,
      })
    } catch (err: unknown) {
      // Dup-key race — another request stored it first; safe to ignore.
      const isDup =
        typeof err === 'object' &&
        err !== null &&
        'code' in err &&
        (err as { code?: number }).code === 11000
      if (!isDup) throw err
    }

    return {
      text,
      normalized,
      vi: fresh.vi,
      examples: fresh.examples,
      fromCache: false,
    }
  }

  private async fetchTranslation(normalized: string): Promise<{
    vi: string
    examples: TranslationExample[]
  }> {
    if (!this.client) {
      return mockTranslation(normalized)
    }

    const response = await this.client.messages.create({
      model: MODEL_VERSION,
      max_tokens: 400,
      system: TRANSLATION_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: normalized }],
    })

    const text = extractText(response)
    const cleaned = stripCodeFences(text)

    let parsed: { vi?: unknown; examples?: unknown }
    try {
      parsed = JSON.parse(cleaned) as { vi?: unknown; examples?: unknown }
    } catch {
      this.logger.error('Translation response was not valid JSON', {
        sample: cleaned.slice(0, 200),
      })
      throw new Error('Translation response was malformed.')
    }

    if (typeof parsed.vi !== 'string' || parsed.vi.trim().length === 0) {
      this.logger.error('Translation response missing vi field', {
        sample: cleaned.slice(0, 200),
      })
      throw new Error('Translation response was malformed.')
    }

    const examples: TranslationExample[] = []
    if (Array.isArray(parsed.examples)) {
      for (const ex of parsed.examples.slice(0, 2)) {
        if (
          ex &&
          typeof ex === 'object' &&
          'en' in ex &&
          'vi' in ex &&
          typeof (ex as { en: unknown }).en === 'string' &&
          typeof (ex as { vi: unknown }).vi === 'string'
        ) {
          examples.push({
            en: (ex as { en: string }).en,
            vi: (ex as { vi: string }).vi,
          })
        }
      }
    }

    return { vi: parsed.vi.trim(), examples }
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

function mockTranslation(normalized: string): {
  vi: string
  examples: TranslationExample[]
} {
  return {
    vi: `[mock] ${normalized}`,
    examples: [],
  }
}
