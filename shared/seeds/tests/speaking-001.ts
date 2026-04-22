import type { Test } from '../../schemas/test'

export const speaking001: Test = {
  id: 'speaking-001',
  skill: 'speaking',
  title: 'Speaking Test 01',
  description:
    'A full three-part Speaking interview — personal introduction, a long turn on a memorable journey, and a discussion on travel and cities. Around fourteen minutes end to end.',
  difficulty: 'intermediate',
  fullDurationMinutes: 14,
  shortDurationMinutes: 10,
  totalQuestions: 3,
  isPro: true,
  publishedAt: '2026-04-19',
  tags: ['IELTS Academic', 'Speaking'],
  parts: [
    {
      part: 1,
      title: 'Work, study, and daily life',
      questions: [
        "Let's talk about what you do. Do you work or are you a student?",
        'What do you enjoy most about your work or studies?',
        'How do you usually spend your evenings after work or class?',
        'Do you prefer busy days or quiet ones? Why?',
        'Has the way you spend your time changed in the last few years?',
      ],
      prepSeconds: 0,
      speakSeconds: 270,
    },
    {
      part: 2,
      title: 'Describe a memorable journey',
      questions: [
        'Describe a journey you took that you particularly remember.\n\nYou should say:\n— where you went and who you went with\n— how you travelled\n— what happened on the journey\n\nand explain why this journey is memorable to you.',
      ],
      prepSeconds: 60,
      speakSeconds: 120,
    },
    {
      part: 3,
      title: 'Travel, cities, and change',
      questions: [
        'Why do you think people enjoy travelling to new places?',
        'Has travel become easier or harder in the last twenty years? Why?',
        'How does tourism change the cities it visits, in your view?',
        'Some argue we should travel less, for the climate. What do you think?',
        'Do you think children should travel internationally while they are young?',
      ],
      prepSeconds: 0,
      speakSeconds: 270,
    },
  ],
  mockFeedback: {
    summary:
      'You speak at comfortable length in Part 1 and extend well in Part 2. Part 3 answers are sometimes short — extending with a reason and an example on each would lift the overall band. Pronunciation is intelligible throughout.',
    criteriaOffsets: [0, 0.5, 0, -0.5],
    criteriaFeedback: [
      'Fluent across all three parts with few long pauses. Part 2 was especially strong — you used the prep minute well. Part 3 answers could extend further; aim for two-to-three sentences per question.',
      'Good topical range, especially around travel and city life. A few collocations slipped ("do a trip" → "take a trip"). Push for one less-common item per answer in Part 3.',
      'Complex structures are attempted. Watch third-person -s in the present, and past perfect when recounting a journey.',
      'Individual sounds are clear. Word stress is mostly correct; sentence stress could carry more content — try stressing key nouns and verbs rather than function words.',
    ],
  },
}
