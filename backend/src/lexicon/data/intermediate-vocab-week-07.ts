import type { VocabularyLexiconItem } from '@shared/schemas/lexicon-items'

/** Intermediate · Week 07 · Society and change. 70 items. Verbs of trend, magnitude, and qualification — Phase III opens with the language of essays on social change. */

const items: VocabularyLexiconItem[] = [
  // Day 1 — Demographic shifts
  v('w07-d1-01', 'demographic', 1, { partOfSpeech: 'adjective', definition: 'Relating to the structure of populations.', example: 'Demographic change is the slow current beneath every economy.', register: 'C1', synonyms: [['population-based', 'B2'], ['statistical', 'C1']] }),
  v('w07-d1-02', 'population', 1, { partOfSpeech: 'noun', definition: 'All the people living in a country or area.', example: 'The urban population has doubled in three decades.', synonyms: [['inhabitants', 'B2'], ['residents', 'B1']] }),
  v('w07-d1-03', 'ageing', 1, { partOfSpeech: 'adjective', definition: 'Becoming older as a group.', example: 'An ageing society needs more carers and fewer schools.', synonyms: [['greying', 'C1'], ['maturing', 'B2']] }),
  v('w07-d1-04', 'birth rate', 1, { partOfSpeech: 'phrase', definition: 'The number of births per thousand people each year.', example: 'The birth rate has fallen below replacement level in many countries.', synonyms: [['fertility rate', 'C1'], ['natality', 'C1']] }),
  v('w07-d1-05', 'life expectancy', 1, { partOfSpeech: 'phrase', definition: 'The average period a person can expect to live.', example: 'Life expectancy at birth has risen by twenty years since 1950.', synonyms: [['longevity', 'C1'], ['lifespan', 'B2']] }),
  v('w07-d1-06', 'urbanise', 1, { partOfSpeech: 'verb', definition: 'To cause an area to become more like a city.', example: 'Coastal districts have urbanised faster than inland ones.', register: 'C1', synonyms: [['develop', 'B1'], ['city-build', 'C1']] }),
  v('w07-d1-07', 'rural', 1, { partOfSpeech: 'adjective', definition: 'Of or in the countryside.', example: 'Rural depopulation strips villages of their young workforce.', synonyms: [['country', 'B1'], ['agrarian', 'C1']] }),
  v('w07-d1-08', 'urban', 1, { partOfSpeech: 'adjective', definition: 'Of or in cities or towns.', example: 'Urban living concentrates both opportunity and inequality.', synonyms: [['metropolitan', 'C1'], ['city', 'B1']] }),
  v('w07-d1-09', 'migration', 1, { partOfSpeech: 'noun', definition: 'The movement of people from one place to another.', example: 'Internal migration shapes city growth more than international migration.', synonyms: [['movement', 'B2'], ['relocation', 'B2']] }),
  v('w07-d1-10', 'diaspora', 1, { partOfSpeech: 'noun', definition: 'A scattered population sharing a common origin.', example: 'The Vietnamese diaspora supports families with substantial remittances.', register: 'C1', synonyms: [['scattered community', 'C1'], ['expatriate community', 'C1']] }),

  // Day 2 — Verbs of trend & magnitude
  v('w07-d2-01', 'soar', 2, { partOfSpeech: 'verb', definition: 'To rise very quickly to a high level.', example: 'House prices soared by forty per cent in five years.', register: 'C1', synonyms: [['skyrocket', 'C1'], ['surge', 'C1']] }),
  v('w07-d2-02', 'plummet', 2, { partOfSpeech: 'verb', definition: 'To fall straight down very quickly.', example: 'Trust in the institution plummeted after the scandal.', register: 'C1', synonyms: [['plunge', 'C1'], ['nosedive', 'C1']] }),
  v('w07-d2-03', 'fluctuate', 2, { partOfSpeech: 'verb', definition: 'To rise and fall irregularly in number or amount.', example: 'Inflation has fluctuated between two and seven per cent for a year.', register: 'C1', synonyms: [['vary', 'B2'], ['oscillate', 'C1']] }),
  v('w07-d2-04', 'stagnate', 2, { partOfSpeech: 'verb', definition: 'To stop developing or making progress.', example: 'Wages have stagnated for a generation in many sectors.', register: 'C1', synonyms: [['stall', 'B2'], ['plateau', 'C1']] }),
  v('w07-d2-05', 'surge', 2, { partOfSpeech: 'verb', definition: 'To increase suddenly and powerfully.', example: 'Demand for online courses surged during lockdown.', synonyms: [['leap', 'B2'], ['spike', 'C1']] }),
  v('w07-d2-06', 'plateau', 2, { partOfSpeech: 'verb', definition: 'To reach a stable level after a rise.', example: 'Sales plateaued after the third year of growth.', synonyms: [['level off', 'B2'], ['stabilise', 'C1']] }),
  v('w07-d2-07', 'taper off', 2, { partOfSpeech: 'phrase', definition: 'To gradually lessen.', example: 'Visitor numbers taper off after the summer.', synonyms: [['decline', 'B2'], ['diminish', 'C1']] }),
  v('w07-d2-08', 'spike', 2, { partOfSpeech: 'verb', definition: 'To rise sharply and briefly.', example: 'Energy prices spiked during the cold snap.', synonyms: [['jump', 'B1'], ['surge', 'C1']] }),
  v('w07-d2-09', 'rebound', 2, { partOfSpeech: 'verb', definition: 'To recover after a decline.', example: 'Tourism rebounded faster than the airlines expected.', register: 'C1', synonyms: [['recover', 'B2'], ['bounce back', 'B2']] }),
  v('w07-d2-10', 'taper', 2, { partOfSpeech: 'verb', definition: 'To gradually become smaller.', example: 'The state has begun to taper its support to the sector.', register: 'C1', synonyms: [['narrow', 'B2'], ['reduce gradually', 'C1']] }),

  // Day 3 — Social mobility
  v('w07-d3-01', 'mobility', 3, { partOfSpeech: 'noun', definition: 'The ability to move between social or economic groups.', example: 'Social mobility has slowed in most rich countries since the 1980s.', register: 'C1', synonyms: [['movement', 'B2'], ['flexibility', 'C1']] }),
  v('w07-d3-02', 'inequality', 3, { partOfSpeech: 'noun', definition: 'The unfair difference between groups in wealth or opportunity.', example: 'Educational inequality has tracked income inequality for decades.', synonyms: [['disparity', 'C1'], ['imbalance', 'B2']] }),
  v('w07-d3-03', 'class', 3, { partOfSpeech: 'noun', definition: 'A group of people of similar economic and social position.', example: 'A new middle class has emerged across Asian cities.', synonyms: [['social group', 'B2'], ['stratum', 'C1']] }),
  v('w07-d3-04', 'meritocracy', 3, { partOfSpeech: 'noun', definition: 'A society in which advancement depends on ability and effort.', example: 'A pure meritocracy is more often a stated ideal than a lived reality.', register: 'C1', synonyms: [['ability-based system', 'C1'], ['fair system', 'B2']] }),
  v('w07-d3-05', 'privilege', 3, { partOfSpeech: 'noun', definition: 'A special advantage held by a person or group.', example: 'Educational privilege is inherited as quietly as eye colour.', synonyms: [['advantage', 'B2'], ['favour', 'B2']] }),
  v('w07-d3-06', 'disadvantaged', 3, { partOfSpeech: 'adjective', definition: 'Lacking the advantages enjoyed by others.', example: 'Disadvantaged students benefit most from extra tutoring.', synonyms: [['underprivileged', 'C1'], ['marginalised', 'C1']] }),
  v('w07-d3-07', 'marginalised', 3, { partOfSpeech: 'adjective', definition: 'Treated as unimportant in a society.', example: 'Marginalised voices appear in policy only when they organise.', register: 'C1', synonyms: [['excluded', 'B2'], ['sidelined', 'C1']] }),
  v('w07-d3-08', 'integrate', 3, { partOfSpeech: 'verb', definition: 'To become a full part of a group or society.', example: 'New arrivals integrate fastest when they find work quickly.', synonyms: [['assimilate', 'C1'], ['blend in', 'B2']] }),
  v('w07-d3-09', 'cohesion', 3, { partOfSpeech: 'noun', definition: 'The state of being united and working together.', example: 'Local sports clubs build cohesion that schools cannot.', register: 'C1', synonyms: [['unity', 'B2'], ['solidarity', 'C1']] }),
  v('w07-d3-10', 'segregation', 3, { partOfSpeech: 'noun', definition: 'The act of keeping groups apart.', example: 'Neighbourhood segregation persists even where laws have changed.', register: 'C1', synonyms: [['separation', 'B2'], ['division', 'B2']] }),

  // Day 4 — Public discourse
  v('w07-d4-01', 'discourse', 4, { partOfSpeech: 'noun', definition: 'Serious discussion of a particular subject.', example: 'Public discourse has shifted from print to short video.', register: 'C1', synonyms: [['debate', 'B2'], ['conversation', 'B1']] }),
  v('w07-d4-02', 'polarised', 4, { partOfSpeech: 'adjective', definition: 'Divided sharply into two opposing groups.', example: 'A polarised debate produces heat without much light.', register: 'C1', synonyms: [['divided', 'B2'], ['split', 'B2']] }),
  v('w07-d4-03', 'consensus', 4, { partOfSpeech: 'noun', definition: 'A general agreement.', example: 'A working consensus on the climate emerged in the 1990s.', synonyms: [['agreement', 'B2'], ['accord', 'C1']] }),
  v('w07-d4-04', 'controversy', 4, { partOfSpeech: 'noun', definition: 'A serious public disagreement.', example: 'The reform sparked a controversy that lasted a decade.', register: 'C1', synonyms: [['dispute', 'B2'], ['debate', 'B2']] }),
  v('w07-d4-05', 'rhetoric', 4, { partOfSpeech: 'noun', definition: 'Speech designed to persuade, often without substance.', example: 'Political rhetoric has grown sharper since the rise of social media.', register: 'C1', synonyms: [['oratory', 'C1'], ['persuasion', 'B2']] }),
  v('w07-d4-06', 'demagogue', 4, { partOfSpeech: 'noun', definition: 'A leader who exploits popular emotion to gain power.', example: 'A demagogue thrives in conditions of fear and uncertainty.', register: 'C1', synonyms: [['rabble-rouser', 'C1'], ['populist', 'C1']] }),
  v('w07-d4-07', 'civic', 4, { partOfSpeech: 'adjective', definition: 'Relating to the duties of a citizen.', example: 'Civic participation has fallen for half a century.', register: 'C1', synonyms: [['communal', 'C1'], ['public', 'B1']] }),
  v('w07-d4-08', 'engagement', 4, { partOfSpeech: 'noun', definition: 'Involvement in something, usually as a participant.', example: 'Civic engagement among the young is rising again.', synonyms: [['participation', 'B2'], ['involvement', 'B2']] }),
  v('w07-d4-09', 'dialogue', 4, { partOfSpeech: 'noun', definition: 'A conversation between two or more people or sides.', example: 'A dialogue between policymakers and protesters has finally begun.', synonyms: [['discussion', 'B2'], ['exchange', 'B2']] }),
  v('w07-d4-10', 'narrative', 4, { partOfSpeech: 'noun', definition: 'A particular way of telling and interpreting events.', example: 'Each side built its own narrative of the same protest.', register: 'C1', synonyms: [['story', 'B1'], ['account', 'B2']] }),

  // Day 5 — Hedging & qualification
  v('w07-d5-01', 'arguably', 5, { partOfSpeech: 'adverb', definition: 'It can be argued that.', example: 'It is arguably the most important reform of the decade.', register: 'C1', synonyms: [['possibly', 'B2'], ['conceivably', 'C1']] }),
  v('w07-d5-02', 'tend to', 5, { partOfSpeech: 'phrase', definition: 'To be likely to behave in a certain way.', example: 'Younger voters tend to favour the smaller parties.', synonyms: [['be inclined to', 'B2'], ['be apt to', 'C1']] }),
  v('w07-d5-03', 'on the whole', 5, { partOfSpeech: 'phrase', definition: 'In general, considering everything.', example: 'On the whole, the experiment succeeded.', synonyms: [['overall', 'B2'], ['by and large', 'C1']] }),
  v('w07-d5-04', 'to some extent', 5, { partOfSpeech: 'phrase', definition: 'In some degree, but not entirely.', example: 'To some extent, the criticism is fair.', synonyms: [['partly', 'B1'], ['somewhat', 'B2']] }),
  v('w07-d5-05', 'in most cases', 5, { partOfSpeech: 'phrase', definition: 'In the majority of situations, but not all.', example: 'In most cases, slow change beats sudden change.', synonyms: [['usually', 'B1'], ['generally', 'B2']] }),
  v('w07-d5-06', 'as a rule', 5, { partOfSpeech: 'phrase', definition: 'Usually, in general practice.', example: 'As a rule, late students sit at the back.', synonyms: [['generally', 'B2'], ['typically', 'B2']] }),
  v('w07-d5-07', 'broadly speaking', 5, { partOfSpeech: 'phrase', definition: 'In general terms.', example: 'Broadly speaking, the reform has worked.', register: 'C1', synonyms: [['in general', 'B2'], ['by and large', 'C1']] }),
  v('w07-d5-08', 'apparently', 5, { partOfSpeech: 'adverb', definition: 'According to the way it appears, though one is not certain.', example: 'Apparently, the deal had been struck weeks earlier.', synonyms: [['seemingly', 'C1'], ['evidently', 'C1']] }),
  v('w07-d5-09', 'allegedly', 5, { partOfSpeech: 'adverb', definition: 'Said to be the case but not proven.', example: 'The minister allegedly knew about the contract.', register: 'C1', synonyms: [['supposedly', 'B2'], ['reputedly', 'C1']] }),
  v('w07-d5-10', 'ostensibly', 5, { partOfSpeech: 'adverb', definition: 'As appears or is stated to be true, though perhaps not really so.', example: 'Ostensibly a charity, the body was funded by a single donor.', register: 'C1', synonyms: [['apparently', 'B2'], ['outwardly', 'C1']] }),

  // Day 6 — Verbs of argument
  v('w07-d6-01', 'argue', 6, { partOfSpeech: 'verb', definition: 'To give reasons for or against something.', example: 'Critics argue that the policy ignores rural areas.', synonyms: [['contend', 'C1'], ['maintain', 'C1']] }),
  v('w07-d6-02', 'maintain', 6, { partOfSpeech: 'verb', definition: 'To state firmly that something is true.', example: 'The author maintains that markets cannot solve the problem alone.', register: 'C1', synonyms: [['assert', 'C1'], ['claim', 'B2']] }),
  v('w07-d6-03', 'assert', 6, { partOfSpeech: 'verb', definition: 'To state confidently that something is true.', example: 'She asserts her conclusions but provides little evidence.', register: 'C1', synonyms: [['contend', 'C1'], ['affirm', 'C1']] }),
  v('w07-d6-04', 'contend', 6, { partOfSpeech: 'verb', definition: 'To argue earnestly that something is the case.', example: 'The defence contends that the evidence was unreliable.', register: 'C1', synonyms: [['argue', 'B2'], ['claim', 'B2']] }),
  v('w07-d6-05', 'concede', 6, { partOfSpeech: 'verb', definition: 'To admit that something is true after first disagreeing.', example: 'The panel conceded that the criticism had merit.', register: 'C1', synonyms: [['acknowledge', 'C1'], ['admit', 'B2']] }),
  v('w07-d6-06', 'acknowledge', 6, { partOfSpeech: 'verb', definition: 'To accept the truth or existence of something.', example: 'Examiners reward writing that acknowledges counter-arguments.', synonyms: [['admit', 'B2'], ['recognise', 'B2']] }),
  v('w07-d6-07', 'refute', 6, { partOfSpeech: 'verb', definition: 'To prove a statement to be false.', example: 'The paper refutes the central claim of the earlier study.', register: 'C1', synonyms: [['disprove', 'C1'], ['rebut', 'C1']] }),
  v('w07-d6-08', 'rebut', 6, { partOfSpeech: 'verb', definition: 'To respond to an accusation by giving reasons against it.', example: 'The lawyer rebutted the testimony point by point.', register: 'C1', synonyms: [['counter', 'B2'], ['contradict', 'B2']] }),
  v('w07-d6-09', 'qualify', 6, { partOfSpeech: 'verb', definition: 'To make a statement less strong or absolute.', example: 'A good essay qualifies its claims rather than overstating them.', register: 'C1', synonyms: [['hedge', 'C1'], ['moderate', 'C1']] }),
  v('w07-d6-10', 'undermine', 6, { partOfSpeech: 'verb', definition: 'To weaken something gradually.', example: 'A single counter-example can undermine a sweeping generalisation.', register: 'C1', synonyms: [['weaken', 'B2'], ['erode', 'C1']] }),

  // Day 7 — Pace of change
  v('w07-d7-01', 'gradual', 7, { partOfSpeech: 'adjective', definition: 'Happening slowly over a long period.', example: 'A gradual rise in trust is more durable than a sharp one.', synonyms: [['progressive', 'B2'], ['incremental', 'C1']] }),
  v('w07-d7-02', 'sudden', 7, { partOfSpeech: 'adjective', definition: 'Happening unexpectedly and quickly.', example: 'A sudden policy reversal caught the markets off guard.', synonyms: [['abrupt', 'B2'], ['unexpected', 'B2']] }),
  v('w07-d7-03', 'incremental', 7, { partOfSpeech: 'adjective', definition: 'Increasing by small amounts in regular stages.', example: 'Incremental change rarely makes headlines but often outlasts the dramatic kind.', register: 'C1', synonyms: [['gradual', 'B2'], ['piecemeal', 'C1']] }),
  v('w07-d7-04', 'radical', 7, { partOfSpeech: 'adjective', definition: 'Affecting the basic nature of something.', example: 'A radical reform of pensions has been delayed for a generation.', synonyms: [['fundamental', 'C1'], ['drastic', 'B2']] }),
  v('w07-d7-05', 'overhaul', 7, { partOfSpeech: 'noun', definition: 'A complete examination and reorganisation.', example: 'The organisation is overdue for an overhaul.', register: 'C1', synonyms: [['reform', 'B2'], ['revamp', 'C1']] }),
  v('w07-d7-06', 'transition', 7, { partOfSpeech: 'noun', definition: 'A change from one state to another.', example: 'A clean energy transition will take decades, not years.', synonyms: [['shift', 'B2'], ['changeover', 'B2']] }),
  v('w07-d7-07', 'transformation', 7, { partOfSpeech: 'noun', definition: 'A complete change in form, appearance, or character.', example: 'The high street has undergone a transformation since 2010.', synonyms: [['change', 'B1'], ['metamorphosis', 'C1']] }),
  v('w07-d7-08', 'phase out', 7, { partOfSpeech: 'phrase', definition: 'To stop using or producing something gradually.', example: 'The country plans to phase out coal-fired power by 2030.', synonyms: [['discontinue', 'C1'], ['eliminate', 'B2']] }),
  v('w07-d7-09', 'roll out', 7, { partOfSpeech: 'phrase', definition: 'To introduce something new on a large scale.', example: 'The new system will be rolled out nationally next quarter.', synonyms: [['launch', 'B2'], ['introduce', 'B1']] }),
  v('w07-d7-10', 'usher in', 7, { partOfSpeech: 'phrase', definition: 'To bring about the start of a new period.', example: 'The reform ushered in a decade of stable growth.', register: 'C1', synonyms: [['inaugurate', 'C1'], ['herald', 'C1']] }),
]

interface VocabInput { partOfSpeech: VocabularyLexiconItem['partOfSpeech']; definition: string; example: string; register?: VocabularyLexiconItem['register']; topic?: string; frequency?: VocabularyLexiconItem['frequency']; synonyms: Array<[string, VocabularyLexiconItem['register'], string?]> }
function v(shortId: string, headword: string, day: 1|2|3|4|5|6|7, input: VocabInput): VocabularyLexiconItem {
  return { discipline: 'vocabulary', id: `int-vocab-${shortId}`, headword, partOfSpeech: input.partOfSpeech, definition: input.definition, example: input.example, register: input.register ?? 'B2', topic: input.topic ?? 'society', frequency: input.frequency ?? 'medium', synonyms: input.synonyms.map(([word, register, nuance]) => ({ word, register, ...(nuance ? { nuance } : {}) })), level: 'intermediate', week: 7, day }
}

export const INTERMEDIATE_VOCAB_WEEK_07: VocabularyLexiconItem[] = items
