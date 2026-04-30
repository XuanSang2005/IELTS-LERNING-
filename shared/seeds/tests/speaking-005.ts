import type { Test } from '../../schemas/test'

export const speaking005: Test = {
  id: 'speaking-005',
  skill: 'speaking',
  title: 'Speaking Test 05',
  description:
    'A foundation three-part interview on hometown, a favourite room, and shopping habits. Around fourteen minutes.',
  difficulty: 'foundation',
  fullDurationMinutes: 14,
  shortDurationMinutes: 10,
  totalQuestions: 3,
  isPro: true,
  publishedAt: '2026-04-29',
  tags: ['IELTS Academic', 'Speaking'],
  parts: [
    {
      part: 1,
      title: 'Your hometown',
      questions: [
        "Let's talk about your hometown. Where is it, and what is it like?",
        'What do you like most about living there?',
        'Has your hometown changed much in recent years?',
        'Would you recommend it to a tourist? Why or why not?',
        'Do you think you will continue to live there in the future?',
      ],
      prepSeconds: 0,
      speakSeconds: 270,
    },
    {
      part: 2,
      title: 'Describe a room you spend a lot of time in',
      questions: [
        'Describe a room in your home where you spend a lot of time.\n\nYou should say:\n— what the room looks like\n— what you usually do there\n— who else uses the room\n\nand explain why you spend so much time in it.',
      ],
      prepSeconds: 60,
      speakSeconds: 120,
    },
    {
      part: 3,
      title: 'Homes, neighbourhoods, and lifestyle',
      questions: [
        'How important is the design of a home to the people living in it?',
        'Do younger people today prefer different kinds of homes than their parents did?',
        'Why do some people prefer to live in apartments rather than houses?',
        'What makes a neighbourhood pleasant to live in?',
        'How might the way we live at home change in the next twenty years?',
      ],
      prepSeconds: 0,
      speakSeconds: 270,
    },
  ],
  mockFeedback: {
    summary:
      'You speak comfortably in Part 1 and use the prep minute well in Part 2. Part 3 answers tend to be brief — extending each with a reason and a brief example would lift the band.',
    criteriaOffsets: [0, 0, 0, 0],
    criteriaFeedback: [
      'Fluent in Part 1 with few hesitations. Part 2 ran the full two minutes. Part 3 answers averaged one sentence — aim for two-to-three.',
      'Topic vocabulary is accurate: "open-plan", "natural light", "homely". Add one less common item per Part 3 answer (e.g. "communal living", "live-work spaces").',
      'Mostly simple and compound sentences. Try one complex structure per answer (a relative clause or a conditional).',
      'Pronunciation is clear. Word stress is correct on familiar items. Sentence stress on key content words would carry meaning more strongly.',
    ],
  },
}
