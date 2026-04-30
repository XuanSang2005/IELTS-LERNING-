import type { Test } from '../../schemas/test'

export const speaking009: Test = {
  id: 'speaking-009',
  skill: 'speaking',
  title: 'Speaking Test 09',
  description:
    'An advanced three-part interview on work, a particularly busy day, and the changing culture of work. Around fourteen minutes.',
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
      title: 'Work, study, and balance',
      questions: [
        'Do you work, or are you a student? Tell me a little about it.',
        'What does a typical workday or study day look like for you?',
        'How easy is it for you to switch off at the end of the day?',
        'Do you prefer working with others or working alone?',
        'How do you usually relax after a long day?',
      ],
      prepSeconds: 0,
      speakSeconds: 270,
    },
    {
      part: 2,
      title: 'Describe a particularly busy day you remember',
      questions: [
        'Describe a day when you were extremely busy.\n\nYou should say:\n— when this day was\n— what you had to do\n— how you managed your time\n\nand explain how you felt at the end of the day.',
      ],
      prepSeconds: 60,
      speakSeconds: 120,
    },
    {
      part: 3,
      title: 'Work culture and the future of work',
      questions: [
        'Has the relationship between work and personal life changed in your country?',
        'Why do some people prefer flexible hours, while others prefer a fixed routine?',
        'Should employers be responsible for their employees’ mental wellbeing?',
        'How might artificial intelligence reshape working life in the next decade?',
        'Will the idea of a “job for life” disappear in the coming generation?',
      ],
      prepSeconds: 0,
      speakSeconds: 300,
    },
  ],
  mockFeedback: {
    summary:
      'A confident, articulate interview. Part 2 is well-shaped, with chronology and reflection in equal measure. Part 3 takes positions and supports them with examples. A few abstract phrases stretch grammar at the edges.',
    criteriaOffsets: [0.5, 0, 0.5, 0],
    criteriaFeedback: [
      'Strong extension throughout. Part 3 answers run three to four sentences with reasoning and example. Few hesitations; self-corrections are minor.',
      'Cohesion is mature: "that being said", "the upshot is", "for argument’s sake". Register matches the question.',
      'Excellent range: "burnout", "asynchronous work", "career capital", "psychological safety", "job security". A couple of slips ("on the long run" → "in the long run").',
      'Pronunciation of multi-syllable academic words is clear. Sentence stress is well-placed; intonation rises appropriately on alternatives ("X, or Y?").',
    ],
  },
}
