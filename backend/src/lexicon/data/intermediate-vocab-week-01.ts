import type { VocabularyLexiconItem } from '@shared/schemas/lexicon-items'

/**
 * Intermediate · Week 01 · Daily life and routine
 * 70 items across 7 days (10/day). Anchors high-frequency academic
 * vocabulary the candidate already half-knows. Each item carries B2/C1
 * register, two synonyms, and a single sentence-length example.
 */

const items: VocabularyLexiconItem[] = [
  // ─── Day 1 — Habits & morning routine ──────────────────────────────────
  v('w01-d1-01', 'daily', 1, { partOfSpeech: 'adjective', definition: 'Happening every day, or done regularly each day.', example: 'Reading the news has become part of my daily routine.', register: 'B1', frequency: 'high', synonyms: [['everyday', 'B1'], ['routine', 'B2']] }),
  v('w01-d1-02', 'routine', 1, { partOfSpeech: 'noun', definition: 'A fixed sequence of activities you regularly follow.', example: 'A consistent morning routine improves focus throughout the day.', register: 'B2', synonyms: [['schedule', 'B2'], ['regimen', 'C1', 'more formal, often medical']] }),
  v('w01-d1-03', 'establish', 1, { partOfSpeech: 'verb', definition: 'To begin or set up something firmly so that it lasts.', example: 'It takes about three weeks to establish a new habit.', register: 'C1', synonyms: [['set up', 'B2'], ['institute', 'C1', 'more formal']] }),
  v('w01-d1-04', 'consistent', 1, { partOfSpeech: 'adjective', definition: 'Always behaving or happening in the same way.', example: 'Her training schedule has remained consistent for two years.', register: 'B2', synonyms: [['steady', 'B2'], ['unchanging', 'B2']] }),
  v('w01-d1-05', 'productive', 1, { partOfSpeech: 'adjective', definition: 'Achieving a great deal in a given time.', example: 'I find that early mornings are the most productive part of my day.', register: 'B2', synonyms: [['efficient', 'B2'], ['fruitful', 'C1']] }),
  v('w01-d1-06', 'efficient', 1, { partOfSpeech: 'adjective', definition: 'Working in a well-organised way without wasting time or effort.', example: 'A short to-do list is more efficient than an exhaustive one.', register: 'B2', synonyms: [['effective', 'B2'], ['streamlined', 'C1']] }),
  v('w01-d1-07', 'priority', 1, { partOfSpeech: 'noun', definition: 'Something that is more important than other things and must be dealt with first.', example: 'Sleep should be a higher priority than late-night work.', register: 'B2', synonyms: [['precedence', 'C1'], ['focus', 'B1']] }),
  v('w01-d1-08', 'discipline', 1, { partOfSpeech: 'noun', definition: 'The ability to make yourself do what you should do.', example: 'Sticking to a study plan requires real discipline.', register: 'B2', synonyms: [['self-control', 'B2'], ['willpower', 'B2']] }),
  v('w01-d1-09', 'mindful', 1, { partOfSpeech: 'adjective', definition: 'Aware of what you are doing or what is happening around you.', example: 'A mindful start to the morning settles the rest of the day.', register: 'C1', synonyms: [['attentive', 'C1'], ['aware', 'B1']] }),
  v('w01-d1-10', 'preparation', 1, { partOfSpeech: 'noun', definition: 'The act of getting ready for something.', example: 'Ten minutes of preparation the night before saves an hour in the morning.', register: 'B2', synonyms: [['planning', 'B2'], ['groundwork', 'C1']] }),

  // ─── Day 2 — Evening routine & wind-down ──────────────────────────────
  v('w01-d2-01', 'unwind', 2, { partOfSpeech: 'verb', definition: 'To relax after a period of work or worry.', example: 'After a long day she likes to unwind with a book.', register: 'B2', synonyms: [['relax', 'B1'], ['decompress', 'C1', 'informal']] }),
  v('w01-d2-02', 'wind down', 2, { partOfSpeech: 'phrase', definition: 'To gradually relax in preparation for sleep.', example: 'I avoid screens for an hour to help my body wind down.', register: 'B2', synonyms: [['settle', 'B2'], ['ease off', 'B2']] }),
  v('w01-d2-03', 'reflect', 2, { partOfSpeech: 'verb', definition: 'To think carefully about something.', example: 'A short journal entry lets you reflect on the day.', register: 'B2', synonyms: [['ponder', 'C1'], ['consider', 'B1']] }),
  v('w01-d2-04', 'restorative', 2, { partOfSpeech: 'adjective', definition: 'Having the ability to restore strength or energy.', example: 'A restorative evening walk works better than another coffee.', register: 'C1', synonyms: [['refreshing', 'B2'], ['replenishing', 'C1']] }),
  v('w01-d2-05', 'leisurely', 2, { partOfSpeech: 'adjective', definition: 'Done in a relaxed, unhurried way.', example: 'A leisurely meal with the family closes the day well.', register: 'C1', synonyms: [['unhurried', 'C1'], ['relaxed', 'B1']] }),
  v('w01-d2-06', 'household', 2, { partOfSpeech: 'noun', definition: 'All the people who live together in one house.', example: 'Most household chores are easier when shared.', register: 'B2', synonyms: [['family', 'B1'], ['home', 'B1']] }),
  v('w01-d2-07', 'chore', 2, { partOfSpeech: 'noun', definition: 'A small, regular job, often around the house.', example: 'Doing the chores at the same time each evening builds a rhythm.', register: 'B2', synonyms: [['task', 'B2'], ['errand', 'B2']] }),
  v('w01-d2-08', 'tidy up', 2, { partOfSpeech: 'phrase', definition: 'To make a place look neater by putting things away.', example: 'I tidy up the kitchen before sitting down to work.', register: 'B1', synonyms: [['clear up', 'B1'], ['organise', 'B2']] }),
  v('w01-d2-09', 'curtail', 2, { partOfSpeech: 'verb', definition: 'To shorten or reduce something, often a habit.', example: 'Many candidates curtail their social media use during exam weeks.', register: 'C1', synonyms: [['cut back', 'B2'], ['restrict', 'B2']] }),
  v('w01-d2-10', 'ritual', 2, { partOfSpeech: 'noun', definition: 'A series of actions performed in the same way regularly.', example: 'A short reading ritual signals the brain that the day is closing.', register: 'C1', synonyms: [['practice', 'B2'], ['custom', 'C1']] }),

  // ─── Day 3 — Time & schedule ──────────────────────────────────────────
  v('w01-d3-01', 'punctual', 3, { partOfSpeech: 'adjective', definition: 'Arriving or doing something at the agreed time.', example: 'Examiners expect candidates to be punctual.', register: 'B2', synonyms: [['on time', 'B1'], ['prompt', 'B2']] }),
  v('w01-d3-02', 'tardy', 3, { partOfSpeech: 'adjective', definition: 'Slow or late in happening or arriving.', example: 'Tardy submissions are penalised in most academic programmes.', register: 'C1', synonyms: [['late', 'B1'], ['overdue', 'B2']] }),
  v('w01-d3-03', 'allocate', 3, { partOfSpeech: 'verb', definition: 'To set aside time or resources for a particular purpose.', example: 'She allocates two hours a day to writing practice.', register: 'C1', synonyms: [['set aside', 'B2'], ['assign', 'B2']] }),
  v('w01-d3-04', 'commitment', 3, { partOfSpeech: 'noun', definition: 'A promise to do something or a regular obligation.', example: 'A weekly commitment to a study group lifts performance.', register: 'B2', synonyms: [['obligation', 'C1'], ['undertaking', 'C1']] }),
  v('w01-d3-05', 'overlap', 3, { partOfSpeech: 'verb', definition: 'To cover part of the same area or time as something else.', example: 'My class and his rehearsal overlap by twenty minutes.', register: 'B2', synonyms: [['coincide', 'C1'], ['intersect', 'C1']] }),
  v('w01-d3-06', 'flexibility', 3, { partOfSpeech: 'noun', definition: 'The ability to change or be changed easily according to the situation.', example: 'A timetable with built-in flexibility survives unexpected days.', register: 'B2', synonyms: [['adaptability', 'C1'], ['leeway', 'C1']] }),
  v('w01-d3-07', 'overrun', 3, { partOfSpeech: 'verb', definition: 'To go on for longer than expected.', example: 'The meeting overran, so I had to skip the gym.', register: 'C1', synonyms: [['drag on', 'B2'], ['exceed', 'B2']] }),
  v('w01-d3-08', 'deadline', 3, { partOfSpeech: 'noun', definition: 'A time or date by which something must be finished.', example: 'I always set my own deadline a day before the real one.', register: 'B1', synonyms: [['cut-off', 'B2'], ['due date', 'B1']] }),
  v('w01-d3-09', 'block out', 3, { partOfSpeech: 'phrase', definition: 'To reserve a period of time for one activity, refusing other plans.', example: 'I block out two hours each Saturday for revision.', register: 'B2', synonyms: [['ring-fence', 'C1'], ['reserve', 'B2']] }),
  v('w01-d3-10', 'pace', 3, { partOfSpeech: 'noun', definition: 'The speed at which someone moves or something happens.', example: 'Working at a steady pace beats sprinting and burning out.', register: 'B2', synonyms: [['rate', 'B1'], ['tempo', 'C1']] }),

  // ─── Day 4 — Sleep & rest ─────────────────────────────────────────────
  v('w01-d4-01', 'nap', 4, { partOfSpeech: 'noun', definition: 'A short sleep, usually during the day.', example: 'A twenty-minute nap can restore sharpness in the afternoon.', register: 'B2', synonyms: [['doze', 'B2'], ['snooze', 'B1', 'informal']] }),
  v('w01-d4-02', 'doze off', 4, { partOfSpeech: 'phrase', definition: 'To start sleeping, often without meaning to.', example: 'I dozed off on the train and missed my stop.', register: 'B2', synonyms: [['drift off', 'B2'], ['nod off', 'B2']] }),
  v('w01-d4-03', 'insomnia', 4, { partOfSpeech: 'noun', definition: 'The inability to sleep over a long period.', example: 'Chronic insomnia is linked to poor academic performance.', register: 'C1', synonyms: [['sleeplessness', 'C1'], ['wakefulness', 'C1']] }),
  v('w01-d4-04', 'drowsy', 4, { partOfSpeech: 'adjective', definition: 'Tired and almost asleep.', example: 'Heavy lunches make me drowsy by mid-afternoon.', register: 'B2', synonyms: [['sleepy', 'B1'], ['somnolent', 'C1']] }),
  v('w01-d4-05', 'replenish', 4, { partOfSpeech: 'verb', definition: 'To fill something up again, especially energy or supplies.', example: 'A weekend without late nights replenishes the body.', register: 'C1', synonyms: [['restore', 'B2'], ['top up', 'B2']] }),
  v('w01-d4-06', 'fatigue', 4, { partOfSpeech: 'noun', definition: 'Extreme tiredness, often from work or stress.', example: 'Mental fatigue, not the test itself, is what trips most candidates up.', register: 'C1', synonyms: [['exhaustion', 'C1'], ['weariness', 'C1']] }),
  v('w01-d4-07', 'recharge', 4, { partOfSpeech: 'verb', definition: 'To rest or relax in order to gain energy back.', example: 'A short walk outside is the cheapest way to recharge.', register: 'B2', synonyms: [['rejuvenate', 'C1'], ['refresh', 'B2']] }),
  v('w01-d4-08', 'sedentary', 4, { partOfSpeech: 'adjective', definition: 'Involving a lot of sitting and little physical activity.', example: 'A sedentary lifestyle disrupts sleep more than people realise.', register: 'C1', synonyms: [['inactive', 'B2'], ['desk-bound', 'C1']] }),
  v('w01-d4-09', 'restless', 4, { partOfSpeech: 'adjective', definition: 'Unable to stay still or sleep, often through worry.', example: 'A restless night before a test undoes weeks of preparation.', register: 'B2', synonyms: [['agitated', 'C1'], ['fidgety', 'B2']] }),
  v('w01-d4-10', 'doze', 4, { partOfSpeech: 'verb', definition: 'To sleep lightly for a short period.', example: 'Cats can doze for sixteen hours a day without missing a thing.', register: 'B2', synonyms: [['nap', 'B2'], ['slumber', 'C1']] }),

  // ─── Day 5 — Meals & food ─────────────────────────────────────────────
  v('w01-d5-01', 'nourishing', 5, { partOfSpeech: 'adjective', definition: 'Providing the food substances needed for health and growth.', example: 'A nourishing breakfast steadies concentration through the morning.', register: 'C1', synonyms: [['wholesome', 'C1'], ['nutritious', 'B2']] }),
  v('w01-d5-02', 'staple', 5, { partOfSpeech: 'noun', definition: 'A basic food that is eaten regularly.', example: 'Rice is the staple of most Vietnamese households.', register: 'B2', synonyms: [['mainstay', 'C1'], ['basic', 'B1']] }),
  v('w01-d5-03', 'savoury', 5, { partOfSpeech: 'adjective', definition: 'Tasting of salt or spice rather than sweet.', example: 'For breakfast I prefer something savoury over a pastry.', register: 'B2', synonyms: [['salty', 'B1'], ['flavourful', 'B2']] }),
  v('w01-d5-04', 'leftover', 5, { partOfSpeech: 'noun', definition: 'Food that has not been eaten and remains for later.', example: 'I bring leftovers from dinner for the next day\'s lunch.', register: 'B2', synonyms: [['remnant', 'C1'], ['scraps', 'B2']] }),
  v('w01-d5-05', 'portion', 5, { partOfSpeech: 'noun', definition: 'An amount of food served to one person.', example: 'Smaller portions, eaten more often, suit a study schedule.', register: 'B2', synonyms: [['serving', 'B2'], ['helping', 'B2']] }),
  v('w01-d5-06', 'crave', 5, { partOfSpeech: 'verb', definition: 'To want something very strongly.', example: 'When I am tired I crave anything sugary.', register: 'B2', synonyms: [['long for', 'B2'], ['yearn for', 'C1']] }),
  v('w01-d5-07', 'mindful eating', 5, { partOfSpeech: 'phrase', definition: 'The practice of paying attention to food while eating, without distractions.', example: 'Mindful eating tends to reduce the size of evening portions.', register: 'C1', synonyms: [['attentive eating', 'C1'], ['conscious eating', 'C1']] }),
  v('w01-d5-08', 'palate', 5, { partOfSpeech: 'noun', definition: 'A person\'s ability to taste and judge food.', example: 'Travelling broadens the palate as much as the mind.', register: 'C1', synonyms: [['taste', 'B1'], ['discrimination', 'C1', 'in tasting context']] }),
  v('w01-d5-09', 'home-cooked', 5, { partOfSpeech: 'adjective', definition: 'Prepared at home rather than bought from a restaurant.', example: 'A simple home-cooked meal beats most takeaways for nutrition.', register: 'B2', synonyms: [['homemade', 'B1'], ['from-scratch', 'B2']] }),
  v('w01-d5-10', 'indulge', 5, { partOfSpeech: 'verb', definition: 'To allow yourself something enjoyable, usually as a reward.', example: 'On Sundays I indulge in a long breakfast.', register: 'B2', synonyms: [['treat oneself', 'B2'], ['savour', 'C1']] }),

  // ─── Day 6 — Commuting & errands ──────────────────────────────────────
  v('w01-d6-01', 'commute', 6, { partOfSpeech: 'noun', definition: 'The regular journey between home and a place of work or study.', example: 'A short commute is one of the underrated luxuries of urban life.', register: 'B2', synonyms: [['journey', 'B1'], ['trip', 'B1']] }),
  v('w01-d6-02', 'rush hour', 6, { partOfSpeech: 'phrase', definition: 'The time at the start and end of the working day when traffic is busiest.', example: 'I leave half an hour earlier to avoid rush hour.', register: 'B1', synonyms: [['peak hour', 'B2'], ['peak time', 'B2']] }),
  v('w01-d6-03', 'congestion', 6, { partOfSpeech: 'noun', definition: 'A situation where there is too much traffic so movement is slow.', example: 'Congestion in the centre has worsened since the new tower opened.', register: 'C1', synonyms: [['gridlock', 'C1'], ['traffic jam', 'B1']] }),
  v('w01-d6-04', 'pedestrian', 6, { partOfSpeech: 'noun', definition: 'A person walking along a road or in a public area.', example: 'The new district is friendlier to pedestrians than to cars.', register: 'B2', synonyms: [['walker', 'B1'], ['foot-traveller', 'C1']] }),
  v('w01-d6-05', 'errand', 6, { partOfSpeech: 'noun', definition: 'A short journey made to do or get something.', example: 'I batch my errands into one Saturday morning.', register: 'B2', synonyms: [['task', 'B2'], ['chore', 'B2']] }),
  v('w01-d6-06', 'detour', 6, { partOfSpeech: 'noun', definition: 'A different, often longer way to a place when the usual route is blocked.', example: 'Roadworks forced a detour through the back streets.', register: 'B2', synonyms: [['diversion', 'B2'], ['bypass', 'C1']] }),
  v('w01-d6-07', 'stopover', 6, { partOfSpeech: 'noun', definition: 'A short stop in a journey before continuing.', example: 'A quick stopover at the post office added ten minutes.', register: 'B2', synonyms: [['layover', 'B2'], ['halt', 'C1']] }),
  v('w01-d6-08', 'fare', 6, { partOfSpeech: 'noun', definition: 'The money paid for a journey on public transport.', example: 'A monthly pass works out cheaper than buying single fares.', register: 'B2', synonyms: [['ticket price', 'B1'], ['charge', 'B2']] }),
  v('w01-d6-09', 'reliable', 6, { partOfSpeech: 'adjective', definition: 'That can be trusted to do what is expected.', example: 'A reliable bus route changes how you plan a day.', register: 'B2', synonyms: [['dependable', 'C1'], ['trustworthy', 'B2']] }),
  v('w01-d6-10', 'navigate', 6, { partOfSpeech: 'verb', definition: 'To find the way to a place.', example: 'Once you can navigate the metro, the city opens up.', register: 'B2', synonyms: [['find your way', 'B1'], ['traverse', 'C1']] }),

  // ─── Day 7 — Leisure & weekends ───────────────────────────────────────
  v('w01-d7-01', 'leisure', 7, { partOfSpeech: 'noun', definition: 'Time when one is not working and can do enjoyable things.', example: 'Weekends offer the only real leisure of the working week.', register: 'B2', synonyms: [['free time', 'B1'], ['recreation', 'C1']] }),
  v('w01-d7-02', 'pastime', 7, { partOfSpeech: 'noun', definition: 'Something done regularly for enjoyment.', example: 'Reading remains my favourite pastime, even after a long week.', register: 'B2', synonyms: [['hobby', 'B1'], ['pursuit', 'C1']] }),
  v('w01-d7-03', 'unwind', 7, { partOfSpeech: 'verb', definition: 'To stop worrying or thinking about work.', example: 'A walk by the river is the quickest way to unwind.', register: 'B2', synonyms: [['relax', 'B1'], ['decompress', 'C1']] }),
  v('w01-d7-04', 'engrossed', 7, { partOfSpeech: 'adjective', definition: 'So interested in something that you give it all your attention.', example: 'I was so engrossed in the book that I missed lunch.', register: 'C1', synonyms: [['absorbed', 'B2'], ['immersed', 'C1']] }),
  v('w01-d7-05', 'spontaneous', 7, { partOfSpeech: 'adjective', definition: 'Not planned in advance.', example: 'A spontaneous trip out of town beats a scripted one.', register: 'C1', synonyms: [['impromptu', 'C1'], ['unplanned', 'B2']] }),
  v('w01-d7-06', 'gathering', 7, { partOfSpeech: 'noun', definition: 'A group of people meeting together, often informally.', example: 'Sunday lunch with the extended family is the largest weekly gathering.', register: 'B2', synonyms: [['meeting', 'B1'], ['get-together', 'B2']] }),
  v('w01-d7-07', 'getaway', 7, { partOfSpeech: 'noun', definition: 'A short holiday, often taken to escape daily routine.', example: 'A weekend getaway to the coast resets the whole month.', register: 'B2', synonyms: [['short break', 'B2'], ['mini-break', 'B2']] }),
  v('w01-d7-08', 'recharge', 7, { partOfSpeech: 'verb', definition: 'To rest in order to feel energetic again.', example: 'Even one phone-free afternoon helps me recharge.', register: 'B2', synonyms: [['restore', 'B2'], ['rejuvenate', 'C1']] }),
  v('w01-d7-09', 'pursue', 7, { partOfSpeech: 'verb', definition: 'To follow an activity or interest, usually over time.', example: 'She pursues photography on weekends and exhibits twice a year.', register: 'C1', synonyms: [['practise', 'B2'], ['take up', 'B2']] }),
  v('w01-d7-10', 'savour', 7, { partOfSpeech: 'verb', definition: 'To enjoy slowly, paying close attention.', example: 'A slow weekend morning is something to savour, not rush.', register: 'C1', synonyms: [['relish', 'C1'], ['enjoy', 'B1']] }),
]

interface VocabInput {
  partOfSpeech: VocabularyLexiconItem['partOfSpeech']
  definition: string
  example: string
  register: VocabularyLexiconItem['register']
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
    register: input.register,
    topic: input.topic ?? 'daily-life',
    frequency: input.frequency ?? 'high',
    synonyms: input.synonyms.map(([word, register, nuance]) => ({
      word,
      register,
      ...(nuance ? { nuance } : {}),
    })),
    level: 'intermediate',
    week: 1,
    day,
  }
}

export const INTERMEDIATE_VOCAB_WEEK_01: VocabularyLexiconItem[] = items
