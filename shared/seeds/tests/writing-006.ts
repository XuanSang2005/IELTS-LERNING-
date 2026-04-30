import type { Test } from '../../schemas/test'

export const writing006: Test = {
  id: 'writing-006',
  skill: 'writing',
  title: 'Writing Test 06',
  description:
    'An intermediate Academic paper — a table on household recycling rates and a discuss-both-views essay on online versus classroom learning.',
  difficulty: 'intermediate',
  fullDurationMinutes: 60,
  shortDurationMinutes: 40,
  totalQuestions: 2,
  isPro: true,
  publishedAt: '2026-04-29',
  tags: ['IELTS Academic', 'Writing'],
  tasks: [
    {
      task: 1,
      title: 'Table — household recycling rates, four countries (2005–2020)',
      prompt:
        'The table below shows the percentage of household waste recycled in four European countries (Germany, France, Italy, and the United Kingdom) in 2005, 2012, and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      wordMin: 150,
      minutes: 20,
    },
    {
      task: 2,
      title: 'Essay — online learning vs the classroom',
      prompt:
        'In recent years, online learning has become a popular alternative to traditional classroom education. Some believe it offers a better learning experience; others argue that face-to-face teaching cannot be replaced. Discuss both views and give your own opinion. Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
      wordMin: 250,
      minutes: 40,
    },
  ],
  mockFeedback: {
    summary:
      'A balanced essay that presents both sides honestly before resolving. Task 1 reads the table accurately but the overview names the leader without naming the trend (a steady rise across the board). A sharper overview would lift Task Achievement.',
    criteriaOffsets: [-0.5, 0, 0.5, 0],
    criteriaFeedback: [
      'Task 1 overview misses the cross-country trend (recycling rose in every country). Task 2 covers both views thoroughly and your stance is reasoned, but arrives in the conclusion only.',
      'Cohesion is strong: "the former", "this trend", "in contrast". Each paragraph has a clear topic sentence.',
      'Lexical range is wide for the topic: "self-paced", "synchronous", "peer interaction", "infrastructure". Register is consistent.',
      'Complex structures are handled well. Articles before institutions occasionally slip ("the university" vs "university") — a recurring pattern worth drilling.',
    ],
  },
}
