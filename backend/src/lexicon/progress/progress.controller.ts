import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { LexiconDisciplineSchema } from '@shared/schemas/lexicon'
import {
  SubmitPracticeScoreDtoSchema,
  SubmitWeekQuizDtoSchema,
  type SubmitPracticeScoreDto,
  type SubmitWeekQuizDto,
} from '@shared/schemas/lexicon-progress'
import { BandLevelSchema } from '@shared/schemas/practice'
import { CurrentUser, type AuthenticatedUser } from '../../common/current-user.decorator'
import { JwtAuthGuard } from '../../common/jwt-auth.guard'
import { ZodValidationPipe } from '../../common/zod-validation.pipe'
import { ProgressService } from './progress.service'

@Controller('lexicon/progress/me')
@UseGuards(JwtAuthGuard)
export class ProgressController {
  constructor(private readonly service: ProgressService) {}

  @Get()
  async list(
    @CurrentUser() user: AuthenticatedUser,
    @Query('discipline') disciplineRaw: string,
    @Query('level') levelRaw: string,
  ) {
    const discipline = LexiconDisciplineSchema.safeParse(disciplineRaw)
    const level = BandLevelSchema.safeParse(levelRaw)
    if (!discipline.success) throw new BadRequestException('Invalid discipline')
    if (!level.success) throw new BadRequestException('Invalid level')
    return this.service.findUserWeekProgress({
      userId: user.userId,
      discipline: discipline.data,
      level: level.data,
    })
  }

  @Post('practice')
  async practice(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(SubmitPracticeScoreDtoSchema)) dto: SubmitPracticeScoreDto,
  ) {
    await this.service.submitPracticeScore({ userId: user.userId, ...dto })
    return { ok: true }
  }

  @Post('week-quiz')
  async weekQuiz(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(SubmitWeekQuizDtoSchema)) dto: SubmitWeekQuizDto,
  ) {
    return this.service.submitWeekQuiz({ userId: user.userId, ...dto })
  }
}
