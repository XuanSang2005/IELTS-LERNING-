import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import type { BandLevel, Discipline, Phase } from '@shared/schemas/practice'
import { JwtAuthGuard } from '../common/jwt-auth.guard'
import { LessonsService } from './lessons.service'

const DISCIPLINES: readonly Discipline[] = ['grammar', 'vocabulary', 'collocations', 'linking']
const LEVELS: readonly BandLevel[] = ['foundation', 'intermediate', 'advanced', 'mastery']
const PHASES: readonly Phase[] = [1, 2, 3, 4]

function parsePositiveInt(raw: string | undefined, min: number, max: number): number | undefined {
  if (raw === undefined) return undefined
  const n = Number(raw)
  if (!Number.isInteger(n) || n < min || n > max) return undefined
  return n
}

@Controller('lessons')
@UseGuards(JwtAuthGuard)
export class LessonsController {
  constructor(private readonly service: LessonsService) {}

  @Get()
  list(
    @Query('discipline') discipline?: string,
    @Query('level') level?: string,
    @Query('week') week?: string,
    @Query('phase') phase?: string,
  ) {
    const d =
      discipline && (DISCIPLINES as readonly string[]).includes(discipline)
        ? (discipline as Discipline)
        : undefined
    const l =
      level && (LEVELS as readonly string[]).includes(level) ? (level as BandLevel) : undefined
    const w = parsePositiveInt(week, 1, 12)
    const phaseNum = parsePositiveInt(phase, 1, 4)
    const p =
      phaseNum && (PHASES as readonly number[]).includes(phaseNum) ? (phaseNum as Phase) : undefined
    return this.service.findAll({ discipline: d, level: l, week: w, phase: p })
  }

  @Get('today')
  async today(@Query('day') day?: string) {
    const n = parsePositiveInt(day, 1, 120) ?? 1
    const lesson = await this.service.findTodayForUser(n)
    if (!lesson) throw new NotFoundException('No lessons available')
    return lesson
  }

  @Get('day/:day')
  async byDay(@Param('day') day: string) {
    const n = parsePositiveInt(day, 1, 120)
    if (n === undefined) throw new BadRequestException('Invalid day number')
    const lesson = await this.service.findByDay(n)
    if (!lesson) throw new NotFoundException('Lesson not found for that day')
    return lesson
  }

  @Get(':id')
  async byId(@Param('id') id: string) {
    const lesson = await this.service.findBySlug(id)
    if (!lesson) throw new NotFoundException('Lesson not found')
    return lesson
  }

  @Post('reseed')
  reseed() {
    return this.service.reseed()
  }
}
