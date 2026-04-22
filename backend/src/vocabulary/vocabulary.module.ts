import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { VocabularyController } from './vocabulary.controller'
import { VocabularyService } from './vocabulary.service'
import { VocabWordDoc, VocabWordMongooseSchema } from './schemas/vocab-word.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: VocabWordDoc.name, schema: VocabWordMongooseSchema }]),
  ],
  controllers: [VocabularyController],
  providers: [VocabularyService],
  exports: [VocabularyService],
})
export class VocabularyModule {}
