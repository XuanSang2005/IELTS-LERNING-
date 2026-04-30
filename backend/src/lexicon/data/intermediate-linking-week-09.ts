import type { LinkingLexiconItem } from '@shared/schemas/lexicon-items'

/** Intermediate · Week 09 · Hedging and qualification. 14 items, 2/day. The academic's humility markers — softening categorical claims at the right moments. (Mapped to function='summary' as nearest match in shared enum; see usage notes.) */

const items: LinkingLexiconItem[] = [
  l('w09-d1-01', 'arguably', 1, 'summary', 'C1', ['initial', 'medial'], 'It is arguably the most important reform of the decade.', ['possibly', 'conceivably'], 'Hedge — flag a strong but contestable claim.'),
  l('w09-d1-02', 'possibly', 1, 'summary', 'B1', ['initial', 'medial'], 'The plan is possibly the best of three weak options.', ['perhaps', 'maybe'], 'Hedge — useful when evidence is partial.'),
  l('w09-d2-01', 'perhaps', 2, 'summary', 'B1', ['initial', 'medial'], 'Perhaps the strongest evidence comes from the regional studies.', ['possibly', 'maybe'], 'Hedge — softer than arguably.'),
  l('w09-d2-02', 'to some extent', 2, 'summary', 'B2', ['initial', 'medial'], 'To some extent, the criticism is fair.', ['partly', 'somewhat'], 'Hedge — concedes a partial truth.'),
  l('w09-d3-01', 'in some respects', 3, 'summary', 'C1', ['initial'], 'In some respects, the new system is better.', ['in some ways', 'partly'], 'Hedge — useful before a counterargument.'),
  l('w09-d3-02', 'apparently', 3, 'summary', 'B2', ['initial', 'medial'], 'Apparently, the deal had been struck weeks earlier.', ['seemingly', 'evidently'], 'Hedge — flag a claim sourced second-hand.'),
  l('w09-d4-01', 'seemingly', 4, 'summary', 'C1', ['initial', 'medial'], 'A seemingly small change had large effects.', ['apparently', 'on the surface'], 'Hedge — flags appearance versus reality.'),
  l('w09-d4-02', 'reportedly', 4, 'summary', 'C1', ['initial', 'medial'], 'Reportedly, the agreement was signed last night.', ['allegedly', 'said to'], 'Hedge — used in journalism for unverified claims.'),
  l('w09-d5-01', 'allegedly', 5, 'summary', 'C1', ['initial', 'medial'], 'The minister allegedly knew about the contract.', ['supposedly', 'reputedly'], 'Hedge — used when the claim is disputed.'),
  l('w09-d5-02', 'supposedly', 5, 'summary', 'C1', ['initial', 'medial'], 'The fund supposedly closed at one billion.', ['allegedly', 'reputedly'], 'Hedge — implies scepticism about the claim.'),
  l('w09-d6-01', 'in general', 6, 'summary', 'B1', ['initial', 'medial'], 'In general, younger users prefer mobile apps.', ['generally', 'as a rule'], 'Hedge — softens a sweeping claim.'),
  l('w09-d6-02', 'broadly speaking', 6, 'summary', 'C1', ['initial'], 'Broadly speaking, the reform has worked.', ['in general', 'by and large'], 'Hedge — useful for opening generalisations.'),
  l('w09-d7-01', 'as a rule', 7, 'summary', 'B2', ['initial'], 'As a rule, late students sit at the back.', ['generally', 'typically'], 'Hedge — refers to a usual but not invariable pattern.'),
  l('w09-d7-02', 'in most cases', 7, 'summary', 'B2', ['initial', 'medial'], 'In most cases, slow change beats sudden change.', ['usually', 'generally'], 'Hedge — leaves room for exceptions.'),
]

function l(shortId: string, phrase: string, day: 1|2|3|4|5|6|7, fn: LinkingLexiconItem['function'], register: LinkingLexiconItem['register'], positions: LinkingLexiconItem['positions'], example: string, _alternatives: string[], note?: string): LinkingLexiconItem {
  return { discipline: 'linking', id: `int-linking-${shortId}`, phrase, function: fn, register, positions, example, ...(note ? { note } : {}), level: 'intermediate', week: 9, day }
}

export const INTERMEDIATE_LINKING_WEEK_09: LinkingLexiconItem[] = items
