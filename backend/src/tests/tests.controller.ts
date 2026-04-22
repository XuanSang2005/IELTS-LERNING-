import { Controller, Get, NotFoundException, Param, Query, UseGuards } from '@nestjs/common'
import type { Skill } from '@shared/schemas/test'
import { JwtAuthGuard } from '../common/jwt-auth.guard'
import { TestsService } from './tests.service'

const ALLOWED_SKILLS: readonly Skill[] = ['listening', 'reading', 'writing', 'speaking']

@Controller('tests')
@UseGuards(JwtAuthGuard)
export class TestsController {
  constructor(private readonly service: TestsService) {}

  @Get()
  list(@Query('skill') skill?: string) {
    const narrowed: Skill | undefined =
      skill && (ALLOWED_SKILLS as readonly string[]).includes(skill) ? (skill as Skill) : undefined
    return this.service.findAll({ skill: narrowed })
  }

  @Get(':id')
  async byId(@Param('id') id: string) {
    const test = await this.service.findById(id)
    if (!test) throw new NotFoundException('Test not found')
    return test
  }
}
