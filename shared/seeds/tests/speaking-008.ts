import type { Test } from '../../schemas/test'

export const speaking008: Test = {
  id: 'speaking-008',
  skill: 'speaking',
  title: 'Speaking Test 08',
  description:
    'An advanced three-part interview on the natural environment, a memorable place outdoors, and global sustainability. Around fourteen minutes.',
  difficulty: 'advanced',
  fullDurationMinutes: 14,
  shortDurationMinutes: 10,
  totalQuestions: 3,
  isPro: true,
  publishedAt: '2026-04-29',
  tags: ['IELTS Academic', 'Speaking'],
  parts: [
    {
      part: 1,
      title: 'Time outdoors',
      questions: [
        'How often do you spend time outdoors?',
        'What kinds of outdoor places do you most enjoy — parks, beaches, forests?',
        'Did your family take you outdoors much when you were a child?',
        'Do you prefer outdoor activities alone or with others?',
        'What do you usually take with you when you go for a long walk?',
      ],
      prepSeconds: 0,
      speakSeconds: 270,
    },
    {
      part: 2,
      title: 'Describe a place in nature you find beautiful',
      questions: [
        'Describe a place in nature that you find particularly beautiful.\n\nYou should say:\n— where it is\n— when you usually visit\n— what you can see and hear there\n\nand explain why it has such an effect on you.',
      ],
      prepSeconds: 60,
      speakSeconds: 120,
    },
    {
      part: 3,
      title: 'Environment, cities, and sustainability',
      questions: [
        'How well does your country protect its natural environment, in your opinion?',
        'Should individual citizens be expected to change their lifestyles for environmental reasons?',
        'What role can cities play in reducing environmental damage?',
        'Are international agreements on the environment effective? Why or why not?',
        'How might climate change shape the way people live in the next fifty years?',
      ],
      prepSeconds: 0,
      speakSeconds: 300,
    },
  ],
  mockFeedback: {
    summary:
      'A substantive interview with thoughtful Part 3 reasoning. Fluency is steady; pronunciation carries meaning throughout. Lexical range is the standout strength.',
    criteriaOffsets: [0, 0.5, 0.5, 0],
    criteriaFeedback: [
      'Confident extension across all parts. Part 3 arguments are layered — cause, consequence, and example. Occasional self-correction mid-sentence; this is fine and not a fluency penalty.',
      'Unusually wide range: "biodiversity loss", "carbon footprint", "the commons", "stewardship", "renewables". Register is consistent and academic.',
      'Conditionals (second and third) are well-controlled. Subject-verb agreement with collective nouns is consistent.',
      'Word stress on long environmental terms is accurate. Sentence stress carries content words clearly.',
    ],
  },
}
