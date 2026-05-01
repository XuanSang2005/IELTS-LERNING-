import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import type { LexiconDiscipline } from '@shared/schemas/lexicon'
import { SRS_DAILY_NEW_TARGETS, type ReviewRating, type SrsCard } from '@shared/schemas/srs'
import { User, type UserDocument } from '../../users/schemas/user.schema'
import { LexiconService } from '../lexicon.service'
import { SrsCardDoc, type SrsCardDocument } from '../schemas/srs-card.schema'
import { buildInitialCard, processReview } from './leitner'
import { endOfDayInTz, startOfDayInTz } from './tz-helper'

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
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
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

  /**
   * Submit a review rating for an item. Idempotently introduces the card if
   * one doesn't yet exist (i.e., this is the first interaction with the item),
   * then applies the Leitner update in a single round-trip from the client's
   * perspective. The unique `(userId, itemId)` index makes the introduce-if-
   * missing path race-safe.
   */
  async submitReview(
    userId: string,
    itemId: string,
    rating: ReviewRating,
    now: Date,
  ): Promise<SrsCard> {
    const userObjectId = new Types.ObjectId(userId)
    let doc = await this.cardModel.findOne({ userId: userObjectId, itemId }).exec()

    if (!doc) {
      // Auto-introduce: card doesn't exist yet, create it before reviewing.
      const item = await this.lexiconService.findItemById(itemId)
      if (!item) throw new NotFoundException(`Item not found: ${itemId}`)

      // Quota guard: re-check at write time to defeat the open-two-tabs race.
      // The today queue gives a soft quota in its response; this is the hard
      // enforcement. Throws 409 so the client can render a friendly banner.
      const userDoc = await this.userModel
        .findById(userObjectId, { userTimezone: 1 })
        .lean()
        .exec()
      const userTimezone = userDoc?.userTimezone ?? 'UTC'
      const startOfTodayLocal = startOfDayInTz(now, userTimezone)
      const endOfTodayLocal = endOfDayInTz(now, userTimezone)
      const introducedToday = await this.cardModel
        .countDocuments({
          userId: userObjectId,
          discipline: item.discipline,
          introducedAt: { $gte: startOfTodayLocal, $lte: endOfTodayLocal },
        })
        .exec()
      if (introducedToday >= SRS_DAILY_NEW_TARGETS[item.discipline]) {
        throw new ConflictException(
          `Daily new-item quota reached for ${item.discipline}. Continue with reviews; new items resume tomorrow.`,
        )
      }

      const fresh = buildInitialCard({ itemId, discipline: item.discipline, now })
      try {
        doc = await this.cardModel.create({
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
      } catch (err) {
        // Race: another concurrent review introduced first. Reload the winner.
        const won = await this.cardModel.findOne({ userId: userObjectId, itemId }).exec()
        if (!won) throw err
        doc = won
      }
    }

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

/**
   * Returns the earliest `introducedAt` for the user × discipline pair, or
   * `null` if they've never introduced anything in that discipline. Used by
   * progress derivation as the epoch (week 1 day 1) for daysCompleted.
   */
  async findEarliestIntroducedAt(
    userId: string,
    discipline: LexiconDiscipline,
  ): Promise<Date | null> {
    const userObjectId = new Types.ObjectId(userId)
    const doc = await this.cardModel
      .findOne({ userId: userObjectId, discipline }, { introducedAt: 1 })
      .sort({ introducedAt: 1 })
      .lean()
      .exec()
    return doc?.introducedAt ?? null
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
