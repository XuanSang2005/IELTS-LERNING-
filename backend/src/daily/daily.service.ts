import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import type { BandLevel } from '@shared/schemas/practice'
import type {
  DailyDayNumber,
  DailyReviewSet,
  DailyUnit,
} from '@shared/schemas/daily-unit'
import { DailyUnitDoc, DailyUnitDocument } from './schemas/daily-unit.schema'
import { DAILY_UNITS_SEED } from './data/daily-units-seed'

function toDailyUnit(doc: DailyUnitDocument): DailyUnit {
  return {
    id: doc.slug,
    day: doc.day,
    level: doc.level,
    reading: doc.reading,
    listening: doc.listening,
    vocabDeck: doc.vocabDeck,
    grammarFocus: doc.grammarFocus,
    writing: doc.writing,
    publishedAt: doc.publishedAt,
  }
}

/**
 * Resolve "today's day number" in the 5-cycle from a calendar date. Server-
 * side computation so the cycle is identical for every client regardless of
 * timezone (we always use the date passed in, which the frontend derives
 * from `new Date().toISOString().slice(0, 10)`).
 */
export function dailyDayFromIsoDate(isoDate: string): DailyDayNumber {
  const days = Math.floor(new Date(isoDate).getTime() / 86_400_000)
  const idx = ((days % 5) + 5) % 5 // safe positive modulo
  return ((idx + 1) as DailyDayNumber)
}

function previousDay(day: DailyDayNumber): DailyDayNumber {
  return ((day === 1 ? 5 : day - 1) as DailyDayNumber)
}

@Injectable()
export class DailyService implements OnModuleInit {
  constructor(
    @InjectModel(DailyUnitDoc.name) private readonly model: Model<DailyUnitDocument>,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.seedIfEmpty()
  }

  async seedIfEmpty(): Promise<{ seeded: number }> {
    if (DAILY_UNITS_SEED.length === 0) return { seeded: 0 }
    const count = await this.model.estimatedDocumentCount()
    if (count > 0) return { seeded: 0 }
    const docs = DAILY_UNITS_SEED.map((u) => ({ ...u, slug: u.id }))
    await this.model.insertMany(docs)
    return { seeded: docs.length }
  }

  async reseed(): Promise<{ seeded: number }> {
    await this.model.deleteMany({})
    if (DAILY_UNITS_SEED.length === 0) return { seeded: 0 }
    const docs = DAILY_UNITS_SEED.map((u) => ({ ...u, slug: u.id }))
    await this.model.insertMany(docs)
    return { seeded: docs.length }
  }

  async findByDayAndLevel(
    day: DailyDayNumber,
    level: BandLevel,
  ): Promise<DailyUnit | null> {
    const doc = await this.model.findOne({ day, level }).exec()
    return doc ? toDailyUnit(doc) : null
  }

  async findToday(level: BandLevel, isoDate: string): Promise<DailyUnit | null> {
    return this.findByDayAndLevel(dailyDayFromIsoDate(isoDate), level)
  }

  /**
   * Step 1 review surface: yesterday's vocab deck + grammar focus only.
   * Returns `null` when yesterday's unit is missing (e.g. the user is on
   * day 1 of their first cycle and yesterday's slot is unseeded).
   */
  async findReviewSet(level: BandLevel, isoDate: string): Promise<DailyReviewSet | null> {
    const today = dailyDayFromIsoDate(isoDate)
    const yesterday = previousDay(today)
    const unit = await this.findByDayAndLevel(yesterday, level)
    if (!unit) return null
    return {
      fromDay: yesterday,
      vocab: unit.vocabDeck,
      grammarFocus: unit.grammarFocus,
    }
  }
}
