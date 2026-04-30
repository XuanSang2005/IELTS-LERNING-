import type { Test } from '../../schemas/test'

export const writing007: Test = {
  id: 'writing-007',
  skill: 'writing',
  title: 'Writing Test 07',
  description:
    'An intermediate Academic paper — a process diagram for paper recycling and an advantages-vs-disadvantages essay on city living.',
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
      title: 'Process diagram — how paper is recycled',
      prompt:
        'The diagram below illustrates the stages involved in the recycling of household paper waste, from collection through to the production of new paper. Summarise the information by selecting and reporting the main features. Write at least 150 words.',
      wordMin: 150,
      minutes: 20,
    },
    {
      task: 2,
      title: 'Essay — living in a large city',
      prompt:
        'More and more people choose to live in large cities rather than in rural areas. What are the advantages and disadvantages of living in a large city? Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
      wordMin: 250,
      minutes: 40,
    },
  ],
  mockFeedback: {
    summary:
      'A clear, well-sequenced response. Task 1 walks through the stages competently. Task 2 covers advantages and disadvantages evenly, though the conclusion repeats rather than synthesises.',
    criteriaOffsets: [0, 0, 0, -0.5],
    criteriaFeedback: [
      'Task 1 follows the process in order with appropriate sequencers. Task 2 lists three advantages and three disadvantages — adequate, but a stronger essay weighs them rather than listing.',
      'Sequence markers in Task 1 are varied: "initially", "subsequently", "at the next stage". Task 2 uses "moreover" too often. Vary linking.',
      'Process vocabulary is accurate: "shredded", "pulped", "de-inked". Task 2 uses topical lexis well: "urban sprawl", "infrastructure strain", "anonymity".',
      'Passive voice in Task 1 is mostly accurate. Watch agent omission and the use of "by" only when the agent matters. A few comma splices in Task 2.',
    ],
  },
}
