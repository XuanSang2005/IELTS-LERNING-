import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import type { Discipline, BandLevel, Phase } from '@shared/schemas/practice'
import type { Lesson, LessonSummary } from '@shared/schemas/lesson'
import { LessonDocument } from './schemas/lesson.schema'
import { LESSON_SEED } from './data/lesson-seed'
import { GRAMMAR_LESSON } from './lessons.constants'

function toLesson(doc: LessonDocument): Lesson {
  return {
    id: doc.slug,
    day: doc.day,
    week: doc.week,
    phase: doc.phase,
    discipline: doc.discipline,
    level: doc.level,
    title: doc.title,
    subtitle: doc.subtitle,
    hook: doc.hook,
    theory: doc.theory,
    examples: doc.examples.map((e) => ({ text: e.text, register: e.register, gloss: e.gloss })),
    mistakes: doc.mistakes.map((m) => ({ wrong: m.wrong, right: m.right, why: m.why })),
    practice: doc.practice.map((p) => ({
      id: p.id,
      kind: p.kind,
      prompt: p.prompt,
      choices: p.choices,
      answer: p.answer,
      explanation: p.explanation,
    })),
    extension: { prompt: doc.extension.prompt, minWords: doc.extension.minWords },
    noticing: doc.noticing.map((n) => ({ text: n.text, context: n.context, note: n.note })),
    estimatedMinutes: doc.estimatedMinutes,
    publishedAt: doc.publishedAt,
  }
}

function toSummary(doc: LessonDocument): LessonSummary {
  return {
    id: doc.slug,
    day: doc.day,
    week: doc.week,
    phase: doc.phase,
    discipline: doc.discipline,
    level: doc.level,
    title: doc.title,
    subtitle: doc.subtitle,
    estimatedMinutes: doc.estimatedMinutes,
    publishedAt: doc.publishedAt,
  }
}

interface LessonFilter {
  discipline?: Discipline
  level?: BandLevel
  week?: number
  phase?: Phase
}

/**
 * Grammar-only lesson catalogue. Feeds the `/study` page and the
 * `/app/grammar` arc. Daily-session content is owned by the separate
 * `daily/` module and never touches this service.
 *
 * `Discipline` still includes vocabulary / collocations / linking because
 * noticing items and other surfaces use the wider enum; the service just
 * returns an empty list when those disciplines are queried here.
 */
@Injectable()
export class LessonsService implements OnModuleInit {
  constructor(@InjectModel(GRAMMAR_LESSON) private readonly grammarModel: Model<LessonDocument>) {}

  async onModuleInit(): Promise<void> {
    await this.seedIfEmpty()
  }

  async seedIfEmpty(): Promise<{ seeded: number }> {
    const count = await this.grammarModel.estimatedDocumentCount()
    if (count > 0) return { seeded: 0 }
    return this.reseed()
  }

  async reseed(): Promise<{ seeded: number }> {
    await this.grammarModel.deleteMany({})
    const docs = LESSON_SEED.filter((l) => l.discipline === 'grammar').map((l) => ({
      ...l,
      slug: l.id,
    }))
    if (docs.length === 0) return { seeded: 0 }
    await this.grammarModel.insertMany(docs)
    return { seeded: docs.length }
  }

  async findAll(filter: LessonFilter = {}): Promise<LessonSummary[]> {
    if (filter.discipline && filter.discipline !== 'grammar') return []
    const q: Record<string, unknown> = {}
    if (filter.level) q.level = filter.level
    if (filter.week) q.week = filter.week
    if (filter.phase) q.phase = filter.phase
    const docs = await this.grammarModel.find(q).sort({ day: 1 }).exec()
    return docs.map(toSummary)
  }

  async findBySlug(slug: string): Promise<Lesson | null> {
    const doc = await this.grammarModel.findOne({ slug }).exec()
    return doc ? toLesson(doc) : null
  }

  async findByDay(day: number): Promise<Lesson | null> {
    const doc = await this.grammarModel.findOne({ day }).exec()
    return doc ? toLesson(doc) : null
  }

  async findByDiscipline(discipline: Discipline): Promise<LessonSummary[]> {
    if (discipline !== 'grammar') return []
    const docs = await this.grammarModel.find({}).sort({ day: 1 }).exec()
    return docs.map(toSummary)
  }

  async findTodayForUser(daysIntoProgramme: number): Promise<Lesson | null> {
    const total = await this.grammarModel.estimatedDocumentCount()
    if (total === 0) return null
    const day = ((daysIntoProgramme - 1) % total) + 1
    return this.findByDay(day)
  }
}
