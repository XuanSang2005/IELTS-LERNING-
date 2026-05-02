import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import {
  TranslationRequestSchema,
  type TranslationRequest,
} from '@shared/schemas/translation'
import { JwtAuthGuard } from '../common/jwt-auth.guard'
import { ZodValidationPipe } from '../common/zod-validation.pipe'
import { TranslationService } from './translation.service'

@Controller('translation')
@UseGuards(JwtAuthGuard)
export class TranslationController {
  constructor(private readonly service: TranslationService) {}

  @Post()
  translate(
    @Body(new ZodValidationPipe(TranslationRequestSchema)) dto: TranslationRequest,
  ) {
    return this.service.translate(dto.text)
  }
}
