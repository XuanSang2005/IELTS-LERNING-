import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import type { LinkingDevice, LinkingFunction } from '@shared/schemas/linking-device'
import { LinkingDeviceDoc, LinkingDeviceDocument } from './schemas/linking-device.schema'
import { LINKING_SEED } from './data/linking-seed'

function toLinkingDevice(doc: LinkingDeviceDocument): LinkingDevice {
  return {
    id: doc.slug,
    phrase: doc.phrase,
    function: doc.function,
    register: doc.register,
    positions: doc.positions,
    example: doc.example,
    note: doc.note,
  }
}

export interface LinkingFilter {
  function?: LinkingFunction
  register?: 'B1' | 'B2' | 'C1'
  search?: string
}

@Injectable()
export class LinkingService implements OnModuleInit {
  constructor(
    @InjectModel(LinkingDeviceDoc.name) private readonly model: Model<LinkingDeviceDocument>,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.seedIfEmpty()
  }

  async seedIfEmpty(): Promise<{ seeded: number }> {
    const count = await this.model.estimatedDocumentCount()
    if (count > 0) return { seeded: 0 }
    const docs = LINKING_SEED.map((d) => ({ ...d, slug: d.id }))
    await this.model.insertMany(docs)
    return { seeded: docs.length }
  }

  async reseed(): Promise<{ seeded: number }> {
    await this.model.deleteMany({})
    const docs = LINKING_SEED.map((d) => ({ ...d, slug: d.id }))
    await this.model.insertMany(docs)
    return { seeded: docs.length }
  }

  async findAll(filter: LinkingFilter = {}): Promise<LinkingDevice[]> {
    const q: Record<string, unknown> = {}
    if (filter.function) q.function = filter.function
    if (filter.register) q.register = filter.register
    if (filter.search) {
      const term = filter.search.trim()
      if (term) q.phrase = { $regex: term, $options: 'i' }
    }
    const docs = await this.model.find(q).sort({ phrase: 1 }).exec()
    return docs.map(toLinkingDevice)
  }

  async findBySlug(slug: string): Promise<LinkingDevice | null> {
    const doc = await this.model.findOne({ slug }).exec()
    return doc ? toLinkingDevice(doc) : null
  }
}
