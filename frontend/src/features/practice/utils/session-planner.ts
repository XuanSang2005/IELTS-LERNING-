import type {
  BandLevel,
  DailyLog,
  Discipline,
  NoticingItem,
  UserProfile,
} from '@shared/schemas/practice'
import { pickLessonForDate } from '@/features/study/data/lesson-index'

export type SessionStepKind =
  | 'input'
  | 'notice'
  | 'recall'
  | 'apply'
  | 'feedback'
  | 'review'
  | 'plan'

export type SessionAction =
  | { type: 'read-lesson'; lessonId: string }
  | { type: 'watch-lesson'; lessonId: string }
  | { type: 'drill-exercises'; lessonId: string; questionCount: number }
  | { type: 'notice-capture'; targetCount: number }
  | { type: 'flashcard-review'; itemIds: string[] }
  | { type: 'writing-task'; prompt: string; minWords: number }
  | { type: 'ai-feedback'; submissionId: string }
  | { type: 'save-items'; suggestedItems: string[] }

export interface SessionStep {
  id: string
  kind: SessionStepKind
  title: string
  minutes: number
  description: string
  action: SessionAction
}

export interface SessionBlueprint {
  date: string
  totalMinutes: number
  steps: SessionStep[]
  focus: {
    discipline: Discipline
    level: BandLevel
  }
  title: string
  tagline: string
}

const DISCIPLINE_ROTATION: Discipline[] = ['grammar', 'vocabulary', 'collocations', 'linking']

function daysSinceEpoch(isoDate: string): number {
  return Math.floor(new Date(isoDate).getTime() / 86_400_000)
}

function pickFocusDiscipline(logs: DailyLog[], isoDate: string): Discipline {
  // Default deterministic rotation by day so the UI is stable across refreshes.
  // `logs` is reserved for future "avoid consecutive repeats" behaviour once
  // DailyLog tracks a focus field.
  void logs
  return DISCIPLINE_ROTATION[daysSinceEpoch(isoDate) % DISCIPLINE_ROTATION.length]
}

const WRITING_PROMPTS: Record<BandLevel, string[]> = {
  foundation: [
    'Some people say technology makes life easier. Do you agree or disagree? Give one reason.',
    'Is it better to live in a city or the countryside? Explain your choice in a short paragraph.',
  ],
  intermediate: [
    'Some argue that public transport should be free. Discuss the advantages and disadvantages.',
    'Should schools teach practical skills such as cooking and budgeting alongside academic subjects?',
  ],
  advanced: [
    'Some people believe that economic progress is the most important goal for any society. Others think social progress matters more. Discuss both views and give your opinion.',
    'In many countries, the proportion of older people is increasing. What problems does this pose for individuals and society, and how might they be addressed?',
  ],
  mastery: [
    'The rise of artificial intelligence in creative industries threatens the livelihoods of artists and writers. Evaluate this claim with reference to specific examples.',
    'To what extent should governments prioritise cultural preservation over economic integration in an era of globalisation?',
  ],
}

function pickWritingPrompt(level: BandLevel, isoDate: string): string {
  const bank = WRITING_PROMPTS[level]
  return bank[daysSinceEpoch(isoDate) % bank.length]
}

function targetMinutesForLevel(level: BandLevel): number {
  switch (level) {
    case 'foundation':
      return 20
    case 'intermediate':
      return 30
    case 'advanced':
      return 45
    case 'mastery':
      return 60
  }
}

function resolveLessonId(discipline: Discipline, level: BandLevel, isoDate: string): string {
  const lesson = pickLessonForDate(discipline, level, isoDate)
  return lesson ? lesson.id : `placeholder-${discipline}-${level}`
}

function dueItemIds(items: NoticingItem[], isoDate: string, limit: number): string[] {
  const today = new Date(isoDate).getTime()
  return items
    .filter((i) => !i.retired && new Date(i.nextReviewDate).getTime() <= today)
    .slice(0, limit)
    .map((i) => i.id)
}

function yesterdayItemIds(items: NoticingItem[], isoDate: string, limit: number): string[] {
  const todayMs = new Date(isoDate).getTime()
  const yesterdayMs = todayMs - 86_400_000
  return items
    .filter((i) => {
      const captured = new Date(i.capturedDate).getTime()
      return captured >= yesterdayMs && captured < todayMs
    })
    .slice(0, limit)
    .map((i) => i.id)
}

const SESSION_TITLES: Record<Discipline, Record<BandLevel, string>> = {
  grammar: {
    foundation: 'Grammar, foundations.',
    intermediate: 'Grammar, with accuracy.',
    advanced: 'Grammar, refined.',
    mastery: 'Grammar, mastered.',
  },
  vocabulary: {
    foundation: 'Vocabulary, essential.',
    intermediate: 'Vocabulary, expanded.',
    advanced: 'Vocabulary, precise.',
    mastery: 'Vocabulary, exquisite.',
  },
  collocations: {
    foundation: 'Collocations, first pairings.',
    intermediate: 'Collocations, natural.',
    advanced: 'Collocations, refined.',
    mastery: 'Collocations, native-like.',
  },
  linking: {
    foundation: 'Linking, the first bridges.',
    intermediate: 'Linking, with cohesion.',
    advanced: 'Linking, sophisticated.',
    mastery: 'Linking, effortless.',
  },
}

const SESSION_TAGLINES: Record<BandLevel, string> = {
  foundation: 'Twenty minutes. Three steps. Scaffolded for Band 5.',
  intermediate: 'Thirty minutes. Five steps. Building toward Band 6.5.',
  advanced: 'Forty-five minutes. The full six-step loop at Band 7 register.',
  mastery: 'Sixty minutes. Six steps. A C2-register session.',
}

function buildFoundationSteps(
  discipline: Discipline,
  isoDate: string,
  items: NoticingItem[],
): SessionStep[] {
  const lessonId = resolveLessonId(discipline, 'foundation', isoDate)
  return [
    {
      id: 'watch',
      kind: 'input',
      title: "Watch today's lesson",
      minutes: 5,
      description: 'A guided explanation with subtitles and three worked examples.',
      action: { type: 'watch-lesson', lessonId },
    },
    {
      id: 'drill',
      kind: 'apply',
      title: 'Ten practice questions',
      minutes: 12,
      description: 'Gap-fill and multiple choice. Immediate feedback after each.',
      action: { type: 'drill-exercises', lessonId, questionCount: 10 },
    },
    {
      id: 'save',
      kind: 'plan',
      title: 'Save three phrases',
      minutes: 3,
      description: 'Keep three chunks from today for tomorrow\u2019s review.',
      action: {
        type: 'save-items',
        suggestedItems: yesterdayItemIds(items, isoDate, 3),
      },
    },
  ]
}

function buildIntermediateSteps(
  discipline: Discipline,
  isoDate: string,
  items: NoticingItem[],
): SessionStep[] {
  const lessonId = resolveLessonId(discipline, 'intermediate', isoDate)
  const due = dueItemIds(items, isoDate, 5)
  return [
    {
      id: 'read',
      kind: 'input',
      title: "Read today's article",
      minutes: 7,
      description: `A B2-level article on ${discipline}.`,
      action: { type: 'read-lesson', lessonId },
    },
    {
      id: 'notice',
      kind: 'notice',
      title: 'Extract five items',
      minutes: 5,
      description: 'Pick five phrases or patterns worth remembering.',
      action: { type: 'notice-capture', targetCount: 5 },
    },
    {
      id: 'recall',
      kind: 'recall',
      title: "Review yesterday's items",
      minutes: 5,
      description:
        due.length > 0 ? `${due.length} item${due.length === 1 ? '' : 's'} due.` : 'No items due \u2014 a quick refresh.',
      action: { type: 'flashcard-review', itemIds: due },
    },
    {
      id: 'apply',
      kind: 'apply',
      title: 'Short writing task',
      minutes: 10,
      description: "Write around 100 words using today's patterns.",
      action: { type: 'writing-task', prompt: pickWritingPrompt('intermediate', isoDate), minWords: 100 },
    },
    {
      id: 'review',
      kind: 'feedback',
      title: "Check yesterday's feedback",
      minutes: 3,
      description: "AI annotations from yesterday's writing.",
      action: { type: 'ai-feedback', submissionId: 'latest' },
    },
  ]
}

function buildAdvancedSteps(
  discipline: Discipline,
  isoDate: string,
  items: NoticingItem[],
): SessionStep[] {
  const lessonId = resolveLessonId(discipline, 'advanced', isoDate)
  return [
    {
      id: 'input',
      kind: 'input',
      title: 'Input. The best C1 English you can find.',
      minutes: 10,
      description: 'Read or listen to curated C1 material.',
      action: { type: 'read-lesson', lessonId },
    },
    {
      id: 'notice',
      kind: 'notice',
      title: 'Notice. Five items. No more.',
      minutes: 5,
      description: 'Chunks, collocations, linking moves \u2014 the examiner\u2019s details.',
      action: { type: 'notice-capture', targetCount: 5 },
    },
    {
      id: 'recall',
      kind: 'recall',
      title: "Recall. Yesterday's five.",
      minutes: 5,
      description: 'Flashcards with self-rating.',
      action: { type: 'flashcard-review', itemIds: yesterdayItemIds(items, isoDate, 5) },
    },
    {
      id: 'apply',
      kind: 'apply',
      title: 'Apply. Task 2 essay.',
      minutes: 15,
      description: "250 words, using today's chunks.",
      action: { type: 'writing-task', prompt: pickWritingPrompt('advanced', isoDate), minWords: 250 },
    },
    {
      id: 'feedback',
      kind: 'feedback',
      title: 'Feedback. Examiner annotations.',
      minutes: 7,
      description: 'Band estimate with per-criterion notes.',
      action: { type: 'ai-feedback', submissionId: 'latest' },
    },
    {
      id: 'plan',
      kind: 'plan',
      title: "Plan. Tomorrow's target.",
      minutes: 3,
      description: 'Save three chunks to return to.',
      action: { type: 'save-items', suggestedItems: [] },
    },
  ]
}

function buildMasterySteps(
  discipline: Discipline,
  isoDate: string,
  items: NoticingItem[],
): SessionStep[] {
  const lessonId = resolveLessonId(discipline, 'mastery', isoDate)
  return [
    {
      id: 'input',
      kind: 'input',
      title: 'Input. Literary or academic C2 register.',
      minutes: 15,
      description: 'A passage where every sentence is earning its place.',
      action: { type: 'read-lesson', lessonId },
    },
    {
      id: 'notice',
      kind: 'notice',
      title: 'Notice. Seven nuances.',
      minutes: 7,
      description: 'Idiomatic, collocational, pragmatic.',
      action: { type: 'notice-capture', targetCount: 7 },
    },
    {
      id: 'recall',
      kind: 'recall',
      title: 'Recall. Seven from yesterday.',
      minutes: 8,
      description: 'Deep review with ease-rating for SRS scheduling.',
      action: { type: 'flashcard-review', itemIds: yesterdayItemIds(items, isoDate, 7) },
    },
    {
      id: 'apply',
      kind: 'apply',
      title: 'Apply. Argumentative essay.',
      minutes: 20,
      description: '300+ words, sophisticated register.',
      action: { type: 'writing-task', prompt: pickWritingPrompt('mastery', isoDate), minWords: 300 },
    },
    {
      id: 'feedback',
      kind: 'feedback',
      title: 'Feedback. Band 8.5 examiner lens.',
      minutes: 7,
      description: 'Detailed commentary on range and precision.',
      action: { type: 'ai-feedback', submissionId: 'latest' },
    },
    {
      id: 'plan',
      kind: 'plan',
      title: 'Plan. Three chunks for tomorrow.',
      minutes: 3,
      description: 'Choose carefully \u2014 the examiner notices what you repeat.',
      action: { type: 'save-items', suggestedItems: [] },
    },
  ]
}

function buildStepsForLevel(
  level: BandLevel,
  discipline: Discipline,
  isoDate: string,
  items: NoticingItem[],
): SessionStep[] {
  switch (level) {
    case 'foundation':
      return buildFoundationSteps(discipline, isoDate, items)
    case 'intermediate':
      return buildIntermediateSteps(discipline, isoDate, items)
    case 'advanced':
      return buildAdvancedSteps(discipline, isoDate, items)
    case 'mastery':
      return buildMasterySteps(discipline, isoDate, items)
  }
}

export function planSession(
  profile: UserProfile,
  items: NoticingItem[],
  logs: DailyLog[],
  isoDate: string = new Date().toISOString().slice(0, 10),
): SessionBlueprint {
  const level = profile.currentBand.level
  const discipline = pickFocusDiscipline(logs, isoDate)
  const steps = buildStepsForLevel(level, discipline, isoDate, items)
  const totalMinutes = steps.reduce((s, step) => s + step.minutes, 0)
  return {
    date: isoDate,
    totalMinutes,
    steps,
    focus: { discipline, level },
    title: SESSION_TITLES[discipline][level],
    tagline: SESSION_TAGLINES[level],
  }
}

/** Exposed for UI copy that needs the target for a given level without a full blueprint. */
export function targetMinutes(level: BandLevel): number {
  return targetMinutesForLevel(level)
}
