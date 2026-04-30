import type { Test } from '../../schemas/test'

export const reading010: Test = {
  id: 'reading-010',
  skill: 'reading',
  title: 'Reading Test 10',
  description:
    'Three passages on urban heat islands, the engineering of the lighthouse, and the science of friendship.',
  difficulty: 'intermediate',
  fullDurationMinutes: 60,
  shortDurationMinutes: 30,
  totalQuestions: 40,
  isPro: true,
  publishedAt: '2026-04-28',
  tags: ['IELTS Academic', 'Reading'],
  passages: [
    {
      id: 'reading-010-p1',
      number: 1,
      title: 'The Urban Heat Island',
      wordCount: 510,
      bodyHtml: `
<p data-para="A"><strong>A.</strong> A summer afternoon in central London is, on average, between four and seven degrees Celsius warmer than the same afternoon in the surrounding countryside. The phenomenon, first described systematically by the British meteorologist Luke Howard in 1818, is known as the urban heat island. It is among the most reliably observed of all human modifications of the local climate, and it has, with continuing urbanisation, grown more pronounced rather than less.</p>
<p data-para="B"><strong>B.</strong> The mechanism is composite. Asphalt, concrete and dark roofing materials absorb sunlight more efficiently than grass or soil and release the absorbed heat slowly into the night, when rural areas would otherwise have cooled. The geometry of urban canyons — tall buildings facing each other across narrow streets — traps both heat and air, reducing the dispersal that would normally take place. Air conditioning, paradoxically, makes the outdoor air still warmer: the heat removed from one building is not destroyed but discharged into the street.</p>
<p data-para="C"><strong>C.</strong> The effect is most pronounced at night. While daytime temperatures in cities and countryside may differ by only a degree or two, nighttime differentials of seven degrees Celsius and more are routinely measured in major cities. The asymmetry matters more than the average. Public-health research has consistently shown that nighttime heat — heat from which the body has no opportunity to recover — is more dangerous than daytime peaks. The 2003 European heat wave, which killed an estimated 70,000 people, was characterised by extraordinary night temperatures rather than by extraordinary highs.</p>
<p data-para="D"><strong>D.</strong> Mitigation is, in principle, straightforward. Reflective ("cool") roofs of light colour reduce solar absorption substantially; field studies in Athens, Phoenix and Tokyo have measured rooftop temperature reductions of up to twenty degrees Celsius. Tree-lined streets, urban parks and other vegetated surfaces cool by both shading and evapotranspiration. Permeable pavements — surfaces that allow rainwater to pass through and evaporate, rather than running off — provide a smaller but additive effect. The combined potential of these interventions is large enough, in temperate cities, to offset most of the warming caused by the heat island itself.</p>
<p data-para="E"><strong>E.</strong> The barriers to mitigation are administrative rather than technical. Cool roofs are typically more expensive than conventional ones; tree planting requires long-term maintenance budgets; permeable pavements demand coordination across departments that have separate procurements. Singapore, Medellín and Vienna have shown what is possible when the political will exists. Most cities have not yet shown comparable resolve.</p>
<p data-para="F"><strong>F.</strong> The matter is increasingly urgent. By the second half of the twenty-first century, models suggest, summer temperatures in major mid-latitude cities may rise by an additional two to four degrees Celsius purely from continued urbanisation, layered over the warming attributable to global climate change. Whether this occurs depends less on what cities choose to do than on whether they choose to do it in time. The technical case for cool roofs and street trees has been settled for two decades. The remaining question is whether the financial case will be funded.</p>
`,
      vocabulary: [
        {
          term: 'evapotranspiration',
          definition:
            'The combined process of evaporation from soil and transpiration from plants, which cools the surrounding air.',
        },
        {
          term: 'urban canyon',
          definition: 'A street between tall buildings, where air circulation is restricted.',
        },
        {
          term: 'permeable',
          definition: 'Allowing liquids or gases to pass through.',
          translation: 'thấm nước',
        },
        {
          term: 'mitigation',
          definition: 'Action taken to reduce the severity of an effect.',
          translation: 'biện pháp giảm nhẹ',
        },
      ],
      groups: [
        {
          id: 'r010-p1-g1',
          instruction: 'Questions 1–5 · Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'r010-q1',
              number: 1,
              type: 'multiple-choice',
              prompt: 'Who first systematically described the urban heat island, and in what year?',
              options: [
                { key: 'A', text: 'Howard, 1818.' },
                { key: 'B', text: 'Howard, 1918.' },
                { key: 'C', text: 'Hooke, 1818.' },
                { key: 'D', text: 'Newton, 1718.' },
              ],
              correctAnswer: 'A',
              explanation: 'Paragraph A.',
            },
            {
              id: 'r010-q2',
              number: 2,
              type: 'multiple-choice',
              prompt: 'When is the urban heat island effect most pronounced?',
              options: [
                { key: 'A', text: 'Midday.' },
                { key: 'B', text: 'Sunset.' },
                { key: 'C', text: 'At night.' },
                { key: 'D', text: 'Sunrise.' },
              ],
              correctAnswer: 'C',
              explanation: 'Paragraph C.',
            },
            {
              id: 'r010-q3',
              number: 3,
              type: 'multiple-choice',
              prompt: 'Why is night-time heat more dangerous than daytime heat?',
              options: [
                { key: 'A', text: 'It is brighter.' },
                { key: 'B', text: 'The body has no opportunity to recover.' },
                { key: 'C', text: 'It causes air pollution.' },
                { key: 'D', text: 'It harms only the elderly.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph C.',
            },
            {
              id: 'r010-q4',
              number: 4,
              type: 'multiple-choice',
              prompt: 'How much can light-colour reflective roofs reduce rooftop temperature?',
              options: [
                { key: 'A', text: 'Up to 5 °C.' },
                { key: 'B', text: 'Up to 20 °C.' },
                { key: 'C', text: 'Up to 100 °C.' },
                { key: 'D', text: 'No measurable effect.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph D.',
            },
            {
              id: 'r010-q5',
              number: 5,
              type: 'multiple-choice',
              prompt: 'According to the writer, what are the principal obstacles to mitigation?',
              options: [
                { key: 'A', text: 'Technological.' },
                { key: 'B', text: 'Administrative and financial.' },
                { key: 'C', text: 'Climatic.' },
                { key: 'D', text: 'Cultural.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph E.',
            },
          ],
        },
        {
          id: 'r010-p1-g2',
          instruction:
            'Questions 6–9 · Do the following statements agree with the views of the writer? YES, NO, or NOT GIVEN.',
          questions: [
            {
              id: 'r010-q6',
              number: 6,
              type: 'yes-no-not-given',
              statement: 'Air conditioning helps to cool the outdoor air around buildings.',
              correctAnswer: 'NO',
              explanation: 'Paragraph B says the opposite.',
            },
            {
              id: 'r010-q7',
              number: 7,
              type: 'yes-no-not-given',
              statement:
                'The 2003 European heat wave was characterised by extraordinary daytime peaks rather than night temperatures.',
              correctAnswer: 'NO',
              explanation: 'Paragraph C says it was characterised by night temperatures.',
            },
            {
              id: 'r010-q8',
              number: 8,
              type: 'yes-no-not-given',
              statement: 'Singapore is named as a city that has acted on heat-island mitigation.',
              correctAnswer: 'YES',
              explanation: 'Paragraph E.',
            },
            {
              id: 'r010-q9',
              number: 9,
              type: 'yes-no-not-given',
              statement: 'London has implemented a comprehensive cool-roofs programme.',
              correctAnswer: 'NOT GIVEN',
              explanation: 'The passage does not specify.',
            },
          ],
        },
        {
          id: 'r010-p1-g3',
          instruction:
            'Questions 10–13 · Complete each sentence with NO MORE THAN THREE WORDS from the passage.',
          questions: [
            {
              id: 'r010-q10',
              number: 10,
              type: 'sentence-completion',
              sentenceBefore: 'Tall buildings facing each other across narrow streets are called',
              sentenceAfter: '.',
              correctAnswer: 'urban canyons',
              acceptableVariants: ['urban canyon'],
              maxWords: 2,
              explanation: 'Paragraph B.',
            },
            {
              id: 'r010-q11',
              number: 11,
              type: 'sentence-completion',
              sentenceBefore: 'Vegetated surfaces cool both by shading and by',
              sentenceAfter: '.',
              correctAnswer: 'evapotranspiration',
              acceptableVariants: ['evapo-transpiration'],
              maxWords: 1,
              explanation: 'Paragraph D.',
            },
            {
              id: 'r010-q12',
              number: 12,
              type: 'sentence-completion',
              sentenceBefore:
                'Pavements that allow rainwater to pass through them are described as',
              sentenceAfter: '.',
              correctAnswer: 'permeable',
              acceptableVariants: ['permeable pavements'],
              maxWords: 2,
              explanation: 'Paragraph D.',
            },
            {
              id: 'r010-q13',
              number: 13,
              type: 'sentence-completion',
              sentenceBefore:
                'Models suggest that mid-century summer city temperatures may rise an extra',
              sentenceAfter: 'from urbanisation alone.',
              correctAnswer: 'two to four degrees',
              acceptableVariants: ['two to four', '2 to 4 degrees', '2-4 °C'],
              maxWords: 5,
              explanation: 'Paragraph F.',
            },
          ],
        },
      ],
    },
    {
      id: 'reading-010-p2',
      number: 2,
      title: 'A History of the Lighthouse',
      wordCount: 510,
      bodyHtml: `
<p data-para="A"><strong>A.</strong> The Pharos of Alexandria, built around 280 BC at the entrance to the harbour of Alexandria, was the first systematic attempt to mark a harbour with a permanent light. It stood roughly 100 metres tall, the second-tallest building in the ancient world after the Great Pyramid, and burned wood at its summit. It survived for sixteen centuries before earthquakes brought it down in the early fourteenth century. No other lighthouse of comparable scale would be built until the eighteenth century.</p>
<p data-para="B"><strong>B.</strong> The medieval period preserved the technology only sporadically. A handful of Mediterranean ports — Genoa, Marseille — kept lit towers, fuelled by wood or oil, but no comprehensive coastal infrastructure existed. English shipowners, exposed to the storms of the western approaches, pressed for a network of lights from the early seventeenth century. The first British lighthouse was established at Lowestoft in 1609; the Eddystone, off the Cornish coast, was first lit in 1698 — and was destroyed by a storm five years later.</p>
<p data-para="C"><strong>C.</strong> The engineering challenge was, above all, the wave. Lighthouses on offshore reefs face full-ocean storms, and early designs failed repeatedly. The breakthrough came from John Smeaton, a British engineer, whose third Eddystone lighthouse (1759) was modelled on the trunk of an oak tree — wider at the base, slimming upward, with stone blocks dovetailed together so that the wave\'s force was transferred into the rock beneath. The Smeaton design was so successful that it remained the model for offshore lighthouses for the next two centuries.</p>
<p data-para="D"><strong>D.</strong> The illumination, meanwhile, was undergoing its own revolution. Wood and coal fires gave way to oil lamps; oil lamps to the parabolic-mirror reflector; the reflector to the Fresnel lens, devised in 1822 by the French physicist Augustin-Jean Fresnel. The Fresnel lens consisted of concentric rings of glass that bent light into a near-parallel beam, focusing the lamp\'s output into a horizontal sweep visible from much greater distances than before. A first-order Fresnel lens, weighing several tonnes, could be seen from up to forty kilometres at sea.</p>
<p data-para="E"><strong>E.</strong> The keeper\'s life was, by all accounts, demanding. Multi-week postings on offshore rocks were standard. The Fastnet Rock keepers, off the south-west coast of Ireland, served three-week tours with three weeks\' shore leave; relief was sometimes delayed by storms for weeks more. Memoirs of nineteenth-century lighthouse families record both periods of comfortable routine and incidents in which keepers were lost when stepping out at the wrong moment.</p>
<p data-para="F"><strong>F.</strong> Automation has now eliminated most lighthouse keeping as a profession. The last manned British lighthouse, North Foreland in Kent, was automated in 1998. Modern lighthouses use solar-charged LEDs, are monitored remotely, and require visits only for occasional servicing. The structures remain because GPS, although ubiquitous, fails in receiver malfunction or signal-jamming events; visual marking remains the international maritime authority\'s required redundancy. The lighthouse, in this sense, has survived its own obsolescence.</p>
`,
      vocabulary: [
        {
          term: 'Fresnel lens',
          definition:
            'A compact lens with concentric grooved rings, used in lighthouses to focus light into a horizontal beam.',
        },
        {
          term: 'parabolic',
          definition: 'Having the shape of a parabola; used here of mirror reflectors.',
        },
        {
          term: 'dovetail',
          definition:
            'A joint formed by interlocking shaped pieces, used here of stone blocks fitted together.',
        },
        {
          term: 'redundancy',
          definition:
            'The inclusion of duplicate components to provide backup if a primary system fails.',
        },
      ],
      groups: [
        {
          id: 'r010-p2-g1',
          instruction: 'Questions 14–17 · Choose the correct heading for paragraphs A, C, D, F.',
          questions: [
            {
              id: 'r010-q14',
              number: 14,
              type: 'matching-headings',
              paragraphId: 'A',
              headings: [
                { key: 'i', text: "The keeper's life on offshore rocks" },
                { key: 'ii', text: 'Smeaton and the wave-resistant design' },
                { key: 'iii', text: 'The Fresnel lens revolution' },
                { key: 'iv', text: 'Automation and the survival of the lighthouse' },
                { key: 'v', text: 'The Pharos and the first systematic harbour light' },
                { key: 'vi', text: 'Medieval and early modern revival' },
              ],
              correctAnswer: 'v',
              explanation: 'Paragraph A is about the Pharos.',
            },
            {
              id: 'r010-q15',
              number: 15,
              type: 'matching-headings',
              paragraphId: 'C',
              headings: [
                { key: 'i', text: "The keeper's life on offshore rocks" },
                { key: 'ii', text: 'Smeaton and the wave-resistant design' },
                { key: 'iii', text: 'The Fresnel lens revolution' },
                { key: 'iv', text: 'Automation and the survival of the lighthouse' },
                { key: 'v', text: 'The Pharos and the first systematic harbour light' },
                { key: 'vi', text: 'Medieval and early modern revival' },
              ],
              correctAnswer: 'ii',
              explanation: 'Paragraph C is the Smeaton design.',
            },
            {
              id: 'r010-q16',
              number: 16,
              type: 'matching-headings',
              paragraphId: 'D',
              headings: [
                { key: 'i', text: "The keeper's life on offshore rocks" },
                { key: 'ii', text: 'Smeaton and the wave-resistant design' },
                { key: 'iii', text: 'The Fresnel lens revolution' },
                { key: 'iv', text: 'Automation and the survival of the lighthouse' },
                { key: 'v', text: 'The Pharos and the first systematic harbour light' },
                { key: 'vi', text: 'Medieval and early modern revival' },
              ],
              correctAnswer: 'iii',
              explanation: 'Paragraph D describes the Fresnel lens.',
            },
            {
              id: 'r010-q17',
              number: 17,
              type: 'matching-headings',
              paragraphId: 'F',
              headings: [
                { key: 'i', text: "The keeper's life on offshore rocks" },
                { key: 'ii', text: 'Smeaton and the wave-resistant design' },
                { key: 'iii', text: 'The Fresnel lens revolution' },
                { key: 'iv', text: 'Automation and the survival of the lighthouse' },
                { key: 'v', text: 'The Pharos and the first systematic harbour light' },
                { key: 'vi', text: 'Medieval and early modern revival' },
              ],
              correctAnswer: 'iv',
              explanation: 'Paragraph F is the automation/survival section.',
            },
          ],
        },
        {
          id: 'r010-p2-g2',
          instruction:
            'Questions 18–22 · Do the following statements agree with the information in the passage? TRUE, FALSE, or NOT GIVEN.',
          questions: [
            {
              id: 'r010-q18',
              number: 18,
              type: 'true-false-not-given',
              statement: 'The Pharos of Alexandria stood for over a thousand years.',
              correctAnswer: 'TRUE',
              explanation: 'Paragraph A says sixteen centuries.',
            },
            {
              id: 'r010-q19',
              number: 19,
              type: 'true-false-not-given',
              statement: 'The first Eddystone lighthouse stood for more than a century.',
              correctAnswer: 'FALSE',
              explanation: 'Paragraph B says it was destroyed five years after it was first lit.',
            },
            {
              id: 'r010-q20',
              number: 20,
              type: 'true-false-not-given',
              statement: 'Smeaton modelled his Eddystone design on a tree trunk.',
              correctAnswer: 'TRUE',
              explanation: 'Paragraph C.',
            },
            {
              id: 'r010-q21',
              number: 21,
              type: 'true-false-not-given',
              statement:
                'A first-order Fresnel lens can be seen at a distance of more than fifty kilometres.',
              correctAnswer: 'FALSE',
              explanation: 'Paragraph D states up to forty kilometres.',
            },
            {
              id: 'r010-q22',
              number: 22,
              type: 'true-false-not-given',
              statement: 'North Foreland was automated in 1998.',
              correctAnswer: 'TRUE',
              explanation: 'Paragraph F.',
            },
          ],
        },
        {
          id: 'r010-p2-g3',
          instruction:
            'Questions 23–26 · Answer the questions. NO MORE THAN THREE WORDS for each answer.',
          questions: [
            {
              id: 'r010-q23',
              number: 23,
              type: 'short-answer',
              question: 'In what year was the first British lighthouse established at Lowestoft?',
              correctAnswer: '1609',
              acceptableVariants: [],
              maxWords: 1,
              explanation: 'Paragraph B.',
            },
            {
              id: 'r010-q24',
              number: 24,
              type: 'short-answer',
              question: 'Who devised the Fresnel lens?',
              correctAnswer: 'Augustin-Jean Fresnel',
              acceptableVariants: ['Fresnel', 'Augustin Fresnel'],
              maxWords: 3,
              explanation: 'Paragraph D.',
            },
            {
              id: 'r010-q25',
              number: 25,
              type: 'short-answer',
              question: 'How long were the standard tours of duty on the Fastnet Rock?',
              correctAnswer: 'three weeks',
              acceptableVariants: ['three-week', '3 weeks'],
              maxWords: 2,
              explanation: 'Paragraph E.',
            },
            {
              id: 'r010-q26',
              number: 26,
              type: 'short-answer',
              question: 'Why does the maritime authority still require lighthouses to remain?',
              correctAnswer: 'redundancy',
              acceptableVariants: ['as redundancy', 'visual redundancy'],
              maxWords: 3,
              explanation: 'Paragraph F.',
            },
          ],
        },
      ],
    },
    {
      id: 'reading-010-p3',
      number: 3,
      title: 'The Science of Friendship',
      wordCount: 530,
      bodyHtml: `
<p data-para="A"><strong>A.</strong> Friendship has, for most of its history, escaped serious empirical attention. Where romantic love and family relationships have generated thousands of academic papers, the friendship between unrelated adults has been treated as a residual category — emotionally important, intellectually unsystematic. The last two decades have begun to remedy this neglect, and the picture that has emerged is striking. Friendship turns out to be, in measurable health terms, comparable to or stronger than diet and exercise.</p>
<p data-para="B"><strong>B.</strong> The most cited evidence comes from a 2010 meta-analysis of 148 studies, covering more than 300,000 participants, which found that subjects with strong social relationships had a 50 per cent lower risk of mortality over the study period than those without. The effect held across age, sex, and pre-existing health condition. By comparison, the protective effect of regular exercise is in the range of 25-35 per cent, and that of stopping smoking around 50 per cent. Loneliness, on the same evidence, is roughly equivalent in mortality risk to smoking fifteen cigarettes a day.</p>
<p data-para="C"><strong>C.</strong> The mechanisms are partly understood. Friendship buffers chronic stress; chronic stress damages the cardiovascular and immune systems. People with friends sleep better, eat more regularly, and consult doctors earlier when problems emerge. They appear, on imaging studies, to have lower baseline cortisol — the stress hormone — and reduced inflammatory markers in the blood. None of these effects are individually large; in combination, they are substantial.</p>
<p data-para="D"><strong>D.</strong> Friendship structures across the lifespan are remarkably consistent. The British evolutionary psychologist Robin Dunbar has proposed a "social-circle model" with characteristic numbers at each layer: roughly five intimate confidants, fifteen close friends, fifty good friends, and 150 stable acquaintances — the famous "Dunbar\'s number." The numbers vary modestly across cultures but track closely across studies. Adolescents and young adults add new friendships rapidly; from roughly the age of twenty-five, total friendship counts begin to decline, although the depth of remaining friendships often increases.</p>
<p data-para="E"><strong>E.</strong> Modern conditions have not been kind to the maintenance of friendship. Surveys in several Western countries report a doubling of the proportion of adults reporting "no close friends" over the past three decades. The decline tracks several variables — geographic mobility, the disappearance of spaces of casual encounter, longer working hours — and probably has no single cause. The COVID-19 pandemic accelerated the trend; some recovery has occurred, but most surveys suggest that average friendship counts in 2026 are below pre-pandemic levels.</p>
<p data-para="F"><strong>F.</strong> The implications, given the medical evidence, are not minor. Several governments have begun to treat loneliness as a public-health issue: the United Kingdom appointed a "Minister for Loneliness" in 2018; Japan followed in 2021. Public-health interventions remain in their infancy. Social-prescribing programmes — in which doctors refer patients to community activities rather than prescribing only drugs — have shown modest positive effects. The honest assessment is that the science is well ahead of the policy. We know what loneliness costs; we are still working out what to do about it.</p>
`,
      vocabulary: [
        {
          term: 'cortisol',
          definition:
            'A hormone released in response to stress; chronically elevated levels are harmful.',
        },
        {
          term: 'meta-analysis',
          definition: 'A statistical analysis combining the results of many independent studies.',
          translation: 'phân tích tổng hợp',
        },
        {
          term: 'social prescribing',
          definition:
            'A medical practice in which patients are referred to community-based activities to address non-medical needs.',
        },
        {
          term: 'inflammatory marker',
          definition: 'A biochemical indicator of inflammation in the body.',
        },
      ],
      groups: [
        {
          id: 'r010-p3-g1',
          instruction:
            'Questions 27–32 · Do the following statements agree with the views of the writer? YES, NO, or NOT GIVEN.',
          questions: [
            {
              id: 'r010-q27',
              number: 27,
              type: 'yes-no-not-given',
              statement:
                'Friendship between unrelated adults has historically been a major topic of academic study.',
              correctAnswer: 'NO',
              explanation: 'Paragraph A says it has been a residual category.',
            },
            {
              id: 'r010-q28',
              number: 28,
              type: 'yes-no-not-given',
              statement:
                'The 2010 meta-analysis found a 50 per cent lower mortality risk for those with strong social relationships.',
              correctAnswer: 'YES',
              explanation: 'Paragraph B.',
            },
            {
              id: 'r010-q29',
              number: 29,
              type: 'yes-no-not-given',
              statement: 'Loneliness is more dangerous than smoking fifteen cigarettes per day.',
              correctAnswer: 'NO',
              explanation:
                'Paragraph B says they are roughly equivalent, not that one exceeds the other.',
            },
            {
              id: 'r010-q30',
              number: 30,
              type: 'yes-no-not-given',
              statement: 'The proposed Dunbar number for stable acquaintances is roughly 150.',
              correctAnswer: 'YES',
              explanation: 'Paragraph D.',
            },
            {
              id: 'r010-q31',
              number: 31,
              type: 'yes-no-not-given',
              statement: 'Friendship counts begin to decline after about age twenty-five.',
              correctAnswer: 'YES',
              explanation: 'Paragraph D.',
            },
            {
              id: 'r010-q32',
              number: 32,
              type: 'yes-no-not-given',
              statement: 'Japan has appointed a minister for loneliness.',
              correctAnswer: 'YES',
              explanation: 'Paragraph F.',
            },
          ],
        },
        {
          id: 'r010-p3-g2',
          instruction: 'Questions 33–36 · Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'r010-q33',
              number: 33,
              type: 'multiple-choice',
              prompt:
                'According to paragraph C, friendship probably reduces mortality through which combination of mechanisms?',
              options: [
                { key: 'A', text: 'Stress buffering and improved health behaviours.' },
                { key: 'B', text: 'Direct vitamin synthesis.' },
                { key: 'C', text: 'Increased exercise frequency only.' },
                { key: 'D', text: 'Reduced calorie intake.' },
              ],
              correctAnswer: 'A',
              explanation: 'Paragraph C.',
            },
            {
              id: 'r010-q34',
              number: 34,
              type: 'multiple-choice',
              prompt:
                'According to the writer, what has happened to friendship counts since the pandemic?',
              options: [
                { key: 'A', text: 'They have fully recovered.' },
                { key: 'B', text: 'Some recovery has occurred but levels remain below 2019.' },
                { key: 'C', text: 'They have surpassed 2019 levels.' },
                { key: 'D', text: 'They have not changed.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph E.',
            },
            {
              id: 'r010-q35',
              number: 35,
              type: 'multiple-choice',
              prompt: 'How does the writer characterise the policy response?',
              options: [
                { key: 'A', text: 'Comprehensive and effective.' },
                { key: 'B', text: 'Misguided and harmful.' },
                { key: 'C', text: 'In its infancy and lagging behind the science.' },
                { key: 'D', text: 'Identical across countries.' },
              ],
              correctAnswer: 'C',
              explanation: 'Paragraph F.',
            },
            {
              id: 'r010-q36',
              number: 36,
              type: 'multiple-choice',
              prompt: 'The phrase "the science is well ahead of the policy" most nearly means',
              options: [
                { key: 'A', text: 'Scientists have abandoned policy work.' },
                {
                  key: 'B',
                  text: 'Knowledge of the problem exceeds knowledge of effective intervention.',
                },
                { key: 'C', text: 'Policy is leading the way.' },
                { key: 'D', text: 'The science is no longer relevant.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph F.',
            },
          ],
        },
        {
          id: 'r010-p3-g3',
          instruction:
            'Questions 37–40 · Complete the summary. Choose NO MORE THAN TWO WORDS from the passage.',
          questions: [
            {
              id: 'r010-q37',
              number: 37,
              type: 'sentence-completion',
              sentenceBefore: "Robin Dunbar's social-circle model proposes roughly five intimate",
              sentenceAfter: 'at the innermost layer.',
              correctAnswer: 'confidants',
              acceptableVariants: ['confidant'],
              maxWords: 2,
              explanation: 'Paragraph D.',
            },
            {
              id: 'r010-q38',
              number: 38,
              type: 'sentence-completion',
              sentenceBefore: 'Long-term stress damages the immune and',
              sentenceAfter: 'systems.',
              correctAnswer: 'cardiovascular',
              acceptableVariants: [],
              maxWords: 1,
              explanation: 'Paragraph C.',
            },
            {
              id: 'r010-q39',
              number: 39,
              type: 'sentence-completion',
              sentenceBefore:
                'Programmes in which doctors refer patients to community activities are known as',
              sentenceAfter: 'programmes.',
              correctAnswer: 'social prescribing',
              acceptableVariants: ['social-prescribing'],
              maxWords: 2,
              explanation: 'Paragraph F.',
            },
            {
              id: 'r010-q40',
              number: 40,
              type: 'sentence-completion',
              sentenceBefore: 'The United Kingdom appointed a Minister for Loneliness in',
              sentenceAfter: '.',
              correctAnswer: '2018',
              acceptableVariants: [],
              maxWords: 1,
              explanation: 'Paragraph F.',
            },
          ],
        },
      ],
    },
  ],
}
