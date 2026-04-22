import type { Test } from '../../schemas/test'

export const reading002: Test = {
  id: 'reading-002',
  skill: 'reading',
  title: 'Reading Test 02',
  description:
    'Three passages spanning economics, cognitive science, and cultural history — calibrated at Band 7+.',
  difficulty: 'advanced',
  fullDurationMinutes: 60,
  shortDurationMinutes: 30,
  totalQuestions: 40,
  isPro: true,
  publishedAt: '2026-04-08',
  tags: ['IELTS Academic', 'Reading'],
  passages: [
    {
      id: 'reading-002-p1',
      number: 1,
      title: 'Essay · The pharmacology of forgetting',
      wordCount: 620,
      bodyHtml: `
<p data-para="A"><strong>A.</strong> It is widely assumed that memory is a faculty one should want more of. Sharper recall is praised; age-related forgetting is mourned. Yet, from the perspective of clinical psychiatry, the most pressing memory-related suffering is, almost always, of the opposite sort: too much memory, not too little. Post-traumatic stress disorder is a disease of excessive recall — of memories so vividly lodged that ordinary life cannot proceed around them.</p>
<p data-para="B"><strong>B.</strong> The pharmacology of memory modification has progressed quickly in the past two decades. Propranolol, a beta-blocker originally developed for heart arrhythmias, has been shown in small trials to dampen the emotional charge of a memory when administered during its reconsolidation window — the brief period, after recall, when a memory is temporarily pliable before it is laid down anew.</p>
<p data-para="C"><strong>C.</strong> Clinicians who favour such treatments argue that reducing the emotional force of a traumatic recollection is not the same as erasing it. The patient still knows what happened; what changes is the intensity with which the event intrudes. Critics counter that the line is thinner than it seems, and that systematic use of memory-modifying drugs raises deeper questions about the relationship between memory and personal identity.</p>
<p data-para="D"><strong>D.</strong> Consider the soldier who, at a military tribunal, is asked to testify to events whose emotional weight has been pharmacologically reduced. Is the testimony still honest? The facts remain; the witnessing has shifted. Consider, too, the victim of assault who, having accepted a propranolol protocol, finds they can no longer summon sufficient outrage to press charges. The pharmacology has, in effect, altered the moral terrain on which decisions are made.</p>
<p data-para="E"><strong>E.</strong> Neuroscientists have tended to be sanguine. Karim Nader, whose rodent work in 2000 first demonstrated the malleability of reconsolidated memories, has argued that all memory is already, biologically, an act of reconstruction — that no recall is ever neutral. In that view, pharmacology is merely an intensified version of what therapy, time and narrative have always done.</p>
<p data-para="F"><strong>F.</strong> Ethicists are less untroubled. The philosopher Leon Kass, writing for the US President's Council on Bioethics in 2003, argued that memory-dampening drugs threaten "the soul of the man who takes them" by severing the felt continuity between past and present. Kass's position is minority, yet its worry recurs in every serious discussion: memory, unlike most other faculties, is not merely what we have; it is partly what we are.</p>
`,
      vocabulary: [
        {
          term: 'reconsolidation',
          definition: 'The biological process by which a recalled memory is re-stored.',
        },
        {
          term: 'sanguine',
          definition: 'Optimistic or confident, especially in difficult circumstances.',
          translation: 'lạc quan',
        },
        { term: 'pliable', definition: 'Easily bent or shaped.', translation: 'dễ uốn nắn' },
        { term: 'malleability', definition: 'The capacity to be changed or reshaped.' },
        {
          term: 'intrude',
          definition: 'To come in without being invited or wanted.',
          translation: 'xâm phạm',
        },
      ],
      groups: [
        {
          id: 'r002-p1-g1',
          instruction:
            'Questions 1–5 · Do the following statements agree with the views of the writer? Choose YES, NO or NOT GIVEN.',
          questions: [
            {
              id: 'r002-q1',
              number: 1,
              type: 'yes-no-not-given',
              statement: 'The writer believes that sharper memory is always desirable.',
              correctAnswer: 'NO',
              explanation:
                'Paragraph A opens with the "widely assumed" view and then qualifies it — the writer disagrees.',
            },
            {
              id: 'r002-q2',
              number: 2,
              type: 'yes-no-not-given',
              statement:
                'Propranolol was originally developed to treat emotional disorders rather than cardiac ones.',
              correctAnswer: 'NO',
              explanation:
                'Paragraph B states it was "originally developed for heart arrhythmias".',
            },
            {
              id: 'r002-q3',
              number: 3,
              type: 'yes-no-not-given',
              statement: "The writer finds the ethicist Leon Kass's position persuasive.",
              correctAnswer: 'NOT GIVEN',
              explanation:
                "The writer describes Kass's position as minority but does not say whether they agree.",
            },
            {
              id: 'r002-q4',
              number: 4,
              type: 'yes-no-not-given',
              statement:
                'The writer thinks that dampening a traumatic memory is equivalent to erasing it.',
              correctAnswer: 'NO',
              explanation:
                'Paragraph C explicitly reports this view from clinicians and then complicates it.',
            },
            {
              id: 'r002-q5',
              number: 5,
              type: 'yes-no-not-given',
              statement:
                'Recent trials of propranolol have involved tens of thousands of participants.',
              correctAnswer: 'NOT GIVEN',
              explanation: 'Trial scale is not specified beyond "small trials" in paragraph B.',
            },
          ],
        },
        {
          id: 'r002-p1-g2',
          instruction:
            'Questions 6–10 · The passage has six paragraphs A–F. Which paragraph contains the following information?',
          questions: [
            {
              id: 'r002-q6',
              number: 6,
              type: 'matching-information',
              statement: 'A reference to an ethicist writing for a government bioethics council.',
              paragraphLabels: ['A', 'B', 'C', 'D', 'E', 'F'],
              correctAnswer: 'F',
              explanation: 'Paragraph F names Leon Kass and the 2003 Council report.',
            },
            {
              id: 'r002-q7',
              number: 7,
              type: 'matching-information',
              statement:
                'A counter-claim that all memory is already reconstructive, so pharmacology is merely an intensification.',
              paragraphLabels: ['A', 'B', 'C', 'D', 'E', 'F'],
              correctAnswer: 'E',
              explanation: 'Paragraph E attributes this view to Karim Nader.',
            },
            {
              id: 'r002-q8',
              number: 8,
              type: 'matching-information',
              statement:
                'Two worked examples in which pharmacological dampening might distort decision-making.',
              paragraphLabels: ['A', 'B', 'C', 'D', 'E', 'F'],
              correctAnswer: 'D',
              explanation:
                'Paragraph D gives the soldier at a tribunal and the assault victim as examples.',
            },
            {
              id: 'r002-q9',
              number: 9,
              type: 'matching-information',
              statement:
                'An explanation of the reconsolidation window during which memories are briefly pliable.',
              paragraphLabels: ['A', 'B', 'C', 'D', 'E', 'F'],
              correctAnswer: 'B',
              explanation:
                'Paragraph B defines "the reconsolidation window" in the context of propranolol.',
            },
            {
              id: 'r002-q10',
              number: 10,
              type: 'matching-information',
              statement:
                'The claim that the most common memory-related suffering is an excess, not a deficit.',
              paragraphLabels: ['A', 'B', 'C', 'D', 'E', 'F'],
              correctAnswer: 'A',
              explanation: 'Paragraph A opens on this premise, citing PTSD as an illustration.',
            },
          ],
        },
        {
          id: 'r002-p1-g3',
          instruction:
            'Questions 11–13 · Complete the sentences below. Write NO MORE THAN TWO WORDS from the passage for each answer.',
          questions: [
            {
              id: 'r002-q11',
              number: 11,
              type: 'sentence-completion',
              sentenceBefore: 'Propranolol was originally developed to treat heart',
              sentenceAfter: '.',
              correctAnswer: 'arrhythmias',
              acceptableVariants: ['arrhythmia'],
              maxWords: 1,
              explanation: 'Paragraph B — "heart arrhythmias".',
            },
            {
              id: 'r002-q12',
              number: 12,
              type: 'sentence-completion',
              sentenceBefore: "Karim Nader's work on rodents in",
              sentenceAfter: 'first demonstrated the malleability of reconsolidated memories.',
              correctAnswer: '2000',
              acceptableVariants: [],
              maxWords: 1,
              explanation: 'Paragraph E — "rodent work in 2000".',
            },
            {
              id: 'r002-q13',
              number: 13,
              type: 'sentence-completion',
              sentenceBefore:
                'Leon Kass argues that memory-dampening drugs threaten the felt continuity between past and',
              sentenceAfter: '.',
              correctAnswer: 'present',
              acceptableVariants: [],
              maxWords: 1,
              explanation: 'Paragraph F — "between past and present".',
            },
          ],
        },
      ],
    },
    {
      id: 'reading-002-p2',
      number: 2,
      title: 'Essay · The revival of local currencies',
      wordCount: 640,
      bodyHtml: `
<p data-para="A"><strong>A.</strong> A local currency is a medium of exchange accepted only within a defined community — a town, a valley, a region. The idea is old: scrip, tokens, and cooperative vouchers circulated widely during the Great Depression in both the United States and central Europe, when national currencies temporarily stopped doing what currencies are supposed to do. After the Second World War the practice faded. In the past two decades, however, schemes have begun to reappear in unremarkable, prosperous places — Totnes in Devon, Brixton in south London, Nantes in western France, Chiemgau in Bavaria. Their reappearance, in a period without banking collapse or hyperinflation, is the interesting fact.</p>
<p data-para="B"><strong>B.</strong> Proponents argue that local currencies address a structural weakness in ordinary money: its frictionless leakage. A pound spent at a chain retailer typically leaves the town within days, routed upward to the retailer's national balance sheet and, often, offshore from there. A pound spent at an independent shop circulates for longer — the grocer pays a local supplier, who pays a local farmer, who pays a local repairer — before it too departs. The claim is not that a local currency captures value that would otherwise be lost; it is that the velocity of local spending is higher, and the resulting economic activity greater, for each unit issued.</p>
<p data-para="C"><strong>C.</strong> Critics are unconvinced. Monetary economists point out that any currency derives its usefulness from the breadth of its acceptance. Restricting a currency to a single town is, by construction, restricting what it can buy. A resident who accepts payment in Brixton Pounds is constrained to spend them in Brixton — pleasant, perhaps, but also a real cost if the best supplier is elsewhere. The scheme works as intended only when the forgone alternative happens to be exactly what the resident would have done anyway.</p>
<p data-para="D"><strong>D.</strong> The empirical evidence is mixed but interesting. A 2015 study of the Chiemgauer — the Bavarian local currency — found that each unit in circulation was spent, on average, about three times faster than each euro in the same region. The number is often cited. Less often cited is the second finding of the same study: the total volume of Chiemgauer in circulation was less than 0.2 percent of regional euro activity. The velocity gain was real; the macroeconomic footprint was, at best, marginal.</p>
<p data-para="E"><strong>E.</strong> Several schemes have concluded that their contribution is less economic than civic. The Bristol Pound, active from 2012 to 2020, came to describe itself as a "conversation" between residents and local businesses — a device for making visible a pattern of spending that would otherwise be invisible. When it closed, its organisers cited not economic failure but the arrival of digital payment systems that made its physical notes, once novel and tangible, feel outdated. What the Bristol Pound had mainly achieved, they argued, was to teach a generation to ask where their money ended up.</p>
<p data-para="F"><strong>F.</strong> Whether that lesson survives the closure of the schemes that taught it is an open question. The digital wallets now displacing local paper currencies are, in principle, capable of the same civic work — a button that spends only in accredited local businesses is technically trivial. Whether anyone will build and use such a button is a question about taste and community formation, not about money.</p>
`,
      vocabulary: [
        {
          term: 'scrip',
          definition:
            'Substitute currency issued by a community, employer, or cooperative, redeemable within a limited sphere.',
          translation: 'phiếu tiền tệ',
        },
        {
          term: 'velocity',
          definition:
            'In economics, the average frequency with which a unit of currency is spent over a given period.',
          translation: 'vận tốc lưu thông tiền',
        },
        {
          term: 'hyperinflation',
          definition:
            'Extremely high and typically accelerating inflation that erodes the real value of the local currency.',
          translation: 'siêu lạm phát',
        },
        {
          term: 'footprint',
          definition: 'Figuratively, the measurable imprint or extent of an activity.',
        },
        {
          term: 'civic',
          definition: 'Relating to the concerns and responsibilities of a community of citizens.',
          translation: 'công dân, dân sự',
        },
      ],
      groups: [
        {
          id: 'r002-p2-g1',
          instruction:
            'Questions 14–18 · Choose the correct heading for each paragraph (A, B, C, D, E) from the list.',
          questions: [
            {
              id: 'r002-q14',
              number: 14,
              type: 'matching-headings',
              paragraphId: 'A',
              headings: [
                { key: 'i', text: 'Velocity gains against a modest footprint' },
                { key: 'ii', text: 'The critique from monetary economics' },
                { key: 'iii', text: 'The reappearance of an old idea in unlikely places' },
                { key: 'iv', text: 'The leakage argument for keeping spending local' },
                { key: 'v', text: 'The civic reframing of local-currency schemes' },
                { key: 'vi', text: 'Digital successors and the question of taste' },
              ],
              correctAnswer: 'iii',
              explanation:
                'Paragraph A traces the idea from the 1930s and notes its unlikely recent revival.',
            },
            {
              id: 'r002-q15',
              number: 15,
              type: 'matching-headings',
              paragraphId: 'B',
              headings: [
                { key: 'i', text: 'Velocity gains against a modest footprint' },
                { key: 'ii', text: 'The critique from monetary economics' },
                { key: 'iii', text: 'The reappearance of an old idea in unlikely places' },
                { key: 'iv', text: 'The leakage argument for keeping spending local' },
                { key: 'v', text: 'The civic reframing of local-currency schemes' },
                { key: 'vi', text: 'Digital successors and the question of taste' },
              ],
              correctAnswer: 'iv',
              explanation: 'Paragraph B makes the leakage-and-velocity case for local currencies.',
            },
            {
              id: 'r002-q16',
              number: 16,
              type: 'matching-headings',
              paragraphId: 'C',
              headings: [
                { key: 'i', text: 'Velocity gains against a modest footprint' },
                { key: 'ii', text: 'The critique from monetary economics' },
                { key: 'iii', text: 'The reappearance of an old idea in unlikely places' },
                { key: 'iv', text: 'The leakage argument for keeping spending local' },
                { key: 'v', text: 'The civic reframing of local-currency schemes' },
                { key: 'vi', text: 'Digital successors and the question of taste' },
              ],
              correctAnswer: 'ii',
              explanation:
                "Paragraph C presents the economist's counter-argument about breadth of acceptance.",
            },
            {
              id: 'r002-q17',
              number: 17,
              type: 'matching-headings',
              paragraphId: 'D',
              headings: [
                { key: 'i', text: 'Velocity gains against a modest footprint' },
                { key: 'ii', text: 'The critique from monetary economics' },
                { key: 'iii', text: 'The reappearance of an old idea in unlikely places' },
                { key: 'iv', text: 'The leakage argument for keeping spending local' },
                { key: 'v', text: 'The civic reframing of local-currency schemes' },
                { key: 'vi', text: 'Digital successors and the question of taste' },
              ],
              correctAnswer: 'i',
              explanation:
                'Paragraph D sets the Chiemgauer velocity against its 0.2 percent footprint.',
            },
            {
              id: 'r002-q18',
              number: 18,
              type: 'matching-headings',
              paragraphId: 'E',
              headings: [
                { key: 'i', text: 'Velocity gains against a modest footprint' },
                { key: 'ii', text: 'The critique from monetary economics' },
                { key: 'iii', text: 'The reappearance of an old idea in unlikely places' },
                { key: 'iv', text: 'The leakage argument for keeping spending local' },
                { key: 'v', text: 'The civic reframing of local-currency schemes' },
                { key: 'vi', text: 'Digital successors and the question of taste' },
              ],
              correctAnswer: 'v',
              explanation:
                'Paragraph E describes the Bristol Pound\'s reframing as a civic "conversation".',
            },
          ],
        },
        {
          id: 'r002-p2-g2',
          instruction:
            'Questions 19–23 · Do the following statements agree with the views of the writer? YES, NO, or NOT GIVEN.',
          questions: [
            {
              id: 'r002-q19',
              number: 19,
              type: 'yes-no-not-given',
              statement:
                'Local currencies reappeared in the 2000s in response to a specific banking crisis.',
              correctAnswer: 'NO',
              explanation:
                'Paragraph A explicitly notes they reappeared in a period without banking collapse or hyperinflation — that is the interesting fact.',
            },
            {
              id: 'r002-q20',
              number: 20,
              type: 'yes-no-not-given',
              statement:
                "The economist's critique of local currencies is, in the writer's view, valid.",
              correctAnswer: 'YES',
              explanation:
                'The writer concedes the critique in paragraph C — restricting a currency is a real cost.',
            },
            {
              id: 'r002-q21',
              number: 21,
              type: 'yes-no-not-given',
              statement: 'The macroeconomic impact of the Chiemgauer scheme has been substantial.',
              correctAnswer: 'NO',
              explanation:
                'Paragraph D states the footprint was "at best, marginal" — under 0.2 percent.',
            },
            {
              id: 'r002-q22',
              number: 22,
              type: 'yes-no-not-given',
              statement: 'Most local currency schemes closed because of fraud.',
              correctAnswer: 'NOT GIVEN',
              explanation: 'The passage discusses reasons for closure but does not mention fraud.',
            },
            {
              id: 'r002-q23',
              number: 23,
              type: 'yes-no-not-given',
              statement:
                'Digital payment systems could, in principle, perform the same civic function as paper local currencies.',
              correctAnswer: 'YES',
              explanation:
                'Paragraph F states digital wallets are "in principle, capable of the same civic work".',
            },
          ],
        },
        {
          id: 'r002-p2-g3',
          instruction:
            'Questions 24–27 · Answer with NO MORE THAN TWO WORDS AND/OR A NUMBER from the passage.',
          questions: [
            {
              id: 'r002-q24',
              number: 24,
              type: 'short-answer',
              question:
                'In which Bavarian area does the local currency cited in the 2015 study circulate?',
              correctAnswer: 'Chiemgau',
              acceptableVariants: ['Chiemgauer'],
              maxWords: 1,
              explanation: 'Paragraph A lists Chiemgau; paragraph D names the Chiemgauer.',
            },
            {
              id: 'r002-q25',
              number: 25,
              type: 'short-answer',
              question:
                'According to the 2015 study, by roughly what factor did the local currency circulate faster than the euro?',
              correctAnswer: 'three times',
              acceptableVariants: ['3 times', 'three'],
              maxWords: 2,
              explanation: 'Paragraph D — "about three times faster than each euro".',
            },
            {
              id: 'r002-q26',
              number: 26,
              type: 'short-answer',
              question: 'In which year did the Bristol Pound close?',
              correctAnswer: '2020',
              acceptableVariants: [],
              maxWords: 1,
              explanation: 'Paragraph E states the Bristol Pound was active from 2012 to 2020.',
            },
            {
              id: 'r002-q27',
              number: 27,
              type: 'short-answer',
              question:
                'What word does the writer use to describe the claim that local currencies matter mainly for reasons beyond economics?',
              correctAnswer: 'civic',
              acceptableVariants: [],
              maxWords: 1,
              explanation: 'Paragraph E reframes the contribution as "less economic than civic".',
            },
          ],
        },
      ],
    },
    {
      id: 'reading-002-p3',
      number: 3,
      title: 'The Music of the Spheres',
      wordCount: 610,
      bodyHtml: `
<p data-para="A"><strong>A.</strong> The ancient idea that the planets make music as they move — the so-called <em>musica universalis</em> or "music of the spheres" — is among the longest-lived errors in Western thought. It was not, at first, an error. When Pythagoras is said to have discovered in the sixth century BC that musical consonance corresponds to whole-number ratios of string length, it was a philosophically plausible next step to suppose that the same ratios governed the heavens. If the plucked string and the spinning sphere alike produced harmony, the universe must be, at its deepest level, a kind of musical composition.</p>
<p data-para="B"><strong>B.</strong> The idea was refined, not abandoned, for nearly two thousand years. Plato endorsed it in the <em>Timaeus</em>. Ptolemy, in the second century AD, worked out detailed assignments of pitches to planetary orbits. Boethius, writing in the sixth century, distinguished three kinds of music: that of instruments, that of the human body, and that of the cosmos — arranging them in order of ascending dignity. By the late Middle Ages, the music of the spheres was not one theory among many; it was the background against which other theories of the cosmos were proposed.</p>
<p data-para="C"><strong>C.</strong> Its most scientifically serious advocate was Johannes Kepler, in his 1619 <em>Harmonices Mundi</em>. Kepler had spent twenty years reconstructing planetary orbits from Tycho Brahe's observational data. His third law of planetary motion — that the square of a planet's orbital period is proportional to the cube of its semi-major axis — is, in Kepler's own mind, inseparable from his claim that each planet, in moving around the sun, traces out a distinctive musical interval. The book dedicates chapters to transcribing those intervals into staff notation. Mars is assigned a minor third; Earth, a semitone between mi and fa, which Kepler notes with grim pleasure corresponds to the words <em>miseria</em> and <em>fames</em> — misery and famine.</p>
<p data-para="D"><strong>D.</strong> The astronomical century that followed Kepler was unkind to his musical claims. Newton's <em>Principia</em>, in 1687, provided a mechanical account of planetary motion that required no harmonic supplement. Elliptical orbits emerged from gravitational attraction alone. The music of the spheres, insofar as it had been a scientific hypothesis, was quietly retired. Insofar as it had been a metaphor, however, it proved remarkably resilient.</p>
<p data-para="E"><strong>E.</strong> The metaphor migrated. It appears, barely modified, in the opening of Shakespeare's <em>The Merchant of Venice</em>, where Lorenzo tells Jessica that "there's not the smallest orb which thou behold'st / But in his motion like an angel sings." It structures the final movement of Gustav Holst's <em>The Planets</em>, composed between 1914 and 1917, in which each planet is represented by its own distinctive musical language — Mars as the bringer of war, Venus as the bringer of peace. It resurfaces in the late twentieth century in the work of composers such as John Luther Adams, who writes orchestral pieces keyed to specific Arctic geographies.</p>
<p data-para="F"><strong>F.</strong> Whether a metaphor that has outlived its scientific justification by three hundred years ought still to be called the "music of the spheres" is a matter of taste rather than of fact. What is striking is how reluctant Western culture has been to let the image go. One interpretation is that it answers a need not quite met by the mechanical universe that replaced it: the need to feel that the motion of the very large shares something of the structure of the things we experience as meaningful in our smaller lives.</p>
`,
      vocabulary: [
        {
          term: 'consonance',
          definition: 'In music, a combination of notes that sound pleasing or stable together.',
          translation: 'hòa âm',
        },
        {
          term: 'semi-major axis',
          definition:
            'Half of the longest diameter of an ellipse; used to describe planetary orbits.',
        },
        {
          term: 'elliptical',
          definition: 'Shaped like an ellipse — a slightly flattened circle.',
          translation: 'hình ê-líp',
        },
        {
          term: 'metaphor',
          definition:
            'A figure of speech in which one thing is described as another to suggest likeness.',
          translation: 'ẩn dụ',
        },
      ],
      groups: [
        {
          id: 'r002-p3-g1',
          instruction:
            'Questions 28–32 · Match each figure with the claim the passage attributes to them. Choose the correct letter A–F.',
          questions: [
            {
              id: 'r002-q28',
              number: 28,
              type: 'multiple-choice',
              prompt: 'Johannes Kepler claimed that each planet',
              options: [
                { key: 'A', text: 'emits audible sound detectable by astronomers.' },
                { key: 'B', text: 'traces out a distinct musical interval as it orbits.' },
                { key: 'C', text: 'rotates to a drumbeat set by the Sun.' },
                { key: 'D', text: 'corresponds to one of the six tones of the medieval scale.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph C — each planet "traces out a distinctive musical interval".',
            },
            {
              id: 'r002-q29',
              number: 29,
              type: 'multiple-choice',
              prompt: "According to the writer, Newton's work in 1687",
              options: [
                { key: 'A', text: "confirmed Kepler's musical claims." },
                { key: 'B', text: 'retired the music of the spheres as a scientific hypothesis.' },
                { key: 'C', text: 'proved that the planets make no sound.' },
                { key: 'D', text: 'rediscovered Pythagorean ratios in gravity.' },
              ],
              correctAnswer: 'B',
              explanation:
                "Paragraph D — Newton's mechanical account meant no harmonic supplement was required.",
            },
            {
              id: 'r002-q30',
              number: 30,
              type: 'multiple-choice',
              prompt: 'Boethius, in the sixth century,',
              options: [
                { key: 'A', text: 'rejected the musica universalis.' },
                { key: 'B', text: 'ranked cosmic music above instrumental and bodily music.' },
                { key: 'C', text: 'invented staff notation for planetary intervals.' },
                { key: 'D', text: 'proved the idea with mathematical rigour.' },
              ],
              correctAnswer: 'B',
              explanation:
                'Paragraph B — Boethius arranged the three kinds of music in ascending dignity, with cosmic music highest.',
            },
            {
              id: 'r002-q31',
              number: 31,
              type: 'multiple-choice',
              prompt: "Holst's <em>The Planets</em>, the writer suggests,",
              options: [
                { key: 'A', text: "aims to reproduce Kepler's transcriptions exactly." },
                {
                  key: 'B',
                  text: 'treats each planet as a distinct musical character in a metaphorical sense.',
                },
                { key: 'C', text: 'proves Kepler correct on scientific grounds.' },
                { key: 'D', text: 'has been forgotten since 1917.' },
              ],
              correctAnswer: 'B',
              explanation:
                'Paragraph E — each planet is represented by its own distinctive musical language; this is the metaphor migrating into art.',
            },
            {
              id: 'r002-q32',
              number: 32,
              type: 'multiple-choice',
              prompt:
                "The opening passage of Shakespeare's <em>The Merchant of Venice</em> is cited as evidence that",
              options: [
                { key: 'A', text: 'Shakespeare endorsed Pythagorean mathematics.' },
                {
                  key: 'B',
                  text: 'the music-of-the-spheres metaphor was still current in Elizabethan drama.',
                },
                { key: 'C', text: "Newton's ideas were already being anticipated." },
                { key: 'D', text: 'Lorenzo was a practising musician.' },
              ],
              correctAnswer: 'B',
              explanation:
                'Paragraph E cites the passage as evidence the metaphor "migrated" into literature.',
            },
          ],
        },
        {
          id: 'r002-p3-g2',
          instruction:
            'Questions 33–36 · Do the following statements agree with the information in the passage? TRUE, FALSE, or NOT GIVEN.',
          questions: [
            {
              id: 'r002-q33',
              number: 33,
              type: 'true-false-not-given',
              statement:
                'Pythagoras is credited with discovering that musical consonance corresponds to simple numerical ratios.',
              correctAnswer: 'TRUE',
              explanation:
                'Paragraph A — Pythagoras discovered that consonance corresponds to whole-number ratios of string length.',
            },
            {
              id: 'r002-q34',
              number: 34,
              type: 'true-false-not-given',
              statement: 'Kepler assigned Earth a wide and joyful musical interval.',
              correctAnswer: 'FALSE',
              explanation:
                'Paragraph C — Earth is assigned a semitone corresponding to miseria and fames (misery and famine).',
            },
            {
              id: 'r002-q35',
              number: 35,
              type: 'true-false-not-given',
              statement:
                "Ptolemy's planetary pitch assignments are still used in astronomy education today.",
              correctAnswer: 'NOT GIVEN',
              explanation:
                'The passage mentions Ptolemy made assignments but says nothing about present use.',
            },
            {
              id: 'r002-q36',
              number: 36,
              type: 'true-false-not-given',
              statement:
                'Kepler considered his musical claims inseparable from his third law of planetary motion.',
              correctAnswer: 'TRUE',
              explanation: 'Paragraph C — "in Kepler\'s own mind, inseparable from his claim".',
            },
          ],
        },
        {
          id: 'r002-p3-g3',
          instruction:
            'Questions 37–40 · Complete each sentence with NO MORE THAN THREE WORDS from the passage.',
          questions: [
            {
              id: 'r002-q37',
              number: 37,
              type: 'sentence-completion',
              sentenceBefore: 'Kepler laid out his musical cosmology in a 1619 book titled',
              sentenceAfter: '.',
              correctAnswer: 'Harmonices Mundi',
              acceptableVariants: ['Harmonices Mundi.'],
              maxWords: 2,
              explanation: 'Paragraph C names the book.',
            },
            {
              id: 'r002-q38',
              number: 38,
              type: 'sentence-completion',
              sentenceBefore: 'Kepler drew on the observational data of the astronomer',
              sentenceAfter: '.',
              correctAnswer: 'Tycho Brahe',
              acceptableVariants: ['Brahe'],
              maxWords: 2,
              explanation: "Paragraph C — Tycho Brahe's observational data.",
            },
            {
              id: 'r002-q39',
              number: 39,
              type: 'sentence-completion',
              sentenceBefore:
                "In the final movement of Holst's suite, Mars is designated the bringer of",
              sentenceAfter: '.',
              correctAnswer: 'war',
              acceptableVariants: [],
              maxWords: 1,
              explanation: 'Paragraph E — "Mars as the bringer of war".',
            },
            {
              id: 'r002-q40',
              number: 40,
              type: 'sentence-completion',
              sentenceBefore:
                'A late-twentieth-century composer who writes orchestral works keyed to Arctic geographies is',
              sentenceAfter: '.',
              correctAnswer: 'John Luther Adams',
              acceptableVariants: ['Adams'],
              maxWords: 3,
              explanation: 'Paragraph E names John Luther Adams.',
            },
          ],
        },
      ],
    },
  ],
}
