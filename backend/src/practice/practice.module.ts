import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from '../users/users.module'
import { PracticeController } from './practice.controller'
import { PracticeService } from './practice.service'
import { NoticingItem, NoticingItemSchema } from './data/schemas/noticing-item.schema'
import { ErrorEntry, ErrorEntrySchema } from './data/schemas/error-entry.schema'
import { DailyLog, DailyLogSchema } from './data/schemas/daily-log.schema'

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: NoticingItem.name, schema: NoticingItemSchema },
      { name: ErrorEntry.name, schema: ErrorEntrySchema },
      { name: DailyLog.name, schema: DailyLogSchema },
    ]),
  ],
  controllers: [PracticeController],
  providers: [PracticeService],
  exports: [PracticeService],
})
export class PracticeModule {}
