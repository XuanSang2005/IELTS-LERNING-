import type { LexiconPlan } from '@shared/schemas/lexicon-plan'
import { LEXICON_DAILY_TARGETS, lexiconPhaseForWeek, lexiconWeekTotal } from '@shared/schemas/lexicon-plan'

/**
 * Intermediate (B5.5–6.5) plan stubs for the three lexicon disciplines.
 * Themes mirror the IELTS Academic high-frequency topic clusters and follow
 * the 3+3+3+3 phase structure defined in shared/schemas/lexicon-plan.ts.
 */

interface WeekStubInput {
  week: number
  themeName: string
  tagline: string
  goalOneLiner: string
}

function expand(discipline: 'vocabulary' | 'collocations' | 'linking', stubs: WeekStubInput[]) {
  return stubs.map((s) => ({
    discipline,
    level: 'intermediate' as const,
    phase: lexiconPhaseForWeek(s.week as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12),
    week: s.week as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
    themeName: s.themeName,
    tagline: s.tagline,
    goalOneLiner: s.goalOneLiner,
    itemsPerDay: LEXICON_DAILY_TARGETS[discipline],
    totalItems: lexiconWeekTotal(discipline),
  }))
}

const VOCAB_STUBS: WeekStubInput[] = [
  // Phase I — Introduction (anchor frequency band)
  { week: 1, themeName: 'Daily life and routine', tagline: 'The first hundred words you owe yourself.', goalOneLiner: 'Anchor verbs of habit and high-frequency adjectives.' },
  { week: 2, themeName: 'People and relationships', tagline: 'Friends, family, colleagues — the words that introduce them.', goalOneLiner: 'Build the lexis of personality and relation.' },
  { week: 3, themeName: 'Work and study', tagline: 'The vocabulary of the working day, in plain academic register.', goalOneLiner: 'Cover roles, tasks, deadlines, and outcomes.' },
  // Phase II — Build (topical clusters)
  { week: 4, themeName: 'Education', tagline: 'The classroom, the curriculum, the examination.', goalOneLiner: 'Words for learning, teaching, assessment, and progression.' },
  { week: 5, themeName: 'Environment', tagline: 'Climate, conservation, the slow language of consequence.', goalOneLiner: 'Build lexis for ecology, pollution, and remediation.' },
  { week: 6, themeName: 'Technology', tagline: 'From screens to systems — the words that describe a wired life.', goalOneLiner: 'Cover devices, networks, automation, and disruption.' },
  // Phase III — Push (academic register C1)
  { week: 7, themeName: 'Society and change', tagline: 'Demographic shifts, social mobility, public discourse.', goalOneLiner: 'Verbs of trend, magnitude, and qualification.' },
  { week: 8, themeName: 'Health and wellbeing', tagline: 'The body, the mind, the public-health vocabulary of an essay.', goalOneLiner: 'Cover symptoms, prevention, treatment, and policy.' },
  { week: 9, themeName: 'Economy and work', tagline: 'Markets, labour, automation — the language of the leading article.', goalOneLiner: 'Master the lexis of growth, decline, and intervention.' },
  // Phase IV — Consolidate (integrative)
  { week: 10, themeName: 'Arts and culture', tagline: 'Aesthetic vocabulary that lifts an essay above the generic.', goalOneLiner: 'Reach for the precise verb of appreciation.' },
  { week: 11, themeName: 'Government and law', tagline: 'Policy, regulation, civic life — the formal register, well-behaved.', goalOneLiner: 'Use legislative and procedural vocabulary correctly.' },
  { week: 12, themeName: 'Globalisation', tagline: 'The closing topic — the long, slow words of the global order.', goalOneLiner: 'Integrate everything: register, precision, restraint.' },
]

const COLLOC_STUBS: WeekStubInput[] = [
  { week: 1, themeName: 'High-frequency verb-noun pairings', tagline: 'The chunks that the examiner expects to hear.', goalOneLiner: 'Master make/do/take/have collocations.' },
  { week: 2, themeName: 'People and behaviour', tagline: 'Habits, traits, and the natural pairings around them.', goalOneLiner: 'Build adjective-noun chunks for character.' },
  { week: 3, themeName: 'Workplace chunks', tagline: 'Meeting agendas, deadlines, deliverables — the natural language of work.', goalOneLiner: 'Internalise office-life pairings.' },
  { week: 4, themeName: 'Education chunks', tagline: 'Take a course, sit an exam, attend a lecture — the unmissable triad.', goalOneLiner: 'Replace any single-word verb with the right pairing.' },
  { week: 5, themeName: 'Environmental chunks', tagline: 'Carbon footprint, renewable energy, biodiversity loss.', goalOneLiner: 'Lock the C1 environmental pairings into recall.' },
  { week: 6, themeName: 'Technology chunks', tagline: 'Cutting-edge, state-of-the-art, user-friendly — the chunks of the press release.', goalOneLiner: 'Build adjective-noun and adverb-adjective tech pairings.' },
  { week: 7, themeName: 'Trend and change pairings', tagline: 'Steady increase, gradual decline, marked rise — the chart-reader\'s vocabulary.', goalOneLiner: 'Master trend collocations for Task 1 and Speaking Part 3.' },
  { week: 8, themeName: 'Health chunks', tagline: 'Lead a sedentary lifestyle, suffer from obesity, raise awareness.', goalOneLiner: 'Build the health-essay pairings to Band 7.' },
  { week: 9, themeName: 'Economic chunks', tagline: 'Economic downturn, fiscal stimulus, vested interests.', goalOneLiner: 'Lock the financial-press collocations.' },
  { week: 10, themeName: 'Cultural chunks', tagline: 'Cultural heritage, artistic expression, creative freedom.', goalOneLiner: 'Reach for the elegant pairings of the editorial page.' },
  { week: 11, themeName: 'Civic chunks', tagline: 'Pass legislation, raise concerns, take legal action.', goalOneLiner: 'Master verbs of policy and procedure.' },
  { week: 12, themeName: 'Global chunks', tagline: 'Cross-border trade, cultural exchange, mutual understanding.', goalOneLiner: 'Integrate cluster across all four skills.' },
]

const LINKING_STUBS: WeekStubInput[] = [
  { week: 1, themeName: 'Addition connectors', tagline: 'Beyond and, but, so — the C1 inventory of stacking ideas.', goalOneLiner: 'Use moreover, furthermore, in addition with restraint.' },
  { week: 2, themeName: 'Contrast connectors', tagline: 'However, in contrast, by contrast — the foundation of the discuss-both-views essay.', goalOneLiner: 'Vary contrast linkers across paragraphs.' },
  { week: 3, themeName: 'Cause connectors', tagline: 'Because, owing to, due to — the Band 6.5 staples.', goalOneLiner: 'Distinguish single-word and multi-word causal links.' },
  { week: 4, themeName: 'Effect connectors', tagline: 'Therefore, consequently, as a result — the natural close to a causal chain.', goalOneLiner: 'Move beyond so when an effect needs weight.' },
  { week: 5, themeName: 'Concession connectors', tagline: 'Although, despite, while — the structures of the balanced essay.', goalOneLiner: 'Master concession to introduce counter-views without weakening your stance.' },
  { week: 6, themeName: 'Exemplification', tagline: 'For instance, namely, in particular — the precise examples.', goalOneLiner: 'Replace overused for example with sharper alternatives.' },
  { week: 7, themeName: 'Sequence connectors', tagline: 'Firstly, subsequently, finally — the spine of the procedural answer.', goalOneLiner: 'Use sequence linkers for Task 1 process and Speaking Part 2.' },
  { week: 8, themeName: 'Summary connectors', tagline: 'In conclusion, overall, to sum up — the closing line, well-judged.', goalOneLiner: 'Vary the summary line so it does not sound rehearsed.' },
  { week: 9, themeName: 'Hedging and qualification', tagline: 'Arguably, to some extent, on the whole — the academic\'s humility markers.', goalOneLiner: 'Soften categorical claims at the right moments.' },
  { week: 10, themeName: 'Emphasis markers', tagline: 'Indeed, in particular, above all — the words that signal weight.', goalOneLiner: 'Use emphasis sparingly and where it earns its place.' },
  { week: 11, themeName: 'Reference and substitution', tagline: 'The former, the latter, this in turn — cohesion at clause level.', goalOneLiner: 'Replace lexical repetition with elegant reference.' },
  { week: 12, themeName: 'Integrative review', tagline: 'All eight functions, drilled together under exam conditions.', goalOneLiner: 'Move between linker categories without hesitation.' },
]

export const INTERMEDIATE_PLANS: LexiconPlan[] = [
  {
    discipline: 'vocabulary',
    level: 'intermediate',
    weeks: expand('vocabulary', VOCAB_STUBS) as LexiconPlan['weeks'],
  },
  {
    discipline: 'collocations',
    level: 'intermediate',
    weeks: expand('collocations', COLLOC_STUBS) as LexiconPlan['weeks'],
  },
  {
    discipline: 'linking',
    level: 'intermediate',
    weeks: expand('linking', LINKING_STUBS) as LexiconPlan['weeks'],
  },
]
