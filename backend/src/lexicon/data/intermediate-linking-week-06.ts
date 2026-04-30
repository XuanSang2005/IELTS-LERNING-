import type { LinkingLexiconItem } from '@shared/schemas/lexicon-items'

/** Intermediate · Week 06 · Exemplification. 14 items, 2/day. For instance, namely, in particular — the precise examples that lift Task 2. */

const items: LinkingLexiconItem[] = [
  l('w06-d1-01', 'for example', 1, 'exemplification', 'B1', ['initial', 'medial'], 'Many languages use tones; Vietnamese, for example, has six.', ['for instance', 'such as'], 'Comma before and after when medial.'),
  l('w06-d1-02', 'for instance', 1, 'exemplification', 'B2', ['initial', 'medial'], 'Some cities ban cars in the centre. Paris, for instance, has done so on Sundays.', ['for example', 'such as'], 'Slightly more formal than for example.'),
  l('w06-d2-01', 'such as', 2, 'exemplification', 'B1', ['medial'], 'Smaller cities such as Hue retain a calmer pace.', ['for example', 'like'], 'Followed by a noun or list of nouns.'),
  l('w06-d2-02', 'like', 2, 'exemplification', 'B1', ['medial'], 'Universities like Oxford and Cambridge demand interviews.', ['such as', 'for example'], 'Conversational; for academic writing prefer such as.'),
  l('w06-d3-01', 'in particular', 3, 'exemplification', 'C1', ['initial', 'medial'], 'Climate is shifting fast. Coastal areas, in particular, face rising risks.', ['especially', 'specifically'], 'Singles out one item from a group.'),
  l('w06-d3-02', 'especially', 3, 'exemplification', 'B2', ['initial', 'medial'], 'Public transport reaches most districts, especially in the centre.', ['in particular', 'particularly'], 'Comma usual when initial.'),
  l('w06-d4-01', 'particularly', 4, 'exemplification', 'C1', ['medial'], 'Children, particularly under five, suffer most from air pollution.', ['especially', 'in particular'], 'Mid-sentence emphasis on a subset.'),
  l('w06-d4-02', 'namely', 4, 'exemplification', 'C1', ['medial'], 'Three cities lead the index, namely Singapore, Tokyo, and Seoul.', ['that is', 'specifically'], 'Introduces a specific list after a general claim.'),
  l('w06-d5-01', 'specifically', 5, 'exemplification', 'C1', ['initial', 'medial'], 'The reform targets corporate evasion, specifically through new reporting rules.', ['namely', 'in particular'], 'More precise than for example; useful in academic writing.'),
  l('w06-d5-02', 'to illustrate', 5, 'exemplification', 'C1', ['initial'], 'To illustrate, consider the rise of remote working.', ['for example', 'as an example'], 'Often introduces a worked example.'),
  l('w06-d6-01', 'as an example', 6, 'exemplification', 'B2', ['initial'], 'As an example, take the postal service of the 1970s.', ['for example', 'to illustrate'], 'Useful when introducing an extended example.'),
  l('w06-d6-02', 'in this case', 6, 'exemplification', 'B2', ['initial', 'medial'], 'Some markets recovered slowly; in this case, however, recovery was almost immediate.', ['here', 'in this instance'], 'Refers to a specific situation just mentioned.'),
  l('w06-d7-01', 'a case in point', 7, 'exemplification', 'C1', ['initial'], 'Cycling lanes can transform a city. Copenhagen is a case in point.', ['a clear example', 'an instance'], 'Useful when the example is the strongest available.'),
  l('w06-d7-02', 'consider', 7, 'exemplification', 'B2', ['initial'], 'Consider the impact of the smartphone on conversation.', ['take the example of', 'look at'], 'Imperative form; opens a paragraph cleanly.'),
]

function l(shortId: string, phrase: string, day: 1|2|3|4|5|6|7, fn: LinkingLexiconItem['function'], register: LinkingLexiconItem['register'], positions: LinkingLexiconItem['positions'], example: string, _alternatives: string[], note?: string): LinkingLexiconItem {
  return { discipline: 'linking', id: `int-linking-${shortId}`, phrase, function: fn, register, positions, example, ...(note ? { note } : {}), level: 'intermediate', week: 6, day }
}

export const INTERMEDIATE_LINKING_WEEK_06: LinkingLexiconItem[] = items
