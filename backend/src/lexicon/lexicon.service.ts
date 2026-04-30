import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import type { LexiconDiscipline } from '@shared/schemas/lexicon'
import type { LexiconItem } from '@shared/schemas/lexicon-items'
import type { LexiconPlan } from '@shared/schemas/lexicon-plan'
import type { BandLevel } from '@shared/schemas/practice'
import { INTERMEDIATE_COLLOC_WEEK_01 } from './data/intermediate-colloc-week-01'
import { INTERMEDIATE_COLLOC_WEEK_02 } from './data/intermediate-colloc-week-02'
import { INTERMEDIATE_COLLOC_WEEK_03 } from './data/intermediate-colloc-week-03'
import { INTERMEDIATE_COLLOC_WEEK_04 } from './data/intermediate-colloc-week-04'
import { INTERMEDIATE_COLLOC_WEEK_05 } from './data/intermediate-colloc-week-05'
import { INTERMEDIATE_COLLOC_WEEK_06 } from './data/intermediate-colloc-week-06'
import { INTERMEDIATE_COLLOC_WEEK_07 } from './data/intermediate-colloc-week-07'
import { INTERMEDIATE_COLLOC_WEEK_08 } from './data/intermediate-colloc-week-08'
import { INTERMEDIATE_COLLOC_WEEK_09 } from './data/intermediate-colloc-week-09'
import { INTERMEDIATE_COLLOC_WEEK_10 } from './data/intermediate-colloc-week-10'
import { INTERMEDIATE_COLLOC_WEEK_11 } from './data/intermediate-colloc-week-11'
import { INTERMEDIATE_COLLOC_WEEK_12 } from './data/intermediate-colloc-week-12'
import { INTERMEDIATE_LINKING_WEEK_01 } from './data/intermediate-linking-week-01'
import { INTERMEDIATE_LINKING_WEEK_02 } from './data/intermediate-linking-week-02'
import { INTERMEDIATE_LINKING_WEEK_03 } from './data/intermediate-linking-week-03'
import { INTERMEDIATE_LINKING_WEEK_04 } from './data/intermediate-linking-week-04'
import { INTERMEDIATE_LINKING_WEEK_05 } from './data/intermediate-linking-week-05'
import { INTERMEDIATE_LINKING_WEEK_06 } from './data/intermediate-linking-week-06'
import { INTERMEDIATE_LINKING_WEEK_07 } from './data/intermediate-linking-week-07'
import { INTERMEDIATE_LINKING_WEEK_08 } from './data/intermediate-linking-week-08'
import { INTERMEDIATE_LINKING_WEEK_09 } from './data/intermediate-linking-week-09'
import { INTERMEDIATE_LINKING_WEEK_10 } from './data/intermediate-linking-week-10'
import { INTERMEDIATE_LINKING_WEEK_11 } from './data/intermediate-linking-week-11'
import { INTERMEDIATE_LINKING_WEEK_12 } from './data/intermediate-linking-week-12'
import { INTERMEDIATE_PLANS } from './data/intermediate-plans'
import { INTERMEDIATE_VOCAB_WEEK_01 } from './data/intermediate-vocab-week-01'
import { INTERMEDIATE_VOCAB_WEEK_02 } from './data/intermediate-vocab-week-02'
import { INTERMEDIATE_VOCAB_WEEK_03 } from './data/intermediate-vocab-week-03'
import { INTERMEDIATE_VOCAB_WEEK_04 } from './data/intermediate-vocab-week-04'
import { INTERMEDIATE_VOCAB_WEEK_05 } from './data/intermediate-vocab-week-05'
import { INTERMEDIATE_VOCAB_WEEK_06 } from './data/intermediate-vocab-week-06'
import { INTERMEDIATE_VOCAB_WEEK_07 } from './data/intermediate-vocab-week-07'
import { INTERMEDIATE_VOCAB_WEEK_08 } from './data/intermediate-vocab-week-08'
import { INTERMEDIATE_VOCAB_WEEK_09 } from './data/intermediate-vocab-week-09'
import { INTERMEDIATE_VOCAB_WEEK_10 } from './data/intermediate-vocab-week-10'
import { INTERMEDIATE_VOCAB_WEEK_11 } from './data/intermediate-vocab-week-11'
import { INTERMEDIATE_VOCAB_WEEK_12 } from './data/intermediate-vocab-week-12'
import {
  docToCollocationItem,
  docToLinkingItem,
  docToVocabularyItem,
  type LexiconItemDocument,
  type RawLexiconDoc,
} from './schemas/lexicon-item.schema'
import {
  LexiconPlanDoc,
  type LexiconPlanDocument,
} from './schemas/lexicon-plan.schema'

@Injectable()
export class LexiconService implements OnModuleInit {
  constructor(
    @InjectModel('LexiconItem') private readonly itemModel: Model<LexiconItemDocument>,
    @InjectModel(LexiconPlanDoc.name) private readonly planModel: Model<LexiconPlanDocument>,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.seedIfEmpty()
  }

  async seedIfEmpty(): Promise<{ plansSeeded: number; itemsSeeded: number }> {
    let plansSeeded = 0
    let itemsSeeded = 0

    const planCount = await this.planModel.estimatedDocumentCount()
    if (planCount === 0) {
      await this.planModel.insertMany(INTERMEDIATE_PLANS)
      plansSeeded = INTERMEDIATE_PLANS.length
    }

    const itemCount = await this.itemModel.estimatedDocumentCount()
    if (itemCount === 0) {
      const vocabDocs = [
        ...INTERMEDIATE_VOCAB_WEEK_01,
        ...INTERMEDIATE_VOCAB_WEEK_02,
        ...INTERMEDIATE_VOCAB_WEEK_03,
        ...INTERMEDIATE_VOCAB_WEEK_04,
        ...INTERMEDIATE_VOCAB_WEEK_05,
        ...INTERMEDIATE_VOCAB_WEEK_06,
        ...INTERMEDIATE_VOCAB_WEEK_07,
        ...INTERMEDIATE_VOCAB_WEEK_08,
        ...INTERMEDIATE_VOCAB_WEEK_09,
        ...INTERMEDIATE_VOCAB_WEEK_10,
        ...INTERMEDIATE_VOCAB_WEEK_11,
        ...INTERMEDIATE_VOCAB_WEEK_12,
      ].map(
        (it) => ({
          slug: it.id,
          discipline: it.discipline,
          level: it.level,
          week: it.week,
          day: it.day,
          headword: it.headword,
          partOfSpeech: it.partOfSpeech,
          definition: it.definition,
          example: it.example,
          register: it.register,
          topic: it.topic,
          frequency: it.frequency,
          synonyms: it.synonyms,
        }),
      )
      const collocDocs = [
        ...INTERMEDIATE_COLLOC_WEEK_01,
        ...INTERMEDIATE_COLLOC_WEEK_02,
        ...INTERMEDIATE_COLLOC_WEEK_03,
        ...INTERMEDIATE_COLLOC_WEEK_04,
        ...INTERMEDIATE_COLLOC_WEEK_05,
        ...INTERMEDIATE_COLLOC_WEEK_06,
        ...INTERMEDIATE_COLLOC_WEEK_07,
        ...INTERMEDIATE_COLLOC_WEEK_08,
        ...INTERMEDIATE_COLLOC_WEEK_09,
        ...INTERMEDIATE_COLLOC_WEEK_10,
        ...INTERMEDIATE_COLLOC_WEEK_11,
        ...INTERMEDIATE_COLLOC_WEEK_12,
      ].map(
        (it) => ({
          slug: it.id,
          discipline: it.discipline,
          level: it.level,
          week: it.week,
          day: it.day,
          phrase: it.phrase,
          pattern: it.pattern,
          definition: it.definition,
          example: it.example,
          register: it.register,
          topic: it.topic,
          alternatives: it.alternatives,
          note: it.note,
        }),
      )
      const linkingDocs = [
        ...INTERMEDIATE_LINKING_WEEK_01,
        ...INTERMEDIATE_LINKING_WEEK_02,
        ...INTERMEDIATE_LINKING_WEEK_03,
        ...INTERMEDIATE_LINKING_WEEK_04,
        ...INTERMEDIATE_LINKING_WEEK_05,
        ...INTERMEDIATE_LINKING_WEEK_06,
        ...INTERMEDIATE_LINKING_WEEK_07,
        ...INTERMEDIATE_LINKING_WEEK_08,
        ...INTERMEDIATE_LINKING_WEEK_09,
        ...INTERMEDIATE_LINKING_WEEK_10,
        ...INTERMEDIATE_LINKING_WEEK_11,
        ...INTERMEDIATE_LINKING_WEEK_12,
      ].map(
        (it) => ({
          slug: it.id,
          discipline: it.discipline,
          level: it.level,
          week: it.week,
          day: it.day,
          phrase: it.phrase,
          function: it.function,
          register: it.register,
          positions: it.positions,
          example: it.example,
          note: it.note,
        }),
      )
      await this.itemModel.insertMany([...vocabDocs, ...collocDocs, ...linkingDocs])
      itemsSeeded = vocabDocs.length + collocDocs.length + linkingDocs.length
    }

    return { plansSeeded, itemsSeeded }
  }

  /**
   * Force a complete reseed: wipes lexicon_items + lexicon_plans, then runs
   * the seed loop. Use after the seed contents change so that placeholder /
   * stale data is replaced. Idempotent — safe to call repeatedly.
   */
  async reseed(): Promise<{ plansSeeded: number; itemsSeeded: number }> {
    await this.itemModel.deleteMany({})
    await this.planModel.deleteMany({})
    return this.seedIfEmpty()
  }

  async findPlan(discipline: LexiconDiscipline, level: BandLevel): Promise<LexiconPlan | null> {
    const doc = await this.planModel.findOne({ discipline, level }).lean().exec()
    if (!doc) return null
    return {
      discipline: doc.discipline,
      level: doc.level,
      weeks: doc.weeks.map((w) => ({
        discipline: doc.discipline,
        level: doc.level,
        phase: w.phase as 1 | 2 | 3 | 4,
        week: w.week as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
        themeName: w.themeName,
        tagline: w.tagline,
        goalOneLiner: w.goalOneLiner,
        itemsPerDay: w.itemsPerDay,
        totalItems: w.totalItems,
      })) as LexiconPlan['weeks'],
    }
  }

  async findItemsForDay(params: {
    discipline: LexiconDiscipline
    level: BandLevel
    week: number
    day: number
  }): Promise<LexiconItem[]> {
    const docs = (await this.itemModel.find(params).lean().exec()) as unknown as RawLexiconDoc[]
    return docs.map((doc) => this.docToItem(doc))
  }

  async findItemsForWeek(params: {
    discipline: LexiconDiscipline
    level: BandLevel
    week: number
  }): Promise<LexiconItem[]> {
    const docs = (await this.itemModel
      .find(params)
      .sort({ day: 1, slug: 1 })
      .lean()
      .exec()) as unknown as RawLexiconDoc[]
    return docs.map((doc) => this.docToItem(doc))
  }

  async findItemById(itemId: string): Promise<LexiconItem | null> {
    const doc = (await this.itemModel.findOne({ slug: itemId }).lean().exec()) as
      | RawLexiconDoc
      | null
    return doc ? this.docToItem(doc) : null
  }

  async findItemsByIds(itemIds: string[]): Promise<LexiconItem[]> {
    if (itemIds.length === 0) return []
    const docs = (await this.itemModel
      .find({ slug: { $in: itemIds } })
      .lean()
      .exec()) as unknown as RawLexiconDoc[]
    return docs.map((doc) => this.docToItem(doc))
  }

  /**
   * Selects the next N items the user has not yet been introduced to,
   * scoped to discipline + level. Used by the SRS today queue.
   */
  async findNextNewItems(params: {
    discipline: LexiconDiscipline
    level: BandLevel
    excludeIds: string[]
    limit: number
  }): Promise<LexiconItem[]> {
    const { discipline, level, excludeIds, limit } = params
    if (limit <= 0) return []
    const docs = (await this.itemModel
      .find({ discipline, level, slug: { $nin: excludeIds } })
      .sort({ week: 1, day: 1, slug: 1 })
      .limit(limit)
      .lean()
      .exec()) as unknown as RawLexiconDoc[]
    return docs.map((doc) => this.docToItem(doc))
  }

  private docToItem(doc: RawLexiconDoc): LexiconItem {
    switch (doc.discipline) {
      case 'vocabulary':
        return docToVocabularyItem(doc)
      case 'collocations':
        return docToCollocationItem(doc)
      case 'linking':
        return docToLinkingItem(doc)
    }
  }
}
