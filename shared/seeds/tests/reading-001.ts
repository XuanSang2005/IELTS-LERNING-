import type { Test } from '../../schemas/test'

export const reading001: Test = {
  id: 'reading-001',
  skill: 'reading',
  title: 'Reading Test 01',
  description:
    'Three academic passages across natural science, social history, and contemporary research.',
  difficulty: 'foundation',
  fullDurationMinutes: 60,
  shortDurationMinutes: 30,
  totalQuestions: 40,
  isPro: false,
  publishedAt: '2026-04-05',
  tags: ['IELTS Academic', 'Reading'],
  passages: [
    {
      id: 'reading-001-p1',
      number: 1,
      title: 'The Language of Bees',
      wordCount: 540,
      bodyHtml: `
<p data-para="A"><strong>A.</strong> In the late 1940s, the Austrian zoologist Karl von Frisch published a claim that provoked decades of argument: honeybees communicate the location of food sources to their hivemates through a patterned dance. What was later named the <em>waggle dance</em> is a figure-of-eight movement on the vertical surface of the honeycomb, with a central straight run — the waggle phase — flanked by return loops. The direction of the waggle relative to gravity indicates the direction of the food relative to the sun; the duration of the waggle indicates the distance.</p>
<p data-para="B"><strong>B.</strong> For many years the dance was treated as an elegant metaphor rather than an actual communication channel. Critics argued that foraging bees might simply use odour trails or local landmarks. The debate ran for almost three decades.</p>
<p data-para="C"><strong>C.</strong> It was settled largely by a single experiment in 1967. Adrian Wenner and James Gould showed independently that bees trained to a feeder in a particular direction could recruit hivemates to that direction even when odour cues were removed. The crucial innovation was the use of scent-controlled feeders and the deliberate rotation of the hive, forcing bees to reinterpret gravity as though it were sunlight. Recruits arrived at the correct destination with statistical significance that could not be explained by chance.</p>
<p data-para="D"><strong>D.</strong> More recent work has shown that the dance is only part of the bees' communicative repertoire. Acoustic signals — low-frequency thrums produced by vibrating thoracic muscles — accompany the waggle and may carry additional information about the quality of a food source. Quieter dances appear to indicate less profitable foraging sites. Chemical cues, carried on the dancer's body, reinforce the same message.</p>
<p data-para="E"><strong>E.</strong> The dance language is not shared equally across bee species. Stingless bees of Central and South America communicate via scent trails laid on vegetation, not dance. Even within the honeybee genus <em>Apis</em>, dialects differ: the Asian <em>Apis cerana</em> performs its waggles at a different pace to the European <em>Apis mellifera</em>, so that colonies from the two species, if mixed, misinterpret each other's distances. Research published in 2008 demonstrated that transplanted <em>Apis cerana</em> hives can partially learn the <em>mellifera</em> dialect after several generations of exposure.</p>
<p data-para="F"><strong>F.</strong> Beyond foraging, a related dance — the <em>shake dance</em> — is used during swarming. When a colony divides to found a new hive, scout bees return to the cluster and dance to advocate for candidate nest sites. The swarm follows whichever site attracts the most prolonged, most vigorous dance. The analogue with human deliberation is almost too neat to resist, though scientists caution against reading political metaphors into invertebrate behaviour.</p>
`,
      vocabulary: [
        {
          term: 'waggle dance',
          definition:
            'The figure-of-eight movement bees perform to indicate food direction and distance.',
          translation: 'điệu lắc người',
        },
        {
          term: 'forage',
          definition: 'To search for food over a wide area.',
          translation: 'đi kiếm ăn',
        },
        {
          term: 'thoracic',
          definition:
            "Relating to the middle section of an insect's body, where flight muscles sit.",
        },
        {
          term: 'dialect',
          definition: 'A version of a language peculiar to a region or group.',
          translation: 'phương ngữ',
        },
        {
          term: 'swarm',
          definition: 'A large group of bees leaving a hive together to establish a new colony.',
          translation: 'đàn ong bay đi lập tổ',
        },
      ],
      groups: [
        {
          id: 'r001-p1-g1',
          instruction:
            'Questions 1–5 · Do the following statements agree with the information in the passage? Choose TRUE, FALSE or NOT GIVEN.',
          questions: [
            {
              id: 'r001-q1',
              number: 1,
              type: 'true-false-not-given',
              statement:
                'Karl von Frisch published his description of the waggle dance in the 1960s.',
              correctAnswer: 'FALSE',
              explanation: 'The passage states "late 1940s".',
            },
            {
              id: 'r001-q2',
              number: 2,
              type: 'true-false-not-given',
              statement:
                'For decades after von Frisch, some researchers believed bees used odour trails rather than a dance.',
              correctAnswer: 'TRUE',
              explanation:
                'Paragraph B says "critics argued that foraging bees might simply use odour trails."',
            },
            {
              id: 'r001-q3',
              number: 3,
              type: 'true-false-not-given',
              statement: 'Wenner and Gould rotated their hives as part of the 1967 experiments.',
              correctAnswer: 'TRUE',
              explanation: 'Paragraph C describes the "deliberate rotation of the hive".',
            },
            {
              id: 'r001-q4',
              number: 4,
              type: 'true-false-not-given',
              statement:
                'Acoustic signals produced during the waggle dance are louder when the food source is of higher quality.',
              correctAnswer: 'TRUE',
              explanation:
                '"Quieter dances appear to indicate less profitable foraging sites" — the inverse is therefore true.',
            },
            {
              id: 'r001-q5',
              number: 5,
              type: 'true-false-not-given',
              statement: 'Asian Apis cerana colonies cannot adapt to European mellifera dialects.',
              correctAnswer: 'FALSE',
              explanation:
                'Paragraph E states transplanted cerana hives "can partially learn the mellifera dialect".',
            },
          ],
        },
        {
          id: 'r001-p1-g2',
          instruction:
            'Questions 6–9 · The passage has six paragraphs, A–F. Choose the correct heading for each paragraph from the list below.',
          questions: [
            {
              id: 'r001-q6',
              number: 6,
              type: 'matching-headings',
              paragraphId: 'B',
              headings: [
                { key: 'i', text: 'A contested claim' },
                { key: 'ii', text: 'A decisive experiment' },
                { key: 'iii', text: 'Dialects within the honeybee genus' },
                { key: 'iv', text: 'Acoustic and chemical reinforcement' },
                { key: 'v', text: 'A dance used during swarming' },
                { key: 'vi', text: "Von Frisch's original description" },
              ],
              correctAnswer: 'i',
              explanation: 'Paragraph B describes the long dispute before the 1967 experiments.',
            },
            {
              id: 'r001-q7',
              number: 7,
              type: 'matching-headings',
              paragraphId: 'C',
              headings: [
                { key: 'i', text: 'A contested claim' },
                { key: 'ii', text: 'A decisive experiment' },
                { key: 'iii', text: 'Dialects within the honeybee genus' },
                { key: 'iv', text: 'Acoustic and chemical reinforcement' },
                { key: 'v', text: 'A dance used during swarming' },
                { key: 'vi', text: "Von Frisch's original description" },
              ],
              correctAnswer: 'ii',
              explanation: 'Paragraph C recounts the Wenner and Gould rotation experiment.',
            },
            {
              id: 'r001-q8',
              number: 8,
              type: 'matching-headings',
              paragraphId: 'E',
              headings: [
                { key: 'i', text: 'A contested claim' },
                { key: 'ii', text: 'A decisive experiment' },
                { key: 'iii', text: 'Dialects within the honeybee genus' },
                { key: 'iv', text: 'Acoustic and chemical reinforcement' },
                { key: 'v', text: 'A dance used during swarming' },
                { key: 'vi', text: "Von Frisch's original description" },
              ],
              correctAnswer: 'iii',
              explanation: 'Paragraph E is about cross-species dialect differences.',
            },
            {
              id: 'r001-q9',
              number: 9,
              type: 'matching-headings',
              paragraphId: 'F',
              headings: [
                { key: 'i', text: 'A contested claim' },
                { key: 'ii', text: 'A decisive experiment' },
                { key: 'iii', text: 'Dialects within the honeybee genus' },
                { key: 'iv', text: 'Acoustic and chemical reinforcement' },
                { key: 'v', text: 'A dance used during swarming' },
                { key: 'vi', text: "Von Frisch's original description" },
              ],
              correctAnswer: 'v',
              explanation: 'Paragraph F introduces the shake dance used during swarming.',
            },
          ],
        },
        {
          id: 'r001-p1-g3',
          instruction:
            'Questions 10–14 · Answer the questions below. Choose NO MORE THAN THREE WORDS from the passage for each answer.',
          questions: [
            {
              id: 'r001-q10',
              number: 10,
              type: 'short-answer',
              question: 'What shape does the waggle dance trace on the comb?',
              correctAnswer: 'figure-of-eight',
              acceptableVariants: ['figure of eight', 'figure of 8', 'figure-8'],
              maxWords: 3,
              explanation: 'Described verbatim in paragraph A.',
            },
            {
              id: 'r001-q11',
              number: 11,
              type: 'short-answer',
              question:
                "Which part of the bee's body produces the acoustic signals described in paragraph D?",
              correctAnswer: 'thoracic muscles',
              acceptableVariants: ['thorax', 'thoracic'],
              maxWords: 2,
              explanation: '"Low-frequency thrums produced by vibrating thoracic muscles."',
            },
            {
              id: 'r001-q12',
              number: 12,
              type: 'short-answer',
              question:
                'Which bees of Central and South America use scent trails on vegetation instead of dance?',
              correctAnswer: 'stingless bees',
              acceptableVariants: ['stingless'],
              maxWords: 2,
              explanation: 'Paragraph E: "Stingless bees of Central and South America."',
            },
            {
              id: 'r001-q13',
              number: 13,
              type: 'short-answer',
              question:
                'What name is given to the dance used to advocate for candidate nest sites during swarming?',
              correctAnswer: 'shake dance',
              acceptableVariants: ['shake-dance'],
              maxWords: 2,
              explanation: 'Paragraph F names it the "shake dance".',
            },
            {
              id: 'r001-q14',
              number: 14,
              type: 'short-answer',
              question: 'In what year was the cross-species dialect research published?',
              correctAnswer: '2008',
              acceptableVariants: [],
              maxWords: 1,
              explanation: 'Paragraph E states "research published in 2008".',
            },
          ],
        },
      ],
    },
    {
      id: 'reading-001-p2',
      number: 2,
      title: 'The Rise of the London Coffeehouse',
      wordCount: 510,
      bodyHtml: `
<p data-para="A"><strong>A.</strong> The first coffeehouse in England opened in Oxford in 1650. Within fifteen years there were roughly eighty in the capital alone, and by 1700 the estimate had climbed to nearly three thousand across Britain. No other commercial space of the seventeenth century had comparable reach. In an age without newspapers worth the name, the coffeehouse became the public square of the English merchant class.</p>
<p data-para="B"><strong>B.</strong> Entry was cheap: a penny at the door entitled the visitor to a dish of coffee, a newspaper or pamphlet if one had arrived that morning, and, crucially, the right to remain. Patrons were expected to speak to whomever sat beside them. Rank was formally suspended. A contemporary rule-in-verse, posted on the wall of Rota Club in 1660, instructed: "He that shall any quarrel here begin / Shall give each man a dish t'atone the sin."</p>
<p data-para="C"><strong>C.</strong> Coffeehouses acquired reputations. Jonathan's in Change Alley was where the men trading in East India stock gathered; Lloyd's on Tower Street drew shipowners and the underwriters who would insure their voyages. Will's on Russell Street was the haunt of poets and playwrights, where Dryden held court at an armchair by the fire. The Grecian, near Temple Bar, attracted lawyers. A visitor to London in the 1680s could not understand the city without understanding who sat where.</p>
<p data-para="D"><strong>D.</strong> The state watched nervously. In 1675, Charles II issued a proclamation ordering the closure of all coffeehouses, on the grounds that they were "places where the disaffected met, and spread scandalous reports, concerning the conduct of His Majesty and his ministers." The proclamation lasted eleven days. Public outrage and commercial pressure from coffee merchants forced its withdrawal. The episode is taken by historians to mark a turning point in the relationship between ruler and subject in England: a monarch discovered he could not simply legislate a venue of conversation out of existence.</p>
<p data-para="E"><strong>E.</strong> The commercial legacy of the coffeehouse is less frequently acknowledged than the political one, but it is arguably the more lasting. Lloyd's coffeehouse, by keeping its shipping lists up to date on a blackboard for underwriters, evolved into Lloyd's of London. Jonathan's became, after several intervening steps, the London Stock Exchange. Between 1688 and 1720, an entire financial infrastructure — insurance, joint-stock trading, bills of exchange — was assembled in, and from, the coffeehouse network.</p>
<p data-para="F"><strong>F.</strong> By the middle of the eighteenth century, however, the coffeehouse was already in decline. Tea, cheaper and quicker to brew at home, displaced coffee in domestic consumption. The gentleman's club, with its membership fees and its restricted admission, absorbed the political and literary conversation that had once been open to any man with a penny. What had been a commercial space open to strangers became a set of private rooms behind a doorman. The public square had closed.</p>
`,
      vocabulary: [
        {
          term: 'underwriter',
          definition:
            'A person who insures shipping or other ventures against loss in exchange for a premium.',
          translation: 'người bảo lãnh bảo hiểm',
        },
        {
          term: 'proclamation',
          definition: 'A public and official announcement, especially one by a ruling authority.',
          translation: 'tuyên cáo',
        },
        {
          term: 'underwriting',
          definition: 'The business of accepting financial liability for an event or transaction.',
        },
        {
          term: 'joint-stock',
          definition: 'Relating to a company whose capital is held in shares by many individuals.',
          translation: 'cổ phần',
        },
      ],
      groups: [
        {
          id: 'r001-p2-g1',
          instruction:
            'Questions 15–19 · Choose the correct heading for each paragraph (B, C, D, E, F) from the list.',
          questions: [
            {
              id: 'r001-q15',
              number: 15,
              type: 'matching-headings',
              paragraphId: 'B',
              headings: [
                { key: 'i', text: 'A royal attempt at suppression' },
                { key: 'ii', text: 'The financial infrastructure born in coffeehouses' },
                { key: 'iii', text: 'Conventions of conduct inside the coffeehouse' },
                { key: 'iv', text: 'Houses known by their clientele' },
                { key: 'v', text: "Displacement by tea and the gentleman's club" },
                { key: 'vi', text: 'Origins in mid-seventeenth-century Oxford' },
              ],
              correctAnswer: 'iii',
              explanation: 'Paragraph B describes the penny-door rule and the suspension of rank.',
            },
            {
              id: 'r001-q16',
              number: 16,
              type: 'matching-headings',
              paragraphId: 'C',
              headings: [
                { key: 'i', text: 'A royal attempt at suppression' },
                { key: 'ii', text: 'The financial infrastructure born in coffeehouses' },
                { key: 'iii', text: 'Conventions of conduct inside the coffeehouse' },
                { key: 'iv', text: 'Houses known by their clientele' },
                { key: 'v', text: "Displacement by tea and the gentleman's club" },
                { key: 'vi', text: 'Origins in mid-seventeenth-century Oxford' },
              ],
              correctAnswer: 'iv',
              explanation:
                "Paragraph C lists Jonathan's, Lloyd's, Will's and the Grecian by their clienteles.",
            },
            {
              id: 'r001-q17',
              number: 17,
              type: 'matching-headings',
              paragraphId: 'D',
              headings: [
                { key: 'i', text: 'A royal attempt at suppression' },
                { key: 'ii', text: 'The financial infrastructure born in coffeehouses' },
                { key: 'iii', text: 'Conventions of conduct inside the coffeehouse' },
                { key: 'iv', text: 'Houses known by their clientele' },
                { key: 'v', text: "Displacement by tea and the gentleman's club" },
                { key: 'vi', text: 'Origins in mid-seventeenth-century Oxford' },
              ],
              correctAnswer: 'i',
              explanation: "Paragraph D describes Charles II's failed 1675 proclamation.",
            },
            {
              id: 'r001-q18',
              number: 18,
              type: 'matching-headings',
              paragraphId: 'E',
              headings: [
                { key: 'i', text: 'A royal attempt at suppression' },
                { key: 'ii', text: 'The financial infrastructure born in coffeehouses' },
                { key: 'iii', text: 'Conventions of conduct inside the coffeehouse' },
                { key: 'iv', text: 'Houses known by their clientele' },
                { key: 'v', text: "Displacement by tea and the gentleman's club" },
                { key: 'vi', text: 'Origins in mid-seventeenth-century Oxford' },
              ],
              correctAnswer: 'ii',
              explanation:
                "Paragraph E argues the commercial legacy — Lloyd's, the Exchange — is the more lasting.",
            },
            {
              id: 'r001-q19',
              number: 19,
              type: 'matching-headings',
              paragraphId: 'F',
              headings: [
                { key: 'i', text: 'A royal attempt at suppression' },
                { key: 'ii', text: 'The financial infrastructure born in coffeehouses' },
                { key: 'iii', text: 'Conventions of conduct inside the coffeehouse' },
                { key: 'iv', text: 'Houses known by their clientele' },
                { key: 'v', text: "Displacement by tea and the gentleman's club" },
                { key: 'vi', text: 'Origins in mid-seventeenth-century Oxford' },
              ],
              correctAnswer: 'v',
              explanation: 'Paragraph F explains the decline as tea and private clubs took over.',
            },
          ],
        },
        {
          id: 'r001-p2-g2',
          instruction:
            'Questions 20–23 · Do the following statements agree with the information in the passage? TRUE, FALSE, or NOT GIVEN.',
          questions: [
            {
              id: 'r001-q20',
              number: 20,
              type: 'true-false-not-given',
              statement: 'The first English coffeehouse was opened in London.',
              correctAnswer: 'FALSE',
              explanation: 'Paragraph A says the first was in Oxford, in 1650.',
            },
            {
              id: 'r001-q21',
              number: 21,
              type: 'true-false-not-given',
              statement:
                'The 1675 royal proclamation against coffeehouses remained in force for less than a fortnight.',
              correctAnswer: 'TRUE',
              explanation: 'Paragraph D states the proclamation "lasted eleven days".',
            },
            {
              id: 'r001-q22',
              number: 22,
              type: 'true-false-not-given',
              statement: "Lloyd's of London traces its origins to a shipping-focused coffeehouse.",
              correctAnswer: 'TRUE',
              explanation:
                'Paragraph E says Lloyd\'s coffeehouse "evolved into Lloyd\'s of London".',
            },
            {
              id: 'r001-q23',
              number: 23,
              type: 'true-false-not-given',
              statement: 'Most coffeehouse patrons in seventeenth-century London could read.',
              correctAnswer: 'NOT GIVEN',
              explanation: 'The passage does not address literacy rates.',
            },
          ],
        },
        {
          id: 'r001-p2-g3',
          instruction: 'Questions 24–27 · Answer with NO MORE THAN TWO WORDS from the passage.',
          questions: [
            {
              id: 'r001-q24',
              number: 24,
              type: 'short-answer',
              question:
                'Which coffeehouse was the favoured meeting place for poets and playwrights?',
              correctAnswer: "Will's",
              acceptableVariants: ['Wills', "Will's coffeehouse"],
              maxWords: 2,
              explanation: "Paragraph C names Will's as the haunt of poets and playwrights.",
            },
            {
              id: 'r001-q25',
              number: 25,
              type: 'short-answer',
              question: 'Who was the monarch responsible for the 1675 proclamation?',
              correctAnswer: 'Charles II',
              acceptableVariants: ['King Charles II'],
              maxWords: 2,
              explanation: 'Paragraph D names Charles II.',
            },
            {
              id: 'r001-q26',
              number: 26,
              type: 'short-answer',
              question: 'Which former coffeehouse eventually became the London Stock Exchange?',
              correctAnswer: "Jonathan's",
              acceptableVariants: ['Jonathans'],
              maxWords: 1,
              explanation: "Paragraph E states Jonathan's became the London Stock Exchange.",
            },
            {
              id: 'r001-q27',
              number: 27,
              type: 'short-answer',
              question: 'What domestic beverage displaced coffee in the mid-eighteenth century?',
              correctAnswer: 'tea',
              acceptableVariants: [],
              maxWords: 1,
              explanation: 'Paragraph F says tea displaced coffee in domestic consumption.',
            },
          ],
        },
      ],
    },
    {
      id: 'reading-001-p3',
      number: 3,
      title: 'Sleep and the Adolescent Brain',
      wordCount: 560,
      bodyHtml: `
<p data-para="A"><strong>A.</strong> Adolescents are routinely described as sleep-deprived. The phrase is usually meant as a moral complaint — they stay up too late, they scroll their phones, they are responsible for their own tiredness. A growing body of research suggests that the picture is more complicated. The adolescent brain is, by clock-biology, wired to fall asleep later and to wake later than the brain of either a child or an adult. The problem is only partly behavioural; it is substantially biological.</p>
<p data-para="B"><strong>B.</strong> The human circadian rhythm is governed by a small cluster of neurons called the suprachiasmatic nucleus (SCN), which sits above the optic chiasm and responds to retinal light exposure. Around puberty, the SCN's timing shifts. Melatonin — the hormone that signals sleep readiness — is released up to two hours later in adolescents than in children of the same household. The evening feels subjectively "earlier" to the adolescent than it does to their parent, and the morning, correspondingly, feels earlier in the wrong direction.</p>
<p data-para="C"><strong>C.</strong> The consequence is a structural mismatch between adolescent biology and adolescent timetables. Most secondary schools in the developed world open before eight o'clock; the natural adolescent wake time, if permitted, is closer to nine. Recent American studies have measured this as an average loss of around 60 to 90 minutes of sleep per school night across the teenage population. Cumulative deficits of this magnitude cannot be offset by weekend recovery, a practice researchers have taken to calling "social jetlag."</p>
<p data-para="D"><strong>D.</strong> Sleep is not passive. During its deeper stages, the brain runs a series of maintenance operations — pruning unused synaptic connections, consolidating the day's episodic memories into long-term storage, flushing metabolic waste through the glymphatic system. In adolescents, whose cortex is in an active period of reorganisation, these processes are especially important. Chronic curtailment of sleep does not merely leave a teenager tired; it compromises the very architectural work that is supposed to happen while they are tired.</p>
<p data-para="E"><strong>E.</strong> Policy responses have been slow, though they exist. A widely-cited 2017 experiment in Seattle's public high schools shifted start times from 7:50 a.m. to 8:45 a.m. Measured sleep increased by an average of 34 minutes per night. Attendance rose; grades in first-period classes rose; self-reported mood improved. The result was consistent across income groups, though the effect was larger for students whose families had less flexibility in morning schedules — precisely the students who are hardest to reach by exhortation alone.</p>
<p data-para="F"><strong>F.</strong> Whether schools more widely adopt later start times is, in the end, less a scientific question than a logistical and political one. Buses, parental work schedules, and the conventions of after-school sport all press in the opposite direction. But the underlying research finding is no longer in dispute: the adolescent brain is not mis-scheduling itself. The schedule has been, for several generations, mis-matched to the brain.</p>
`,
      vocabulary: [
        {
          term: 'circadian',
          definition: 'Relating to the biological cycles that recur approximately every 24 hours.',
          translation: 'nhịp sinh học',
        },
        {
          term: 'melatonin',
          definition: 'A hormone produced by the pineal gland that regulates the sleep-wake cycle.',
          translation: 'melatonin',
        },
        {
          term: 'synaptic',
          definition: 'Relating to the junction between two nerve cells.',
        },
        {
          term: 'glymphatic',
          definition:
            "Relating to the brain's waste-clearance system, active chiefly during sleep.",
        },
        {
          term: 'social jetlag',
          definition:
            'The mismatch between biological sleep timing and socially imposed schedules.',
          translation: 'lệch pha xã hội',
        },
      ],
      groups: [
        {
          id: 'r001-p3-g1',
          instruction:
            'Questions 28–31 · Complete each sentence with NO MORE THAN THREE WORDS from the passage.',
          questions: [
            {
              id: 'r001-q28',
              number: 28,
              type: 'sentence-completion',
              sentenceBefore:
                'The cluster of neurons that governs the human circadian rhythm is called the',
              sentenceAfter: '.',
              correctAnswer: 'suprachiasmatic nucleus',
              acceptableVariants: ['SCN'],
              maxWords: 3,
              explanation: 'Paragraph B names the suprachiasmatic nucleus (SCN).',
            },
            {
              id: 'r001-q29',
              number: 29,
              type: 'sentence-completion',
              sentenceBefore: 'The hormone that signals sleep readiness is',
              sentenceAfter: '.',
              correctAnswer: 'melatonin',
              acceptableVariants: [],
              maxWords: 1,
              explanation: 'Paragraph B names melatonin.',
            },
            {
              id: 'r001-q30',
              number: 30,
              type: 'sentence-completion',
              sentenceBefore:
                'Researchers describe the pattern of sleeping longer at weekends to offset weekday deficits as',
              sentenceAfter: '.',
              correctAnswer: 'social jetlag',
              acceptableVariants: [],
              maxWords: 2,
              explanation: 'Paragraph C introduces the term "social jetlag".',
            },
            {
              id: 'r001-q31',
              number: 31,
              type: 'sentence-completion',
              sentenceBefore: "The brain's overnight waste-clearance system is known as the",
              sentenceAfter: '.',
              correctAnswer: 'glymphatic system',
              acceptableVariants: ['glymphatic'],
              maxWords: 2,
              explanation: 'Paragraph D refers to "the glymphatic system".',
            },
          ],
        },
        {
          id: 'r001-p3-g2',
          instruction:
            'Questions 32–36 · Do the following statements agree with the information in the passage? TRUE, FALSE, or NOT GIVEN.',
          questions: [
            {
              id: 'r001-q32',
              number: 32,
              type: 'true-false-not-given',
              statement:
                "The adolescent brain is biologically programmed to fall asleep later than a child's.",
              correctAnswer: 'TRUE',
              explanation: 'Paragraph A states the brain is "wired to fall asleep later".',
            },
            {
              id: 'r001-q33',
              number: 33,
              type: 'true-false-not-given',
              statement:
                'Melatonin is typically released at the same time for adolescents as for adults in the same home.',
              correctAnswer: 'FALSE',
              explanation:
                'Paragraph B states melatonin is released up to two hours later in adolescents.',
            },
            {
              id: 'r001-q34',
              number: 34,
              type: 'true-false-not-given',
              statement: 'Most secondary schools in the developed world start later than 9 a.m.',
              correctAnswer: 'FALSE',
              explanation: 'Paragraph C states most open before 8 a.m.',
            },
            {
              id: 'r001-q35',
              number: 35,
              type: 'true-false-not-given',
              statement: 'Sleep is a passive state in which the brain performs little maintenance.',
              correctAnswer: 'FALSE',
              explanation: 'Paragraph D opens with "Sleep is not passive".',
            },
            {
              id: 'r001-q36',
              number: 36,
              type: 'true-false-not-given',
              statement:
                'After the Seattle change, students from lower-income families gained more sleep on average than students from higher-income families.',
              correctAnswer: 'TRUE',
              explanation:
                'Paragraph E says the effect was larger for students whose families had less flexibility.',
            },
          ],
        },
        {
          id: 'r001-p3-g3',
          instruction: 'Questions 37–40 · Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'r001-q37',
              number: 37,
              type: 'multiple-choice',
              prompt:
                'According to the passage, what was the approximate average nightly sleep gain after the Seattle start-time change?',
              options: [
                { key: 'A', text: '10 minutes' },
                { key: 'B', text: '34 minutes' },
                { key: 'C', text: '60 minutes' },
                { key: 'D', text: '90 minutes' },
              ],
              correctAnswer: 'B',
              explanation:
                'Paragraph E says sleep increased "by an average of 34 minutes per night".',
            },
            {
              id: 'r001-q38',
              number: 38,
              type: 'multiple-choice',
              prompt: 'What is the main point of paragraph D?',
              options: [
                { key: 'A', text: 'Sleep is merely restful and largely passive.' },
                { key: 'B', text: 'Sleep deprivation affects mood but not cognition.' },
                {
                  key: 'C',
                  text: 'Sleep performs active structural work that is especially important during adolescence.',
                },
                {
                  key: 'D',
                  text: 'The glymphatic system was discovered in the 2017 Seattle study.',
                },
              ],
              correctAnswer: 'C',
              explanation:
                'Paragraph D argues sleep is active maintenance, and is particularly important during cortical reorganisation in adolescence.',
            },
            {
              id: 'r001-q39',
              number: 39,
              type: 'multiple-choice',
              prompt:
                'What does the writer suggest is the chief obstacle to wider adoption of later school start times?',
              options: [
                { key: 'A', text: 'Disagreement among neuroscientists.' },
                { key: 'B', text: 'Logistical and political constraints on families and schools.' },
                { key: 'C', text: 'Cost of new buildings.' },
                { key: 'D', text: 'Student resistance.' },
              ],
              correctAnswer: 'B',
              explanation:
                'Paragraph F attributes the slow adoption to logistics and politics, not science.',
            },
            {
              id: 'r001-q40',
              number: 40,
              type: 'multiple-choice',
              prompt:
                'The writer\'s overall attitude toward the "moral complaint" that adolescents stay up too late is best described as',
              options: [
                { key: 'A', text: 'supportive — adolescents are responsible for their tiredness.' },
                {
                  key: 'B',
                  text: 'sceptical — the complaint oversimplifies a biological reality.',
                },
                { key: 'C', text: 'neutral — the writer takes no position.' },
                { key: 'D', text: 'alarmed — adolescents are destroying their health.' },
              ],
              correctAnswer: 'B',
              explanation:
                'Paragraph A calls the phrase "a moral complaint" but says the picture is "more complicated" and "substantially biological".',
            },
          ],
        },
      ],
    },
  ],
}
