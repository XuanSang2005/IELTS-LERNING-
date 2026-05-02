import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common'
import {
  DiagnosticSubmissionDtoSchema,
  type DiagnosticSubmissionDto,
} from '@shared/schemas/diagnostic'
import { JwtAuthGuard } from '../common/jwt-auth.guard'
import { CurrentUser, type AuthenticatedUser } from '../common/current-user.decorator'
import { ZodValidationPipe } from '../common/zod-validation.pipe'
import { DiagnosticService } from './diagnostic.service'

@Controller('diagnostic')
@UseGuards(JwtAuthGuard)
export class DiagnosticController {
  constructor(private readonly service: DiagnosticService) {}

  /** Returns the current diagnostic test (questions + writing prompt). */
  @Get('test')
  getTest() {
    return this.service.getTest()
  }

  /** Grades + persists the submission, updates the user's currentBand. */
  @Post('submit')
  submit(
    @CurrentUser() u: AuthenticatedUser,
    @Body(new ZodValidationPipe(DiagnosticSubmissionDtoSchema)) dto: DiagnosticSubmissionDto,
  ) {
    return this.service.submit(u.userId, dto)
  }

  /** Marks the user as having skipped the diagnostic so the gate doesn't re-prompt. */
  @Post('skip')
  @HttpCode(200)
  skip(@CurrentUser() u: AuthenticatedUser) {
    return this.service.markSkipped(u.userId)
  }
}
