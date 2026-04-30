import type { Test } from '../../schemas/test'

export const writing008: Test = {
  id: 'writing-008',
  skill: 'writing',
  title: 'Writing Test 08',
  description:
    'An advanced Academic paper — multiple charts on transport modes and a problem-solution essay on urban congestion.',
  difficulty: 'advanced',
  fullDurationMinutes: 60,
  shortDurationMinutes: 40,
  totalQuestions: 2,
  isPro: true,
  publishedAt: '2026-04-29',
  tags: ['IELTS Academic', 'Writing'],
  tasks: [
    {
      task: 1,
      title: 'Two charts — modes of transport for commuting, 2000 and 2020',
      prompt:
        'The two pie charts below show the modes of transport (Car, Bus, Train, Bicycle, and Walking) used by commuters in a major city in 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      wordMin: 150,
      minutes: 20,
    },
    {
      task: 2,
      title: 'Essay — urban traffic congestion',
      prompt:
        'Traffic congestion is becoming a serious problem in many large cities around the world. What are the main causes of this problem, and what measures could be taken to address it? Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
      wordMin: 250,
      minutes: 40,
    },
  ],
  mockFeedback: {
    summary:
      'An analytical response with a confident position. Task 1 contrasts the two snapshots crisply. Task 2 identifies multiple causes and matches each to a proportionate solution — a strong shape, occasionally weakened by abstract phrasing.',
    criteriaOffsets: [0, 0, 0, 0],
    criteriaFeedback: [
      'Both tasks address the prompt fully. Task 2 causes are well-chosen (private-car bias, weak public transport, sprawl) and solutions are matched logically.',
      'Cohesion is mature: "this in turn", "the underlying cause", "by way of remedy". Paragraphing is clean.',
      'Wide lexical range: "modal share", "park-and-ride", "congestion charging", "mass transit". Register is appropriate.',
      'Complex structures are accurate. Watch articles before transport modes ("by car" not "by the car"); also keep tense consistent when describing solutions (modal verbs throughout).',
    ],
  },
}
