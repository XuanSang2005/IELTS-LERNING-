import type { Test } from '../../schemas/test'

export const reading003: Test = {
  id: 'reading-003',
  skill: 'reading',
  title: 'Reading Test 03',
  description:
    'Three passages on natural migration, the everyday history of writing, and the bilingual mind.',
  difficulty: 'foundation',
  fullDurationMinutes: 60,
  shortDurationMinutes: 30,
  totalQuestions: 40,
  isPro: false,
  publishedAt: '2026-04-12',
  tags: ['IELTS Academic', 'Reading'],
  passages: [
    {
      id: 'reading-003-p1',
      number: 1,
      title: 'The Migration of the Monarch Butterfly',
      wordCount: 470,
      bodyHtml: `
<p data-para="A"><strong>A.</strong> Each autumn, monarch butterflies leave the meadows of southern Canada and the northern United States and travel up to 4,800 kilometres south to the oyamel fir forests of central Mexico. The journey takes about two months. The butterfly that arrives is not the butterfly that left — no individual lives long enough — yet a single generation, born in late summer, completes the entire southward leg.</p>
<p data-para="B"><strong>B.</strong> This generation is biologically distinct. Known as the "super-generation," it lives up to nine months — five times longer than the summer monarchs that preceded it. Its reproductive system is suspended, conserving energy for the journey. Researchers have found that shorter daylight and cooler nights in late August trigger a hormonal cascade that produces this longer-lived form.</p>
<p data-para="C"><strong>C.</strong> The route is consistent across decades. Tagged butterflies released in Ontario have been recovered at the same Mexican forests that received their great-great-grandparents. How the navigation works is still partly mysterious. A "time-compensated sun compass" — a circadian clock in the antennae paired with light receptors in the eyes — appears to do most of the work. The butterfly adjusts the angle of its flight relative to the sun as the sun moves across the sky.</p>
<p data-para="D"><strong>D.</strong> The Mexican overwintering sites are remarkably small. Roughly twenty hectares of forest, distributed across a dozen mountainsides, hold most of the eastern North American population during the winter months. The dense canopy of oyamel firs maintains a temperature just above freezing — cold enough to slow metabolism, warm enough to prevent death. Damage to these forests is, in effect, damage to the species.</p>
<p data-para="E"><strong>E.</strong> Numbers have fallen sharply. Surveys in the 1990s recorded overwintering populations covering about 18 hectares of forest; recent counts hover around two. Habitat loss along the migration corridor — milkweed, the only plant on which monarch caterpillars can feed, has been driven from much of the American Midwest by herbicide-tolerant agriculture — appears to be the principal cause.</p>
<p data-para="F"><strong>F.</strong> Conservation efforts now span three countries. Mexico has expanded the size of its Monarch Butterfly Biosphere Reserve. Citizen-science programmes in the United States and Canada coordinate the planting of milkweed gardens along the migration route. Whether these measures will be sufficient is uncertain. What is clear is that the monarch's journey is one of the most coordinated cross-border conservation projects in the world, and one of the few in which an insect's arrival is awaited as a cultural event.</p>
`,
      vocabulary: [
        {
          term: 'overwintering',
          definition: 'Spending the cold months in a particular location, often in dormancy.',
          translation: 'qua đông',
        },
        {
          term: 'circadian',
          definition: 'Relating to biological cycles that recur approximately every 24 hours.',
          translation: 'nhịp sinh học',
        },
        {
          term: 'milkweed',
          definition: 'A plant in the genus Asclepias; the sole food of monarch caterpillars.',
        },
        {
          term: 'super-generation',
          definition:
            'The longer-lived generation of monarch butterflies that completes the southward migration.',
        },
      ],
      groups: [
        {
          id: 'r003-p1-g1',
          instruction:
            'Questions 1–5 · Do the following statements agree with the information in the passage? TRUE, FALSE, or NOT GIVEN.',
          questions: [
            {
              id: 'r003-q1',
              number: 1,
              type: 'true-false-not-given',
              statement:
                'A single monarch butterfly completes the entire round trip from Canada to Mexico.',
              correctAnswer: 'FALSE',
              explanation: 'Paragraph A states "no individual lives long enough".',
            },
            {
              id: 'r003-q2',
              number: 2,
              type: 'true-false-not-given',
              statement:
                'The super-generation lives roughly five times longer than summer monarchs.',
              correctAnswer: 'TRUE',
              explanation:
                'Paragraph B says it lives "five times longer than the summer monarchs".',
            },
            {
              id: 'r003-q3',
              number: 3,
              type: 'true-false-not-given',
              statement: 'Monarch butterflies use stars to navigate at night.',
              correctAnswer: 'NOT GIVEN',
              explanation: 'The passage discusses sun compasses but says nothing about stars.',
            },
            {
              id: 'r003-q4',
              number: 4,
              type: 'true-false-not-given',
              statement:
                'Most of the eastern population overwinters on more than one Mexican mountainside.',
              correctAnswer: 'TRUE',
              explanation:
                'Paragraph D mentions roughly twenty hectares "distributed across a dozen mountainsides".',
            },
            {
              id: 'r003-q5',
              number: 5,
              type: 'true-false-not-given',
              statement: 'Overwintering populations have grown since the 1990s.',
              correctAnswer: 'FALSE',
              explanation: 'Paragraph E says they have fallen from ~18 hectares to ~2.',
            },
          ],
        },
        {
          id: 'r003-p1-g2',
          instruction:
            'Questions 6–9 · Choose the correct heading for paragraphs B, C, D, F from the list.',
          questions: [
            {
              id: 'r003-q6',
              number: 6,
              type: 'matching-headings',
              paragraphId: 'B',
              headings: [
                { key: 'i', text: 'Concentrated overwintering sites' },
                { key: 'ii', text: 'A biologically distinct generation' },
                { key: 'iii', text: 'Navigation by sun and circadian clock' },
                { key: 'iv', text: 'Cross-border conservation' },
                { key: 'v', text: 'Population decline and its causes' },
                { key: 'vi', text: 'The annual journey south' },
              ],
              correctAnswer: 'ii',
              explanation: 'Paragraph B introduces the longer-lived super-generation.',
            },
            {
              id: 'r003-q7',
              number: 7,
              type: 'matching-headings',
              paragraphId: 'C',
              headings: [
                { key: 'i', text: 'Concentrated overwintering sites' },
                { key: 'ii', text: 'A biologically distinct generation' },
                { key: 'iii', text: 'Navigation by sun and circadian clock' },
                { key: 'iv', text: 'Cross-border conservation' },
                { key: 'v', text: 'Population decline and its causes' },
                { key: 'vi', text: 'The annual journey south' },
              ],
              correctAnswer: 'iii',
              explanation: 'Paragraph C discusses the time-compensated sun compass.',
            },
            {
              id: 'r003-q8',
              number: 8,
              type: 'matching-headings',
              paragraphId: 'D',
              headings: [
                { key: 'i', text: 'Concentrated overwintering sites' },
                { key: 'ii', text: 'A biologically distinct generation' },
                { key: 'iii', text: 'Navigation by sun and circadian clock' },
                { key: 'iv', text: 'Cross-border conservation' },
                { key: 'v', text: 'Population decline and its causes' },
                { key: 'vi', text: 'The annual journey south' },
              ],
              correctAnswer: 'i',
              explanation: 'Paragraph D describes the small Mexican overwintering sites.',
            },
            {
              id: 'r003-q9',
              number: 9,
              type: 'matching-headings',
              paragraphId: 'F',
              headings: [
                { key: 'i', text: 'Concentrated overwintering sites' },
                { key: 'ii', text: 'A biologically distinct generation' },
                { key: 'iii', text: 'Navigation by sun and circadian clock' },
                { key: 'iv', text: 'Cross-border conservation' },
                { key: 'v', text: 'Population decline and its causes' },
                { key: 'vi', text: 'The annual journey south' },
              ],
              correctAnswer: 'iv',
              explanation: 'Paragraph F describes the three-country conservation effort.',
            },
          ],
        },
        {
          id: 'r003-p1-g3',
          instruction:
            'Questions 10–13 · Answer the questions. NO MORE THAN THREE WORDS for each answer.',
          questions: [
            {
              id: 'r003-q10',
              number: 10,
              type: 'short-answer',
              question: 'What kind of forest do monarchs overwinter in?',
              correctAnswer: 'oyamel fir',
              acceptableVariants: ['oyamel', 'oyamel firs', 'oyamel fir forests'],
              maxWords: 3,
              explanation: 'Paragraph A names the "oyamel fir forests of central Mexico".',
            },
            {
              id: 'r003-q11',
              number: 11,
              type: 'short-answer',
              question: "Where in the body is the monarch's circadian clock located?",
              correctAnswer: 'antennae',
              acceptableVariants: ['the antennae'],
              maxWords: 2,
              explanation: 'Paragraph C: "a circadian clock in the antennae".',
            },
            {
              id: 'r003-q12',
              number: 12,
              type: 'short-answer',
              question: 'On what plant do monarch caterpillars exclusively feed?',
              correctAnswer: 'milkweed',
              acceptableVariants: ['milkweeds'],
              maxWords: 1,
              explanation: 'Paragraph E names milkweed as the sole food source.',
            },
            {
              id: 'r003-q13',
              number: 13,
              type: 'short-answer',
              question:
                'What name is given to the protected area that has been expanded by the Mexican government?',
              correctAnswer: 'Monarch Butterfly Biosphere Reserve',
              acceptableVariants: ['Biosphere Reserve', 'Monarch Biosphere Reserve'],
              maxWords: 4,
              explanation: 'Paragraph F names the Monarch Butterfly Biosphere Reserve.',
            },
          ],
        },
      ],
    },
    {
      id: 'reading-003-p2',
      number: 2,
      title: 'A Short History of the Pencil',
      wordCount: 480,
      bodyHtml: `
<p data-para="A"><strong>A.</strong> The graphite pencil is, by the standards of writing implements, a recent invention. Until the sixteenth century, scribes in Europe scratched their notes with a stylus of lead — the metal — onto wax tablets or parchment. The faint mark gave the modern pencil its English name, although the modern pencil contains no lead at all.</p>
<p data-para="B"><strong>B.</strong> The story usually told begins in 1564 in the village of Borrowdale, in the English Lake District. After a fierce storm, locals discovered an exposed seam of an unfamiliar black mineral, soft enough to mark sheep but too soft to be metal. It was, in fact, a pure form of graphite — a crystalline allotrope of carbon. The Borrowdale deposit remains the only large pure-graphite seam ever found in the world.</p>
<p data-para="C"><strong>C.</strong> The early pencils were simply sticks of graphite wrapped in string or pressed into hollowed-out twigs. They worked, but they smudged the user's hands. The familiar wood-cased pencil emerged in Nuremberg in the 1660s, when the carpenter Friedrich Staedtler perfected a process for sandwiching graphite between two grooved cedar slats.</p>
<p data-para="D"><strong>D.</strong> Pure Borrowdale graphite was strategically valuable: it was used to line the moulds in which English cannonballs were cast. The mine was placed under armed guard and worked only six weeks a year. Smuggling carried the death penalty. By the late eighteenth century, the British were short of high-quality graphite and were embarrassed to buy from continental suppliers.</p>
<p data-para="E"><strong>E.</strong> The breakthrough came in revolutionary France. In 1795, Nicolas-Jacques Conté, an officer in Napoleon's army, mixed inferior powdered graphite with clay, fired the mixture in a kiln, and produced a hardened rod that wrote almost as smoothly as Borrowdale graphite — and could be made in any country. By varying the proportion of clay to graphite, Conté could also produce pencils of differing hardness, the basis of the modern HB grading system.</p>
<p data-para="F"><strong>F.</strong> American pencil-making began as a domestic substitute for British imports during the War of 1812. Henry David Thoreau — better known for his cabin at Walden Pond — spent ten years working in his father's pencil factory in Concord, Massachusetts, and is credited with substantial improvements to the American manufacturing process. By 1900, the global market in pencils ran to billions of units a year. The wood-cased graphite pencil, now produced in dozens of grades, has remained essentially unchanged for two and a half centuries.</p>
`,
      vocabulary: [
        {
          term: 'allotrope',
          definition:
            'One of two or more physical forms in which an element can exist (e.g. graphite and diamond).',
        },
        {
          term: 'stylus',
          definition: 'A pointed instrument used for writing, marking or engraving.',
          translation: 'bút trâm',
        },
        {
          term: 'kiln',
          definition: 'A furnace or oven used for baking, drying or hardening materials.',
          translation: 'lò nung',
        },
        {
          term: 'smuggling',
          definition: 'Moving goods illegally into or out of a country.',
          translation: 'buôn lậu',
        },
      ],
      groups: [
        {
          id: 'r003-p2-g1',
          instruction:
            'Questions 14–18 · Choose the correct heading for paragraphs A, B, D, E, F from the list.',
          questions: [
            {
              id: 'r003-q14',
              number: 14,
              type: 'matching-headings',
              paragraphId: 'A',
              headings: [
                { key: 'i', text: 'A French chemical breakthrough' },
                { key: 'ii', text: 'Discovery in the Lake District' },
                { key: 'iii', text: 'Graphite as a strategic resource' },
                { key: 'iv', text: 'American pencil-making' },
                { key: 'v', text: 'Before graphite: lead and wax' },
                { key: 'vi', text: 'A Nuremberg innovation' },
              ],
              correctAnswer: 'v',
              explanation:
                'Paragraph A describes the pre-graphite era of metal lead and wax tablets.',
            },
            {
              id: 'r003-q15',
              number: 15,
              type: 'matching-headings',
              paragraphId: 'B',
              headings: [
                { key: 'i', text: 'A French chemical breakthrough' },
                { key: 'ii', text: 'Discovery in the Lake District' },
                { key: 'iii', text: 'Graphite as a strategic resource' },
                { key: 'iv', text: 'American pencil-making' },
                { key: 'v', text: 'Before graphite: lead and wax' },
                { key: 'vi', text: 'A Nuremberg innovation' },
              ],
              correctAnswer: 'ii',
              explanation: 'Paragraph B narrates the Borrowdale discovery.',
            },
            {
              id: 'r003-q16',
              number: 16,
              type: 'matching-headings',
              paragraphId: 'D',
              headings: [
                { key: 'i', text: 'A French chemical breakthrough' },
                { key: 'ii', text: 'Discovery in the Lake District' },
                { key: 'iii', text: 'Graphite as a strategic resource' },
                { key: 'iv', text: 'American pencil-making' },
                { key: 'v', text: 'Before graphite: lead and wax' },
                { key: 'vi', text: 'A Nuremberg innovation' },
              ],
              correctAnswer: 'iii',
              explanation: 'Paragraph D discusses the cannonball-mould use and armed guard.',
            },
            {
              id: 'r003-q17',
              number: 17,
              type: 'matching-headings',
              paragraphId: 'E',
              headings: [
                { key: 'i', text: 'A French chemical breakthrough' },
                { key: 'ii', text: 'Discovery in the Lake District' },
                { key: 'iii', text: 'Graphite as a strategic resource' },
                { key: 'iv', text: 'American pencil-making' },
                { key: 'v', text: 'Before graphite: lead and wax' },
                { key: 'vi', text: 'A Nuremberg innovation' },
              ],
              correctAnswer: 'i',
              explanation: "Paragraph E describes Conté's clay-graphite kiln process.",
            },
            {
              id: 'r003-q18',
              number: 18,
              type: 'matching-headings',
              paragraphId: 'F',
              headings: [
                { key: 'i', text: 'A French chemical breakthrough' },
                { key: 'ii', text: 'Discovery in the Lake District' },
                { key: 'iii', text: 'Graphite as a strategic resource' },
                { key: 'iv', text: 'American pencil-making' },
                { key: 'v', text: 'Before graphite: lead and wax' },
                { key: 'vi', text: 'A Nuremberg innovation' },
              ],
              correctAnswer: 'iv',
              explanation: "Paragraph F describes American manufacturing and Thoreau's role.",
            },
          ],
        },
        {
          id: 'r003-p2-g2',
          instruction:
            'Questions 19–22 · Do the following statements agree with the information in the passage? TRUE, FALSE, or NOT GIVEN.',
          questions: [
            {
              id: 'r003-q19',
              number: 19,
              type: 'true-false-not-given',
              statement: 'Modern pencils contain a small amount of metallic lead.',
              correctAnswer: 'FALSE',
              explanation: 'Paragraph A says the modern pencil "contains no lead at all".',
            },
            {
              id: 'r003-q20',
              number: 20,
              type: 'true-false-not-given',
              statement: 'The Borrowdale graphite deposit was used in cannonball production.',
              correctAnswer: 'TRUE',
              explanation: 'Paragraph D states it lined cannonball moulds.',
            },
            {
              id: 'r003-q21',
              number: 21,
              type: 'true-false-not-given',
              statement:
                'Friedrich Staedtler exported pencils to England in the seventeenth century.',
              correctAnswer: 'NOT GIVEN',
              explanation: 'The passage does not mention exports.',
            },
            {
              id: 'r003-q22',
              number: 22,
              type: 'true-false-not-given',
              statement: 'Henry David Thoreau worked in pencil manufacturing for a decade.',
              correctAnswer: 'TRUE',
              explanation:
                "Paragraph F says Thoreau spent ten years in his father's pencil factory.",
            },
          ],
        },
        {
          id: 'r003-p2-g3',
          instruction:
            'Questions 23–26 · Complete each sentence with NO MORE THAN TWO WORDS from the passage.',
          questions: [
            {
              id: 'r003-q23',
              number: 23,
              type: 'sentence-completion',
              sentenceBefore: 'The Borrowdale deposit was discovered after a',
              sentenceAfter: 'in 1564.',
              correctAnswer: 'storm',
              acceptableVariants: ['fierce storm'],
              maxWords: 2,
              explanation: 'Paragraph B refers to a "fierce storm".',
            },
            {
              id: 'r003-q24',
              number: 24,
              type: 'sentence-completion',
              sentenceBefore: 'Conté hardened his graphite-clay rods using a',
              sentenceAfter: '.',
              correctAnswer: 'kiln',
              acceptableVariants: [],
              maxWords: 1,
              explanation: 'Paragraph E describes firing the mixture in a kiln.',
            },
            {
              id: 'r003-q25',
              number: 25,
              type: 'sentence-completion',
              sentenceBefore: 'American pencil manufacturing began during the',
              sentenceAfter: '.',
              correctAnswer: 'War of 1812',
              acceptableVariants: ['1812 War'],
              maxWords: 3,
              explanation: 'Paragraph F places the start during the War of 1812.',
            },
            {
              id: 'r003-q26',
              number: 26,
              type: 'sentence-completion',
              sentenceBefore:
                "Conté's adjustable proportions of graphite and clay are the basis of the modern",
              sentenceAfter: 'system.',
              correctAnswer: 'HB grading',
              acceptableVariants: ['HB'],
              maxWords: 2,
              explanation: 'Paragraph E names the modern HB grading system.',
            },
          ],
        },
      ],
    },
    {
      id: 'reading-003-p3',
      number: 3,
      title: 'The Bilingual Mind',
      wordCount: 510,
      bodyHtml: `
<p data-para="A"><strong>A.</strong> For most of the twentieth century, raising a child in two languages was widely thought to slow that child's intellectual development. The advice given to immigrant parents in Britain, North America and parts of Europe was uniform: choose the dominant language and stick to it. Whatever was lost — connection with grandparents, access to a literature — was held to be outweighed by gains in school readiness.</p>
<p data-para="B"><strong>B.</strong> The advice was based on poor evidence. Early studies, mostly conducted between 1920 and 1960, compared the test scores of bilingual immigrant children with those of monolingual peers and found the bilingual children behind. The conclusion drawn was that bilingualism caused the gap. Modern reanalyses point out that the studies almost never controlled for socioeconomic status, and that immigrant children were typically tested in their weaker language. When researchers in the 1960s — beginning with Wallace Lambert in Montreal — controlled for these variables, the supposed disadvantage disappeared.</p>
<p data-para="C"><strong>C.</strong> The picture has continued to shift. A series of studies from the 1990s onwards has reported a small but consistent advantage for bilingual children on tests that involve switching between tasks, ignoring distracting information, and updating working memory. The cluster of skills sometimes called "executive function" appears to receive a measurable workout from the daily business of selecting one language and inhibiting the other.</p>
<p data-para="D"><strong>D.</strong> The advantage is not infinite. Bilinguals tend to score slightly lower on tests of vocabulary size in either language considered alone, simply because they distribute their lexical effort across two systems rather than one. They also experience occasional retrieval delays — the "tip of the tongue" sensation is more common in bilinguals than in monolinguals.</p>
<p data-para="E"><strong>E.</strong> Recent attention has focused on cognitive ageing. A widely-cited 2007 Toronto study examined the medical records of patients diagnosed with dementia and found that lifelong bilinguals showed first symptoms an average of four years later than otherwise comparable monolinguals. The mechanism is presumed to be a form of cognitive reserve — a brain accustomed to selecting between competing systems may be slower to break down under disease.</p>
<p data-para="F"><strong>F.</strong> Whether the bilingual advantage is robust enough to justify policy is a live question. Some recent meta-analyses have found smaller effects than the original studies, and some have found no effect at all once publication bias is corrected. What is no longer in doubt is the more modest claim that bilingualism does not harm a developing mind. The advice given to a generation of immigrant parents — that they should pick one language for the sake of their child — was, at minimum, unnecessary.</p>
`,
      vocabulary: [
        {
          term: 'executive function',
          definition:
            'A set of mental processes including planning, attention switching and inhibition.',
          translation: 'chức năng điều hành',
        },
        {
          term: 'cognitive reserve',
          definition:
            "The brain's capacity to compensate for damage by drawing on alternative networks.",
        },
        {
          term: 'monolingual',
          definition: 'Speaking or using only one language.',
          translation: 'đơn ngữ',
        },
        {
          term: 'meta-analysis',
          definition: 'A statistical analysis combining the results of many independent studies.',
          translation: 'phân tích tổng hợp',
        },
        {
          term: 'inhibit',
          definition: 'To prevent or restrain a process or response.',
          translation: 'ức chế',
        },
      ],
      groups: [
        {
          id: 'r003-p3-g1',
          instruction:
            'Questions 27–31 · Do the following statements agree with the information in the passage? TRUE, FALSE, or NOT GIVEN.',
          questions: [
            {
              id: 'r003-q27',
              number: 27,
              type: 'true-false-not-given',
              statement:
                'Twentieth-century advice to immigrant parents was inconsistent across countries.',
              correctAnswer: 'FALSE',
              explanation: 'Paragraph A states the advice was "uniform" across regions.',
            },
            {
              id: 'r003-q28',
              number: 28,
              type: 'true-false-not-given',
              statement:
                'Many early bilingualism studies tested children in their weaker language.',
              correctAnswer: 'TRUE',
              explanation: 'Paragraph B states this explicitly.',
            },
            {
              id: 'r003-q29',
              number: 29,
              type: 'true-false-not-given',
              statement: 'Wallace Lambert worked in Toronto.',
              correctAnswer: 'FALSE',
              explanation: 'Paragraph B places him in Montreal.',
            },
            {
              id: 'r003-q30',
              number: 30,
              type: 'true-false-not-given',
              statement:
                'Bilinguals typically have larger total vocabularies in either language alone.',
              correctAnswer: 'FALSE',
              explanation:
                'Paragraph D says they score "slightly lower" on per-language vocabulary.',
            },
            {
              id: 'r003-q31',
              number: 31,
              type: 'true-false-not-given',
              statement: "The 2007 Toronto study examined patients with Parkinson's disease.",
              correctAnswer: 'NOT GIVEN',
              explanation: "The passage names dementia, not Parkinson's.",
            },
          ],
        },
        {
          id: 'r003-p3-g2',
          instruction: 'Questions 32–35 · Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'r003-q32',
              number: 32,
              type: 'multiple-choice',
              prompt:
                'According to the passage, the apparent disadvantage shown in early studies was caused by',
              options: [
                { key: 'A', text: 'the cognitive cost of bilingualism.' },
                { key: 'B', text: 'methodological flaws in the studies.' },
                { key: 'C', text: 'small sample sizes.' },
                { key: 'D', text: 'genetic differences between groups.' },
              ],
              correctAnswer: 'B',
              explanation:
                'Paragraph B attributes the apparent disadvantage to uncontrolled variables and weaker-language testing.',
            },
            {
              id: 'r003-q33',
              number: 33,
              type: 'multiple-choice',
              prompt:
                'Which cognitive skills receive the strongest reported workout from bilingualism?',
              options: [
                { key: 'A', text: 'Long-term memory.' },
                { key: 'B', text: 'Executive function — task switching and inhibition.' },
                { key: 'C', text: 'Mathematical reasoning.' },
                { key: 'D', text: 'Spatial perception.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph C names task-switching, inhibition, and working memory.',
            },
            {
              id: 'r003-q34',
              number: 34,
              type: 'multiple-choice',
              prompt:
                'How many years later did dementia symptoms appear in bilinguals in the 2007 Toronto study?',
              options: [
                { key: 'A', text: 'About one year.' },
                { key: 'B', text: 'About two years.' },
                { key: 'C', text: 'About four years.' },
                { key: 'D', text: 'About ten years.' },
              ],
              correctAnswer: 'C',
              explanation: 'Paragraph E states "an average of four years later".',
            },
            {
              id: 'r003-q35',
              number: 35,
              type: 'multiple-choice',
              prompt:
                'What is the writer\'s overall conclusion about the old "one-language" advice?',
              options: [
                { key: 'A', text: 'It was correct in its time.' },
                { key: 'B', text: 'It was harmful to most children.' },
                { key: 'C', text: 'It was unnecessary, even if its harms were modest.' },
                { key: 'D', text: 'It is still defensible today.' },
              ],
              correctAnswer: 'C',
              explanation: 'Paragraph F concludes the advice was, at minimum, unnecessary.',
            },
          ],
        },
        {
          id: 'r003-p3-g3',
          instruction:
            'Questions 36–40 · Complete the summary using NO MORE THAN TWO WORDS from the passage for each gap.',
          questions: [
            {
              id: 'r003-q36',
              number: 36,
              type: 'sentence-completion',
              sentenceBefore: "Older studies failed to control for the children's",
              sentenceAfter: 'background.',
              correctAnswer: 'socioeconomic',
              acceptableVariants: ['socio-economic'],
              maxWords: 1,
              explanation: 'Paragraph B notes the missing control for socioeconomic status.',
            },
            {
              id: 'r003-q37',
              number: 37,
              type: 'sentence-completion',
              sentenceBefore: 'The cluster of skills sometimes called',
              sentenceAfter: 'appears to benefit from bilingualism.',
              correctAnswer: 'executive function',
              acceptableVariants: [],
              maxWords: 2,
              explanation: 'Paragraph C names "executive function".',
            },
            {
              id: 'r003-q38',
              number: 38,
              type: 'sentence-completion',
              sentenceBefore: 'Bilinguals more often experience the',
              sentenceAfter: 'sensation than monolinguals.',
              correctAnswer: 'tip of the tongue',
              acceptableVariants: ['tip-of-the-tongue'],
              maxWords: 4,
              explanation: 'Paragraph D names this sensation.',
            },
            {
              id: 'r003-q39',
              number: 39,
              type: 'sentence-completion',
              sentenceBefore: 'The proposed protective mechanism in ageing is a form of',
              sentenceAfter: '.',
              correctAnswer: 'cognitive reserve',
              acceptableVariants: [],
              maxWords: 2,
              explanation: 'Paragraph E names cognitive reserve.',
            },
            {
              id: 'r003-q40',
              number: 40,
              type: 'sentence-completion',
              sentenceBefore: 'Some meta-analyses report smaller effects once',
              sentenceAfter: 'is corrected.',
              correctAnswer: 'publication bias',
              acceptableVariants: [],
              maxWords: 2,
              explanation: 'Paragraph F mentions publication bias.',
            },
          ],
        },
      ],
    },
  ],
}
