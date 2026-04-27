import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import type { Collocation, CollocationPattern } from '@shared/schemas/collocation'
import { CollocationDoc, CollocationDocument } from './schemas/collocation.schema'
import { COLLOCATIONS_SEED } from './data/collocations-seed'

function toCollocation(doc: CollocationDocument): Collocation {
  return {
    id: doc.slug,
    phrase: doc.phrase,
    pattern: doc.pattern,
    definition: doc.definition,
    example: doc.example,
    register: doc.register,
    topic: doc.topic,
    alternatives: doc.alternatives ?? [],
    note: doc.note,
  }
}

export interface CollocationFilter {
  pattern?: CollocationPattern
  register?: 'B1' | 'B2' | 'C1'
  topic?: string
  search?: string
}

@Injectable()
export class CollocationsService implements OnModuleInit {
  constructor(
    @InjectModel(CollocationDoc.name) private readonly model: Model<CollocationDocument>,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.seedIfEmpty()
  }

  async seedIfEmpty(): Promise<{ seeded: number }> {
    const count = await this.model.estimatedDocumentCount()
    if (count > 0) return { seeded: 0 }
    const docs = COLLOCATIONS_SEED.map((c) => ({ ...c, slug: c.id }))
    await this.model.insertMany(docs)
    return { seeded: docs.length }
  }

  async reseed(): Promise<{ seeded: number }> {
    await this.model.deleteMany({})
    const docs = COLLOCATIONS_SEED.map((c) => ({ ...c, slug: c.id }))
    await this.model.insertMany(docs)
    return { seeded: docs.length }
  }

  async findAll(filter: CollocationFilter = {}): Promise<Collocation[]> {
    const q: Record<string, unknown> = {}
    if (filter.pattern) q.pattern = filter.pattern
    if (filter.register) q.register = filter.register
    if (filter.topic) q.topic = filter.topic
    if (filter.search) {
      const term = filter.search.trim()
      if (term) {
        q.$or = [
          { phrase: { $regex: term, $options: 'i' } },
          { alternatives: { $regex: term, $options: 'i' } },
        ]
      }
    }
    const docs = await this.model.find(q).sort({ phrase: 1 }).exec()
    return docs.map(toCollocation)
  }

  async findBySlug(slug: string): Promise<Collocation | null> {
    const doc = await this.model.findOne({ slug }).exec()
    return doc ? toCollocation(doc) : null
  }
}
