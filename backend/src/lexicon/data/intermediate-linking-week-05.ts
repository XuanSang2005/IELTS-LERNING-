import type { LinkingLexiconItem } from '@shared/schemas/lexicon-items'

/** Intermediate · Week 05 · Concession connectors. 14 items, 2/day. The structures of the balanced essay — introducing counter-views without weakening one's stance. */

const items: LinkingLexiconItem[] = [
  l('w05-d1-01', 'although', 1, 'concession', 'B1', ['initial', 'medial'], 'Although the test is challenging, most candidates pass on a second attempt.', ['though', 'even though'], 'Subordinator; needs a finite clause.'),
  l('w05-d1-02', 'though', 1, 'concession', 'B1', ['initial', 'medial', 'final'], 'The plan is ambitious. The funding has not been secured, though.', ['although', 'even though'], 'Slightly less formal than although; works at sentence end.'),
  l('w05-d2-01', 'even though', 2, 'concession', 'B2', ['initial', 'medial'], 'Even though the policy is unpopular, it has reduced traffic.', ['although', 'despite the fact that'], 'Stronger concession than although.'),
  l('w05-d2-02', 'despite', 2, 'concession', 'B2', ['initial', 'medial'], 'Despite repeated warnings, the policy was implemented.', ['in spite of', 'notwithstanding'], 'Followed by a noun or -ing form, not a clause.'),
  l('w05-d3-01', 'in spite of', 3, 'concession', 'B2', ['initial', 'medial'], 'In spite of the bad weather, the festival went ahead.', ['despite', 'regardless of'], 'Synonymous with despite; same grammar.'),
  l('w05-d3-02', 'notwithstanding', 3, 'concession', 'C1', ['initial', 'medial'], 'Notwithstanding the criticism, the law remains in force.', ['despite', 'in spite of'], 'Heavily formal; reserve for the closing paragraph.'),
  l('w05-d4-01', 'while', 4, 'concession', 'B2', ['initial', 'medial'], 'While many support the reform, several questions remain unanswered.', ['whereas', 'although'], 'Concessive sense at clause start, not temporal.'),
  l('w05-d4-02', 'whereas', 4, 'contrast', 'C1', ['initial', 'medial'], 'The first proposal is detailed, whereas the second is no more than an outline.', ['while', 'in contrast to'], 'Joins two contrasting clauses; comma usual.'),
  l('w05-d5-01', 'admittedly', 5, 'concession', 'C1', ['initial'], 'Admittedly, the data is incomplete; nevertheless, the trend is clear.', ['granted', 'true'], 'Acknowledges a point before countering it.'),
  l('w05-d5-02', 'granted', 5, 'concession', 'C1', ['initial'], 'Granted, the cost is high, but the benefit is greater.', ['admittedly', 'true'], 'Conversational concession marker.'),
  l('w05-d6-01', 'regardless of', 6, 'concession', 'C1', ['initial', 'medial'], 'The policy applies regardless of income.', ['irrespective of', 'no matter what'], 'Followed by a noun or noun phrase.'),
  l('w05-d6-02', 'irrespective of', 6, 'concession', 'C1', ['initial', 'medial'], 'Help is offered irrespective of nationality.', ['regardless of', 'without regard to'], 'Slightly more formal than regardless of.'),
  l('w05-d7-01', 'no matter how', 7, 'concession', 'B2', ['initial'], 'No matter how carefully you plan, surprises arrive.', ['however carefully', 'regardless of how'], 'Followed by an adjective or adverb.'),
  l('w05-d7-02', 'all the same', 7, 'concession', 'C1', ['initial', 'final'], 'The cost is high. All the same, we should proceed.', ['nevertheless', 'still'], 'Comma after when initial; useful at paragraph close.'),
]

function l(shortId: string, phrase: string, day: 1|2|3|4|5|6|7, fn: LinkingLexiconItem['function'], register: LinkingLexiconItem['register'], positions: LinkingLexiconItem['positions'], example: string, _alternatives: string[], note?: string): LinkingLexiconItem {
  return { discipline: 'linking', id: `int-linking-${shortId}`, phrase, function: fn, register, positions, example, ...(note ? { note } : {}), level: 'intermediate', week: 5, day }
}

export const INTERMEDIATE_LINKING_WEEK_05: LinkingLexiconItem[] = items
