import { BadRequestException, Controller, Get, Query, UseGuards } from '@nestjs/common'
import { LexiconDisciplineSchema } from '@shared/schemas/lexicon'
import { BandLevelSchema } from '@shared/schemas/practice'
import { JwtAuthGuard } from '../common/jwt-auth.guard'
import { LexiconService } from './lexicon.service'

@Controller('lexicon')
@UseGuards(JwtAuthGuard)
export class LexiconController {
  constructor(private readonly service: LexiconService) {}

  @Get('plan')
  async plan(@Query('discipline') disciplineRaw: string, @Query('level') levelRaw: string) {
    const discipline = LexiconDisciplineSchema.safeParse(disciplineRaw)
    const level = BandLevelSchema.safeParse(levelRaw)
    if (!discipline.success) throw new BadRequestException('discipline must be one of: vocabulary, collocations, linking')
    if (!level.success) throw new BadRequestException('level must be one of: foundation, intermediate, advanced, mastery')
    const plan = await this.service.findPlan(discipline.data, level.data)
    if (!plan) {
      // Editorial coming-soon stub for levels that haven't been content-filled
      // (Foundation / Advanced / Mastery in MVP). 200 + empty weeks lets the
      // frontend render its own copy without forcing an error path.
      return {
        discipline: discipline.data,
        level: level.data,
        weeks: [],
        comingSoon: true,
      }
    }
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
