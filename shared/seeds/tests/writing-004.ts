import type { Test } from '../../schemas/test'

export const writing004: Test = {
  id: 'writing-004',
  skill: 'writing',
  title: 'Writing Test 04',
  description:
    'A full Academic paper — a pie chart on workforce composition and an essay on remote work. Sixty minutes, shared clock.',
  difficulty: 'advanced',
  fullDurationMinutes: 60,
  shortDurationMinutes: 40,
  totalQuestions: 2,
  isPro: true,
  publishedAt: '2026-04-19',
  tags: ['IELTS Academic', 'Writing'],
  tasks: [
    {
      task: 1,
      title: 'Pie charts — employment sectors, 1990 vs 2020',
      prompt:
        'The two pie charts below show the percentage of the workforce employed in five sectors (Agriculture, Manufacturing, Services, Public administration, and Other) in a European country in 1990 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      wordMin: 150,
      minutes: 20,
    },
    {
      task: 2,
      title: 'Essay — the rise of remote work',
      prompt:
        'Since the 2020s, a growing share of office workers perform their jobs from home rather than from a shared workplace. Some argue this has improved quality of life; others argue it has weakened teams, careers, and cities. To what extent do you agree or disagree? Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
      wordMin: 250,
      minutes: 40,
    },
  ],
  mockFeedback: {
    summary:
      'A confident response. Task 1 reads the pie charts accurately; Task 2 takes a clear position with developed reasoning. Counter-arguments appear but are dismissed too quickly. A more balanced treatment of opposing views would lift Task Response.',
    criteriaOffsets: [-0.5, 0, 0.5, 0],
    criteriaFeedback: [
      'Position is clear and supported. Opposing views deserve more space — a full paragraph that genuinely engages with the counter-case before refuting it would strengthen Task Response.',
      'Linking is mature: "this shift", "the former", "as a result". Paragraph openers are varied. A single under-developed paragraph near the middle loses momentum.',
      'Very good range: "flexible arrangements", "commuting overheads", "talent pool", "civic fabric". Register is consistent and academic. One or two phrasal verbs ("cope up with") could be replaced with single academic verbs.',
      'Complex structures are accurate and frequent. Punctuation around non-defining relative clauses is occasionally missing. Past perfect use is controlled.',
    ],
  },
}
