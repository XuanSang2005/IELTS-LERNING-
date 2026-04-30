import type { VocabularyLexiconItem } from '@shared/schemas/lexicon-items'

/** Intermediate · Week 08 · Health and wellbeing. 70 items. The body, the mind, and the public-health vocabulary of an essay — symptoms, prevention, treatment, policy. */

const items: VocabularyLexiconItem[] = [
  // Day 1 — The body & symptoms
  v('w08-d1-01', 'symptom', 1, { partOfSpeech: 'noun', definition: 'A sign of illness in the body.', example: 'A fever is the body\'s first symptom of infection.', synonyms: [['sign', 'B1'], ['indication', 'C1']] }),
  v('w08-d1-02', 'diagnosis', 1, { partOfSpeech: 'noun', definition: 'The identification of an illness from symptoms.', example: 'Early diagnosis remains the most powerful tool against most cancers.', register: 'C1', synonyms: [['identification', 'B2'], ['determination', 'C1']] }),
  v('w08-d1-03', 'chronic', 1, { partOfSpeech: 'adjective', definition: 'Continuing for a long time, often a lifetime.', example: 'Chronic conditions account for most healthcare costs.', register: 'C1', synonyms: [['long-term', 'B2'], ['persistent', 'C1']] }),
  v('w08-d1-04', 'acute', 1, { partOfSpeech: 'adjective', definition: 'Short and severe.', example: 'Acute pain after surgery usually fades within a week.', register: 'C1', synonyms: [['severe', 'B2'], ['intense', 'B2']] }),
  v('w08-d1-05', 'fatigue', 1, { partOfSpeech: 'noun', definition: 'Extreme tiredness.', example: 'Persistent fatigue is the most under-reported symptom in clinics.', register: 'C1', synonyms: [['exhaustion', 'C1'], ['weariness', 'C1']] }),
  v('w08-d1-06', 'inflammation', 1, { partOfSpeech: 'noun', definition: 'Swelling or pain in part of the body.', example: 'Chronic inflammation is linked to many later conditions.', register: 'C1', synonyms: [['swelling', 'B2'], ['irritation', 'B2']] }),
  v('w08-d1-07', 'immunity', 1, { partOfSpeech: 'noun', definition: 'The body\'s ability to resist disease.', example: 'Childhood vaccinations build immunity that lasts a lifetime.', register: 'C1', synonyms: [['resistance', 'B2'], ['protection', 'B1']] }),
  v('w08-d1-08', 'pathogen', 1, { partOfSpeech: 'noun', definition: 'A bacterium or virus that causes disease.', example: 'A novel pathogen tests every public-health system.', register: 'C1', synonyms: [['germ', 'B2'], ['microbe', 'C1']] }),
  v('w08-d1-09', 'recover', 1, { partOfSpeech: 'verb', definition: 'To return to a normal state of health.', example: 'Most patients recover fully within a fortnight.', synonyms: [['heal', 'B2'], ['mend', 'B2']] }),
  v('w08-d1-10', 'relapse', 1, { partOfSpeech: 'noun', definition: 'A return of an illness after improvement.', example: 'A relapse can be more discouraging than the original illness.', register: 'C1', synonyms: [['recurrence', 'C1'], ['setback', 'B2']] }),

  // Day 2 — Mental health
  v('w08-d2-01', 'wellbeing', 2, { partOfSpeech: 'noun', definition: 'The state of being healthy and content.', example: 'Workplace wellbeing has become a board-level concern.', synonyms: [['welfare', 'B2'], ['health', 'B1']] }),
  v('w08-d2-02', 'anxiety', 2, { partOfSpeech: 'noun', definition: 'A feeling of worry or unease.', example: 'Test anxiety affects high-achievers more than is often realised.', synonyms: [['worry', 'B1'], ['apprehension', 'C1']] }),
  v('w08-d2-03', 'depression', 2, { partOfSpeech: 'noun', definition: 'A serious medical condition causing sadness and loss of interest.', example: 'Depression is treatable but still under-diagnosed in older men.', synonyms: [['low mood', 'B2'], ['melancholy', 'C1']] }),
  v('w08-d2-04', 'stress', 2, { partOfSpeech: 'noun', definition: 'Mental or emotional strain.', example: 'Sustained stress damages both sleep and judgement.', synonyms: [['strain', 'B2'], ['pressure', 'B1']] }),
  v('w08-d2-05', 'burnout', 2, { partOfSpeech: 'noun', definition: 'Exhaustion caused by long-term stress.', example: 'Burnout signals a system problem more often than a personal one.', register: 'C1', synonyms: [['exhaustion', 'C1'], ['fatigue', 'C1']] }),
  v('w08-d2-06', 'resilience', 2, { partOfSpeech: 'noun', definition: 'The ability to recover quickly from difficulties.', example: 'Resilience is a skill, not a personality trait.', register: 'C1', synonyms: [['toughness', 'B2'], ['hardiness', 'C1']] }),
  v('w08-d2-07', 'mindfulness', 2, { partOfSpeech: 'noun', definition: 'A mental state of being attentive to the present moment.', example: 'A short daily mindfulness practice lowers measured anxiety.', register: 'C1', synonyms: [['awareness', 'B2'], ['attentiveness', 'C1']] }),
  v('w08-d2-08', 'cope', 2, { partOfSpeech: 'verb', definition: 'To deal effectively with a difficult situation.', example: 'Knowing how to cope with setbacks matters more than avoiding them.', synonyms: [['manage', 'B1'], ['handle', 'B1']] }),
  v('w08-d2-09', 'therapy', 2, { partOfSpeech: 'noun', definition: 'Treatment intended to relieve a disorder.', example: 'Talk therapy is now widely available through public services.', synonyms: [['treatment', 'B2'], ['counselling', 'B2']] }),
  v('w08-d2-10', 'stigma', 2, { partOfSpeech: 'noun', definition: 'A mark of disgrace associated with a particular condition.', example: 'Stigma around mental illness has eased but not vanished.', register: 'C1', synonyms: [['shame', 'B2'], ['disgrace', 'C1']] }),

  // Day 3 — Lifestyle & nutrition
  v('w08-d3-01', 'nutrition', 3, { partOfSpeech: 'noun', definition: 'The process of obtaining the food needed for health.', example: 'School nutrition programmes lift later academic performance.', synonyms: [['diet', 'B1'], ['nourishment', 'C1']] }),
  v('w08-d3-02', 'balanced diet', 3, { partOfSpeech: 'phrase', definition: 'A diet containing the right amounts of food types.', example: 'A balanced diet beats most supplements for daily health.', synonyms: [['varied diet', 'B2'], ['well-rounded eating', 'C1']] }),
  v('w08-d3-03', 'obesity', 3, { partOfSpeech: 'noun', definition: 'The condition of being severely overweight.', example: 'Childhood obesity has tripled in three decades.', register: 'C1', synonyms: [['overweight condition', 'B2'], ['corpulence', 'C1']] }),
  v('w08-d3-04', 'malnutrition', 3, { partOfSpeech: 'noun', definition: 'A condition resulting from poor or insufficient diet.', example: 'Malnutrition takes new forms in food-rich countries.', register: 'C1', synonyms: [['undernourishment', 'C1'], ['poor nutrition', 'B2']] }),
  v('w08-d3-05', 'sedentary', 3, { partOfSpeech: 'adjective', definition: 'Involving much sitting and little physical activity.', example: 'A sedentary lifestyle is now treated as an independent risk factor.', register: 'C1', synonyms: [['inactive', 'B2'], ['desk-bound', 'C1']] }),
  v('w08-d3-06', 'exercise', 3, { partOfSpeech: 'noun', definition: 'Physical activity done to maintain health.', example: 'Brisk daily exercise outperforms most expensive supplements.', synonyms: [['workout', 'B2'], ['physical activity', 'B2']] }),
  v('w08-d3-07', 'cardiovascular', 3, { partOfSpeech: 'adjective', definition: 'Relating to the heart and blood vessels.', example: 'Cardiovascular disease remains the largest single killer.', register: 'C1', synonyms: [['heart-related', 'B2'], ['circulatory', 'C1']] }),
  v('w08-d3-08', 'addiction', 3, { partOfSpeech: 'noun', definition: 'A compulsive dependence on a substance or activity.', example: 'Tobacco addiction declines slowly under sustained policy pressure.', register: 'C1', synonyms: [['dependence', 'C1'], ['habit', 'B1']] }),
  v('w08-d3-09', 'abstain', 3, { partOfSpeech: 'verb', definition: 'To refrain from doing or eating something.', example: 'Many young people now abstain from alcohol entirely.', register: 'C1', synonyms: [['refrain', 'C1'], ['avoid', 'B1']] }),
  v('w08-d3-10', 'moderation', 3, { partOfSpeech: 'noun', definition: 'The avoidance of excess.', example: 'Most dietary advice eventually reduces to moderation.', register: 'C1', synonyms: [['restraint', 'C1'], ['balance', 'B2']] }),

  // Day 4 — Prevention & treatment
  v('w08-d4-01', 'prevention', 4, { partOfSpeech: 'noun', definition: 'Action to stop something from happening.', example: 'Prevention is far cheaper than treatment.', synonyms: [['avoidance', 'B2'], ['prophylaxis', 'C1']] }),
  v('w08-d4-02', 'screening', 4, { partOfSpeech: 'noun', definition: 'Routine medical testing for a disease.', example: 'Cervical cancer screening saved thousands of lives last year.', register: 'C1', synonyms: [['testing', 'B1'], ['check-up', 'B2']] }),
  v('w08-d4-03', 'vaccination', 4, { partOfSpeech: 'noun', definition: 'The injection of a weakened pathogen to build immunity.', example: 'Vaccination eradicated smallpox in a generation.', synonyms: [['immunisation', 'C1'], ['inoculation', 'C1']] }),
  v('w08-d4-04', 'treatment', 4, { partOfSpeech: 'noun', definition: 'Medical care given to a patient.', example: 'Cancer treatment now lasts months rather than weeks.', synonyms: [['therapy', 'B2'], ['care', 'B1']] }),
  v('w08-d4-05', 'surgery', 4, { partOfSpeech: 'noun', definition: 'Medical operations on the body.', example: 'Keyhole surgery has shortened recovery times sharply.', synonyms: [['operation', 'B1'], ['procedure', 'B2']] }),
  v('w08-d4-06', 'medication', 4, { partOfSpeech: 'noun', definition: 'Drugs prescribed for treatment.', example: 'Long-term medication can have effects that take years to appear.', synonyms: [['drug', 'B1'], ['prescription', 'B2']] }),
  v('w08-d4-07', 'rehabilitation', 4, { partOfSpeech: 'noun', definition: 'Restoration of a person to health after illness or injury.', example: 'Rehabilitation after a stroke is intense and unglamorous.', register: 'C1', synonyms: [['recovery programme', 'B2'], ['rehab', 'C1']] }),
  v('w08-d4-08', 'palliative', 4, { partOfSpeech: 'adjective', definition: 'Relieving symptoms without curing the underlying cause.', example: 'Palliative care prioritises dignity over duration.', register: 'C1', synonyms: [['comforting', 'B2'], ['symptomatic', 'C1']] }),
  v('w08-d4-09', 'preventive', 4, { partOfSpeech: 'adjective', definition: 'Designed to stop something happening.', example: 'Preventive medicine addresses risks before disease.', register: 'C1', synonyms: [['preemptive', 'C1'], ['protective', 'B2']] }),
  v('w08-d4-10', 'remission', 4, { partOfSpeech: 'noun', definition: 'A period when symptoms decrease or disappear.', example: 'The patient has been in remission for two years.', register: 'C1', synonyms: [['recovery period', 'B2'], ['respite', 'C1']] }),

  // Day 5 — Healthcare systems
  v('w08-d5-01', 'healthcare', 5, { partOfSpeech: 'noun', definition: 'The provision of medical services.', example: 'Universal healthcare remains the fairest of expensive systems.', synonyms: [['health services', 'B2'], ['medical care', 'B1']] }),
  v('w08-d5-02', 'public health', 5, { partOfSpeech: 'phrase', definition: 'The health of a population as a whole.', example: 'Public health works in decades, not in news cycles.', synonyms: [['community health', 'B2'], ['population health', 'C1']] }),
  v('w08-d5-03', 'general practitioner', 5, { partOfSpeech: 'phrase', definition: 'A community doctor providing primary care.', example: 'A trusted general practitioner reduces unnecessary specialist visits.', synonyms: [['GP', 'B1'], ['family doctor', 'B2']] }),
  v('w08-d5-04', 'specialist', 5, { partOfSpeech: 'noun', definition: 'A doctor with expert knowledge in a specific field.', example: 'A specialist refers patients back to their GP after diagnosis.', synonyms: [['expert', 'B2'], ['consultant', 'C1']] }),
  v('w08-d5-05', 'insurance', 5, { partOfSpeech: 'noun', definition: 'A scheme that pays medical costs in return for premiums.', example: 'Health insurance schemes vary widely in coverage.', synonyms: [['cover', 'B2'], ['policy', 'B2']] }),
  v('w08-d5-06', 'referral', 5, { partOfSpeech: 'noun', definition: 'The act of sending a patient to a specialist.', example: 'A referral can take weeks even for serious conditions.', register: 'C1', synonyms: [['recommendation', 'B2'], ['transfer', 'B2']] }),
  v('w08-d5-07', 'subsidy', 5, { partOfSpeech: 'noun', definition: 'Financial support given to make healthcare cheaper.', example: 'A subsidy on insulin saved thousands from rationing.', synonyms: [['grant', 'B2'], ['allowance', 'B2']] }),
  v('w08-d5-08', 'access', 5, { partOfSpeech: 'noun', definition: 'The ability to obtain medical services.', example: 'Rural access to specialists remains the biggest gap.', synonyms: [['availability', 'B2'], ['entry', 'B1']] }),
  v('w08-d5-09', 'budget', 5, { partOfSpeech: 'noun', definition: 'The amount of money available for healthcare.', example: 'The health budget grows faster than national income year on year.', synonyms: [['funding', 'B2'], ['allocation', 'C1']] }),
  v('w08-d5-10', 'reform', 5, { partOfSpeech: 'noun', definition: 'A change made to improve a system.', example: 'A long-overdue reform is finally on the agenda.', synonyms: [['overhaul', 'C1'], ['change', 'B1']] }),

  // Day 6 — Public health policy
  v('w08-d6-01', 'epidemic', 6, { partOfSpeech: 'noun', definition: 'A widespread occurrence of an infectious disease.', example: 'A regional epidemic became a pandemic within months.', register: 'C1', synonyms: [['outbreak', 'B2'], ['plague', 'C1']] }),
  v('w08-d6-02', 'pandemic', 6, { partOfSpeech: 'noun', definition: 'A worldwide spread of a new disease.', example: 'A pandemic exposes the weakest links in every system.', register: 'C1', synonyms: [['global outbreak', 'C1'], ['epidemic', 'C1']] }),
  v('w08-d6-03', 'outbreak', 6, { partOfSpeech: 'noun', definition: 'A sudden occurrence of disease in a particular place.', example: 'An outbreak in one school spread quickly across the district.', synonyms: [['epidemic', 'C1'], ['surge', 'C1']] }),
  v('w08-d6-04', 'quarantine', 6, { partOfSpeech: 'noun', definition: 'Isolation imposed to prevent spread of disease.', example: 'Quarantine rules were the slowest part of the response.', register: 'C1', synonyms: [['isolation', 'B2'], ['confinement', 'C1']] }),
  v('w08-d6-05', 'lockdown', 6, { partOfSpeech: 'noun', definition: 'A restriction on movement to control disease spread.', example: 'Successive lockdowns reshaped urban geography.', synonyms: [['confinement', 'C1'], ['shutdown', 'B2']] }),
  v('w08-d6-06', 'awareness', 6, { partOfSpeech: 'noun', definition: 'Knowledge or perception of a situation.', example: 'Public awareness campaigns work best when paired with policy change.', synonyms: [['consciousness', 'C1'], ['knowledge', 'B1']] }),
  v('w08-d6-07', 'campaign', 6, { partOfSpeech: 'noun', definition: 'A planned series of activities to achieve a goal.', example: 'A short campaign reduced sugary-drink sales by ten per cent.', synonyms: [['drive', 'B2'], ['initiative', 'C1']] }),
  v('w08-d6-08', 'tax', 6, { partOfSpeech: 'noun', definition: 'A compulsory payment to the state.', example: 'A small tax on tobacco saved thousands of lives.', synonyms: [['levy', 'C1'], ['duty', 'B2']] }),
  v('w08-d6-09', 'ban', 6, { partOfSpeech: 'noun', definition: 'An official prohibition on something.', example: 'A ban on indoor smoking transformed the hospitality industry.', synonyms: [['prohibition', 'C1'], ['embargo', 'C1']] }),
  v('w08-d6-10', 'mandatory', 6, { partOfSpeech: 'adjective', definition: 'Required by law.', example: 'Mandatory seatbelt laws halved car-occupant deaths.', register: 'C1', synonyms: [['compulsory', 'C1'], ['obligatory', 'C1']] }),

  // Day 7 — Holistic health
  v('w08-d7-01', 'holistic', 7, { partOfSpeech: 'adjective', definition: 'Treating the whole person rather than just symptoms.', example: 'A holistic approach considers diet, sleep, and stress together.', register: 'C1', synonyms: [['comprehensive', 'B2'], ['integrative', 'C1']] }),
  v('w08-d7-02', 'wellness', 7, { partOfSpeech: 'noun', definition: 'The state of being in good physical and mental health.', example: 'Corporate wellness programmes show mixed results.', synonyms: [['wellbeing', 'B2'], ['fitness', 'B2']] }),
  v('w08-d7-03', 'nutritionist', 7, { partOfSpeech: 'noun', definition: 'An expert in food and its effects on health.', example: 'A nutritionist works on what you can eat, not what you cannot.', synonyms: [['dietitian', 'C1'], ['food expert', 'B2']] }),
  v('w08-d7-04', 'meditation', 7, { partOfSpeech: 'noun', definition: 'The practice of focused attention to calm the mind.', example: 'Even ten minutes of meditation a day measurably lowers stress.', synonyms: [['contemplation', 'C1'], ['mindfulness practice', 'C1']] }),
  v('w08-d7-05', 'yoga', 7, { partOfSpeech: 'noun', definition: 'A system of physical postures and breathing exercises.', example: 'Yoga combines flexibility training with calm.', synonyms: [['stretching practice', 'B2'], ['mind-body practice', 'C1']] }),
  v('w08-d7-06', 'sleep hygiene', 7, { partOfSpeech: 'phrase', definition: 'Habits that promote good sleep.', example: 'Better sleep hygiene improves mood within a week.', register: 'C1', synonyms: [['sleep practices', 'B2'], ['bedtime routine', 'B2']] }),
  v('w08-d7-07', 'longevity', 7, { partOfSpeech: 'noun', definition: 'Long life or duration.', example: 'Longevity tracks education more closely than income.', register: 'C1', synonyms: [['life expectancy', 'B2'], ['lifespan', 'B2']] }),
  v('w08-d7-08', 'preventative', 7, { partOfSpeech: 'adjective', definition: 'Designed to prevent something happening.', example: 'A preventative check-up catches issues before they become emergencies.', register: 'C1', synonyms: [['preventive', 'C1'], ['prophylactic', 'C1']] }),
  v('w08-d7-09', 'habit', 7, { partOfSpeech: 'noun', definition: 'A regular tendency or practice.', example: 'A small habit, kept daily, outperforms a grand plan attempted weekly.', synonyms: [['routine', 'B2'], ['custom', 'C1']] }),
  v('w08-d7-10', 'lifestyle', 7, { partOfSpeech: 'noun', definition: 'The way a person lives.', example: 'Lifestyle changes account for more health gains than most medications.', synonyms: [['way of life', 'B1'], ['mode of living', 'C1']] }),
]

interface VocabInput { partOfSpeech: VocabularyLexiconItem['partOfSpeech']; definition: string; example: string; register?: VocabularyLexiconItem['register']; topic?: string; frequency?: VocabularyLexiconItem['frequency']; synonyms: Array<[string, VocabularyLexiconItem['register'], string?]> }
function v(shortId: string, headword: string, day: 1|2|3|4|5|6|7, input: VocabInput): VocabularyLexiconItem {
  return { discipline: 'vocabulary', id: `int-vocab-${shortId}`, headword, partOfSpeech: input.partOfSpeech, definition: input.definition, example: input.example, register: input.register ?? 'B2', topic: input.topic ?? 'health', frequency: input.frequency ?? 'medium', synonyms: input.synonyms.map(([word, register, nuance]) => ({ word, register, ...(nuance ? { nuance } : {}) })), level: 'intermediate', week: 8, day }
}

export const INTERMEDIATE_VOCAB_WEEK_08: VocabularyLexiconItem[] = items
