import { BadRequestException, Controller, Get, NotFoundException, Post, Query, UseGuards } from '@nestjs/common'
import { LexiconDisciplineSchema } from '@shared/schemas/lexicon'
import { BandLevelSchema } from '@shared/schemas/practice'
import { JwtAuthGuard } from '../common/jwt-auth.guard'
import { LexiconService } from './lexicon.service'

@Controller('lexicon')
@UseGuards(JwtAuthGuard)
export class LexiconController {
  constructor(private readonly service: LexiconService) {}

  /**
   * Wipe and reload all lexicon items + plans from the seed files.
   * Use after the seed contents change to replace placeholder data.
   */
  @Post('reseed')
  async reseed() {
    return this.service.reseed()
  }

  @Get('plan')
  async plan(@Query('discipline') disciplineRaw: string, @Query('level') levelRaw: string) {
    const discipline = LexiconDisciplineSchema.safeParse(disciplineRaw)
    const level = BandLevelSchema.safeParse(levelRaw)
    if (!discipline.success) throw new BadRequestException('discipline must be one of: vocabulary, collocations, linking')
    if (!level.success) throw new BadRequestException('level must be one of: foundation, intermediate, advanced, mastery')
    const plan = await this.service.findPlan(discipline.data, level.data)
    if (!plan) throw new NotFoundException('Plan not seeded for this (discipline, level) pair')
    return plan
  }

  @Get('items')
  async items(
    @Query('discipline') disciplineRaw: string,
    @Query('level') levelRaw: string,
    @Query('week') weekRaw: string,
    @Query('day') dayRaw?: string,
  ) {
    const discipline = LexiconDisciplineSchema.safeParse(disciplineRaw)
    const level = BandLevelSchema.safeParse(levelRaw)
    const week = Number(weekRaw)
    if (!discipline.success) throw new BadRequestException('Invalid discipline')
    if (!level.success) throw new BadRequestException('Invalid level')
    if (!Number.isInteger(week) || week < 1 || week > 12) {
      throw new BadRequestException('week must be 1-12')
    }
    // If `day` omitted, return all items for the week (used by WeekQuiz).
    if (dayRaw === undefined || dayRaw === '') {
      return this.service.findItemsForWeek({
        discipline: discipline.data,
        level: level.data,
        week,
      })
    }
    const day = Number(dayRaw)
    if (!Number.isInteger(day) || day < 1 || day > 7) {
      throw new BadRequestException('day must be 1-7')
    }
    return this.service.findItemsForDay({
      discipline: discipline.data,
      level: level.data,
      week,
      day,
    })
  }
}
