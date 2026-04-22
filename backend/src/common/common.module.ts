import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from '../users/users.module'
import { DailyQuotaService } from './daily-quota.service'
import { DailyQuota, DailyQuotaSchema } from './schemas/daily-quota.schema'
import { ProGuard } from './pro.guard'

/**
 * Shared guards and cross-module services. Register this module wherever
 * ProGuard or DailyQuotaService is needed; both providers are re-exported.
 */
@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: DailyQuota.name, schema: DailyQuotaSchema }]),
  ],
  providers: [DailyQuotaService, ProGuard],
  // Re-export UsersModule so that any module using `@UseGuards(ProGuard)` can
  // resolve the guard's constructor dependencies in its own injector context.
  exports: [DailyQuotaService, ProGuard, UsersModule],
})
export class CommonModule {}
