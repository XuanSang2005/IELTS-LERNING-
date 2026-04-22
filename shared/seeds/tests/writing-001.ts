import type { Test } from '../../schemas/test'

export const writing001: Test = {
  id: 'writing-001',
  skill: 'writing',
  title: 'Writing Test 01',
  description:
    'A full IELTS Academic Writing paper — one line graph to report and one argument essay on technology in everyday life. Sixty minutes, shared clock.',
  difficulty: 'intermediate',
  fullDurationMinutes: 60,
  shortDurationMinutes: 40,
  totalQuestions: 2,
  isPro: true,
  publishedAt: '2026-04-19',
  tags: ['IELTS Academic', 'Writing'],
  tasks: [
    {
      task: 1,
      title: 'Line graph — monthly readership, three national dailies',
      prompt:
        'The graph below shows the average monthly readership of three national daily newspapers in a European country between 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      wordMin: 150,
      minutes: 20,
    },
    {
      task: 2,
      title: 'Essay — the cost of always-on technology',
      prompt:
        'Some people believe that constant connection to technology has made daily life more efficient. Others argue that it has eroded concentration and relationships. Discuss both views and give your own opinion. Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
      wordMin: 250,
      minutes: 40,
    },
  ],
  mockFeedback: {
    summary:
      'A well-organised response. Task 1 covers the main trends; Task 2 presents both views but leans descriptive rather than analytical. Sharper position-taking and a wider lexical range would lift the overall band by half a step.',
    criteriaOffsets: [0, 0, 0.5, -0.5],
    criteriaFeedback: [
      "Both tasks address the question. Task 1 identifies the two overall trends and supports with key data. Task 2 discusses both views but the candidate's own position arrives late and is under-developed.",
      'Paragraphing is clear and you signal each part of the argument. Cohesion within paragraphs is mechanical — repeated use of "Moreover" and "On the other hand" where a pronoun or reference link would flow better.',
      'Topic vocabulary is accurate and varied, with some collocations ("screen fatigue", "round-the-clock access"). Register is consistent. To push higher, aim for one or two less common items per paragraph.',
      'Sentence structures are generally accurate with a good range of complex forms. Watch subject-verb agreement with collective nouns, and past-perfect use when referring to the early 2000s.',
    ],
  },
}
