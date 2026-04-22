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
import {
  CreateWritingTestSubmissionDtoSchema,
  type CreateWritingTestSubmissionDto,
} from '@shared/schemas/test-ai-submission'
import { JwtAuthGuard } from '../common/jwt-auth.guard'
import { ProGuard } from '../common/pro.guard'
import { CurrentUser, type AuthenticatedUser } from '../common/current-user.decorator'
import { ZodValidationPipe } from '../common/zod-validation.pipe'
import { TestSubmissionsService } from './test-submissions.service'

@Controller('test-submissions')
@UseGuards(JwtAuthGuard)
export class TestSubmissionsController {
  constructor(private readonly service: TestSubmissionsService) {}

  @Post('writing')
  @UseGuards(ProGuard)
  create(
    @CurrentUser() u: AuthenticatedUser,
    @Body(new ZodValidationPipe(CreateWritingTestSubmissionDtoSchema))
    dto: CreateWritingTestSubmissionDto,
  ) {
    return this.service.createWriting(u.userId, dto)
  }

  @Get('latest')
  async latest(@CurrentUser() u: AuthenticatedUser, @Query('testId') testId?: string) {
    if (!testId) throw new NotFoundException('testId query param required')
    const sub = await this.service.findLatestForTest(u.userId, testId)
    if (!sub) throw new NotFoundException('No submission for this test')
    return sub
  }

  @Get(':id')
  async byId(@CurrentUser() u: AuthenticatedUser, @Param('id') id: string) {
    const sub = await this.service.findById(u.userId, id)
    if (!sub) throw new NotFoundException('Submission not found')
    return sub
  }

  @Post(':id/regrade')
  async regrade(@CurrentUser() u: AuthenticatedUser, @Param('id') id: string) {
    return this.service.retryGrading(u.userId, id)
  }
}
