import type { CollocationLexiconItem } from '@shared/schemas/lexicon-items'

/** Intermediate · Week 11 · Civic chunks. 49 items, 7/day. Pass legislation, raise concerns, take legal action — verbs of policy and procedure. */

const items: CollocationLexiconItem[] = [
  c('w11-d1-01', 'pass a law', 1, 'verb-noun', 'enact legislation', 'Parliament passed a law on data protection last year.', ['enact legislation', 'legislate']),
  c('w11-d1-02', 'pass legislation', 1, 'verb-noun', 'formally make a law', 'It took two attempts to pass the legislation.', ['enact a law', 'make a statute']),
  c('w11-d1-03', 'introduce a bill', 1, 'verb-noun', 'propose a new law', 'A backbench MP introduced a bill on plastic waste.', ['propose legislation', 'put forward a bill']),
  c('w11-d1-04', 'amend the law', 1, 'verb-noun', 'change an existing law', 'A small change amended the law to close the loophole.', ['modify the law', 'revise legislation']),
  c('w11-d1-05', 'enforce the law', 1, 'verb-noun', 'ensure laws are obeyed', 'Police enforce the law most visibly during festivals.', ['uphold the law', 'apply the law']),
  c('w11-d1-06', 'break the law', 1, 'verb-noun', 'do something illegal', 'Few people deliberately break the law; many do so by accident.', ['violate the law', 'commit an offence']),
  c('w11-d1-07', 'obey the law', 1, 'verb-noun', 'follow the law', 'Most citizens obey the law even when no one is watching.', ['comply with the law', 'follow the law']),

  c('w11-d2-01', 'cast a vote', 2, 'verb-noun', 'submit a ballot', 'Younger voters cast a vote less often than older ones.', ['submit a ballot', 'go to the polls']),
  c('w11-d2-02', 'hold an election', 2, 'verb-noun', 'organise a formal vote', 'The country holds an election every five years.', ['organise a poll', 'run an election']),
  c('w11-d2-03', 'win an election', 2, 'verb-noun', 'be victorious in an election', 'A coalition won the election by twelve seats.', ['secure a victory', 'come first']),
  c('w11-d2-04', 'voter turnout', 2, 'noun-noun', 'percentage of voters who participate', 'Voter turnout fell again in the local elections.', ['election turnout', 'participation']),
  c('w11-d2-05', 'free and fair', 2, 'adjective', 'conducted without manipulation', 'Independent observers declared the election free and fair.', ['democratic', 'unrigged']),
  c('w11-d2-06', 'launch a campaign', 2, 'verb-noun', 'begin an organised effort', 'The party launched a campaign focused on housing.', ['start a campaign', 'kick off a drive']),
  c('w11-d2-07', 'announce a policy', 2, 'verb-noun', 'publicly state a planned action', 'The minister announced a policy on rural broadband.', ['unveil a policy', 'reveal a plan']),

  c('w11-d3-01', 'commit a crime', 3, 'verb-noun', 'do something illegal', 'Most who commit a crime do so out of opportunity, not planning.', ['perpetrate a crime', 'do wrong']),
  c('w11-d3-02', 'crime rate', 3, 'noun-noun', 'frequency of crime in a population', 'The crime rate has fallen for a decade.', ['crime statistics', 'crime levels']),
  c('w11-d3-03', 'fight crime', 3, 'verb-noun', 'work to reduce criminal activity', 'Local groups fight crime by improving lighting and youth activities.', ['combat crime', 'tackle crime']),
  c('w11-d3-04', 'reduce crime', 3, 'verb-noun', 'lower the amount of criminal activity', 'Investments in education reduce crime more than longer prison terms.', ['cut crime', 'lower offending']),
  c('w11-d3-05', 'serve a sentence', 3, 'verb-noun', 'undergo a court-imposed punishment', 'He served a sentence of three years before parole.', ['do time', 'serve time']),
  c('w11-d3-06', 'press charges', 3, 'verb-noun', 'formally accuse someone of a crime', 'The victim chose not to press charges.', ['file charges', 'bring charges']),
  c('w11-d3-07', 'stand trial', 3, 'verb-noun', 'be tried in court', 'The accused will stand trial in March.', ['face trial', 'be tried']),

  c('w11-d4-01', 'human rights', 4, 'adjective-noun', 'basic rights of every person', 'Human rights survive only when courts will defend them.', ['fundamental rights', 'civil liberties']),
  c('w11-d4-02', 'civil rights', 4, 'adjective-noun', 'rights of citizens to equal treatment', 'Civil rights movements transformed the twentieth century.', ['citizen rights', 'civil liberties']),
  c('w11-d4-03', 'freedom of speech', 4, 'noun-preposition', 'right to express opinions freely', 'Freedom of speech has limits even in liberal societies.', ['free speech', 'free expression']),
  c('w11-d4-04', 'right to vote', 4, 'noun-preposition', 'entitlement to participate in elections', 'Universal right to vote was won unevenly across countries.', ['suffrage', 'voting rights']),
  c('w11-d4-05', 'protect rights', 4, 'verb-noun', 'safeguard entitlements', 'Independent courts protect rights from majoritarian erosion.', ['safeguard rights', 'defend rights']),
  c('w11-d4-06', 'violate rights', 4, 'verb-noun', 'breach legal entitlements', 'A government that violates rights loses legitimacy at home and abroad.', ['breach rights', 'infringe rights']),
  c('w11-d4-07', 'gain independence', 4, 'verb-noun', 'become independent from foreign rule', 'Many nations gained independence in the post-war decades.', ['win independence', 'achieve independence']),

  c('w11-d5-01', 'public service', 5, 'adjective-noun', 'service provided to the public', 'A career in public service rarely brings wealth, but often meaning.', ['government service', 'civil service']),
  c('w11-d5-02', 'serve the public', 5, 'verb-noun', 'work for the benefit of citizens', 'A doctor in the public sector serves the public for less pay.', ['work for the public', 'help citizens']),
  c('w11-d5-03', 'public good', 5, 'adjective-noun', 'something benefiting the whole community', 'Clean air is a public good and cannot be priced individually.', ['common good', 'collective benefit']),
  c('w11-d5-04', 'public interest', 5, 'adjective-noun', 'welfare of the general public', 'The decision was made in the public interest.', ['common interest', 'general welfare']),
  c('w11-d5-05', 'common good', 5, 'adjective-noun', 'what benefits all members of a community', 'Politics rarely speaks of the common good these days.', ['public good', 'collective benefit']),
  c('w11-d5-06', 'address concerns', 5, 'verb-noun', 'attend to worries', 'A short town meeting addressed local concerns about the new road.', ['respond to worries', 'tackle concerns']),
  c('w11-d5-07', 'raise concerns', 5, 'verb-noun', 'express worries', 'Several parents raised concerns about screen time in classrooms.', ['voice concerns', 'flag worries']),

  c('w11-d6-01', 'take action', 6, 'verb-noun', 'do something to achieve a result', 'The government took action only after public pressure mounted.', ['act', 'intervene']),
  c('w11-d6-02', 'take legal action', 6, 'verb-noun', 'sue or prosecute someone', 'Several customers took legal action over the breach.', ['sue', 'go to court']),
  c('w11-d6-03', 'take responsibility', 6, 'verb-noun', 'accept accountability', 'A leader who takes responsibility builds quiet trust.', ['accept blame', 'be accountable']),
  c('w11-d6-04', 'take measures', 6, 'verb-noun', 'undertake formal actions', 'The council took measures to reduce traffic in the centre.', ['take steps', 'implement measures']),
  c('w11-d6-05', 'take steps', 6, 'verb-noun', 'do specific things to address an issue', 'The firm has taken steps to reduce its carbon footprint.', ['take action', 'make moves']),
  c('w11-d6-06', 'reach agreement', 6, 'verb-noun', 'arrive at a mutual decision', 'After months of talks, the two sides reached agreement.', ['come to an agreement', 'find common ground']),
  c('w11-d6-07', 'sign a treaty', 6, 'verb-noun', 'formally enter into a treaty', 'The countries signed a treaty on shared waterways.', ['enter a treaty', 'conclude a treaty']),

  c('w11-d7-01', 'national security', 7, 'adjective-noun', 'protection of a country from threat', 'National security is invoked more often than it is defined.', ['homeland security', 'state security']),
  c('w11-d7-02', 'public safety', 7, 'adjective-noun', 'safety of the general population', 'New regulations focus on public safety in tall buildings.', ['community safety', 'general safety']),
  c('w11-d7-03', 'maintain order', 7, 'verb-noun', 'keep peaceful and orderly behaviour', 'A small police presence helped maintain order at the rally.', ['keep order', 'preserve order']),
  c('w11-d7-04', 'restore peace', 7, 'verb-noun', 'bring back peaceful conditions', 'A peace agreement restored peace after a decade of fighting.', ['bring back peace', 'reestablish peace']),
  c('w11-d7-05', 'declare war', 7, 'verb-noun', 'formally announce armed conflict', 'No major power has declared war since 1945.', ['announce hostilities', 'enter war']),
  c('w11-d7-06', 'avoid conflict', 7, 'verb-noun', 'prevent dispute or fighting', 'Skilled diplomats avoid conflict before it begins.', ['prevent conflict', 'sidestep dispute']),
  c('w11-d7-07', 'resolve a dispute', 7, 'verb-noun', 'settle a disagreement', 'The mediator helped resolve the dispute over the boundary.', ['settle a dispute', 'sort out a quarrel']),
]

function c(shortId: string, phrase: string, day: 1|2|3|4|5|6|7, pattern: CollocationLexiconItem['pattern'], definition: string, example: string, alternatives: string[], register: CollocationLexiconItem['register'] = 'B2'): CollocationLexiconItem {
  return { discipline: 'collocations', id: `int-colloc-${shortId}`, phrase, pattern, definition, example, register, topic: 'civic', alternatives, level: 'intermediate', week: 11, day }
}

export const INTERMEDIATE_COLLOC_WEEK_11: CollocationLexiconItem[] = items
