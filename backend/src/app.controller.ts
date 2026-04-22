import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  @Get()
  health() {
    return { status: 'ok', service: 'meridian-api', version: '0.1.0' }
  }
}
