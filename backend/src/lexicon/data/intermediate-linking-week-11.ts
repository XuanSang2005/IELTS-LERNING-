import type { LinkingLexiconItem } from '@shared/schemas/lexicon-items'

/** Intermediate · Week 11 · Reference and substitution. 14 items, 2/day. The former, the latter, this in turn — cohesion at clause level, replacing lexical repetition with reference. */

const items: LinkingLexiconItem[] = [
  l('w11-d1-01', 'the former', 1, 'addition', 'C1', ['medial'], 'Both bridges have served the city. The former, however, is older.', ['the first', 'the previous'], 'Reference — refers to the first of two items mentioned.'),
  l('w11-d1-02', 'the latter', 1, 'addition', 'C1', ['medial'], 'Bus and tram networks both grew last year. The latter expanded faster.', ['the second', 'the more recent'], 'Reference — refers to the second of two items mentioned.'),
  l('w11-d2-01', 'this', 2, 'addition', 'B1', ['initial', 'medial'], 'The funding was withdrawn. This delayed the launch.', ['that', 'such a development'], 'Reference — points back to the previous statement.'),
  l('w11-d2-02', 'that', 2, 'addition', 'B1', ['initial', 'medial'], 'Costs rose sharply. That alone forced the postponement.', ['this', 'such a fact'], 'Reference — useful for emphasis on a single previous point.'),
  l('w11-d3-01', 'this in turn', 3, 'effect', 'C1', ['initial', 'medial'], 'Costs rose. This in turn forced layoffs.', ['as a result', 'consequently'], 'Reference + effect — chains an outcome to its cause.'),
  l('w11-d3-02', 'such', 3, 'addition', 'C1', ['medial'], 'Such failures cost more than they save.', ['this kind of', 'these'], 'Reference — refers back to a class of items just mentioned.'),
  l('w11-d4-01', 'this means that', 4, 'effect', 'B2', ['initial'], 'The deadline has shifted. This means that the second draft is also delayed.', ['as a result', 'so'], 'Reference + effect — useful when explaining implications.'),
  l('w11-d4-02', 'as such', 4, 'effect', 'C1', ['initial', 'medial'], 'The role is unpaid. As such, it attracts only enthusiasts.', ['therefore', 'consequently'], 'Reference — refers to the previous categorisation.'),
  l('w11-d5-01', 'these', 5, 'addition', 'B1', ['initial', 'medial'], 'Three reforms passed quickly. These set the agenda for the year.', ['such measures', 'they'], 'Reference — refers back to a plural noun mentioned earlier.'),
  l('w11-d5-02', 'those', 5, 'addition', 'B1', ['initial', 'medial'], 'Those who arrived early found seats; the rest stood.', ['the people who', 'such as'], 'Reference — useful as a substitute for a noun phrase.'),
  l('w11-d6-01', 'the same', 6, 'addition', 'B2', ['initial', 'medial'], 'Some teams adopted the new method; the same cannot be said of others.', ['similarly', 'likewise'], 'Reference — points back to a previously stated condition.'),
  l('w11-d6-02', 'likewise', 6, 'addition', 'C1', ['initial'], 'The university supports its language students. Likewise, postgraduates receive funding.', ['similarly', 'in the same way'], 'Reference + addition — extends a parallel.'),
  l('w11-d7-01', 'similarly', 7, 'addition', 'B2', ['initial', 'medial'], 'The first plan failed. Similarly, the second met little support.', ['likewise', 'in the same way'], 'Reference + addition — useful for parallel cases.'),
  l('w11-d7-02', 'one ... the other', 7, 'contrast', 'C1', ['medial'], 'Of the two policies, one targets supply, the other demand.', ['the former ... the latter', 'each'], 'Reference — pairs two contrasting items.'),
]

function l(shortId: string, phrase: string, day: 1|2|3|4|5|6|7, fn: LinkingLexiconItem['function'], register: LinkingLexiconItem['register'], positions: LinkingLexiconItem['positions'], example: string, _alternatives: string[], note?: string): LinkingLexiconItem {
  return { discipline: 'linking', id: `int-linking-${shortId}`, phrase, function: fn, register, positions, example, ...(note ? { note } : {}), level: 'intermediate', week: 11, day }
}

export const INTERMEDIATE_LINKING_WEEK_11: LinkingLexiconItem[] = items
