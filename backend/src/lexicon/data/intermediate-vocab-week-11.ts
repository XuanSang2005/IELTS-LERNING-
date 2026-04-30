import type { VocabularyLexiconItem } from '@shared/schemas/lexicon-items'

/** Intermediate · Week 11 · Government and law. 70 items. Policy, regulation, civic life — the formal register, well-behaved. */

const items: VocabularyLexiconItem[] = [
  // Day 1 — Government structures
  v('w11-d1-01', 'government', 1, { partOfSpeech: 'noun', definition: 'The group of people governing a country.', example: 'A coalition government rarely lasts a full term.', synonyms: [['administration', 'B2'], ['regime', 'C1']] }),
  v('w11-d1-02', 'parliament', 1, { partOfSpeech: 'noun', definition: 'The supreme legislative body of a country.', example: 'A new parliament reviews every law passed by its predecessor.', synonyms: [['legislature', 'C1'], ['assembly', 'C1']] }),
  v('w11-d1-03', 'cabinet', 1, { partOfSpeech: 'noun', definition: 'The senior advisers chosen by a head of government.', example: 'A small cabinet moves faster than a large one.', register: 'C1', synonyms: [['ministers', 'B2'], ['executive', 'C1']] }),
  v('w11-d1-04', 'ministry', 1, { partOfSpeech: 'noun', definition: 'A government department.', example: 'A new ministry takes years to find its footing.', synonyms: [['department', 'B2'], ['agency', 'B2']] }),
  v('w11-d1-05', 'monarchy', 1, { partOfSpeech: 'noun', definition: 'A form of government with a king or queen as head.', example: 'A constitutional monarchy reigns but does not rule.', register: 'C1', synonyms: [['royal rule', 'B2'], ['kingdom', 'B1']] }),
  v('w11-d1-06', 'republic', 1, { partOfSpeech: 'noun', definition: 'A state in which power rests with elected representatives.', example: 'A young republic relies on its institutions, not its leaders.', synonyms: [['democracy', 'B2'], ['commonwealth', 'C1']] }),
  v('w11-d1-07', 'federal', 1, { partOfSpeech: 'adjective', definition: 'Of a system in which power is shared between central and regional governments.', example: 'A federal system absorbs regional shocks more readily.', register: 'C1', synonyms: [['national', 'B2'], ['centralised', 'C1']] }),
  v('w11-d1-08', 'autonomy', 1, { partOfSpeech: 'noun', definition: 'The right of a region to govern itself.', example: 'Regional autonomy reduces tension only when funding follows.', register: 'C1', synonyms: [['self-rule', 'C1'], ['independence', 'B2']] }),
  v('w11-d1-09', 'sovereignty', 1, { partOfSpeech: 'noun', definition: 'The supreme authority of a state to govern itself.', example: 'Trade treaties always test sovereignty in some small way.', register: 'C1', synonyms: [['independence', 'B2'], ['supremacy', 'C1']] }),
  v('w11-d1-10', 'constitution', 1, { partOfSpeech: 'noun', definition: 'The body of fundamental laws of a country.', example: 'A clear constitution settles arguments before they begin.', synonyms: [['charter', 'C1'], ['founding document', 'C1']] }),

  // Day 2 — Elections & democracy
  v('w11-d2-01', 'election', 2, { partOfSpeech: 'noun', definition: 'A formal process of selecting representatives by vote.', example: 'A general election takes months of preparation.', synonyms: [['vote', 'B1'], ['poll', 'C1']] }),
  v('w11-d2-02', 'campaign', 2, { partOfSpeech: 'noun', definition: 'An organised series of activities to achieve a goal.', example: 'A short campaign favours the candidate with the most money.', synonyms: [['drive', 'B2'], ['movement', 'B2']] }),
  v('w11-d2-03', 'candidate', 2, { partOfSpeech: 'noun', definition: 'A person seeking election.', example: 'A new candidate brings energy that survives one election cycle.', synonyms: [['contender', 'C1'], ['nominee', 'C1']] }),
  v('w11-d2-04', 'ballot', 2, { partOfSpeech: 'noun', definition: 'A system of secret voting.', example: 'A clean ballot is the bedrock of a working democracy.', register: 'C1', synonyms: [['vote', 'B1'], ['poll', 'C1']] }),
  v('w11-d2-05', 'turnout', 2, { partOfSpeech: 'noun', definition: 'The number of people who vote in an election.', example: 'A low turnout undermines the legitimacy of the result.', register: 'C1', synonyms: [['participation', 'B2'], ['voter turnout', 'B2']] }),
  v('w11-d2-06', 'constituency', 2, { partOfSpeech: 'noun', definition: 'An area whose voters elect a representative.', example: 'A safe constituency sometimes complacency.', register: 'C1', synonyms: [['electoral district', 'C1'], ['ward', 'C1']] }),
  v('w11-d2-07', 'manifesto', 2, { partOfSpeech: 'noun', definition: 'A public declaration of policy by a political party.', example: 'A short manifesto sometimes outlasts a long one.', register: 'C1', synonyms: [['platform', 'C1'], ['programme', 'B2']] }),
  v('w11-d2-08', 'opposition', 2, { partOfSpeech: 'noun', definition: 'The political party not in power.', example: 'A loud opposition keeps the government honest.', synonyms: [['minority', 'B2'], ['rivals', 'B2']] }),
  v('w11-d2-09', 'coalition', 2, { partOfSpeech: 'noun', definition: 'An alliance of political parties.', example: 'A coalition of three parties shaped the budget.', register: 'C1', synonyms: [['alliance', 'B2'], ['partnership', 'B2']] }),
  v('w11-d2-10', 'electorate', 2, { partOfSpeech: 'noun', definition: 'All the people in a country entitled to vote.', example: 'A divided electorate produces deadlocked parliaments.', register: 'C1', synonyms: [['voters', 'B1'], ['public', 'B1']] }),

  // Day 3 — Law & justice
  v('w11-d3-01', 'law', 3, { partOfSpeech: 'noun', definition: 'A system of rules a country recognises.', example: 'A new law takes effect months after it is passed.', synonyms: [['statute', 'C1'], ['regulation', 'B2']] }),
  v('w11-d3-02', 'legislation', 3, { partOfSpeech: 'noun', definition: 'Laws considered collectively.', example: 'Tobacco legislation halved smoking within a decade.', register: 'C1', synonyms: [['laws', 'B1'], ['statutes', 'C1']] }),
  v('w11-d3-03', 'judiciary', 3, { partOfSpeech: 'noun', definition: 'The judicial authorities of a country.', example: 'An independent judiciary is the slowest but firmest check.', register: 'C1', synonyms: [['courts', 'B2'], ['judges', 'B1']] }),
  v('w11-d3-04', 'justice', 3, { partOfSpeech: 'noun', definition: 'Just behaviour or treatment.', example: 'Justice that is delayed is rarely justice.', synonyms: [['fairness', 'B2'], ['equity', 'C1']] }),
  v('w11-d3-05', 'verdict', 3, { partOfSpeech: 'noun', definition: 'A jury\'s decision in a court case.', example: 'A unanimous verdict came after three days of deliberation.', register: 'C1', synonyms: [['judgement', 'B2'], ['ruling', 'C1']] }),
  v('w11-d3-06', 'jury', 3, { partOfSpeech: 'noun', definition: 'A group of people sworn to give a verdict.', example: 'A jury of twelve is the foundation of common-law trials.', synonyms: [['panel', 'B2'], ['judges', 'B1']] }),
  v('w11-d3-07', 'plaintiff', 3, { partOfSpeech: 'noun', definition: 'A person who brings a case against another in court.', example: 'A plaintiff bears the cost of the case in most jurisdictions.', register: 'C1', synonyms: [['claimant', 'C1'], ['complainant', 'C1']] }),
  v('w11-d3-08', 'defendant', 3, { partOfSpeech: 'noun', definition: 'A person sued or accused in court.', example: 'A defendant has a constitutional right to representation.', register: 'C1', synonyms: [['accused', 'B2'], ['respondent', 'C1']] }),
  v('w11-d3-09', 'prosecution', 3, { partOfSpeech: 'noun', definition: 'The body that brings a criminal case to court.', example: 'The prosecution failed to prove intent.', register: 'C1', synonyms: [['accusation', 'C1'], ['indictment', 'C1']] }),
  v('w11-d3-10', 'acquit', 3, { partOfSpeech: 'verb', definition: 'To clear a defendant of a charge.', example: 'The court acquitted the defendant on a technicality.', register: 'C1', synonyms: [['exonerate', 'C1'], ['clear', 'B2']] }),

  // Day 4 — Civil rights
  v('w11-d4-01', 'right', 4, { partOfSpeech: 'noun', definition: 'A legal or moral entitlement.', example: 'Free speech is a right that bears responsibilities.', synonyms: [['entitlement', 'C1'], ['privilege', 'B2']] }),
  v('w11-d4-02', 'liberty', 4, { partOfSpeech: 'noun', definition: 'The state of being free.', example: 'Liberty is meaningful only when paired with security.', register: 'C1', synonyms: [['freedom', 'B1'], ['independence', 'B2']] }),
  v('w11-d4-03', 'freedom', 4, { partOfSpeech: 'noun', definition: 'The power to act, speak, or think without restraint.', example: 'Freedom of the press shrinks before any war.', synonyms: [['liberty', 'C1'], ['independence', 'B2']] }),
  v('w11-d4-04', 'discrimination', 4, { partOfSpeech: 'noun', definition: 'Unjust treatment of different groups.', example: 'Workplace discrimination has fallen but not disappeared.', register: 'C1', synonyms: [['bias', 'B2'], ['prejudice', 'B2']] }),
  v('w11-d4-05', 'equality', 4, { partOfSpeech: 'noun', definition: 'The state of being equal.', example: 'Legal equality outpaces social equality by decades.', synonyms: [['parity', 'C1'], ['fairness', 'B2']] }),
  v('w11-d4-06', 'protest', 4, { partOfSpeech: 'noun', definition: 'A statement or action expressing disapproval.', example: 'A peaceful protest can move policy that an angry one cannot.', synonyms: [['demonstration', 'B2'], ['rally', 'B2']] }),
  v('w11-d4-07', 'civil', 4, { partOfSpeech: 'adjective', definition: 'Relating to ordinary citizens.', example: 'Civil disobedience requires accepting the legal consequences.', synonyms: [['public', 'B1'], ['civic', 'C1']] }),
  v('w11-d4-08', 'activism', 4, { partOfSpeech: 'noun', definition: 'Vigorous campaigning for political or social change.', example: 'Local activism often outlasts the headline issue.', register: 'C1', synonyms: [['campaigning', 'B2'], ['advocacy', 'C1']] }),
  v('w11-d4-09', 'human rights', 4, { partOfSpeech: 'phrase', definition: 'Basic rights to which every person is entitled.', example: 'Human rights survive only when courts will defend them.', synonyms: [['fundamental rights', 'C1'], ['civil liberties', 'C1']] }),
  v('w11-d4-10', 'amnesty', 4, { partOfSpeech: 'noun', definition: 'An official pardon for political offences.', example: 'A presidential amnesty released hundreds of political prisoners.', register: 'C1', synonyms: [['pardon', 'C1'], ['clemency', 'C1']] }),

  // Day 5 — Crime & punishment
  v('w11-d5-01', 'crime', 5, { partOfSpeech: 'noun', definition: 'An action punishable by law.', example: 'Petty crime falls when youth employment rises.', synonyms: [['offence', 'B2'], ['violation', 'C1']] }),
  v('w11-d5-02', 'felony', 5, { partOfSpeech: 'noun', definition: 'A serious crime, more grave than a misdemeanour.', example: 'A felony conviction follows a person for a generation.', register: 'C1', synonyms: [['serious crime', 'B2'], ['indictable offence', 'C1']] }),
  v('w11-d5-03', 'misdemeanour', 5, { partOfSpeech: 'noun', definition: 'A minor wrongdoing.', example: 'A first misdemeanour is often dealt with by a fine.', register: 'C1', synonyms: [['minor offence', 'B2'], ['petty crime', 'C1']] }),
  v('w11-d5-04', 'sentence', 5, { partOfSpeech: 'noun', definition: 'The punishment imposed by a court.', example: 'A long sentence rarely reduces crime by itself.', synonyms: [['punishment', 'B1'], ['penalty', 'B2']] }),
  v('w11-d5-05', 'fine', 5, { partOfSpeech: 'noun', definition: 'A sum of money imposed as a penalty.', example: 'A modest fine collected reliably outperforms a large fine collected rarely.', synonyms: [['penalty', 'B2'], ['charge', 'B1']] }),
  v('w11-d5-06', 'imprisonment', 5, { partOfSpeech: 'noun', definition: 'Punishment by being locked up in jail.', example: 'Mass imprisonment costs more than education for the same population.', register: 'C1', synonyms: [['incarceration', 'C1'], ['detention', 'C1']] }),
  v('w11-d5-07', 'parole', 5, { partOfSpeech: 'noun', definition: 'Release from prison before a sentence is finished, on conditions.', example: 'Parole boards weigh both risk and remorse.', register: 'C1', synonyms: [['conditional release', 'C1'], ['early release', 'B2']] }),
  v('w11-d5-08', 'probation', 5, { partOfSpeech: 'noun', definition: 'Supervision instead of prison for an offender.', example: 'Probation works only when supervisors have time.', register: 'C1', synonyms: [['supervision', 'B2'], ['suspended sentence', 'C1']] }),
  v('w11-d5-09', 'rehabilitation', 5, { partOfSpeech: 'noun', definition: 'Restoration to a normal life through training and therapy.', example: 'A focus on rehabilitation lowers reoffending more than longer sentences.', register: 'C1', synonyms: [['reform', 'B2'], ['recovery', 'B2']] }),
  v('w11-d5-10', 'deterrent', 5, { partOfSpeech: 'noun', definition: 'A thing that discourages someone from acting.', example: 'A visible deterrent matters more than a harsh punishment.', register: 'C1', synonyms: [['discouragement', 'C1'], ['disincentive', 'C1']] }),

  // Day 6 — Policy & regulation
  v('w11-d6-01', 'policy', 6, { partOfSpeech: 'noun', definition: 'A course of action adopted by an organisation or government.', example: 'A small change in policy can shift behaviour at scale.', synonyms: [['strategy', 'B2'], ['plan', 'B1']] }),
  v('w11-d6-02', 'reform', 6, { partOfSpeech: 'noun', definition: 'Making changes to improve something.', example: 'A long-overdue reform finally arrived this term.', synonyms: [['overhaul', 'C1'], ['change', 'B1']] }),
  v('w11-d6-03', 'regulate', 6, { partOfSpeech: 'verb', definition: 'To control by means of rules.', example: 'New rules regulate online advertising for the first time.', synonyms: [['govern', 'B2'], ['control', 'B1']] }),
  v('w11-d6-04', 'enforce', 6, { partOfSpeech: 'verb', definition: 'To compel observance of a law.', example: 'A law that is not enforced becomes a suggestion.', synonyms: [['impose', 'B2'], ['apply', 'B1']] }),
  v('w11-d6-05', 'comply', 6, { partOfSpeech: 'verb', definition: 'To act in accordance with rules.', example: 'Most firms comply quickly when penalties are real.', register: 'C1', synonyms: [['obey', 'B1'], ['conform', 'C1']] }),
  v('w11-d6-06', 'mandate', 6, { partOfSpeech: 'noun', definition: 'An official order or authorisation.', example: 'A clear mandate from voters strengthens a controversial reform.', register: 'C1', synonyms: [['authority', 'B2'], ['warrant', 'C1']] }),
  v('w11-d6-07', 'lobby', 6, { partOfSpeech: 'verb', definition: 'To try to influence legislators.', example: 'Industry groups lobby every time a green tax is proposed.', register: 'C1', synonyms: [['petition', 'C1'], ['pressure', 'B2']] }),
  v('w11-d6-08', 'bill', 6, { partOfSpeech: 'noun', definition: 'A draft of a proposed law.', example: 'A bill becomes law only after both chambers approve it.', synonyms: [['draft law', 'B2'], ['legislation', 'B2']] }),
  v('w11-d6-09', 'amendment', 6, { partOfSpeech: 'noun', definition: 'A minor change to a law or document.', example: 'A small amendment changed how the new tax was collected.', register: 'C1', synonyms: [['revision', 'B2'], ['modification', 'C1']] }),
  v('w11-d6-10', 'enact', 6, { partOfSpeech: 'verb', definition: 'To make a bill into a law.', example: 'The reform was enacted just before the recess.', register: 'C1', synonyms: [['pass', 'B2'], ['legislate', 'C1']] }),

  // Day 7 — Public administration
  v('w11-d7-01', 'bureaucracy', 7, { partOfSpeech: 'noun', definition: 'A system of government with many officials and rules.', example: 'A reformed bureaucracy can outperform a fashionable consultancy.', register: 'C1', synonyms: [['administration', 'B2'], ['officialdom', 'C1']] }),
  v('w11-d7-02', 'civil service', 7, { partOfSpeech: 'phrase', definition: 'The body of officials administering government.', example: 'A neutral civil service shields policy from political swings.', register: 'C1', synonyms: [['public service', 'B2'], ['administration', 'B2']] }),
  v('w11-d7-03', 'public sector', 7, { partOfSpeech: 'phrase', definition: 'The part of an economy controlled by the state.', example: 'Public-sector wages have lagged the private for a decade.', synonyms: [['government sector', 'B2'], ['state sector', 'C1']] }),
  v('w11-d7-04', 'private sector', 7, { partOfSpeech: 'phrase', definition: 'The part of an economy not controlled by the state.', example: 'A vibrant private sector is the chief revenue source.', synonyms: [['business sector', 'B2'], ['commercial sector', 'B2']] }),
  v('w11-d7-05', 'public spending', 7, { partOfSpeech: 'phrase', definition: 'Money spent by the government.', example: 'Public spending on infrastructure pays back over decades.', synonyms: [['government expenditure', 'C1'], ['state spending', 'B2']] }),
  v('w11-d7-06', 'taxation', 7, { partOfSpeech: 'noun', definition: 'The levying of taxes.', example: 'Progressive taxation funds the largest social programmes.', register: 'C1', synonyms: [['levy', 'C1'], ['tax system', 'B2']] }),
  v('w11-d7-07', 'audit', 7, { partOfSpeech: 'noun', definition: 'An official examination of accounts.', example: 'An external audit caught the irregularity within a week.', synonyms: [['inspection', 'B2'], ['review', 'B2']] }),
  v('w11-d7-08', 'transparency', 7, { partOfSpeech: 'noun', definition: 'The quality of being open and honest.', example: 'Transparency in procurement reduces corruption sharply.', synonyms: [['openness', 'B2'], ['clarity', 'B2']] }),
  v('w11-d7-09', 'corruption', 7, { partOfSpeech: 'noun', definition: 'Dishonest behaviour by those in power.', example: 'Corruption is hardest to root out where citizens have come to expect it.', register: 'C1', synonyms: [['graft', 'C1'], ['malpractice', 'C1']] }),
  v('w11-d7-10', 'accountability', 7, { partOfSpeech: 'noun', definition: 'The fact of being responsible for one\'s actions.', example: 'Real accountability requires both reports and consequences.', register: 'C1', synonyms: [['responsibility', 'B2'], ['answerability', 'C1']] }),
]

interface VocabInput { partOfSpeech: VocabularyLexiconItem['partOfSpeech']; definition: string; example: string; register?: VocabularyLexiconItem['register']; topic?: string; frequency?: VocabularyLexiconItem['frequency']; synonyms: Array<[string, VocabularyLexiconItem['register'], string?]> }
function v(shortId: string, headword: string, day: 1|2|3|4|5|6|7, input: VocabInput): VocabularyLexiconItem {
  return { discipline: 'vocabulary', id: `int-vocab-${shortId}`, headword, partOfSpeech: input.partOfSpeech, definition: input.definition, example: input.example, register: input.register ?? 'B2', topic: input.topic ?? 'government', frequency: input.frequency ?? 'medium', synonyms: input.synonyms.map(([word, register, nuance]) => ({ word, register, ...(nuance ? { nuance } : {}) })), level: 'intermediate', week: 11, day }
}

export const INTERMEDIATE_VOCAB_WEEK_11: VocabularyLexiconItem[] = items
