import { Controller, Get, NotFoundException, Param, Post, Query, UseGuards } from '@nestjs/common'
import type { CollocationPattern } from '@shared/schemas/collocation'
import { JwtAuthGuard } from '../common/jwt-auth.guard'
import { CollocationsService } from './collocations.service'

const PATTERNS: readonly CollocationPattern[] = [
  'verb-noun',
  'adjective-noun',
  'noun-noun',
  'verb-preposition',
  'adjective-preposition',
  'adverb-adjective',
] as const
const REGISTERS = ['B1', 'B2', 'C1'] as const
type Register = (typeof REGISTERS)[number]

@Controller('collocations')
@UseGuards(JwtAuthGuard)
export class CollocationsController {
  constructor(private readonly service: CollocationsService) {}

  @Get()
  list(
    @Query('pattern') pattern?: string,
    @Query('register') register?: string,
    @Query('topic') topic?: string,
    @Query('q') search?: string,
  ) {
    const p =
      pattern && (PATTERNS as readonly string[]).includes(pattern)
        ? (pattern as CollocationPattern)
        : undefined
    const r =
      register && (REGISTERS as readonly string[]).includes(register)
        ? (register as Register)
        : undefined
    return this.service.findAll({ pattern: p, register: r, topic, search })
  }

  @Get(':id')
  async byId(@Param('id') id: string) {
    const item = await this.service.findBySlug(id)
    if (!item) throw new NotFoundException('Collocation not found')
    return item
  }

  @Post('reseed')
  reseed() {
    return this.service.reseed()
  }
}
