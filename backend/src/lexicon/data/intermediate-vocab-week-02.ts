import type { VocabularyLexiconItem } from '@shared/schemas/lexicon-items'

/**
 * Intermediate · Week 02 · People and relationships
 * 70 items across 7 days. Builds the lexis of personality, friendship,
 * family roles, and the C1 verbs of social conduct.
 */

const items: VocabularyLexiconItem[] = [
  // ─── Day 1 — Personality (positive) ───────────────────────────────────
  v('w02-d1-01', 'considerate', 1, { partOfSpeech: 'adjective', definition: 'Thoughtful about the needs and feelings of other people.', example: 'A considerate roommate is worth more than a tidy one.', synonyms: [['thoughtful', 'B2'], ['attentive', 'C1']] }),
  v('w02-d1-02', 'reliable', 1, { partOfSpeech: 'adjective', definition: 'That can be trusted to do what is expected.', example: 'A reliable friend is the first person you call in trouble.', synonyms: [['dependable', 'C1'], ['trustworthy', 'B2']] }),
  v('w02-d1-03', 'patient', 1, { partOfSpeech: 'adjective', definition: 'Able to wait calmly without getting annoyed.', example: 'My grandmother was patient with every question I had as a child.', synonyms: [['tolerant', 'B2'], ['forbearing', 'C1']] }),
  v('w02-d1-04', 'easy-going', 1, { partOfSpeech: 'adjective', definition: 'Relaxed and not easily worried or annoyed.', example: 'My brother is easy-going about most things, including delays.', synonyms: [['laid-back', 'B2'], ['placid', 'C1']] }),
  v('w02-d1-05', 'compassionate', 1, { partOfSpeech: 'adjective', definition: 'Showing sympathy and concern for the suffering of others.', example: 'Compassionate doctors are remembered long after the visit ends.', synonyms: [['empathetic', 'C1'], ['caring', 'B1']] }),
  v('w02-d1-06', 'witty', 1, { partOfSpeech: 'adjective', definition: 'Showing intelligent and quick humour.', example: 'A witty colleague keeps long meetings bearable.', synonyms: [['humorous', 'B2'], ['clever', 'B1']] }),
  v('w02-d1-07', 'modest', 1, { partOfSpeech: 'adjective', definition: 'Not talking proudly about yourself or your achievements.', example: 'She is modest about her exam scores, but they are excellent.', synonyms: [['humble', 'B2'], ['unassuming', 'C1']] }),
  v('w02-d1-08', 'resilient', 1, { partOfSpeech: 'adjective', definition: 'Able to recover quickly from difficulties.', example: 'Resilient candidates treat a bad mock as a data point, not a verdict.', synonyms: [['tough', 'B1'], ['hardy', 'C1']] }),
  v('w02-d1-09', 'generous', 1, { partOfSpeech: 'adjective', definition: 'Willing to give time, money, or help freely.', example: 'A generous tutor stays ten minutes after every class.', synonyms: [['liberal', 'C1'], ['giving', 'B1']] }),
  v('w02-d1-10', 'sincere', 1, { partOfSpeech: 'adjective', definition: 'Honest and meaning what is said or done.', example: 'A sincere apology repairs more than a clever one.', synonyms: [['genuine', 'B2'], ['heartfelt', 'C1']] }),

  // ─── Day 2 — Personality (challenging) ────────────────────────────────
  v('w02-d2-01', 'stubborn', 2, { partOfSpeech: 'adjective', definition: 'Determined not to change your mind.', example: 'My uncle is too stubborn to ask for directions.', synonyms: [['obstinate', 'C1'], ['inflexible', 'C1']] }),
  v('w02-d2-02', 'arrogant', 2, { partOfSpeech: 'adjective', definition: 'Behaving as if you are more important than other people.', example: 'An arrogant manager loses good staff first.', synonyms: [['conceited', 'C1'], ['haughty', 'C1']] }),
  v('w02-d2-03', 'aloof', 2, { partOfSpeech: 'adjective', definition: 'Distant in manner, not friendly or involved.', example: 'New students often read shyness as aloof behaviour.', synonyms: [['distant', 'B2'], ['detached', 'C1']] }),
  v('w02-d2-04', 'impulsive', 2, { partOfSpeech: 'adjective', definition: 'Acting suddenly without thinking carefully.', example: 'Impulsive decisions about a course rarely end well.', synonyms: [['rash', 'C1'], ['hasty', 'C1']] }),
  v('w02-d2-05', 'self-centred', 2, { partOfSpeech: 'adjective', definition: 'Interested mainly in yourself and your own needs.', example: 'A self-centred speaker forgets that conversations have two sides.', synonyms: [['egocentric', 'C1'], ['selfish', 'B2']] }),
  v('w02-d2-06', 'judgemental', 2, { partOfSpeech: 'adjective', definition: 'Quick to form critical opinions of other people.', example: 'A judgemental tone shuts down honest feedback.', synonyms: [['critical', 'B2'], ['censorious', 'C1']] }),
  v('w02-d2-07', 'short-tempered', 2, { partOfSpeech: 'adjective', definition: 'Easily becoming angry.', example: 'He is short-tempered when he has not slept.', synonyms: [['irritable', 'C1'], ['testy', 'C1']] }),
  v('w02-d2-08', 'aloofness', 2, { partOfSpeech: 'noun', definition: 'The quality of being distant or unfriendly.', example: 'His aloofness in class was actually social anxiety.', synonyms: [['detachment', 'C1'], ['reserve', 'C1']] }),
  v('w02-d2-09', 'evasive', 2, { partOfSpeech: 'adjective', definition: 'Avoiding direct answers or commitments.', example: 'Evasive answers in an interview rarely work.', synonyms: [['vague', 'B2'], ['equivocal', 'C1']] }),
  v('w02-d2-10', 'overbearing', 2, { partOfSpeech: 'adjective', definition: 'Trying to control other people in an unpleasant way.', example: 'An overbearing parent often raises a quiet child.', synonyms: [['domineering', 'C1'], ['imposing', 'C1']] }),

  // ─── Day 3 — Friendship & social bonds ────────────────────────────────
  v('w02-d3-01', 'companionship', 3, { partOfSpeech: 'noun', definition: 'A feeling of friendship and being together with others.', example: 'A study group offers companionship as well as practice.', synonyms: [['fellowship', 'C1'], ['camaraderie', 'C1']] }),
  v('w02-d3-02', 'acquaintance', 3, { partOfSpeech: 'noun', definition: 'A person you know slightly, not a close friend.', example: 'An acquaintance from class became my closest collaborator.', synonyms: [['contact', 'B2'], ['associate', 'C1']] }),
  v('w02-d3-03', 'bond', 3, { partOfSpeech: 'noun', definition: 'A strong connection between people.', example: 'Shared difficulty creates a bond that easy times do not.', synonyms: [['tie', 'B2'], ['attachment', 'C1']] }),
  v('w02-d3-04', 'mutual', 3, { partOfSpeech: 'adjective', definition: 'Felt or done equally by two or more people.', example: 'A mutual friend introduced us at the conference.', synonyms: [['shared', 'B2'], ['reciprocal', 'C1']] }),
  v('w02-d3-05', 'kinship', 3, { partOfSpeech: 'noun', definition: 'A feeling of closeness based on shared origins or interests.', example: 'I feel a strange kinship with anyone preparing for the same exam.', synonyms: [['affinity', 'C1'], ['relation', 'B2']] }),
  v('w02-d3-06', 'falling-out', 3, { partOfSpeech: 'noun', definition: 'A serious quarrel ending a friendship.', example: 'A small misunderstanding caused a year-long falling-out.', synonyms: [['quarrel', 'B2'], ['rift', 'C1']] }),
  v('w02-d3-07', 'reconcile', 3, { partOfSpeech: 'verb', definition: 'To restore friendly relations after a quarrel.', example: 'They reconciled at a family wedding and have been close since.', synonyms: [['make peace', 'B2'], ['patch up', 'B2']] }),
  v('w02-d3-08', 'rapport', 3, { partOfSpeech: 'noun', definition: 'A friendly understanding between people.', example: 'A teacher with rapport gets more from a class than one with rules.', synonyms: [['connection', 'B2'], ['affinity', 'C1']] }),
  v('w02-d3-09', 'confide', 3, { partOfSpeech: 'verb', definition: 'To tell someone a secret, trusting them.', example: 'She confided in me about her plans before announcing them.', synonyms: [['entrust', 'C1'], ['open up', 'B2']] }),
  v('w02-d3-10', 'loyalty', 3, { partOfSpeech: 'noun', definition: 'The quality of being faithful in support of someone or something.', example: 'Loyalty to old friends costs little but matters greatly.', synonyms: [['allegiance', 'C1'], ['fidelity', 'C1']] }),

  // ─── Day 4 — Family roles & generations ───────────────────────────────
  v('w02-d4-01', 'sibling', 4, { partOfSpeech: 'noun', definition: 'A brother or sister.', example: 'Older siblings often shape the speech of the younger ones.', synonyms: [['brother or sister', 'B1'], ['relation', 'B2']] }),
  v('w02-d4-02', 'in-law', 4, { partOfSpeech: 'noun', definition: 'A relative by marriage.', example: 'Sunday lunches usually include the in-laws.', synonyms: [['relative', 'B1'], ['kin', 'C1']] }),
  v('w02-d4-03', 'guardian', 4, { partOfSpeech: 'noun', definition: 'A person legally responsible for someone, often a child.', example: 'My grandmother was my guardian after the move.', synonyms: [['carer', 'B2'], ['custodian', 'C1']] }),
  v('w02-d4-04', 'upbringing', 4, { partOfSpeech: 'noun', definition: 'The way a child is raised by parents or guardians.', example: 'A bilingual upbringing gives a real advantage in language exams.', synonyms: [['rearing', 'C1'], ['childhood', 'B1']] }),
  v('w02-d4-05', 'descendant', 4, { partOfSpeech: 'noun', definition: 'A person related to someone who lived in the past.', example: 'She is a descendant of one of the city\'s founders.', synonyms: [['offspring', 'C1'], ['heir', 'C1']] }),
  v('w02-d4-06', 'ancestor', 4, { partOfSpeech: 'noun', definition: 'A person, typically distant in time, from whom one is descended.', example: 'My ancestors farmed in the Mekong delta for generations.', synonyms: [['forebear', 'C1'], ['forefather', 'C1']] }),
  v('w02-d4-07', 'generation', 4, { partOfSpeech: 'noun', definition: 'All the people of about the same age within a family or society.', example: 'Each generation argues about how the previous one raised it.', synonyms: [['cohort', 'C1'], ['era', 'B2']] }),
  v('w02-d4-08', 'household', 4, { partOfSpeech: 'noun', definition: 'A house and its occupants regarded as a unit.', example: 'Three-generation households remain common in our village.', synonyms: [['family', 'B1'], ['home', 'B1']] }),
  v('w02-d4-09', 'extended family', 4, { partOfSpeech: 'phrase', definition: 'A family unit including grandparents, aunts, uncles, and cousins.', example: 'Tet brings the entire extended family back to the same table.', synonyms: [['wider family', 'B2'], ['kin', 'C1']] }),
  v('w02-d4-10', 'inherit', 4, { partOfSpeech: 'verb', definition: 'To receive something from someone after their death; or to receive a quality from a parent.', example: 'I seem to have inherited my father\'s patience and my mother\'s temper.', synonyms: [['be passed', 'B2'], ['acquire', 'B2']] }),

  // ─── Day 5 — Communication & conversation ─────────────────────────────
  v('w02-d5-01', 'articulate', 5, { partOfSpeech: 'adjective', definition: 'Able to express thoughts and ideas clearly.', example: 'An articulate witness changes how a jury hears a case.', synonyms: [['eloquent', 'C1'], ['well-spoken', 'B2']] }),
  v('w02-d5-02', 'eloquent', 5, { partOfSpeech: 'adjective', definition: 'Speaking or writing fluently and persuasively.', example: 'Her eloquent speech earned a long ovation.', synonyms: [['articulate', 'C1'], ['expressive', 'B2']] }),
  v('w02-d5-03', 'discreet', 5, { partOfSpeech: 'adjective', definition: 'Careful not to attract attention or give away secrets.', example: 'A discreet message in the chat saved an awkward situation.', synonyms: [['tactful', 'C1'], ['guarded', 'C1']] }),
  v('w02-d5-04', 'tactful', 5, { partOfSpeech: 'adjective', definition: 'Showing care not to upset or embarrass others.', example: 'A tactful suggestion lands better than a blunt one.', synonyms: [['diplomatic', 'C1'], ['considerate', 'B2']] }),
  v('w02-d5-05', 'small talk', 5, { partOfSpeech: 'phrase', definition: 'Polite conversation about unimportant matters.', example: 'Small talk in the lift is often the start of a real friendship.', synonyms: [['chitchat', 'B2'], ['idle talk', 'B2']] }),
  v('w02-d5-06', 'banter', 5, { partOfSpeech: 'noun', definition: 'Friendly, witty conversation between people.', example: 'The team\'s banter takes the edge off long days.', synonyms: [['repartee', 'C1'], ['joking', 'B1']] }),
  v('w02-d5-07', 'dialect', 5, { partOfSpeech: 'noun', definition: 'A form of a language particular to a region or social group.', example: 'The dialect of the central provinces uses different vowels.', synonyms: [['variety', 'B2'], ['vernacular', 'C1']] }),
  v('w02-d5-08', 'fluent', 5, { partOfSpeech: 'adjective', definition: 'Able to speak a language easily and well.', example: 'Fluent does not mean perfect; it means uninterrupted.', synonyms: [['proficient', 'C1'], ['articulate', 'C1']] }),
  v('w02-d5-09', 'mute', 5, { partOfSpeech: 'verb', definition: 'To make quieter, or to refuse to speak.', example: 'I mute my notifications during deep work.', synonyms: [['silence', 'B2'], ['hush', 'C1']] }),
  v('w02-d5-10', 'eavesdrop', 5, { partOfSpeech: 'verb', definition: 'To secretly listen to a private conversation.', example: 'Without meaning to, I eavesdropped on the next table\'s argument.', synonyms: [['snoop', 'C1'], ['overhear', 'B2']] }),

  // ─── Day 6 — Conflict & resolution ────────────────────────────────────
  v('w02-d6-01', 'dispute', 6, { partOfSpeech: 'noun', definition: 'A serious argument or disagreement.', example: 'A long dispute over rent finally went to mediation.', synonyms: [['quarrel', 'B2'], ['controversy', 'C1']] }),
  v('w02-d6-02', 'mediator', 6, { partOfSpeech: 'noun', definition: 'A neutral person who helps solve a disagreement.', example: 'A mediator brought both parties to the same room.', synonyms: [['arbitrator', 'C1'], ['go-between', 'B2']] }),
  v('w02-d6-03', 'compromise', 6, { partOfSpeech: 'noun', definition: 'An agreement reached by each side giving up something.', example: 'A workable compromise leaves both sides slightly unhappy.', synonyms: [['middle ground', 'B2'], ['settlement', 'B2']] }),
  v('w02-d6-04', 'apologise', 6, { partOfSpeech: 'verb', definition: 'To say you are sorry for something you have done.', example: 'A short, sincere apology defuses most arguments.', synonyms: [['express regret', 'C1'], ['say sorry', 'B1']] }),
  v('w02-d6-05', 'forgive', 6, { partOfSpeech: 'verb', definition: 'To stop feeling angry with someone.', example: 'Forgiving an old grudge often does more good to oneself than to the other party.', synonyms: [['pardon', 'C1'], ['absolve', 'C1']] }),
  v('w02-d6-06', 'tension', 6, { partOfSpeech: 'noun', definition: 'A feeling of nervousness or unfriendliness between people.', example: 'There was visible tension at the meeting.', synonyms: [['friction', 'C1'], ['strain', 'B2']] }),
  v('w02-d6-07', 'resolve', 6, { partOfSpeech: 'verb', definition: 'To settle or solve a problem or disagreement.', example: 'We resolved the issue with a single conversation.', synonyms: [['settle', 'B2'], ['sort out', 'B2']] }),
  v('w02-d6-08', 'grudge', 6, { partOfSpeech: 'noun', definition: 'A persistent feeling of resentment over a past wrong.', example: 'Holding a grudge weighs on the holder more than on the target.', synonyms: [['resentment', 'C1'], ['ill-feeling', 'B2']] }),
  v('w02-d6-09', 'confront', 6, { partOfSpeech: 'verb', definition: 'To face a difficult person or situation directly.', example: 'It is better to confront a small problem early than a large one late.', synonyms: [['address', 'B2'], ['tackle', 'B2']] }),
  v('w02-d6-10', 'hostility', 6, { partOfSpeech: 'noun', definition: 'Unfriendly or aggressive feelings.', example: 'The committee\'s hostility surprised everyone present.', synonyms: [['animosity', 'C1'], ['enmity', 'C1']] }),

  // ─── Day 7 — Social roles & influence ─────────────────────────────────
  v('w02-d7-01', 'mentor', 7, { partOfSpeech: 'noun', definition: 'An experienced person who advises and supports a less experienced one.', example: 'A good mentor changes the trajectory of a career.', synonyms: [['adviser', 'B2'], ['guide', 'B1']] }),
  v('w02-d7-02', 'role model', 7, { partOfSpeech: 'phrase', definition: 'A person whose behaviour is imitated by others.', example: 'My maths teacher was a role model long after I left her class.', synonyms: [['exemplar', 'C1'], ['model', 'B2']] }),
  v('w02-d7-03', 'peer', 7, { partOfSpeech: 'noun', definition: 'A person of the same age or social position.', example: 'Peer feedback in writing classes is often sharper than the teacher\'s.', synonyms: [['equal', 'B2'], ['contemporary', 'C1']] }),
  v('w02-d7-04', 'peer pressure', 7, { partOfSpeech: 'phrase', definition: 'The influence of friends or contemporaries.', example: 'Peer pressure can lift performance as easily as it can lower it.', synonyms: [['social pressure', 'B2'], ['group influence', 'C1']] }),
  v('w02-d7-05', 'influential', 7, { partOfSpeech: 'adjective', definition: 'Having a great effect on people or events.', example: 'A short influential book reshaped the way I read.', synonyms: [['important', 'B1'], ['weighty', 'C1']] }),
  v('w02-d7-06', 'collaborate', 7, { partOfSpeech: 'verb', definition: 'To work jointly with others on a task.', example: 'When students collaborate, they retain more than when they revise alone.', synonyms: [['cooperate', 'B2'], ['work together', 'B1']] }),
  v('w02-d7-07', 'community', 7, { partOfSpeech: 'noun', definition: 'A group of people living in the same place or sharing the same characteristics.', example: 'A small community of learners sustains motivation through long programmes.', synonyms: [['society', 'B2'], ['fraternity', 'C1']] }),
  v('w02-d7-08', 'integrate', 7, { partOfSpeech: 'verb', definition: 'To combine into a whole, or to become part of a group.', example: 'New students take a few weeks to integrate into the class culture.', synonyms: [['blend in', 'B2'], ['assimilate', 'C1']] }),
  v('w02-d7-09', 'reputation', 7, { partOfSpeech: 'noun', definition: 'The opinion that people in general have of someone.', example: 'A reputation for honesty takes years to build and minutes to lose.', synonyms: [['standing', 'B2'], ['repute', 'C1']] }),
  v('w02-d7-10', 'esteem', 7, { partOfSpeech: 'noun', definition: 'Respect and admiration.', example: 'Her quiet work earned the esteem of her colleagues.', synonyms: [['respect', 'B2'], ['regard', 'C1']] }),
]

interface VocabInput {
  partOfSpeech: VocabularyLexiconItem['partOfSpeech']
  definition: string
  example: string
  register?: VocabularyLexiconItem['register']
  topic?: string
  frequency?: VocabularyLexiconItem['frequency']
  synonyms: Array<[string, VocabularyLexiconItem['register'], string?]>
}

function v(
  shortId: string,
  headword: string,
  day: 1 | 2 | 3 | 4 | 5 | 6 | 7,
  input: VocabInput,
): VocabularyLexiconItem {
  return {
    discipline: 'vocabulary',
    id: `int-vocab-${shortId}`,
    headword,
    partOfSpeech: input.partOfSpeech,
    definition: input.definition,
    example: input.example,
    register: input.register ?? 'B2',
    topic: input.topic ?? 'people-relationships',
    frequency: input.frequency ?? 'high',
    synonyms: input.synonyms.map(([word, register, nuance]) => ({
      word,
      register,
      ...(nuance ? { nuance } : {}),
    })),
    level: 'intermediate',
    week: 2,
    day,
  }
}

export const INTERMEDIATE_VOCAB_WEEK_02: VocabularyLexiconItem[] = items
