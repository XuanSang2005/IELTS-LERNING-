import type { Test } from '../../schemas/test'

export const writing002: Test = {
  id: 'writing-002',
  skill: 'writing',
  title: 'Writing Test 02',
  description:
    'A full Academic paper built around a process diagram and an opinion essay on cities and the environment. Sixty minutes, one clock.',
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
      title: 'Process diagram — how bottled water is produced',
      prompt:
        'The diagram below shows the stages in the production of bottled mineral water in a modern bottling plant. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      wordMin: 150,
      minutes: 20,
    },
    {
      task: 2,
      title: 'Essay — urban density and the environment',
      prompt:
        'Some people argue that denser cities are better for the environment than sprawling suburbs. Others believe that density brings pollution, stress, and a poorer quality of life. To what extent do you agree or disagree? Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
      wordMin: 250,
      minutes: 40,
    },
  ],
  mockFeedback: {
    summary:
      'A confident response across both tasks. Task 1 covers every stage of the process; Task 2 argues a clear position with developed reasons. A tighter conclusion and more controlled subordinate clauses would push the band up.',
    criteriaOffsets: [0.5, 0, 0, 0],
    criteriaFeedback: [
      'You cover all stages of the process and take a clear side in the essay. Examples support the position well — the conclusion restates rather than synthesises; consider ending on an implication.',
      'Paragraphs carry a single idea each. Linking between paragraphs is confident. A few sentences would benefit from a reference pronoun ("this trend", "such arguments") in place of repeated noun phrases.',
      'Good range: "carbon-intensive lifestyles", "urban footprint", "filtration stages". Some collocations slip ("make a pollution" → "cause pollution"). Aim for higher-frequency academic pairings.',
      'Complex structures are frequent and mostly accurate. Relative clauses sometimes lack a relative pronoun where needed; watch the use of "which" vs "that" in defining relative clauses.',
    ],
  },
}
