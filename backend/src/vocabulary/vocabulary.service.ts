import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import type { VocabWord } from '@shared/schemas/vocabulary'
import { VocabWordDoc, VocabWordDocument } from './schemas/vocab-word.schema'
import { VOCAB_SEED } from './data/vocab-seed'

function toVocabWord(doc: VocabWordDocument): VocabWord {
  return {
    id: doc.slug,
    headword: doc.headword,
    partOfSpeech: doc.partOfSpeech,
    definition: doc.definition,
    example: doc.example,
    register: doc.register,
    topic: doc.topic,
    frequency: doc.frequency,
    synonyms: doc.synonyms.map((s) => ({
      word: s.word,
      register: s.register,
      nuance: s.nuance,
    })),
  }
}

interface VocabFilter {
  topic?: string
  register?: 'B1' | 'B2' | 'C1'
  frequency?: 'high' | 'medium' | 'low'
  search?: string
}

@Injectable()
export class VocabularyService implements OnModuleInit {
  constructor(@InjectModel(VocabWordDoc.name) private readonly model: Model<VocabWordDocument>) {}

  async onModuleInit(): Promise<void> {
    await this.seedIfEmpty()
  }

  async seedIfEmpty(): Promise<{ seeded: number }> {
    const count = await this.model.estimatedDocumentCount()
    if (count > 0) return { seeded: 0 }
    const docs = VOCAB_SEED.map((w) => ({ ...w, slug: w.id }))
    await this.model.insertMany(docs)
    return { seeded: docs.length }
  }

  async reseed(): Promise<{ seeded: number }> {
    await this.model.deleteMany({})
    const docs = VOCAB_SEED.map((w) => ({ ...w, slug: w.id }))
    await this.model.insertMany(docs)
    return { seeded: docs.length }
  }

  async findAll(filter: VocabFilter = {}): Promise<VocabWord[]> {
    const q: Record<string, unknown> = {}
    if (filter.topic) q.topic = filter.topic
    if (filter.register) q.register = filter.register
    if (filter.frequency) q.frequency = filter.frequency
    if (filter.search) {
      const term = filter.search.trim()
      if (term) {
        q.$or = [
          { headword: { $regex: term, $options: 'i' } },
          { 'synonyms.word': { $regex: term, $options: 'i' } },
        ]
      }
    }
    const docs = await this.model.find(q).sort({ headword: 1 }).exec()
    return docs.map(toVocabWord)
  }

  async findBySlug(slug: string): Promise<VocabWord | null> {
    const doc = await this.model.findOne({ slug }).exec()
    return doc ? toVocabWord(doc) : null
  }
}
