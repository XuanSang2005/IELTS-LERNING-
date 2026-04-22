import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { CreateSubmissionDtoSchema, type CreateSubmissionDto } from '@shared/schemas/submission'
import { JwtAuthGuard } from '../common/jwt-auth.guard'
import { CurrentUser, type AuthenticatedUser } from '../common/current-user.decorator'
import { ZodValidationPipe } from '../common/zod-validation.pipe'
import { SubmissionsService } from './submissions.service'

@Controller('submissions')
@UseGuards(JwtAuthGuard)
export class SubmissionsController {
  constructor(private readonly service: SubmissionsService) {}

  @Post()
  create(
    @CurrentUser() u: AuthenticatedUser,
    @Body(new ZodValidationPipe(CreateSubmissionDtoSchema)) dto: CreateSubmissionDto,
  ) {
    return this.service.create(u.userId, dto)
  }

  @Get('latest')
  latest(@CurrentUser() u: AuthenticatedUser) {
    return this.service.findLatest(u.userId)
  }

  @Get('today')
  async today(@CurrentUser() u: AuthenticatedUser, @Query('date') date?: string) {
    const sessionDate = (date ?? new Date().toISOString().slice(0, 10)).trim()
    return this.service.findToday(u.userId, sessionDate)
  }

  @Get(':id')
  async byId(@CurrentUser() u: AuthenticatedUser, @Param('id') id: string) {
    const submission = await this.service.findById(u.userId, id)
    if (!submission) throw new NotFoundException('Submission not found')
    return submission
  }

  @Post(':id/grade')
  async retry(@CurrentUser() u: AuthenticatedUser, @Param('id') id: string) {
    return this.service.retryGrading(u.userId, id)
  }
}
