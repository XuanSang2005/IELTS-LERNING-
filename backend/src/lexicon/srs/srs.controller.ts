import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { LexiconDisciplineSchema } from '@shared/schemas/lexicon'
import {
  isCollocationItem,
  isLinkingItem,
  isVocabularyItem,
  type LexiconItem,
} from '@shared/schemas/lexicon-items'
import { BandLevelSchema } from '@shared/schemas/practice'
import {
  IntroduceItemDtoSchema,
  SubmitReviewDtoSchema,
  type IntroduceItemDto,
  type SubmitReviewDto,
  type YesterdayReview,
  type YesterdayReviewItem,
} from '@shared/schemas/srs'
import { CurrentUser, type AuthenticatedUser } from '../../common/current-user.decorator'
import { JwtAuthGuard } from '../../common/jwt-auth.guard'
import { ZodValidationPipe } from '../../common/zod-validation.pipe'
import { User, type UserDocument } from '../../users/schemas/user.schema'
import { LexiconService } from '../lexicon.service'
import { SrsService } from './srs.service'
import { TodayQueueService } from './today-queue.service'
import { startOfDayInTz } from './tz-helper'

const YESTERDAY_ITEM_LIMIT = 5

function formatItem(item: LexiconItem): YesterdayReviewItem {
  if (isVocabularyItem(item)) {
    const posShort = posLabel(item.partOfSpeech)
    return {
      itemId: item.id,
      discipline: 'vocabulary',
      text: item.headword,
      meta: `${item.register} · ${posShort}`,
    }
  }
  if (isCollocationItem(item)) {
    return {
      itemId: item.id,
      discipline: 'collocations',
      text: item.phrase,
      meta: 'collocation',
    }
  }
  if (isLinkingItem(item)) {
    return {
      itemId: item.id,
      discipline: 'linking',
      text: item.phrase,
      meta: `linking · ${item.function}`,
    }
  }
  // Fallback (TS exhaustiveness — the union is closed, but be safe).
  return { itemId: 'unknown', discipline: 'vocabulary', text: '', meta: '' }
}

function posLabel(pos: 'noun' | 'verb' | 'adjective' | 'adverb' | 'phrase'): string {
  switch (pos) {
    case 'noun':
      return 'n.'
    case 'verb':
      return 'v.'
    case 'adjective':
      return 'adj.'
    case 'adverb':
      return 'adv.'
    case 'phrase':
      return 'phrase'
  }
}

@Controller('lexicon/srs/me')
@UseGuards(JwtAuthGuard)
export class SrsController {
  constructor(
    private readonly srsService: SrsService,
    private readonly todayQueueService: TodayQueueService,
    private readonly lexiconService: LexiconService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  @Get('today')
  async today(
    @CurrentUser() user: AuthenticatedUser,
    @Query('discipline') disciplineRaw: string,
    @Query('level') levelRaw: string,
  ) {
    const discipline = LexiconDisciplineSchema.safeParse(disciplineRaw)
    const level = BandLevelSchema.safeParse(levelRaw)
    if (!discipline.success) throw new BadRequestException('Invalid discipline')
    if (!level.success) throw new BadRequestException('Invalid level')

    const userDoc = await this.userModel
      .findById(new Types.ObjectId(user.userId), { userTimezone: 1 })
      .lean()
      .exec()
    const userTimezone = userDoc?.userTimezone ?? 'UTC'

    return this.todayQueueService.getTodayQueue({
      userId: user.userId,
      discipline: discipline.data,
      level: level.data,
      userTimezone,
      now: new Date(),
    })
  }

  @Get('yesterday')
  async yesterday(@CurrentUser() user: AuthenticatedUser): Promise<YesterdayReview> {
    const userDoc = await this.userModel
      .findById(new Types.ObjectId(user.userId), { userTimezone: 1 })
      .lean()
      .exec()
    const userTimezone = userDoc?.userTimezone ?? 'UTC'

    const now = new Date()
    const startOfToday = startOfDayInTz(now, userTimezone)
    const startOfYesterday = new Date(startOfToday.getTime() - 24 * 60 * 60_000)
    const endOfYesterday = new Date(startOfToday.getTime() - 1)

    const cards = await this.srsService.findCardsIntroducedInRange({
      userId: user.userId,
      startUtc: startOfYesterday,
      endUtc: endOfYesterday,
    })

    if (cards.length === 0) {
      const hasAnyHistory = await this.srsService.hasAnyCards(user.userId)
      return { items: [], hasAnyHistory }
    }

    // Hydrate item details. Cap at the band's display limit and prefer a
    // mix of disciplines so the line doesn't degenerate into ten vocab words.
    const itemDocs = await this.lexiconService.findItemsByIds(cards.map((c) => c.itemId))
    const byId = new Map(itemDocs.map((d) => [d.id, d]))

    const ordered = cards
      .map((c) => byId.get(c.itemId))
      .filter((it): it is LexiconItem => Boolean(it))

    // Round-robin across disciplines so the band shows variety even when
    // the user introduced 10 vocab + 1 collocation yesterday.
    const buckets: Record<string, LexiconItem[]> = {
      vocabulary: [],
      collocations: [],
      linking: [],
    }
    for (const it of ordered) buckets[it.discipline]!.push(it)

    const interleaved: LexiconItem[] = []
    while (interleaved.length < YESTERDAY_ITEM_LIMIT) {
      let pickedAny = false
      for (const key of ['vocabulary', 'collocations', 'linking'] as const) {
        const next = buckets[key].shift()
        if (next) {
          interleaved.push(next)
          pickedAny = true
          if (interleaved.length >= YESTERDAY_ITEM_LIMIT) break
        }
      }
      if (!pickedAny) break
    }

    const items: YesterdayReviewItem[] = interleaved.map((it) => formatItem(it))
    return { items, hasAnyHistory: true }
  }

  @Get('streak')
  async streak(@CurrentUser() user: AuthenticatedUser) {
    const userDoc = await this.userModel
      .findById(new Types.ObjectId(user.userId), { userTimezone: 1 })
      .lean()
      .exec()
    const userTimezone = userDoc?.userTimezone ?? 'UTC'
    const days = await this.srsService.findUserStreak(user.userId, userTimezone)
    return { days }
  }

  @Get()
  async list(
    @CurrentUser() user: AuthenticatedUser,
    @Query('discipline') disciplineRaw?: string,
  ) {
    if (disciplineRaw) {
      const discipline = LexiconDisciplineSchema.safeParse(disciplineRaw)
      if (!discipline.success) throw new BadRequestException('Invalid discipline')
      return this.srsService.findUserCards(user.userId, discipline.data)
    }
    return this.srsService.findUserCards(user.userId)
  }

  @Post('introduce')
  async introduce(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(IntroduceItemDtoSchema)) dto: IntroduceItemDto,
  ) {
    return this.srsService.introduce(user.userId, dto.itemId, new Date())
  }

  @Post('review')
  async review(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(SubmitReviewDtoSchema)) dto: SubmitReviewDto,
  ) {
    const result = await this.srsService.submitReview(user.userId, dto.itemId, dto.rating, new Date())
    if (!result) throw new NotFoundException('Card not found')
    return result
  }
}
