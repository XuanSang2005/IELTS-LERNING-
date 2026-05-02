/**
 * Canonical 12-week theme list, shared across all 4 levels (per
 * LEXICON-LEVEL-SPEC.md §3 — "same 12 themes vertical"). Generation tooling
 * reads from here so theme strings stay consistent across content waves.
 */

export interface WeekTheme {
  week: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  phase: 1 | 2 | 3 | 4
  themeName: string
  /** Short narrative for the founder/editor and prompt context. */
  topicNarrative: string
}

export const WEEK_THEMES: readonly WeekTheme[] = [
  // Phase I — Introduction
  {
    week: 1,
    phase: 1,
    themeName: 'Daily life',
    topicNarrative:
      'Routines, household, food, weather, time of day, daily commute. Concrete and visible.',
  },
  {
    week: 2,
    phase: 1,
    themeName: 'People & relationships',
    topicNarrative:
      'Family, friendship, neighbours, colleagues. Personal qualities, social bonds, life events.',
  },
  {
    week: 3,
    phase: 1,
    themeName: 'Education',
    topicNarrative:
      'Schools, universities, learning, teachers, students, exams, study habits, knowledge acquisition.',
  },
  // Phase II — Build
  {
    week: 4,
    phase: 2,
    themeName: 'Work & career',
    topicNarrative:
      'Jobs, professions, workplace, employment, careers, productivity, work-life balance.',
  },
  {
    week: 5,
    phase: 2,
    themeName: 'Environment',
    topicNarrative:
      'Nature, climate change, pollution, conservation, sustainability, ecosystems.',
  },
  {
    week: 6,
    phase: 2,
    themeName: 'Society & community',
    topicNarrative:
      'Community life, social issues, civic responsibility, volunteering, public services.',
  },
  // Phase III — Push
  {
    week: 7,
    phase: 3,
    themeName: 'Technology',
    topicNarrative:
      'Computers, internet, smartphones, AI, digital communication, tech adoption, automation.',
  },
  {
    week: 8,
    phase: 3,
    themeName: 'Health & wellbeing',
    topicNarrative:
      'Physical health, mental wellbeing, exercise, diet, healthcare systems, lifestyle diseases.',
  },
  {
    week: 9,
    phase: 3,
    themeName: 'Culture & arts',
    topicNarrative:
      'Music, film, literature, traditions, festivals, cultural heritage, creative expression.',
  },
  // Phase IV — Consolidate
  {
    week: 10,
    phase: 4,
    themeName: 'Travel & places',
    topicNarrative:
      'Tourism, geography, cities, transportation, travel experiences, cross-cultural exposure.',
  },
  {
    week: 11,
    phase: 4,
    themeName: 'Money & economy',
    topicNarrative:
      'Personal finance, business, economy, consumerism, spending habits, financial decisions.',
  },
  {
    week: 12,
    phase: 4,
    themeName: 'Media & communication',
    topicNarrative:
      'News, journalism, social media, advertising, public discourse, information consumption.',
  },
] as const

export function themeForWeek(week: number): WeekTheme {
  const found = WEEK_THEMES.find((t) => t.week === week)
  if (!found) throw new Error(`No theme defined for week ${week}`)
  return found
}
