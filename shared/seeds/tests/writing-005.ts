import type { Test } from '../../schemas/test'

export const writing005: Test = {
  id: 'writing-005',
  skill: 'writing',
  title: 'Writing Test 05',
  description:
    'A foundation Academic paper — a bar chart on book genre sales and an opinion essay on the value of a university degree.',
  difficulty: 'foundation',
  fullDurationMinutes: 60,
  shortDurationMinutes: 40,
  totalQuestions: 2,
  isPro: true,
  publishedAt: '2026-04-29',
  tags: ['IELTS Academic', 'Writing'],
  tasks: [
    {
      task: 1,
      title: 'Bar chart — book sales by genre, 2010 vs 2020',
      prompt:
        'The chart below shows the number of books sold in five different genres (Fiction, Biography, Cookery, Self-help, and Children) at a major bookshop chain in 2010 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      wordMin: 150,
      minutes: 20,
    },
    {
      task: 2,
      title: 'Essay — does a university degree still matter?',
      prompt:
        'Some people believe that a university degree is essential for a successful career. Others argue that practical skills and experience are now more valuable than formal qualifications. Discuss both views and give your own opinion. Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
      wordMin: 250,
      minutes: 40,
    },
  ],
  mockFeedback: {
    summary:
      'A solid response that addresses the prompt fully. Task 1 covers the main contrasts but groups data rather than ordering it logically. Task 2 takes a clear position with adequate examples; counter-views are touched on briefly.',
    criteriaOffsets: [0, -0.5, 0, 0],
    criteriaFeedback: [
      'Both tasks address the question. Task 1 identifies the genres that rose and fell. Task 2 has a clear opinion with two supporting reasons. Adding one concrete example (a friend, a study) per body paragraph would strengthen the response.',
      'Paragraphing is clear but transitions repeat ("Firstly", "Secondly", "Finally"). Vary openers — "One reason", "A further consideration", "By contrast" — for higher cohesion.',
      'Topic vocabulary is accurate. Mix in less common items: "vocational training", "transferable skills", "a graduate premium". Register is consistent.',
      'Sentence forms are mostly simple and accurate. Try one or two complex structures per paragraph: relative clauses, conditionals.',
    ],
  },
}
