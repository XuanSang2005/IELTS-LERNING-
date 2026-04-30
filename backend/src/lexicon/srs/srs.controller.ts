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
import { BandLevelSchema } from '@shared/schemas/practice'
import {
  IntroduceItemDtoSchema,
  SubmitReviewDtoSchema,
  type IntroduceItemDto,
  type SubmitReviewDto,
} from '@shared/schemas/srs'
import { CurrentUser, type AuthenticatedUser } from '../../common/current-user.decorator'
import { JwtAuthGuard } from '../../common/jwt-auth.guard'
import { ZodValidationPipe } from '../../common/zod-validation.pipe'
import { User, type UserDocument } from '../../users/schemas/user.schema'
import { SrsService } from './srs.service'
import { TodayQueueService } from './today-queue.service'

@Controller('lexicon/srs/me')
@UseGuards(JwtAuthGuard)
export class SrsController {
  constructor(
    private readonly srsService: SrsService,
    private readonly todayQueueService: TodayQueueService,
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
