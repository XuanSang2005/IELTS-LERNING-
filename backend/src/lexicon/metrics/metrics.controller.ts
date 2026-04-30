import { BadRequestException, Controller, Get, Query, UseGuards } from '@nestjs/common'
import { LexiconDisciplineSchema } from '@shared/schemas/lexicon'
import { CurrentUser, type AuthenticatedUser } from '../../common/current-user.decorator'
import { JwtAuthGuard } from '../../common/jwt-auth.guard'
import { MetricsService } from './metrics.service'

@Controller('lexicon/metrics/me')
@UseGuards(JwtAuthGuard)
export class MetricsController {
  constructor(private readonly service: MetricsService) {}

  @Get()
  async get(
    @CurrentUser() user: AuthenticatedUser,
    @Query('discipline') disciplineRaw: string,
  ) {
    const discipline = LexiconDisciplineSchema.safeParse(disciplineRaw)
    if (!discipline.success) throw new BadRequestException('Invalid discipline')
    return this.service.getRetention({ userId: user.userId, discipline: discipline.data })
  }
}
