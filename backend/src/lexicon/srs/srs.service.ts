import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import type { LexiconDiscipline } from '@shared/schemas/lexicon'
import type { ReviewRating, SrsCard } from '@shared/schemas/srs'
import { LexiconService } from '../lexicon.service'
import { SrsCardDoc, type SrsCardDocument } from '../schemas/srs-card.schema'
import { buildInitialCard, processReview } from './leitner'

function docToCard(doc: SrsCardDocument): SrsCard {
  return {
    itemId: doc.itemId,
    discipline: doc.discipline,
    box: doc.box,
    status: doc.status,
    lastReviewedAt: doc.lastReviewedAt ? doc.lastReviewedAt.toISOString() : null,
    nextDueAt: doc.nextDueAt.toISOString(),
    totalReviews: doc.totalReviews,
    totalCorrect: doc.totalCorrect,
    introducedAt: doc.introducedAt.toISOString(),
  }
}

@Injectable()
export class SrsService {
  constructor(
    @InjectModel(SrsCardDoc.name) private readonly cardModel: Model<SrsCardDocument>,
    private readonly lexiconService: LexiconService,
  ) {}

  /**
   * Idempotent introduce. Plan Decision #11 — `(userId, itemId)` unique index
   * guarantees one card per user per item even under retry.
   */
  async introduce(userId: string, itemId: string, now: Date): Promise<SrsCard> {
    const item = await this.lexiconService.findItemById(itemId)
    if (!item) throw new NotFoundException(`Item not found: ${itemId}`)

    const userObjectId = new Types.ObjectId(userId)
    const existing = await this.cardModel.findOne({ userId: userObjectId, itemId }).exec()
    if (existing) return docToCard(existing)

    const fresh = buildInitialCard({ itemId, discipline: item.discipline, now })
    try {
      const created = await this.cardModel.create({
        userId: userObjectId,
        itemId: fresh.itemId,
        discipline: fresh.discipline,
        box: fresh.box,
        status: fresh.status,
        lastReviewedAt: null,
        nextDueAt: new Date(fresh.nextDueAt),
        totalReviews: 0,
        totalCorrect: 0,
        introducedAt: new Date(fresh.introducedAt),
      })
      return docToCard(created)
    } catch (err) {
      // Race: concurrent introduce — return the one that won.
      const won = await this.cardModel.findOne({ userId: userObjectId, itemId }).exec()
      if (won) return docToCard(won)
      throw err
    }
  }

  async submitReview(
    userId: string,
    itemId: string,
    rating: ReviewRating,
    now: Date,
  ): Promise<SrsCard> {
    const userObjectId = new Types.ObjectId(userId)
    const doc = await this.cardModel.findOne({ userId: userObjectId, itemId }).exec()
    if (!doc) throw new NotFoundException(`No SRS card for item ${itemId}; introduce first`)

    const updated = processReview(docToCard(doc), rating, now)
    doc.box = updated.box
    // After processReview, status is always 'learning' or 'mature' — never 'unseen' or 'introduced'.
    doc.status = updated.status as 'learning' | 'mature'
    doc.lastReviewedAt = updated.lastReviewedAt ? new Date(updated.lastReviewedAt) : null
    doc.nextDueAt = new Date(updated.nextDueAt)
    doc.totalReviews = updated.totalReviews
    doc.totalCorrect = updated.totalCorrect
    await doc.save()
    return docToCard(doc)
  }

  async findUserCards(
    userId: string,
    discipline?: LexiconDiscipline,
  ): Promise<SrsCard[]> {
    const userObjectId = new Types.ObjectId(userId)
    const filter: Record<string, unknown> = { userId: userObjectId }
    if (discipline) filter.discipline = discipline
    const docs = await this.cardModel.find(filter).exec()
    return docs.map(docToCard)
  }

  async findDueCards(
    userId: string,
    discipline: LexiconDiscipline,
    nowOrEndOfDay: Date,
  ): Promise<SrsCard[]> {
    const userObjectId = new Types.ObjectId(userId)
    const docs = await this.cardModel
      .find({
        userId: userObjectId,
        discipline,
        nextDueAt: { $lte: nowOrEndOfDay },
      })
      .sort({ nextDueAt: 1 })
      .exec()
    return docs.map(docToCard)
  }

  async findIntroducedCardIds(
    userId: string,
    discipline: LexiconDiscipline,
  ): Promise<string[]> {
    const userObjectId = new Types.ObjectId(userId)
    const docs = await this.cardModel
      .find({ userId: userObjectId, discipline }, { itemId: 1 })
      .lean()
      .exec()
    return docs.map((d) => d.itemId)
  }

  async countInteractionsInRange(params: {
    userId: string
    discipline: LexiconDiscipline
    startUtc: Date
    endUtc: Date
  }): Promise<{ introduced: number; reviewed: number }> {
    const userObjectId = new Types.ObjectId(params.userId)
    const [introduced, reviewed] = await Promise.all([
      this.cardModel
        .countDocuments({
          userId: userObjectId,
          discipline: params.discipline,
          introducedAt: { $gte: params.startUtc, $lte: params.endUtc },
        })
        .exec(),
      this.cardModel
        .countDocuments({
          userId: userObjectId,
          discipline: params.discipline,
          lastReviewedAt: { $gte: params.startUtc, $lte: params.endUtc },
        })
        .exec(),
    ])
    return { introduced, reviewed }
  }
}
