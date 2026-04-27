import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import type { BandLevel } from '@shared/schemas/practice'
import { JwtAuthGuard } from '../common/jwt-auth.guard'
import { DailyService } from './daily.service'

const LEVELS: readonly BandLevel[] = ['foundation', 'intermediate', 'advanced', 'mastery']
const DAY_NUMBERS = [1, 2, 3, 4, 5] as const
type DayNum = (typeof DAY_NUMBERS)[number]

function parseLevel(raw: string | undefined): BandLevel {
  if (!raw || !(LEVELS as readonly string[]).includes(raw)) {
    throw new BadRequestException('Invalid level')
  }
  return raw as BandLevel
}

function parseIsoDate(raw: string | undefined): string {
  return raw && /^\d{4}-\d{2}-\d{2}$/.test(raw)
    ? raw
    : new Date().toISOString().slice(0, 10)
}

@Controller('daily')
@UseGuards(JwtAuthGuard)
export class DailyController {
  constructor(private readonly service: DailyService) {}

  /**
   * Today's full unit for a user at `level`. Resolves day server-side from
   * the supplied date (or the server's current UTC date if absent), so the
   * 5-cycle is consistent for every client.
   */
  @Get('today')
  async today(@Query('level') level?: string, @Query('date') date?: string) {
    const lvl = parseLevel(level)
    const iso = parseIsoDate(date)
    const unit = await this.service.findToday(lvl, iso)
    return { unit }
  }

  /**
   * Step 1 review surface — yesterday's vocab + grammar focus, projected
   * to keep the response light. Returns `{ review: null }` when yesterday's
   * slot is unseeded; the frontend renders an empty-state in that case.
   */
  @Get('review')
  async review(@Query('level') level?: string, @Query('date') date?: string) {
    const lvl = parseLevel(level)
    const iso = parseIsoDate(date)
    const review = await this.service.findReviewSet(lvl, iso)
    return { review }
  }

  /** Explicit day pick — useful for testing and "view another day" UIs. */
  @Get('by-day')
  async byDay(@Query('day') day?: string, @Query('level') level?: string) {
    const lvl = parseLevel(level)
    const n = Number(day)
    if (!Number.isInteger(n) || !(DAY_NUMBERS as readonly number[]).includes(n)) {
      throw new BadRequestException('Invalid day (1-5)')
    }
    const unit = await this.service.findByDayAndLevel(n as DayNum, lvl)
    if (!unit) throw new NotFoundException('Daily unit not found for that day and level')
    return unit
  }

  @Post('reseed')
  reseed() {
    return this.service.reseed()
  }
}
