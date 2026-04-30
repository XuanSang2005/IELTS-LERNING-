import type { CollocationLexiconItem } from '@shared/schemas/lexicon-items'

/** Intermediate · Week 08 · Health chunks. 49 items, 7/day. Lead a sedentary lifestyle, suffer from obesity, raise awareness — health-essay pairings to Band 7. */

const items: CollocationLexiconItem[] = [
  // Day 1
  c('w08-d1-01', 'lead a healthy lifestyle', 1, 'verb-noun', 'live in a way that promotes health', 'Leading a healthy lifestyle is a habit, not a project.', ['maintain wellness', 'live well']),
  c('w08-d1-02', 'lead a sedentary lifestyle', 1, 'verb-noun', 'live with little physical activity', 'Office workers often lead a sedentary lifestyle without realising it.', ['sit too much', 'be inactive']),
  c('w08-d1-03', 'maintain good health', 1, 'verb-noun', 'keep oneself in good physical condition', 'Maintaining good health requires sleep as much as exercise.', ['stay fit', 'keep well']),
  c('w08-d1-04', 'eat a balanced diet', 1, 'verb-noun', 'consume a varied range of foods', 'Eating a balanced diet beats most expensive supplements.', ['eat varied food', 'consume varied nutrients']),
  c('w08-d1-05', 'take exercise', 1, 'verb-noun', 'engage in physical activity', 'Doctors recommend taking exercise five times a week.', ['work out', 'do physical activity']),
  c('w08-d1-06', 'get enough sleep', 1, 'verb-noun', 'sleep for the recommended hours', 'Most adults fail to get enough sleep on weekdays.', ['sleep well', 'rest sufficiently']),
  c('w08-d1-07', 'stay active', 1, 'verb-adjective', 'remain physically engaged', 'Staying active in retirement extends life expectancy.', ['keep moving', 'remain on the move']),

  // Day 2
  c('w08-d2-01', 'suffer from stress', 2, 'verb-preposition', 'experience mental strain', 'Many students suffer from stress during exam periods.', ['be under stress', 'experience anxiety']),
  c('w08-d2-02', 'suffer from depression', 2, 'verb-preposition', 'have the medical condition of depression', 'One in five adults suffers from depression at some point.', ['be depressed', 'have low mood']),
  c('w08-d2-03', 'cope with stress', 2, 'verb-preposition', 'manage difficult emotional pressure', 'Learning to cope with stress matters as much as avoiding it.', ['handle pressure', 'manage strain']),
  c('w08-d2-04', 'suffer from anxiety', 2, 'verb-preposition', 'experience persistent worry', 'Test anxiety affects high-achievers more than people realise.', ['feel anxious', 'experience worry']),
  c('w08-d2-05', 'mental wellbeing', 2, 'adjective-noun', 'state of psychological health', 'Workplace mental wellbeing is now a board-level concern.', ['psychological health', 'mental health']),
  c('w08-d2-06', 'seek treatment', 2, 'verb-noun', 'look for medical care', 'Many men delay seeking treatment for mental health.', ['get help', 'find help']),
  c('w08-d2-07', 'recover from illness', 2, 'verb-preposition', 'regain health after sickness', 'Most patients recover from illness within a fortnight.', ['get better', 'heal']),

  // Day 3
  c('w08-d3-01', 'public health', 3, 'adjective-noun', 'health of the population as a whole', 'Public health policies work in decades, not news cycles.', ['community health', 'population health']),
  c('w08-d3-02', 'raise awareness', 3, 'verb-noun', 'increase public knowledge of an issue', 'Campaigns to raise awareness work best with policy reinforcement.', ['promote understanding', 'inform the public']),
  c('w08-d3-03', 'tackle obesity', 3, 'verb-noun', 'address the problem of obesity', 'Tackling obesity requires changes in food, exercise, and education.', ['address obesity', 'fight obesity']),
  c('w08-d3-04', 'health campaign', 3, 'noun-noun', 'organised effort to improve public health', 'A short health campaign cut sugary-drink sales sharply.', ['public health drive', 'awareness campaign']),
  c('w08-d3-05', 'vaccination programme', 3, 'noun-noun', 'organised effort to immunise population', 'A national vaccination programme eradicated polio in many countries.', ['immunisation drive', 'vaccine programme']),
  c('w08-d3-06', 'medical research', 3, 'adjective-noun', 'scientific investigation of medicine', 'Medical research takes a generation to yield reliable findings.', ['health research', 'scientific medical study']),
  c('w08-d3-07', 'preventive medicine', 3, 'adjective-noun', 'medical care that prevents disease', 'Preventive medicine costs less than treatment of advanced disease.', ['prophylactic medicine', 'preventative care']),

  // Day 4
  c('w08-d4-01', 'access healthcare', 4, 'verb-noun', 'be able to obtain medical services', 'Rural communities struggle to access healthcare specialists.', ['get medical care', 'reach health services']),
  c('w08-d4-02', 'health insurance', 4, 'noun-noun', 'cover for medical costs', 'Health insurance schemes vary widely in coverage.', ['medical cover', 'health policy']),
  c('w08-d4-03', 'medical treatment', 4, 'adjective-noun', 'medical care for an illness', 'Modern medical treatment can extend life by decades.', ['medical care', 'therapy']),
  c('w08-d4-04', 'undergo surgery', 4, 'verb-noun', 'have a surgical operation', 'She underwent surgery and returned to work in three weeks.', ['have an operation', 'be operated on']),
  c('w08-d4-05', 'visit the doctor', 4, 'verb-noun', 'go to a doctor for consultation', 'I visit the doctor once a year for a check-up.', ['see a physician', 'consult a doctor']),
  c('w08-d4-06', 'prescribe medication', 4, 'verb-noun', 'order a particular drug for a patient', 'The doctor prescribed medication for the infection.', ['recommend medicine', 'order drugs']),
  c('w08-d4-07', 'take medication', 4, 'verb-noun', 'consume prescribed drugs', 'Taking medication on schedule is half the battle.', ['take pills', 'use prescribed drugs']),

  // Day 5
  c('w08-d5-01', 'chronic illness', 5, 'adjective-noun', 'long-lasting medical condition', 'Chronic illness accounts for most healthcare costs.', ['long-term illness', 'persistent disease']),
  c('w08-d5-02', 'acute condition', 5, 'adjective-noun', 'short and severe medical state', 'An acute condition resolves within weeks if treated.', ['severe condition', 'sharp illness']),
  c('w08-d5-03', 'serious illness', 5, 'adjective-noun', 'severe medical condition', 'A serious illness in the family changes every priority.', ['grave condition', 'severe disease']),
  c('w08-d5-04', 'develop a condition', 5, 'verb-noun', 'come to have a medical issue', 'Many people develop a chronic condition in middle age.', ['contract', 'come down with']),
  c('w08-d5-05', 'spread of disease', 5, 'noun-noun', 'movement of illness through population', 'Hand washing slows the spread of disease in schools.', ['disease transmission', 'contagion']),
  c('w08-d5-06', 'be diagnosed with', 5, 'verb-preposition', 'be identified as having a condition', 'She was diagnosed with diabetes last year.', ['be found to have', 'receive a diagnosis of']),
  c('w08-d5-07', 'make a recovery', 5, 'verb-noun', 'get better after illness', 'He made a full recovery within six weeks.', ['recover', 'get better']),

  // Day 6
  c('w08-d6-01', 'practise mindfulness', 6, 'verb-noun', 'engage in present-moment awareness', 'Practising mindfulness lowers measured stress within weeks.', ['meditate', 'be present']),
  c('w08-d6-02', 'achieve work-life balance', 6, 'verb-noun', 'maintain harmony between work and personal life', 'Achieving work-life balance requires saying no to small things.', ['balance work and life', 'keep things in proportion']),
  c('w08-d6-03', 'manage time effectively', 6, 'verb-adverb', 'use time well', 'Managing time effectively reduces stress more than working harder.', ['use time well', 'be productive']),
  c('w08-d6-04', 'reduce stress levels', 6, 'verb-noun', 'lower the amount of stress', 'A short walk reduces stress levels measurably.', ['lower stress', 'ease pressure']),
  c('w08-d6-05', 'relieve pressure', 6, 'verb-noun', 'reduce mental or emotional strain', 'A frank conversation can relieve pressure built over weeks.', ['ease pressure', 'lessen strain']),
  c('w08-d6-06', 'switch off', 6, 'verb', 'stop thinking about work or worries', 'It is hard to switch off when notifications never stop.', ['unwind', 'disconnect']),
  c('w08-d6-07', 'unwind after work', 6, 'verb-preposition', 'relax after the working day', 'A short walk to unwind after work works better than another coffee.', ['relax after work', 'decompress']),

  // Day 7
  c('w08-d7-01', 'quit smoking', 7, 'verb-noun', 'stop the habit of smoking', 'Quitting smoking adds years to life expectancy.', ['give up smoking', 'stop smoking']),
  c('w08-d7-02', 'avoid junk food', 7, 'verb-noun', 'stay away from unhealthy food', 'Avoiding junk food is easier when there are alternatives at hand.', ['skip processed food', 'cut out fast food']),
  c('w08-d7-03', 'cut down on sugar', 7, 'verb-preposition', 'reduce consumption of sugar', 'Cutting down on sugar lowers cavities and improves sleep.', ['reduce sugar', 'limit sugar intake']),
  c('w08-d7-04', 'drink moderately', 7, 'verb-adverb', 'consume alcohol in limited amounts', 'Doctors advise drinking moderately rather than abstaining for some patients.', ['drink in moderation', 'limit alcohol']),
  c('w08-d7-05', 'lose weight', 7, 'verb-noun', 'reduce body weight', 'Losing weight slowly is more sustainable than crash dieting.', ['shed pounds', 'slim down']),
  c('w08-d7-06', 'gain weight', 7, 'verb-noun', 'increase body weight', 'It is easier to gain weight than to lose it back.', ['put on weight', 'add pounds']),
  c('w08-d7-07', 'stay in shape', 7, 'verb-preposition', 'maintain physical fitness', 'Staying in shape requires daily routine more than weekly intensity.', ['keep fit', 'maintain fitness']),
]

function c(shortId: string, phrase: string, day: 1|2|3|4|5|6|7, pattern: CollocationLexiconItem['pattern'], definition: string, example: string, alternatives: string[], register: CollocationLexiconItem['register'] = 'B2'): CollocationLexiconItem {
  return { discipline: 'collocations', id: `int-colloc-${shortId}`, phrase, pattern, definition, example, register, topic: 'health', alternatives, level: 'intermediate', week: 8, day }
}

export const INTERMEDIATE_COLLOC_WEEK_08: CollocationLexiconItem[] = items
