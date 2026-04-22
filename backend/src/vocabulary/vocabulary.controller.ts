import { Controller, Get, NotFoundException, Param, Post, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../common/jwt-auth.guard'
import { VocabularyService } from './vocabulary.service'

const REGISTERS = ['B1', 'B2', 'C1'] as const
const FREQUENCIES = ['high', 'medium', 'low'] as const
type Register = (typeof REGISTERS)[number]
type Frequency = (typeof FREQUENCIES)[number]

@Controller('vocabulary')
@UseGuards(JwtAuthGuard)
export class VocabularyController {
  constructor(private readonly service: VocabularyService) {}

  @Get()
  list(
    @Query('topic') topic?: string,
    @Query('register') register?: string,
    @Query('frequency') frequency?: string,
    @Query('q') search?: string,
  ) {
    const r =
      register && (REGISTERS as readonly string[]).includes(register)
        ? (register as Register)
        : undefined
    const f =
      frequency && (FREQUENCIES as readonly string[]).includes(frequency)
        ? (frequency as Frequency)
        : undefined
    return this.service.findAll({ topic, register: r, frequency: f, search })
  }

  @Get(':id')
  async byId(@Param('id') id: string) {
    const word = await this.service.findBySlug(id)
    if (!word) throw new NotFoundException('Word not found')
    return word
  }

  @Post('reseed')
  reseed() {
    return this.service.reseed()
  }
}
