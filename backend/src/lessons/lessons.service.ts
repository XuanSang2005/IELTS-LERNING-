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

// Only `grammar` is a supported lesson discipline today — vocabulary,
// collocations, and linking were removed because no UI surface consumes them.
// `Discipline` still includes all four values because noticing items and the
// session planner depend on them; the service returns an empty list when a
// caller asks for an unsupported discipline.
@Injectable()
export class LessonsService implements OnModuleInit {
  private readonly byDiscipline: Partial<Record<Discipline, Model<LessonDocument>>>

  constructor(@InjectModel(GRAMMAR_LESSON) private readonly grammarModel: Model<LessonDocument>) {
    this.byDiscipline = {
      grammar: this.grammarModel,
    }
  }

  private allModels(): Array<Model<LessonDocument>> {
    return [this.grammarModel]
  }

  async onModuleInit(): Promise<void> {
    await this.seedIfEmpty()
  }

  async seedIfEmpty(): Promise<{ seeded: number }> {
    const counts = await Promise.all(this.allModels().map((m) => m.estimatedDocumentCount()))
    const total = counts.reduce((s, n) => s + n, 0)
    if (total > 0) return { seeded: 0 }
    return this.reseed()
  }

  async reseed(): Promise<{ seeded: number }> {
    await Promise.all(this.allModels().map((m) => m.deleteMany({})))
    let seeded = 0
    for (const [discipline, model] of Object.entries(this.byDiscipline) as Array<
      [Discipline, Model<LessonDocument>]
    >) {
      const subset = LESSON_SEED.filter((l) => l.discipline === discipline).map((l) => ({
        ...l,
        slug: l.id,
      }))
      if (subset.length === 0) continue
      await model.insertMany(subset)
      seeded += subset.length
    }
    return { seeded }
  }

  async findAll(filter: LessonFilter = {}): Promise<LessonSummary[]> {
    const q: Record<string, unknown> = {}
    if (filter.level) q.level = filter.level
    if (filter.week) q.week = filter.week
    if (filter.phase) q.phase = filter.phase

    // If a specific discipline is asked for and we don't have lessons for it,
    // return empty. This is the normal path for vocabulary / collocations /
    // linking until their pages come online.
    let models: Array<Model<LessonDocument>>
    if (filter.discipline) {
      const model = this.byDiscipline[filter.discipline]
      if (!model) return []
      models = [model]
    } else {
      models = this.allModels()
    }

    const results = await Promise.all(models.map((m) => m.find(q).sort({ day: 1 }).exec()))
    const flat = results.flat().map(toSummary)
    flat.sort((a, b) => a.day - b.day)
    return flat
  }

  async findBySlug(slug: string): Promise<Lesson | null> {
    for (const m of this.allModels()) {
      const doc = await m.findOne({ slug }).exec()
      if (doc) return toLesson(doc)
    }
    return null
  }

  async findByDay(day: number): Promise<Lesson | null> {
    for (const m of this.allModels()) {
      const doc = await m.findOne({ day }).exec()
      if (doc) return toLesson(doc)
    }
    return null
  }

  async findByDiscipline(discipline: Discipline): Promise<LessonSummary[]> {
    const model = this.byDiscipline[discipline]
    if (!model) return []
    const docs = await model.find({}).sort({ day: 1 }).exec()
    return docs.map(toSummary)
  }

  async findTodayForUser(daysIntoProgramme: number): Promise<Lesson | null> {
    const counts = await Promise.all(this.allModels().map((m) => m.estimatedDocumentCount()))
    const total = counts.reduce((s, n) => s + n, 0)
    if (total === 0) return null
    const day = ((daysIntoProgramme - 1) % total) + 1
    return this.findByDay(day)
  }
}
