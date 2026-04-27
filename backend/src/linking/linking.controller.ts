import { Controller, Get, NotFoundException, Param, Post, Query, UseGuards } from '@nestjs/common'
import type { LinkingFunction } from '@shared/schemas/linking-device'
import { JwtAuthGuard } from '../common/jwt-auth.guard'
import { LinkingService } from './linking.service'

const FUNCTIONS: readonly LinkingFunction[] = [
  'addition',
  'contrast',
  'cause',
  'effect',
  'concession',
  'exemplification',
  'sequence',
  'summary',
] as const
const REGISTERS = ['B1', 'B2', 'C1'] as const
type Register = (typeof REGISTERS)[number]

@Controller('linking')
@UseGuards(JwtAuthGuard)
export class LinkingController {
  constructor(private readonly service: LinkingService) {}

  @Get()
  list(
    @Query('function') fn?: string,
    @Query('register') register?: string,
    @Query('q') search?: string,
  ) {
    const f =
      fn && (FUNCTIONS as readonly string[]).includes(fn) ? (fn as LinkingFunction) : undefined
    const r =
      register && (REGISTERS as readonly string[]).includes(register)
        ? (register as Register)
        : undefined
    return this.service.findAll({ function: f, register: r, search })
  }

  @Get(':id')
  async byId(@Param('id') id: string) {
    const item = await this.service.findBySlug(id)
    if (!item) throw new NotFoundException('Linking device not found')
    return item
  }

  @Post('reseed')
  reseed() {
    return this.service.reseed()
  }
}
