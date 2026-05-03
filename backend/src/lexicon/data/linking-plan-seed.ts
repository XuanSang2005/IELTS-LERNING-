import type { BandLevel } from '@shared/schemas/practice'

/**
 * Function-based curriculum for the Linking discipline. All four levels share
 * the same week → function mapping; only the `goalOneLiner` shifts register
 * (Foundation = simpler register; Mastery = examiner-grade nuance).
 *
 * Phase I — Logical relations (wk 1-3): Addition, Contrast, Cause
 * Phase II — Effects & nuance (wk 4-6): Effect, Concession, Exemplification
 * Phase III — Discourse organisation (wk 7-9): Sequence, Summary, Mixed cohesion
 * Phase IV — Register & polish (wk 10-12): Register elevation, Speaking markers, Examiner drill
 */

interface LinkingWeekStub {
  phase: 1 | 2 | 3 | 4
  week: number
  themeName: string
  tagline: string
  goalOneLiner: string
  itemsPerDay: number
  totalItems: number
}

interface LinkingPlanSeed {
  discipline: 'linking'
  level: BandLevel
  weeks: LinkingWeekStub[]
}

const ITEMS_PER_DAY = 2
const TOTAL_ITEMS_PER_WEEK = 14

interface WeekTemplate {
  phase: 1 | 2 | 3 | 4
  themeName: string
  tagline: string
  goalsByLevel: Record<BandLevel, string>
}

const WEEK_TEMPLATES: WeekTemplate[] = [
  {
    phase: 1,
    themeName: 'Addition',
    tagline: 'Stacking ideas in the same direction.',
    goalsByLevel: {
      foundation: 'Anchor the everyday connectors that add weight without contradiction.',
      intermediate: 'Move beyond "and" — moreover, furthermore, in addition.',
      advanced: 'Layer addition with precision: not only … but also, what is more.',
      mastery: 'Deploy addition for cumulative force without sounding mechanical.',
    },
  },
  {
    phase: 1,
    themeName: 'Contrast',
    tagline: 'Setting one idea against another.',
    goalsByLevel: {
      foundation: 'Mark the simple turn — but, however, on the other hand.',
      intermediate: 'Sharpen contrast with whereas, conversely, in contrast.',
      advanced: 'Calibrate the strength of opposition; choose register deliberately.',
      mastery: 'Use contrast to pivot an argument without losing cohesion.',
    },
  },
  {
    phase: 1,
    themeName: 'Cause',
    tagline: 'Naming what produced what.',
    goalsByLevel: {
      foundation: 'Connect cause and clause — because, since, as.',
      intermediate: 'Step up: owing to, due to, on account of.',
      advanced: 'Distinguish causal nuance — given that, in light of.',
      mastery: 'Argue causation without overstating; mark probability and direction.',
    },
  },
  {
    phase: 2,
    themeName: 'Effect',
    tagline: 'Tracing the consequence.',
    goalsByLevel: {
      foundation: 'So, that is why — the workhorses of effect.',
      intermediate: 'Therefore, consequently, as a result — pick the right weight.',
      advanced: 'Hence, thus, accordingly — formal-register effect.',
      mastery: 'Chain cause → effect → effect without buckling the sentence.',
    },
  },
  {
    phase: 2,
    themeName: 'Concession',
    tagline: 'Granting the other side a point.',
    goalsByLevel: {
      foundation: 'Although, even though, while — the basics of concession.',
      intermediate: 'Despite, in spite of — concession with a noun phrase.',
      advanced: 'Whereas, granted that, notwithstanding.',
      mastery: 'Concede strategically before driving the main argument.',
    },
  },
  {
    phase: 2,
    themeName: 'Exemplification',
    tagline: 'Showing, not just claiming.',
    goalsByLevel: {
      foundation: 'For example, for instance, such as.',
      intermediate: 'In particular, namely, to illustrate.',
      advanced: 'A case in point, by way of illustration.',
      mastery: 'Choose examples that carry the weight of the claim.',
    },
  },
  {
    phase: 3,
    themeName: 'Sequence',
    tagline: 'Marking the order of moves.',
    goalsByLevel: {
      foundation: 'Firstly, then, finally — the basic chain.',
      intermediate: 'Subsequently, meanwhile, thereafter.',
      advanced: 'In the first instance, ultimately, at length.',
      mastery: 'Sequence with rhythm; avoid mechanical "first/second/third".',
    },
  },
  {
    phase: 3,
    themeName: 'Summary',
    tagline: 'Closing the loop.',
    goalsByLevel: {
      foundation: 'In conclusion, overall, to sum up.',
      intermediate: 'On balance, in short, to put it simply.',
      advanced: 'In essence, the upshot, on the whole.',
      mastery: 'Summarise without restating; leave the reader with the conclusion.',
    },
  },
  {
    phase: 3,
    themeName: 'Mixed cohesion',
    tagline: 'Two functions, one paragraph.',
    goalsByLevel: {
      foundation: 'Combine addition and contrast inside a single short paragraph.',
      intermediate: 'Stack cause + effect with a concession to soften the claim.',
      advanced: 'Move through three functions in five sentences without strain.',
      mastery: 'Cohere across functions without leaning on the same connector twice.',
    },
  },
  {
    phase: 4,
    themeName: 'Academic register',
    tagline: 'Writing in the examiner\'s voice.',
    goalsByLevel: {
      foundation: 'Step from "but" to "however" — academic over conversational.',
      intermediate: 'Drop B1 connectors when register matters.',
      advanced: 'Sustain a C1 register across an entire Task 2 essay.',
      mastery: 'Distinguish C1 academic from C2 — choose only what carries.',
    },
  },
  {
    phase: 4,
    themeName: 'Speaking markers',
    tagline: 'Fluency over formality.',
    goalsByLevel: {
      foundation: 'Well, anyway, you know — bridging hesitations.',
      intermediate: 'Basically, I mean, kind of — natural speech.',
      advanced: 'Mind you, having said that — examiner-friendly informal.',
      mastery: 'Lift speaking band 7 → 8 with markers that buy thinking time.',
    },
  },
  {
    phase: 4,
    themeName: 'Examiner\'s drill',
    tagline: 'Mixed review with error correction.',
    goalsByLevel: {
      foundation: 'Spot misuse; replace the wrong connector with the right one.',
      intermediate: 'Detect overuse and register clashes.',
      advanced: 'Edit a B7 paragraph to a B8 cohesion profile.',
      mastery: 'Polish at B8.5 — every connector earns its place.',
    },
  },
]

const LEVELS: BandLevel[] = ['foundation', 'intermediate', 'advanced', 'mastery']

export const LINKING_PLAN_SEED: LinkingPlanSeed[] = LEVELS.map((level) => ({
  discipline: 'linking' as const,
  level,
  weeks: WEEK_TEMPLATES.map((tpl, idx) => ({
    phase: tpl.phase,
    week: idx + 1,
    themeName: tpl.themeName,
    tagline: tpl.tagline,
    goalOneLiner: tpl.goalsByLevel[level],
    itemsPerDay: ITEMS_PER_DAY,
    totalItems: TOTAL_ITEMS_PER_WEEK,
  })),
}))

/** Function order matches week order (wk 1=addition, wk 2=contrast, …, wk 8=summary). */
export const FUNCTION_TO_WEEK = {
  addition: 1,
  contrast: 2,
  cause: 3,
  effect: 4,
  concession: 5,
  exemplification: 6,
  sequence: 7,
  summary: 8,
} as const
