import type { Test } from '../../schemas/test'

export const writing003: Test = {
  id: 'writing-003',
  skill: 'writing',
  title: 'Writing Test 03',
  description:
    'A full Academic paper. A bar chart comparing three education systems and an essay on whether higher education should be free. Sixty minutes, shared clock.',
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
      title: 'Bar chart — university enrolment by field, three countries',
      prompt:
        'The bar chart below shows the number of students enrolled in five fields of study (Arts, Business, Engineering, Medicine, and Sciences) in three countries in 2022. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      wordMin: 150,
      minutes: 20,
    },
    {
      task: 2,
      title: 'Essay — free or fee-paying higher education',
      prompt:
        'Some people argue that university education should be free for all qualified students, funded by the state. Others believe that students should contribute to the cost of their own education. Discuss both views and give your own opinion. Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
      wordMin: 250,
      minutes: 40,
    },
  ],
  mockFeedback: {
    summary:
      'A steady response. Task 1 identifies the biggest contrasts clearly; Task 2 presents both views but the conclusion restates rather than synthesises. Tighten argument transitions and push for richer lexis on public finance vocabulary.',
    criteriaOffsets: [0, -0.5, 0, 0.5],
    criteriaFeedback: [
      'Both tasks are addressed. Task 1 draws out the overall comparison between countries. Task 2 could develop each view with a concrete example from your own country before presenting your position.',
      'Paragraph structure is clear. Transitions rely on "However" and "In addition" — vary with "That said", "By contrast", or reference phrases to raise cohesion.',
      'Vocabulary is appropriate for academic register. Collocations on education and policy are competent but a few could be sharper: "get education" → "access education", "problem of money" → "financial burden".',
      'Control of complex sentences is reliable. Watch article use before abstract nouns ("the education" when general reference is intended) and the past tense with time markers like "over the decade".',
    ],
  },
}
