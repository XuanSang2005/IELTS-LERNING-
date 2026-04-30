import type { LinkingLexiconItem } from '@shared/schemas/lexicon-items'

/** Intermediate · Week 08 · Summary connectors. 14 items, 2/day. In conclusion, overall, to sum up — the closing line, well-judged. */

const items: LinkingLexiconItem[] = [
  l('w08-d1-01', 'in conclusion', 1, 'summary', 'B2', ['initial'], 'In conclusion, the reforms have done more good than harm.', ['to conclude', 'finally'], 'Comma after; standard essay closer.'),
  l('w08-d1-02', 'to conclude', 1, 'summary', 'C1', ['initial'], 'To conclude, the policy needs revision rather than abandonment.', ['in conclusion', 'in summary'], 'Slightly more formal than in conclusion.'),
  l('w08-d2-01', 'in summary', 2, 'summary', 'B2', ['initial'], 'In summary, three changes are needed before next term.', ['to sum up', 'in brief'], 'Useful for academic writing.'),
  l('w08-d2-02', 'to sum up', 2, 'summary', 'B2', ['initial'], 'To sum up, the trend is positive but uneven.', ['in summary', 'overall'], 'Conversational closing phrase; comma after.'),
  l('w08-d3-01', 'overall', 3, 'summary', 'B2', ['initial', 'medial'], 'Overall, attendance has risen modestly.', ['in general', 'on the whole'], 'Comma after when initial; common in Task 1 conclusions.'),
  l('w08-d3-02', 'on the whole', 3, 'summary', 'C1', ['initial', 'medial'], 'On the whole, the experiment was a success.', ['overall', 'by and large'], 'Comma after when initial.'),
  l('w08-d4-01', 'all in all', 4, 'summary', 'B2', ['initial', 'final'], 'All in all, the project met its objectives.', ['overall', 'on balance'], 'Useful at end of paragraph; conversational tone.'),
  l('w08-d4-02', 'in brief', 4, 'summary', 'C1', ['initial'], 'In brief, the new system is faster but more expensive.', ['in short', 'briefly'], 'Comma after; useful for compact summaries.'),
  l('w08-d5-01', 'in short', 5, 'summary', 'B2', ['initial'], 'In short, the policy works in theory.', ['briefly', 'in a word'], 'Comma after; common in opinion writing.'),
  l('w08-d5-02', 'briefly', 5, 'summary', 'C1', ['initial', 'medial'], 'Briefly, three changes are needed.', ['in brief', 'in short'], 'Comma after when initial.'),
  l('w08-d6-01', 'on balance', 6, 'summary', 'C1', ['initial'], 'On balance, the reforms have been successful.', ['overall', 'all things considered'], 'Useful when weighing pros and cons.'),
  l('w08-d6-02', 'all things considered', 6, 'summary', 'C1', ['initial', 'final'], 'All things considered, the reform succeeded.', ['on balance', 'taking everything into account'], 'Comma after when initial; useful in conclusion paragraphs.'),
  l('w08-d7-01', 'in essence', 7, 'summary', 'C1', ['initial', 'medial'], 'In essence, the proposal asks the public to pay twice.', ['essentially', 'fundamentally'], 'Useful for distilling complex ideas.'),
  l('w08-d7-02', 'ultimately', 7, 'summary', 'C1', ['initial', 'medial'], 'Ultimately, the choice rests with the voters.', ['in the end', 'finally'], 'Comma after when initial; signals the final point.'),
]

function l(shortId: string, phrase: string, day: 1|2|3|4|5|6|7, fn: LinkingLexiconItem['function'], register: LinkingLexiconItem['register'], positions: LinkingLexiconItem['positions'], example: string, _alternatives: string[], note?: string): LinkingLexiconItem {
  return { discipline: 'linking', id: `int-linking-${shortId}`, phrase, function: fn, register, positions, example, ...(note ? { note } : {}), level: 'intermediate', week: 8, day }
}

export const INTERMEDIATE_LINKING_WEEK_08: LinkingLexiconItem[] = items
