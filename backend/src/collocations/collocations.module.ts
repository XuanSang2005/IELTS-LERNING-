import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CollocationsController } from './collocations.controller'
import { CollocationsService } from './collocations.service'
import { CollocationDoc, CollocationMongooseSchema } from './schemas/collocation.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CollocationDoc.name, schema: CollocationMongooseSchema }]),
  ],
  controllers: [CollocationsController],
  providers: [CollocationsService],
  exports: [CollocationsService],
})
export class CollocationsModule {}
