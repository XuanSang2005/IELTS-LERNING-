import type { Test } from '../../schemas/test'

export const writing010: Test = {
  id: 'writing-010',
  skill: 'writing',
  title: 'Writing Test 10',
  description:
    'An advanced Academic paper — a multi-line graph on energy consumption and an opinion essay on individual versus collective climate responsibility.',
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
      title: 'Multi-line graph — household energy consumption by source',
      prompt:
        'The graph below shows the average annual energy consumption per household in a European country between 2000 and 2022, broken down by source (Gas, Electricity, Heating oil, and Renewables). Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      wordMin: 150,
      minutes: 20,
    },
    {
      task: 2,
      title: 'Essay — climate responsibility: individuals or institutions?',
      prompt:
        'Some people argue that individuals should change their lifestyles to address climate change; others believe that only governments and corporations can make a meaningful difference. To what extent do you agree or disagree? Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
      wordMin: 250,
      minutes: 40,
    },
  ],
  mockFeedback: {
    summary:
      'A confident response. Task 1 reads the multi-line graph with appropriate trend vocabulary. Task 2 takes a balanced position, recognising agency at multiple levels — individual, corporate, and state. Counter-arguments are engaged rather than dismissed.',
    criteriaOffsets: [0.5, 0, 0.5, 0],
    criteriaFeedback: [
      'Both tasks address the prompt fully. Task 1 identifies the steady decline in heating oil and the rise of renewables. Task 2 is mature: agency is treated as a system rather than a binary.',
      'Cohesion is strong: "the upshot", "by way of contrast", "this in turn". Each paragraph has a clear topic sentence and a clear close.',
      'Wide topical lexis: "decarbonisation", "behavioural change", "structural levers", "market-shaping policy". Register is consistent and academic.',
      'Conditionals (second and third) are well-controlled. Punctuation around non-defining clauses is accurate. One or two articles missed before institutions.',
    ],
  },
}
