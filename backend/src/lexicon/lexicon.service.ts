import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import type { LexiconDiscipline } from '@shared/schemas/lexicon'
import type { LexiconItem } from '@shared/schemas/lexicon-items'
import type { LexiconPlan } from '@shared/schemas/lexicon-plan'
import type { BandLevel } from '@shared/schemas/practice'
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
export class LexiconService {
  constructor(
    @InjectModel('LexiconItem') private readonly itemModel: Model<LexiconItemDocument>,
    @InjectModel(LexiconPlanDoc.name) private readonly planModel: Model<LexiconPlanDocument>,
  ) {}

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
   * scoped to discipline + level. Uses a $lookup left-anti-join against
   * srs_cards instead of pulling every introduced ID into memory + $nin —
   * O(N) on the user's introduced set was bloating memory and query plan
   * once a learner crossed ~500 cards.
   */
  async findNextNewItems(params: {
    userId: string
    discipline: LexiconDiscipline
    level: BandLevel
    limit: number
  }): Promise<LexiconItem[]> {
    const { userId, discipline, level, limit } = params
    if (limit <= 0) return []
    const userObjectId = new Types.ObjectId(userId)
    const docs = (await this.itemModel
      .aggregate([
        { $match: { discipline, level } },
        {
          $lookup: {
            from: 'srs_cards',
            let: { itemSlug: '$slug' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$itemId', '$$itemSlug'] },
                      { $eq: ['$userId', userObjectId] },
                    ],
                  },
                },
              },
              { $limit: 1 },
              { $project: { _id: 1 } },
            ],
            as: 'existingCard',
          },
        },
        { $match: { existingCard: { $size: 0 } } },
        { $sort: { week: 1, day: 1, slug: 1 } },
        { $limit: limit },
        { $project: { existingCard: 0 } },
      ])
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
