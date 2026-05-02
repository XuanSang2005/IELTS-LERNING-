import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import type {
  AddErrorDto,
  AddNoticingItemDto,
  BandLevel,
  BandRange,
  DailyLog as DailyLogShape,
  ErrorEntry as ErrorEntryShape,
  NoticingItem as NoticingItemShape,
  PerformanceMetrics,
  PracticeStateShape,
  ReviewQuality,
  StepNumber,
  UpdateNoticingItemDto,
  UpdateProfileDto,
  UserProfile,
} from '@shared/schemas/practice'
import { UsersService } from '../users/users.service'
import { NoticingItem, NoticingItemDocument } from './data/schemas/noticing-item.schema'
import { ErrorEntry, ErrorEntryDocument } from './data/schemas/error-entry.schema'
import { DailyLog, DailyLogDocument } from './data/schemas/daily-log.schema'
import { applySm2, isoDaysFromNow, todayIso } from './sm2'
import { GRAMMAR_SYSTEM_ITEMS } from './data/grammar-seed'
import { calculateBand, levelToMidBand, levelToRange } from '@shared/utils/band-calculator'

function toNoticingItem(doc: NoticingItemDocument): NoticingItemShape {
  return {
    id: doc._id.toString(),
    text: doc.text,
    category: doc.category,
    context: doc.context,
    source: doc.source ?? 'user',
    sourceRef: doc.sourceRef,
    note: doc.note,
    capturedDate: doc.capturedDate,
    nextReviewDate: doc.nextReviewDate,
    interval: doc.interval,
    ease: doc.ease,
    reviewCount: doc.reviewCount,
    retired: doc.retired,
    editedAt: doc.editedAt,
  }
}

function toErrorEntry(doc: ErrorEntryDocument): ErrorEntryShape {
  return {
    id: doc._id.toString(),
    category: doc.category,
    original: doc.original,
    correction: doc.correction,
    note: doc.note,
    date: doc.date,
    source: doc.source,
  }
}

function toDailyLog(doc: DailyLogDocument): DailyLogShape {
  return {
    date: doc.date,
    stepsCompleted: doc.stepsCompleted.filter((n): n is StepNumber => n >= 1 && n <= 6),
    itemsCaptured: doc.itemsCaptured,
    wordsWritten: doc.wordsWritten,
    minutesSpent: doc.minutesSpent,
  }
}

@Injectable()
export class PracticeService {
  constructor(
    private readonly users: UsersService,
    @InjectModel(NoticingItem.name) private readonly itemModel: Model<NoticingItemDocument>,
    @InjectModel(ErrorEntry.name) private readonly errorModel: Model<ErrorEntryDocument>,
    @InjectModel(DailyLog.name) private readonly logModel: Model<DailyLogDocument>,
  ) {}

  async getState(userId: string): Promise<PracticeStateShape> {
    await this.ensureSystemGrammarItems(userId)
    await this.ensureBandProfile(userId)
    const [user, items, errors, logs] = await Promise.all([
      this.users.findById(userId),
      this.itemModel.find({ userId: new Types.ObjectId(userId) }).exec(),
      this.errorModel.find({ userId: new Types.ObjectId(userId) }).exec(),
      this.logModel.find({ userId: new Types.ObjectId(userId) }).exec(),
    ])
    if (!user) throw new NotFoundException('User not found')
    return {
      profile: user.profile,
      noticingItems: items.map(toNoticingItem),
      errors: errors.map(toErrorEntry),
      dailyLogs: logs.map(toDailyLog),
    }
  }

  private async ensureBandProfile(userId: string): Promise<void> {
    const user = await this.users.findById(userId)
    if (!user) return
    const p = user.profile as Partial<UserProfile>
    const hasBand = p.currentBand && p.performance
    if (hasBand) return
    const nowIso = new Date().toISOString()
    const patched: UserProfile = {
      ...(p as UserProfile),
      currentBand: p.currentBand ?? {
        level: 'intermediate',
        estimatedBand: 6.0,
        range: [6.0, 6.5],
        confidence: 'low',
        setBy: 'algorithm',
        updatedAt: nowIso,
      },
      performance: p.performance ?? {
        weeklyTestScores: [],
        reviewAccuracy: [],
        writingBands: [],
      },
      lastBandReassessment: p.lastBandReassessment ?? null,
      diagnosticCompletedAt: p.diagnosticCompletedAt ?? null,
      diagnosticSkippedAt: p.diagnosticSkippedAt ?? null,
      diagnosticResult: p.diagnosticResult ?? null,
    }
    await this.users.setProfile(userId, patched)
  }

  async setBandOverride(userId: string, level: BandLevel): Promise<BandRange> {
    const user = await this.users.findById(userId)
    if (!user) throw new NotFoundException('User not found')
    const range = levelToRange(level)
    const newBand: BandRange = {
      level,
      estimatedBand: levelToMidBand(level),
      range,
      confidence: 'low',
      setBy: 'user-override',
      updatedAt: new Date().toISOString(),
    }
    user.profile = { ...user.profile, currentBand: newBand }
    await user.save()
    return newBand
  }

  async reassessBand(userId: string): Promise<BandRange> {
    const user = await this.users.findById(userId)
    if (!user) throw new NotFoundException('User not found')
    const next = calculateBand(
      user.profile.currentBand,
      user.profile.performance,
      user.profile.currentWeek,
    )
    user.profile = {
      ...user.profile,
      currentBand: next,
      lastBandReassessment: new Date().toISOString(),
    }
    await user.save()
    return next
  }

  private async maybeReassessBand(userId: string): Promise<void> {
    const user = await this.users.findById(userId)
    if (!user) return
    const last = user.profile.lastBandReassessment
    const overrideActive = user.profile.currentBand.setBy === 'user-override'
    if (overrideActive) return
    if (last) {
      const daysSince = (Date.now() - new Date(last).getTime()) / 86_400_000
      if (daysSince < 7) return
    }
    await this.reassessBand(userId)
  }

  async recordTestResult(
    userId: string,
    input: { skill: 'listening' | 'reading'; rawScore: number; total: number; band: number },
  ): Promise<void> {
    const user = await this.users.findById(userId)
    if (!user) throw new NotFoundException('User not found')
    const perf: PerformanceMetrics = {
      ...user.profile.performance,
      weeklyTestScores: [
        ...user.profile.performance.weeklyTestScores,
        { week: user.profile.currentWeek, ...input },
      ],
    }
    user.profile = { ...user.profile, performance: perf }
    await user.save()
    await this.maybeReassessBand(userId)
  }

  async recordWritingBand(userId: string, band: number): Promise<void> {
    const user = await this.users.findById(userId)
    if (!user) throw new NotFoundException('User not found')
    const perf: PerformanceMetrics = {
      ...user.profile.performance,
      writingBands: [
        ...user.profile.performance.writingBands,
        { week: user.profile.currentWeek, band },
      ],
    }
    user.profile = { ...user.profile, performance: perf }
    await user.save()
    await this.maybeReassessBand(userId)
  }

  async recordReviewSession(
    userId: string,
    input: { correctCount: number; totalCount: number; averageEase: number },
  ): Promise<void> {
    const user = await this.users.findById(userId)
    if (!user) throw new NotFoundException('User not found')
    const perf: PerformanceMetrics = {
      ...user.profile.performance,
      reviewAccuracy: [
        ...user.profile.performance.reviewAccuracy,
        { week: user.profile.currentWeek, ...input },
      ],
    }
    user.profile = { ...user.profile, performance: perf }
    await user.save()
    await this.maybeReassessBand(userId)
  }

  private async ensureSystemGrammarItems(userId: string): Promise<void> {
    const uid = new Types.ObjectId(userId)
    const existing = await this.itemModel
      .find({ userId: uid, category: 'grammar', source: 'system' })
      .exec()

    if (existing.length === 0) {
      const today = todayIso()
      const docs = GRAMMAR_SYSTEM_ITEMS.map((seed) => ({
        userId: uid,
        text: seed.text,
        category: 'grammar' as const,
        context: seed.context,
        source: 'system' as const,
        sourceRef: seed.sourceRef,
        note: seed.note,
        capturedDate: today,
        nextReviewDate: isoDaysFromNow(1),
        interval: 0,
        ease: 2.5,
        reviewCount: 0,
        retired: false,
      }))
      await this.itemModel.insertMany(docs)
      return
    }

    // Backfill: existing seeded users may predate the formula/use notes.
    const seedByText = new Map(GRAMMAR_SYSTEM_ITEMS.map((s) => [s.text, s]))
    for (const doc of existing) {
      const seed = seedByText.get(doc.text)
      if (!seed) continue
      if (doc.note === seed.note) continue
      doc.note = seed.note
      await doc.save()
    }
  }

  async updateProfile(userId: string, patch: UpdateProfileDto): Promise<UserProfile> {
    const doc = await this.users.updateProfile(userId, patch)
    if (!doc) throw new NotFoundException('User not found')
    return doc.profile
  }

  async listItems(userId: string): Promise<NoticingItemShape[]> {
    const docs = await this.itemModel.find({ userId: new Types.ObjectId(userId) }).exec()
    return docs.map(toNoticingItem)
  }

  async addNoticingItem(userId: string, dto: AddNoticingItemDto): Promise<NoticingItemShape> {
    const today = todayIso()
    const doc = await this.itemModel.create({
      userId: new Types.ObjectId(userId),
      text: dto.text,
      category: dto.category,
      context: dto.context,
      source: 'user',
      sourceRef: dto.sourceRef,
      note: dto.note,
      capturedDate: today,
      nextReviewDate: isoDaysFromNow(1),
      interval: 0,
      ease: 2.5,
      reviewCount: 0,
      retired: false,
    })
    await this.touchTodayLog(userId, { itemsCaptured: 1 })
    return toNoticingItem(doc)
  }

  async updateNoticingItem(
    userId: string,
    itemId: string,
    patch: UpdateNoticingItemDto,
  ): Promise<NoticingItemShape> {
    if (!Types.ObjectId.isValid(itemId)) throw new NotFoundException('Item not found')
    const doc = await this.itemModel
      .findOne({ _id: new Types.ObjectId(itemId), userId: new Types.ObjectId(userId) })
      .exec()
    if (!doc) throw new NotFoundException('Item not found')
    if (doc.source !== 'user')
      throw new ForbiddenException('System items cannot be edited; you may only add a note.')

    if (patch.text !== undefined) doc.text = patch.text
    if (patch.category !== undefined) doc.category = patch.category
    if (patch.context !== undefined) doc.context = patch.context
    if (patch.sourceRef !== undefined) doc.sourceRef = patch.sourceRef
    if (patch.note !== undefined) doc.note = patch.note
    doc.editedAt = new Date().toISOString()
    await doc.save()
    return toNoticingItem(doc)
  }

  async deleteNoticingItem(userId: string, itemId: string): Promise<void> {
    if (!Types.ObjectId.isValid(itemId)) throw new NotFoundException('Item not found')
    const doc = await this.itemModel
      .findOne({ _id: new Types.ObjectId(itemId), userId: new Types.ObjectId(userId) })
      .exec()
    if (!doc) throw new NotFoundException('Item not found')
    if (doc.source !== 'user')
      throw new ForbiddenException(
        'System items cannot be deleted; their review history is shared.',
      )
    await doc.deleteOne()
  }

  async setNoteOnItem(userId: string, itemId: string, note: string): Promise<NoticingItemShape> {
    if (!Types.ObjectId.isValid(itemId)) throw new NotFoundException('Item not found')
    const doc = await this.itemModel
      .findOne({ _id: new Types.ObjectId(itemId), userId: new Types.ObjectId(userId) })
      .exec()
    if (!doc) throw new NotFoundException('Item not found')
    doc.note = note
    doc.editedAt = new Date().toISOString()
    await doc.save()
    return toNoticingItem(doc)
  }

  async reviewItem(
    userId: string,
    itemId: string,
    quality: ReviewQuality,
  ): Promise<NoticingItemShape> {
    const userObjectId = new Types.ObjectId(userId)
    if (!Types.ObjectId.isValid(itemId)) throw new NotFoundException('Item not found')
    const doc = await this.itemModel
      .findOne({ _id: new Types.ObjectId(itemId), userId: userObjectId })
      .exec()
    if (!doc) throw new NotFoundException('Item not found')

    const res = applySm2(
      { interval: doc.interval, ease: doc.ease, reviewCount: doc.reviewCount },
      quality,
    )
    doc.interval = res.interval
    doc.ease = res.ease
    doc.reviewCount = res.reviewCount
    doc.retired = res.retired
    doc.nextReviewDate = isoDaysFromNow(res.interval)
    await doc.save()
    return toNoticingItem(doc)
  }

  async listErrors(userId: string): Promise<ErrorEntryShape[]> {
    const docs = await this.errorModel.find({ userId: new Types.ObjectId(userId) }).exec()
    return docs.map(toErrorEntry)
  }

  async addError(userId: string, dto: AddErrorDto): Promise<ErrorEntryShape> {
    const doc = await this.errorModel.create({
      userId: new Types.ObjectId(userId),
      category: dto.category,
      original: dto.original,
      correction: dto.correction,
      note: dto.note,
      source: dto.source,
      date: todayIso(),
    })
    return toErrorEntry(doc)
  }

  async listLogs(userId: string): Promise<DailyLogShape[]> {
    const docs = await this.logModel.find({ userId: new Types.ObjectId(userId) }).exec()
    return docs.map(toDailyLog)
  }

  async completeStep(userId: string, step: StepNumber): Promise<DailyLogShape> {
    const userObjectId = new Types.ObjectId(userId)
    const today = todayIso()
    const existing = await this.logModel.findOne({ userId: userObjectId, date: today }).exec()
    if (existing) {
      if (!existing.stepsCompleted.includes(step)) {
        existing.stepsCompleted.push(step)
        existing.stepsCompleted.sort((a, b) => a - b)
      }
      await existing.save()
      return toDailyLog(existing)
    }
    const created = await this.logModel.create({
      userId: userObjectId,
      date: today,
      stepsCompleted: [step],
      itemsCaptured: 0,
      wordsWritten: 0,
      minutesSpent: 0,
    })
    return toDailyLog(created)
  }

  async incrementWords(userId: string, n: number): Promise<DailyLogShape> {
    return this.touchTodayLog(userId, { wordsWritten: n })
  }

  private async touchTodayLog(
    userId: string,
    delta: { itemsCaptured?: number; wordsWritten?: number; minutesSpent?: number },
  ): Promise<DailyLogShape> {
    const userObjectId = new Types.ObjectId(userId)
    const today = todayIso()
    const $inc: Record<string, number> = {}
    if (delta.itemsCaptured) $inc.itemsCaptured = delta.itemsCaptured
    if (delta.wordsWritten) $inc.wordsWritten = delta.wordsWritten
    if (delta.minutesSpent) $inc.minutesSpent = delta.minutesSpent

    const doc = await this.logModel
      .findOneAndUpdate(
        { userId: userObjectId, date: today },
        {
          $setOnInsert: {
            userId: userObjectId,
            date: today,
            stepsCompleted: [],
          },
          ...(Object.keys($inc).length ? { $inc } : {}),
        },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      )
      .exec()
    return toDailyLog(doc)
  }

  async importState(
    userId: string,
    incoming: PracticeStateShape,
  ): Promise<{ items: number; errors: number; logs: number }> {
    const userObjectId = new Types.ObjectId(userId)
    await this.users.setProfile(userId, incoming.profile)

    let itemsImported = 0
    for (const item of incoming.noticingItems) {
      await this.itemModel.create({
        userId: userObjectId,
        text: item.text,
        category: item.category,
        context: item.context,
        source: item.source ?? 'system',
        sourceRef: item.sourceRef,
        note: item.note,
        capturedDate: item.capturedDate,
        nextReviewDate: item.nextReviewDate,
        interval: item.interval,
        ease: item.ease,
        reviewCount: item.reviewCount,
        retired: item.retired,
        editedAt: item.editedAt,
      })
      itemsImported += 1
    }

    let errorsImported = 0
    for (const err of incoming.errors) {
      await this.errorModel.create({
        userId: userObjectId,
        category: err.category,
        original: err.original,
        correction: err.correction,
        note: err.note,
        source: err.source,
        date: err.date,
      })
      errorsImported += 1
    }

    let logsImported = 0
    for (const log of incoming.dailyLogs) {
      await this.logModel.updateOne(
        { userId: userObjectId, date: log.date },
        {
          $set: {
            stepsCompleted: log.stepsCompleted,
            itemsCaptured: log.itemsCaptured,
            wordsWritten: log.wordsWritten,
            minutesSpent: log.minutesSpent,
          },
          $setOnInsert: { userId: userObjectId, date: log.date },
        },
        { upsert: true },
      )
      logsImported += 1
    }

    return { items: itemsImported, errors: errorsImported, logs: logsImported }
  }
}
