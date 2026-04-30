import type { Test } from '../../schemas/test'

export const writing009: Test = {
  id: 'writing-009',
  skill: 'writing',
  title: 'Writing Test 09',
  description:
    'An advanced Academic paper — two maps showing town development over thirty years and an opinion essay on museum admission charges.',
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
      title: 'Maps — Hartfield town centre, 1990 and 2020',
      prompt:
        'The two maps below show the centre of the town of Hartfield in 1990 and in 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      wordMin: 150,
      minutes: 20,
    },
    {
      task: 2,
      title: 'Essay — should museums charge for admission?',
      prompt:
        'Some people believe that public museums and art galleries should be free to enter, while others argue that visitors should pay an admission fee. To what extent do you agree or disagree? Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
      wordMin: 250,
      minutes: 40,
    },
  ],
  mockFeedback: {
    summary:
      'A confident response with a clear stance. Task 1 reads both maps and tracks the principal changes (pedestrianisation, residential expansion, removal of the car park). Task 2 takes a measured position; opposing arguments are engaged, not dismissed.',
    criteriaOffsets: [0, 0.5, 0, 0],
    criteriaFeedback: [
      'Both tasks address the prompt thoroughly. Task 2 stance is resolved early and supported with two well-developed reasons plus a concession.',
      'Cohesion is strong: "in the eastern quadrant", "by contrast", "to that end". Map directions are handled with precision.',
      'Lexical range: "civic amenity", "pedestrianised zone", "footfall", "subsidised access". Register is consistent and academic.',
      'Past simple and present perfect for map comparison are accurate. Conditionals in Task 2 are handled well. Occasional preposition slip ("on the city" → "in the city").',
    ],
  },
}
