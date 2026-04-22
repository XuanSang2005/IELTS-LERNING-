import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import {
  AddErrorDtoSchema,
  AddNoticingItemDtoSchema,
  IncrementWordsDtoSchema,
  NoteOnItemDtoSchema,
  PracticeStateSchema,
  ReviewItemDtoSchema,
  SetBandDtoSchema,
  StepNumberSchema,
  UpdateNoticingItemDtoSchema,
  UpdateProfileDtoSchema,
  type AddErrorDto,
  type AddNoticingItemDto,
  type IncrementWordsDto,
  type NoteOnItemDto,
  type PracticeStateShape,
  type ReviewItemDto,
  type SetBandDto,
  type UpdateNoticingItemDto,
  type UpdateProfileDto,
} from '@shared/schemas/practice'
import { JwtAuthGuard } from '../common/jwt-auth.guard'
import { CurrentUser, type AuthenticatedUser } from '../common/current-user.decorator'
import { ZodValidationPipe } from '../common/zod-validation.pipe'
import { PracticeService } from './practice.service'

@Controller('practice')
@UseGuards(JwtAuthGuard)
export class PracticeController {
  constructor(private readonly service: PracticeService) {}

  @Get('state')
  getState(@CurrentUser() u: AuthenticatedUser) {
    return this.service.getState(u.userId)
  }

  @Patch('profile')
  updateProfile(
    @CurrentUser() u: AuthenticatedUser,
    @Body(new ZodValidationPipe(UpdateProfileDtoSchema)) dto: UpdateProfileDto,
  ) {
    return this.service.updateProfile(u.userId, dto)
  }

  @Patch('band')
  setBand(
    @CurrentUser() u: AuthenticatedUser,
    @Body(new ZodValidationPipe(SetBandDtoSchema)) dto: SetBandDto,
  ) {
    return this.service.setBandOverride(u.userId, dto.level)
  }

  @Post('band/reassess')
  reassessBand(@CurrentUser() u: AuthenticatedUser) {
    return this.service.reassessBand(u.userId)
  }

  @Get('noticing-items')
  listItems(@CurrentUser() u: AuthenticatedUser) {
    return this.service.listItems(u.userId)
  }

  @Post('noticing-items')
  addItem(
    @CurrentUser() u: AuthenticatedUser,
    @Body(new ZodValidationPipe(AddNoticingItemDtoSchema))
    dto: AddNoticingItemDto,
  ) {
    return this.service.addNoticingItem(u.userId, dto)
  }

  @Patch('noticing-items/:id/review')
  reviewItem(
    @CurrentUser() u: AuthenticatedUser,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(ReviewItemDtoSchema)) dto: ReviewItemDto,
  ) {
    return this.service.reviewItem(u.userId, id, dto.quality)
  }

  @Patch('noticing-items/:id')
  updateItem(
    @CurrentUser() u: AuthenticatedUser,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateNoticingItemDtoSchema))
    dto: UpdateNoticingItemDto,
  ) {
    return this.service.updateNoticingItem(u.userId, id, dto)
  }

  @Patch('noticing-items/:id/note')
  noteOnItem(
    @CurrentUser() u: AuthenticatedUser,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(NoteOnItemDtoSchema)) dto: NoteOnItemDto,
  ) {
    return this.service.setNoteOnItem(u.userId, id, dto.note)
  }

  @Delete('noticing-items/:id')
  @HttpCode(204)
  async deleteItem(@CurrentUser() u: AuthenticatedUser, @Param('id') id: string): Promise<void> {
    await this.service.deleteNoticingItem(u.userId, id)
  }

  @Get('errors')
  listErrors(@CurrentUser() u: AuthenticatedUser) {
    return this.service.listErrors(u.userId)
  }

  @Post('errors')
  addError(
    @CurrentUser() u: AuthenticatedUser,
    @Body(new ZodValidationPipe(AddErrorDtoSchema)) dto: AddErrorDto,
  ) {
    return this.service.addError(u.userId, dto)
  }

  @Get('daily-logs')
  listLogs(@CurrentUser() u: AuthenticatedUser) {
    return this.service.listLogs(u.userId)
  }

  @Post('daily-logs/today/steps/:step')
  completeStep(@CurrentUser() u: AuthenticatedUser, @Param('step', ParseIntPipe) stepRaw: number) {
    const step = StepNumberSchema.parse(stepRaw)
    return this.service.completeStep(u.userId, step)
  }

  @Post('daily-logs/today/words')
  incrementWords(
    @CurrentUser() u: AuthenticatedUser,
    @Body(new ZodValidationPipe(IncrementWordsDtoSchema))
    dto: IncrementWordsDto,
  ) {
    return this.service.incrementWords(u.userId, dto.n)
  }

  @Post('import')
  async import(
    @CurrentUser() u: AuthenticatedUser,
    @Body(new ZodValidationPipe(PracticeStateSchema)) state: PracticeStateShape,
  ) {
    const imported = await this.service.importState(u.userId, state)
    return { imported }
  }
}
