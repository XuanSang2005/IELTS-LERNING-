import type { Test } from '../../schemas/test'

export const speaking004: Test = {
  id: 'speaking-004',
  skill: 'speaking',
  title: 'Speaking Test 04',
  description:
    'A three-part interview on technology, media, and the attention economy. Around fourteen minutes.',
  difficulty: 'advanced',
  fullDurationMinutes: 14,
  shortDurationMinutes: 10,
  totalQuestions: 3,
  isPro: true,
  publishedAt: '2026-04-19',
  tags: ['IELTS Academic', 'Speaking'],
  parts: [
    {
      part: 1,
      title: 'Technology in daily life',
      questions: [
        'How often do you use a smartphone in a typical day?',
        'Which app or tool do you find most useful, and why?',
        'Has technology changed the way you stay in touch with friends?',
        'Do you prefer reading news online or in print? Why?',
        'How do you manage time spent on screens?',
      ],
      prepSeconds: 0,
      speakSeconds: 270,
    },
    {
      part: 2,
      title: 'Describe a device you could not live without',
      questions: [
        'Describe a piece of technology that you find it hard to live without.\n\nYou should say:\n— what it is\n— how often you use it\n— what you use it for\n\nand explain why it has become so important to you.',
      ],
      prepSeconds: 60,
      speakSeconds: 120,
    },
    {
      part: 3,
      title: 'Attention, media, and the public',
      questions: [
        'Why do people find it harder to concentrate than in the past, in your view?',
        'Has social media improved public discussion, or worsened it?',
        'Should there be limits on how children use technology?',
        'How has the role of print newspapers changed?',
        'Will artificial intelligence replace journalists in the next decade?',
      ],
      prepSeconds: 0,
      speakSeconds: 300,
    },
  ],
  mockFeedback: {
    summary:
      'A substantive interview with thoughtful Part 3 arguments. Fluency is steady; occasional noticeable hesitations when reaching for abstract vocabulary. Pronunciation carries meaning well throughout.',
    criteriaOffsets: [0, 0.5, 0, 0],
    criteriaFeedback: [
      'Content is strong in all three parts. Hesitations tend to cluster mid-sentence — active-vocabulary drills on the topic of technology and media would help.',
      'Unusually wide range: "algorithmic feeds", "filter bubbles", "attention economy", "digital fatigue". Register matches the topic. A couple of slips in Part 1 ("on internet" → "on the internet").',
      'Conditionals and hedging are well-controlled. Subject-verb agreement with collective nouns occasionally slips ("the media are" vs "is").',
      'Word stress is accurate. Sentence stress could carry more content — you sometimes stress auxiliary verbs where the main verb should be prominent.',
    ],
  },
}
