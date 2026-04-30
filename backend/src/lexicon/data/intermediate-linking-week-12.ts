import type { LinkingLexiconItem } from '@shared/schemas/lexicon-items'

/** Intermediate · Week 12 · Integrative review. 14 items, 2/day. All eight functions, drilled together — moving between linker categories without hesitation. */

const items: LinkingLexiconItem[] = [
  l('w12-d1-01', 'on balance', 1, 'summary', 'C1', ['initial'], 'On balance, the reform succeeded.', ['overall', 'all things considered'], 'Useful in essay conclusions when weighing arguments.'),
  l('w12-d1-02', 'all things considered', 1, 'summary', 'C1', ['initial', 'final'], 'All things considered, the policy was the right choice.', ['on balance', 'taking everything into account'], 'Comma after when initial.'),
  l('w12-d2-01', 'in light of', 2, 'cause', 'C1', ['initial'], 'In light of the new evidence, the policy was reviewed.', ['given', 'considering'], 'Useful for argument essays — flags a reasoned response.'),
  l('w12-d2-02', 'with this in mind', 2, 'effect', 'C1', ['initial'], 'With this in mind, the team revised its approach.', ['therefore', 'in light of this'], 'Comma after; common in argumentative writing.'),
  l('w12-d3-01', 'no doubt', 3, 'addition', 'C1', ['initial', 'medial'], 'No doubt the announcement will trigger debate.', ['undoubtedly', 'certainly'], 'Emphasis — comma after when initial.'),
  l('w12-d3-02', 'as far as ... is concerned', 3, 'addition', 'C1', ['initial'], 'As far as cost is concerned, the proposal is reasonable.', ['regarding', 'with respect to'], 'Useful when narrowing focus.'),
  l('w12-d4-01', 'with regard to', 4, 'addition', 'C1', ['initial'], 'With regard to safety, the new model is superior.', ['regarding', 'concerning'], 'Slightly more formal than regarding.'),
  l('w12-d4-02', 'regarding', 4, 'addition', 'B2', ['initial'], 'Regarding the budget, two cuts were proposed.', ['as for', 'with regard to'], 'Comma after; common in business writing.'),
  l('w12-d5-01', 'in the same vein', 5, 'addition', 'C1', ['initial'], 'In the same vein, the report calls for tighter controls.', ['similarly', 'along the same lines'], 'Useful when extending an argument.'),
  l('w12-d5-02', 'along the same lines', 5, 'addition', 'C1', ['initial'], 'Along the same lines, the second study found a similar pattern.', ['similarly', 'in the same vein'], 'Comma after when initial.'),
  l('w12-d6-01', 'by way of contrast', 6, 'contrast', 'C1', ['initial'], 'By way of contrast, the rural figure rose by half.', ['in contrast', 'by contrast'], 'Slightly more formal than by contrast.'),
  l('w12-d6-02', 'on the contrary', 6, 'contrast', 'C1', ['initial'], 'The policy did not slow growth. On the contrary, it accelerated it.', ['quite the opposite', 'instead'], 'Use only to refute, not to compare.'),
  l('w12-d7-01', 'in summary', 7, 'summary', 'B2', ['initial'], 'In summary, three changes are needed before next term.', ['to sum up', 'in conclusion'], 'Comma after; useful for the closing paragraph.'),
  l('w12-d7-02', 'taking everything into account', 7, 'summary', 'C1', ['initial'], 'Taking everything into account, the project was a qualified success.', ['all things considered', 'on balance'], 'Useful in measured conclusions.'),
]

function l(shortId: string, phrase: string, day: 1|2|3|4|5|6|7, fn: LinkingLexiconItem['function'], register: LinkingLexiconItem['register'], positions: LinkingLexiconItem['positions'], example: string, _alternatives: string[], note?: string): LinkingLexiconItem {
  return { discipline: 'linking', id: `int-linking-${shortId}`, phrase, function: fn, register, positions, example, ...(note ? { note } : {}), level: 'intermediate', week: 12, day }
}

export const INTERMEDIATE_LINKING_WEEK_12: LinkingLexiconItem[] = items
