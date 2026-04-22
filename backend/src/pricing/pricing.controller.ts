import { Controller, Get } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type { Pricing } from '@shared/schemas/payment'

/**
 * Public pricing endpoint. Reads from env so prices aren't hardcoded in
 * either the frontend or the source tree. Update `.env` to change prices.
 */
@Controller('pricing')
export class PricingController {
  constructor(private readonly config: ConfigService) {}

  @Get()
  get(): Pricing {
    return {
      pro: {
        monthly: {
          vnd: this.readPrice('PRO_MONTHLY_PRICE_VND'),
          label: 'Meridian Pro · Monthly',
        },
        cohort: {
          vnd: this.readPrice('PRO_COHORT_PRICE_VND'),
          label: 'Meridian Pro · Cohort IV',
        },
      },
      currency: 'VND',
    }
  }

  private readPrice(key: string): number {
    const raw = this.config.get<string | number>(key)
    const n = typeof raw === 'string' ? parseInt(raw, 10) : raw
    if (!n || !Number.isFinite(n) || n <= 0) {
      throw new Error(`${key} is not configured in backend/.env`)
    }
    return n
  }
}
