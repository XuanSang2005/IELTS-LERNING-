import type { LinkingLexiconItem } from '@shared/schemas/lexicon-items'

/** Intermediate · Week 10 · Emphasis markers. 14 items, 2/day. Indeed, in particular, above all — words that signal weight. (Mapped to existing functions; weight handled via the example.) */

const items: LinkingLexiconItem[] = [
  l('w10-d1-01', 'indeed', 1, 'addition', 'C1', ['initial', 'medial'], 'The reform was overdue. Indeed, it had been promised for fifteen years.', ['in fact', 'actually'], 'Emphasis — reinforces and intensifies the previous point.'),
  l('w10-d1-02', 'in fact', 1, 'addition', 'B2', ['initial', 'medial'], 'The reform passed quickly. In fact, it was unanimous.', ['indeed', 'actually'], 'Emphasis — corrects or reinforces a claim.'),
  l('w10-d2-01', 'actually', 2, 'addition', 'B1', ['initial', 'medial'], 'The figures, actually, are higher than reported.', ['in fact', 'indeed'], 'Emphasis — softer than indeed; common in speech.'),
  l('w10-d2-02', 'above all', 2, 'addition', 'C1', ['initial'], 'Above all, the policy must be enforceable.', ['most importantly', 'primarily'], 'Emphasis — singles out the most important point.'),
  l('w10-d3-01', 'most importantly', 3, 'addition', 'B2', ['initial'], 'Most importantly, the trial showed no harm.', ['above all', 'crucially'], 'Emphasis — comma after; useful in conclusion.'),
  l('w10-d3-02', 'crucially', 3, 'addition', 'C1', ['initial', 'medial'], 'Crucially, the deadline cannot be moved.', ['most importantly', 'critically'], 'Emphasis — flags a decisive point.'),
  l('w10-d4-01', 'notably', 4, 'addition', 'C1', ['initial', 'medial'], 'Several countries refused to sign, notably the largest exporters.', ['particularly', 'in particular'], 'Emphasis — points out the most striking instance.'),
  l('w10-d4-02', 'remarkably', 4, 'addition', 'C1', ['initial', 'medial'], 'Remarkably, the reform survived three administrations.', ['notably', 'strikingly'], 'Emphasis — flags the surprising element.'),
  l('w10-d5-01', 'strikingly', 5, 'addition', 'C1', ['initial', 'medial'], 'Strikingly, only one in ten respondents agreed.', ['remarkably', 'notably'], 'Emphasis — useful in academic writing.'),
  l('w10-d5-02', 'particularly', 5, 'exemplification', 'C1', ['medial'], 'Children, particularly under five, suffer most.', ['especially', 'in particular'], 'Emphasis on a subset within a group.'),
  l('w10-d6-01', 'in fact', 6, 'addition', 'B2', ['initial', 'medial'], 'The proposal is bold. In fact, it is the boldest in a generation.', ['indeed', 'actually'], 'Emphasis — reinforces a previous statement.'),
  l('w10-d6-02', 'undoubtedly', 6, 'addition', 'C1', ['initial', 'medial'], 'Undoubtedly, the reform was overdue.', ['without doubt', 'certainly'], 'Emphasis — flags strong agreement.'),
  l('w10-d7-01', 'certainly', 7, 'addition', 'B2', ['initial', 'medial'], 'Certainly, the data supports the conclusion.', ['undoubtedly', 'without question'], 'Emphasis — strong but conversational.'),
  l('w10-d7-02', 'unquestionably', 7, 'addition', 'C1', ['initial', 'medial'], 'Unquestionably, the strategy paid off.', ['undoubtedly', 'beyond question'], 'Emphasis — formal; reserve for the strongest claim.'),
]

function l(shortId: string, phrase: string, day: 1|2|3|4|5|6|7, fn: LinkingLexiconItem['function'], register: LinkingLexiconItem['register'], positions: LinkingLexiconItem['positions'], example: string, _alternatives: string[], note?: string): LinkingLexiconItem {
  return { discipline: 'linking', id: `int-linking-${shortId}`, phrase, function: fn, register, positions, example, ...(note ? { note } : {}), level: 'intermediate', week: 10, day }
}

export const INTERMEDIATE_LINKING_WEEK_10: LinkingLexiconItem[] = items
