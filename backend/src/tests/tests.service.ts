import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import type { Skill, Test as TestShape } from '@shared/schemas/test'
import { seedTests } from '@shared/seeds/tests'
import { Test, TestDocument } from './schemas/test.schema'
import { LISTENING_TEST, READING_TEST } from './tests.constants'

function toShape(doc: TestDocument): TestShape {
  const obj = doc.toObject<TestDocument>()
  return {
    id: obj.externalId,
    skill: obj.skill,
    title: obj.title,
    description: obj.description,
    difficulty: obj.difficulty,
    fullDurationMinutes: obj.fullDurationMinutes,
    shortDurationMinutes: obj.shortDurationMinutes,
    totalQuestions: obj.totalQuestions,
    isPro: obj.isPro,
    publishedAt: obj.publishedAt,
    tags: obj.tags ?? [],
    participantsCount: obj.participantsCount,
    playsCount: obj.playsCount,
    sections: obj.sections,
    passages: obj.passages,
    tasks: obj.tasks,
    parts: obj.parts,
    mockFeedback: obj.mockFeedback,
  } as TestShape
}

@Injectable()
export class TestsService implements OnModuleInit {
  private readonly logger = new Logger(TestsService.name)

  constructor(
    // Default collection — holds writing + speaking tests.
    @InjectModel(Test.name) private readonly testModel: Model<TestDocument>,
    // Listening tests live in `listening_tests`.
    @InjectModel(LISTENING_TEST) private readonly listeningModel: Model<TestDocument>,
    // Reading tests live in `reading_tests`.
    @InjectModel(READING_TEST) private readonly readingModel: Model<TestDocument>,
  ) {}

  /** Returns the correct model for a given skill. */
  private modelFor(skill: Skill): Model<TestDocument> {
    if (skill === 'listening') return this.listeningModel
    if (skill === 'reading') return this.readingModel
    return this.testModel
  }

  /** All three models — used when skill is unknown. */
  private allModels(): Array<Model<TestDocument>> {
    return [this.testModel, this.listeningModel, this.readingModel]
  }

  async onModuleInit(): Promise<void> {
    // Idempotent seed: upsert each seed test by externalId into the right
    // physical collection. Listening goes to `listening_tests`, reading goes
    // to `reading_tests`, writing/speaking stay in `tests`.
    let inserted = 0
    let updated = 0
    for (const t of seedTests) {
      const model = this.modelFor(t.skill)
      const result = await model
        .updateOne(
          { externalId: t.id },
          {
            $set: {
              skill: t.skill,
              title: t.title,
              description: t.description,
              difficulty: t.difficulty,
              fullDurationMinutes: t.fullDurationMinutes,
              shortDurationMinutes: t.shortDurationMinutes,
              totalQuestions: t.totalQuestions,
              isPro: t.isPro,
              publishedAt: t.publishedAt,
              tags: t.tags,
              participantsCount: t.participantsCount,
              playsCount: t.playsCount,
              sections: t.sections,
              passages: t.passages,
              tasks: t.tasks,
              parts: t.parts,
              mockFeedback: t.mockFeedback,
            },
            $setOnInsert: { externalId: t.id },
          },
          { upsert: true },
        )
        .exec()
      if (result.upsertedCount) inserted += 1
      else if (result.modifiedCount) updated += 1
    }
    if (inserted || updated) {
      this.logger.log(`tests seed — inserted=${inserted} updated=${updated}`)
    }
  }

  async findAll(filter?: { skill?: Skill }): Promise<TestShape[]> {
    if (filter?.skill) {
      const docs = await this.modelFor(filter.skill)
        .find({ skill: filter.skill })
        .sort({ publishedAt: 1 })
        .exec()
      return docs.map(toShape)
    }
    const results = await Promise.all(
      this.allModels().map((m) => m.find({}).sort({ publishedAt: 1 }).exec()),
    )
    return results.flat().map(toShape)
  }

  async findById(externalId: string): Promise<TestShape | null> {
    for (const m of this.allModels()) {
      const doc = await m.findOne({ externalId }).exec()
      if (doc) return toShape(doc)
    }
    return null
  }
}
