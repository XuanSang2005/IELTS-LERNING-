import type { LinkingLexiconItem } from '@shared/schemas/lexicon-items'

/**
 * Intermediate · Week 02 · Contrast connectors.
 * 14 items across 7 days. The foundation of the discuss-both-views essay,
 * varied so the candidate is not trapped on however for two paragraphs.
 */

const items: LinkingLexiconItem[] = [
  // Day 1 — clause-level contrast
  l('w02-d1-01', 'however', 1, 'contrast', 'B2', ['initial', 'medial'], 'The plan is ambitious. However, the funding has not been secured.', ['nevertheless', 'nonetheless'], 'Use a comma after when sentence-initial.'),
  l('w02-d1-02', 'nevertheless', 1, 'contrast', 'C1', ['initial'], 'The arguments are weak. Nevertheless, the conclusion holds.', ['however', 'nonetheless'], 'Slightly heavier than however.'),
  // Day 2
  l('w02-d2-01', 'on the other hand', 2, 'contrast', 'B2', ['initial'], 'Public transport is cheap. On the other hand, it is overcrowded at peak hours.', ['by contrast', 'conversely'], 'Often paired with on the one hand earlier in the paragraph.'),
  l('w02-d2-02', 'by contrast', 2, 'contrast', 'C1', ['initial'], 'Older drivers tend to be cautious. By contrast, younger ones take more risks.', ['in contrast', 'conversely'], 'Comma after; works at clause start or mid-sentence.'),
  // Day 3
  l('w02-d3-01', 'in contrast', 3, 'contrast', 'C1', ['initial'], 'Northern dialects are flat in tone. In contrast, southern speech rises sharply at the end of clauses.', ['by contrast', 'conversely'], 'Slightly more formal than however.'),
  l('w02-d3-02', 'conversely', 3, 'contrast', 'C1', ['initial'], 'Strong policy can stifle innovation. Conversely, weak regulation can also harm it.', ['by contrast', 'on the contrary'], 'Implies a near-mirror reversal.'),
  // Day 4 — concession
  l('w02-d4-01', 'although', 4, 'concession', 'B1', ['initial', 'medial'], 'Although the test is challenging, most candidates pass on a second attempt.', ['though', 'even though'], 'Subordinator; needs a finite clause.'),
  l('w02-d4-02', 'even though', 4, 'concession', 'B2', ['initial'], 'Even though the policy is unpopular, it has reduced traffic.', ['although', 'despite the fact that'], 'Stronger concession than although.'),
  // Day 5
  l('w02-d5-01', 'despite', 5, 'concession', 'B2', ['initial'], 'Despite repeated warnings, the policy was implemented.', ['in spite of', 'notwithstanding'], 'Followed by a noun or -ing form, not a clause.'),
  l('w02-d5-02', 'in spite of', 5, 'concession', 'B2', ['initial'], 'In spite of the bad weather, the festival went ahead.', ['despite', 'regardless of'], 'Synonymous with despite; same grammar.'),
  // Day 6
  l('w02-d6-01', 'while', 6, 'concession', 'B2', ['initial', 'medial'], 'While many support the reform, several questions remain unanswered.', ['whereas', 'although'], 'Concessive sense at clause start, not temporal.'),
  l('w02-d6-02', 'whereas', 6, 'contrast', 'C1', ['medial'], 'The first proposal is detailed, whereas the second is no more than an outline.', ['while', 'in contrast to'], 'Joins two contrasting clauses; comma usual.'),
  // Day 7 — emphatic / formal
  l('w02-d7-01', 'on the contrary', 7, 'contrast', 'C1', ['initial'], 'The policy did not slow growth. On the contrary, it accelerated it.', ['quite the opposite', 'instead'], 'Use only to refute, not to compare.'),
  l('w02-d7-02', 'notwithstanding', 7, 'concession', 'C1', ['initial'], 'Notwithstanding the criticism, the law remains in force.', ['despite', 'in spite of'], 'Heavily formal; reserve for the closing paragraph.'),
]

function l(
  shortId: string,
  phrase: string,
  day: 1 | 2 | 3 | 4 | 5 | 6 | 7,
  fn: LinkingLexiconItem['function'],
  register: LinkingLexiconItem['register'],
  positions: LinkingLexiconItem['positions'],
  example: string,
  _alternatives: string[],
  note?: string,
): LinkingLexiconItem {
  return {
    discipline: 'linking',
    id: `int-linking-${shortId}`,
    phrase,
    function: fn,
    register,
    positions,
    example,
    ...(note ? { note } : {}),
    level: 'intermediate',
    week: 2,
    day,
  }
}

export const INTERMEDIATE_LINKING_WEEK_02: LinkingLexiconItem[] = items
