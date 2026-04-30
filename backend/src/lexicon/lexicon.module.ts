import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from '../users/users.module'
import { LexiconController } from './lexicon.controller'
import { LexiconService } from './lexicon.service'
import { MetricsController } from './metrics/metrics.controller'
import { MetricsService } from './metrics/metrics.service'
import { ProgressController } from './progress/progress.controller'
import { ProgressService } from './progress/progress.service'
import {
  CollocationItemSubSchema,
  LexiconItemBaseSchema,
  LinkingItemSubSchema,
  VocabularyItemSubSchema,
} from './schemas/lexicon-item.schema'
import {
  LexiconPlanDoc,
  LexiconPlanMongooseSchema,
} from './schemas/lexicon-plan.schema'
import {
  LexiconProgressDoc,
  LexiconProgressMongooseSchema,
} from './schemas/lexicon-progress.schema'
import { SrsCardDoc, SrsCardMongooseSchema } from './schemas/srs-card.schema'
import { SrsController } from './srs/srs.controller'
import { SrsService } from './srs/srs.service'
import { TodayQueueService } from './srs/today-queue.service'

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      {
        name: 'LexiconItem',
        schema: LexiconItemBaseSchema,
        discriminators: [
          { name: 'vocabulary', schema: VocabularyItemSubSchema, value: 'vocabulary' },
          { name: 'collocations', schema: CollocationItemSubSchema, value: 'collocations' },
          { name: 'linking', schema: LinkingItemSubSchema, value: 'linking' },
        ],
      },
      { name: LexiconPlanDoc.name, schema: LexiconPlanMongooseSchema },
      { name: SrsCardDoc.name, schema: SrsCardMongooseSchema },
      { name: LexiconProgressDoc.name, schema: LexiconProgressMongooseSchema },
    ]),
  ],
  controllers: [LexiconController, SrsController, ProgressController, MetricsController],
  providers: [LexiconService, SrsService, TodayQueueService, ProgressService, MetricsService],
  exports: [LexiconService, SrsService, TodayQueueService],
})
export class LexiconModule {}
