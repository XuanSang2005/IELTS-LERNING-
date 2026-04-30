import type { LinkingLexiconItem } from '@shared/schemas/lexicon-items'

/** Intermediate · Week 07 · Sequence connectors. 14 items, 2/day. Firstly, subsequently, finally — the spine of the procedural answer. */

const items: LinkingLexiconItem[] = [
  l('w07-d1-01', 'firstly', 1, 'sequence', 'B1', ['initial'], 'Firstly, the policy was poorly designed.', ['first', 'first of all'], 'Comma after; pair with secondly and finally for full sequence.'),
  l('w07-d1-02', 'secondly', 1, 'sequence', 'B1', ['initial'], 'Secondly, the rollout was too rushed.', ['second', 'next'], 'Comma after; mid-sentence in a numbered list.'),
  l('w07-d2-01', 'thirdly', 2, 'sequence', 'B2', ['initial'], 'Thirdly, no one consulted the staff.', ['third', 'next'], 'Useful when three points are listed.'),
  l('w07-d2-02', 'finally', 2, 'sequence', 'B1', ['initial'], 'Finally, the funding ran out.', ['lastly', 'in conclusion'], 'Comma after; signals the closing point of a list.'),
  l('w07-d3-01', 'next', 3, 'sequence', 'B1', ['initial'], 'Next, the dough is left to rise for an hour.', ['then', 'subsequently'], 'Useful for processes; comma after.'),
  l('w07-d3-02', 'then', 3, 'sequence', 'B1', ['initial', 'medial'], 'Then the manuscript was sent to a second reader.', ['next', 'subsequently'], 'Comma after when initial.'),
  l('w07-d4-01', 'subsequently', 4, 'sequence', 'C1', ['initial', 'medial'], 'The bill passed the lower house and subsequently faced amendments above.', ['later', 'afterwards'], 'Slightly more formal than later.'),
  l('w07-d4-02', 'afterwards', 4, 'sequence', 'B2', ['initial', 'final'], 'They held a short reception. Afterwards, the keynote began.', ['then', 'subsequently'], 'Useful at the start or end of a sentence.'),
  l('w07-d5-01', 'in the meantime', 5, 'sequence', 'C1', ['initial', 'medial'], 'Construction will start in the spring. In the meantime, surveys continue.', ['meanwhile', 'in the interim'], 'Comma after; bridges two parallel periods.'),
  l('w07-d5-02', 'meanwhile', 5, 'sequence', 'B2', ['initial'], 'The reform passed quickly. Meanwhile, opposition organised.', ['in the meantime', 'at the same time'], 'Comma after; common in essay paragraphs.'),
  l('w07-d6-01', 'eventually', 6, 'sequence', 'B2', ['initial', 'medial'], 'Eventually, the proposal was accepted.', ['in the end', 'finally'], 'Comma after when initial; signals the long-awaited result.'),
  l('w07-d6-02', 'in the end', 6, 'sequence', 'B2', ['initial', 'medial'], 'In the end, common sense prevailed.', ['eventually', 'finally'], 'Comma after when initial; common in narratives.'),
  l('w07-d7-01', 'simultaneously', 7, 'sequence', 'C1', ['initial', 'medial'], 'Two reforms were enacted simultaneously, with predictable confusion.', ['at the same time', 'concurrently'], 'Useful for parallel events.'),
  l('w07-d7-02', 'previously', 7, 'sequence', 'C1', ['initial', 'medial'], 'Previously, the role had been filled by a deputy.', ['before', 'earlier'], 'Refers to time before a specified moment.'),
]

function l(shortId: string, phrase: string, day: 1|2|3|4|5|6|7, fn: LinkingLexiconItem['function'], register: LinkingLexiconItem['register'], positions: LinkingLexiconItem['positions'], example: string, _alternatives: string[], note?: string): LinkingLexiconItem {
  return { discipline: 'linking', id: `int-linking-${shortId}`, phrase, function: fn, register, positions, example, ...(note ? { note } : {}), level: 'intermediate', week: 7, day }
}

export const INTERMEDIATE_LINKING_WEEK_07: LinkingLexiconItem[] = items
