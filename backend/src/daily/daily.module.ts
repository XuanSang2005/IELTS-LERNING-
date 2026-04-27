import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { DailyController } from './daily.controller'
import { DailyService } from './daily.service'
import { DailyUnitDoc, DailyUnitMongooseSchema } from './schemas/daily-unit.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DailyUnitDoc.name, schema: DailyUnitMongooseSchema },
    ]),
  ],
  controllers: [DailyController],
  providers: [DailyService],
  exports: [DailyService],
})
export class DailyModule {}
