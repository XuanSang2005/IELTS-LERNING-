import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { CommonModule } from '../common/common.module'
import { Translation, TranslationSchema } from './schemas/translation.schema'
import { TranslationController } from './translation.controller'
import { TranslationService } from './translation.service'

@Module({
  imports: [
    ConfigModule,
    CommonModule,
    MongooseModule.forFeature([{ name: Translation.name, schema: TranslationSchema }]),
  ],
  controllers: [TranslationController],
  providers: [TranslationService],
})
export class TranslationModule {}
