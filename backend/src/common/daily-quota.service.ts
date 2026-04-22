import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { DailyQuota, DailyQuotaDocument } from './schemas/daily-quota.schema'

const DAILY_LIMIT = 10

/**
 * Atomically tracks AI-grading calls per user per day. Single counter
 * shared across essay submissions (existing `submissions` module) and
 * test submissions (new `test-submissions` module) so candidates can't
 * bypass the quota by mixing the two.
 *
 * Uses `findOneAndUpdate` + `$inc` so concurrent requests race safely.
 */
@Injectable()
export class DailyQuotaService {
  constructor(
    @InjectModel(DailyQuota.name)
    private readonly model: Model<DailyQuotaDocument>,
  ) {}

  /**
   * Increments the user's counter for today and throws if the daily limit
   * has been reached. Should be called BEFORE starting a Claude call so
   * we never pay tokens the candidate isn't entitled to.
   */
  async incrementOrThrow(userId: string): Promise<void> {
    const day = today()
    const uid = new Types.ObjectId(userId)

    // Increment first, then read. If the incremented value exceeds the limit,
    // decrement and throw. (We take the increment-first approach so two
    // concurrent requests each see a truthy count and only one exceeds.)
    const doc = await this.model
      .findOneAndUpdate(
        { userId: uid, date: day },
        { $inc: { count: 1 }, $setOnInsert: { userId: uid, date: day } },
        { upsert: true, new: true },
      )
      .exec()

    if (doc.count > DAILY_LIMIT) {
      await this.model.updateOne({ userId: uid, date: day }, { $inc: { count: -1 } }).exec()
      throw new BadRequestException(
        "You've reached today's grading limit. Return tomorrow at nine.",
      )
    }
  }

  /** Read-only. Returns 0 for users with no activity today. */
  async usedToday(userId: string): Promise<number> {
    const day = today()
    const uid = new Types.ObjectId(userId)
    const doc = await this.model.findOne({ userId: uid, date: day }).exec()
    return doc?.count ?? 0
  }

  get dailyLimit(): number {
    return DAILY_LIMIT
  }
}

function today(): string {
  return new Date().toISOString().slice(0, 10)
}
