import type { Test } from '../../schemas/test'

export const reading004: Test = {
  id: 'reading-004',
  skill: 'reading',
  title: 'Reading Test 04',
  description:
    'Three passages on volcanic climate, the social history of the bicycle, and the modern study of remote work.',
  difficulty: 'intermediate',
  fullDurationMinutes: 60,
  shortDurationMinutes: 30,
  totalQuestions: 40,
  isPro: true,
  publishedAt: '2026-04-15',
  tags: ['IELTS Academic', 'Reading'],
  passages: [
    {
      id: 'reading-004-p1',
      number: 1,
      title: 'Volcanoes and the Climate',
      wordCount: 510,
      bodyHtml: `
<p data-para="A"><strong>A.</strong> The eruption of Mount Tambora, on the Indonesian island of Sumbawa, in April 1815 was the most violent volcanic event of the past two thousand years. Roughly forty cubic kilometres of rock and ash were ejected into the atmosphere, and an estimated 71,000 people died, mostly from the resulting famine. The eruption is also credited with producing what European farmers called "the year without a summer."</p>
<p data-para="B"><strong>B.</strong> The link between volcanic eruptions and climate had been suspected since at least the time of Benjamin Franklin, who, observing dry fogs over Paris in 1783, correctly attributed them to the Icelandic eruption of Laki earlier that year. The mechanism, however, was clarified only in the late twentieth century. The cooling effect comes not from the visible ash, which rapidly settles, but from sulphate aerosols formed when sulphur dioxide gas reacts with water vapour in the stratosphere.</p>
<p data-para="C"><strong>C.</strong> Sulphate aerosols reflect a portion of incoming sunlight back into space. Because the stratosphere has no weather and no rain, aerosols deposited there can persist for two to three years before they settle out. A sufficiently large eruption can therefore lower global average surface temperatures by half a degree Celsius for several years — small in absolute terms, but enough to disrupt agricultural cycles thousands of kilometres from the volcano itself.</p>
<p data-para="D"><strong>D.</strong> The 1815 Tambora eruption produced reports of failed harvests across the Northern Hemisphere. New England saw frost in every month of 1816. In Switzerland, a young Mary Shelley, prevented from leaving the house by relentless rain, wrote the first draft of <em>Frankenstein</em>. In China, the Yunnan rice harvest collapsed for three consecutive years. The cluster of historical events known as the post-Napoleonic agricultural crisis owes much of its severity to volcanic dust.</p>
<p data-para="E"><strong>E.</strong> Not every eruption affects the climate equally. The cooling effect depends less on the total volume of material ejected than on the proportion that reaches the stratosphere. Mount St. Helens in 1980 produced a spectacular but largely tropospheric eruption; its cooling effect was negligible. Mount Pinatubo in 1991, by contrast, was smaller in total mass but injected nearly twenty million tonnes of sulphur dioxide directly into the stratosphere, lowering the global mean temperature by approximately 0.5 °C in 1992 and 1993.</p>
<p data-para="F"><strong>F.</strong> Volcanic data have proven useful in climate science. By comparing temperatures before and after well-dated eruptions, climatologists can calibrate models of how the atmosphere responds to forcings of known magnitude — a kind of natural experiment unavailable on human timescales for any other variable.</p>
`,
      vocabulary: [
        {
          term: 'aerosol',
          definition:
            'A suspension of fine solid particles or liquid droplets in air or another gas.',
          translation: 'sol khí',
        },
        {
          term: 'stratosphere',
          definition: 'The layer of the atmosphere above the troposphere, roughly 10–50 km up.',
        },
        {
          term: 'forcings',
          definition:
            'External influences on the climate system, such as solar variation or volcanic eruptions.',
        },
        {
          term: 'troposphere',
          definition: 'The lowest layer of the atmosphere, where weather occurs.',
        },
      ],
      groups: [
        {
          id: 'r004-p1-g1',
          instruction: 'Questions 1–5 · Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'r004-q1',
              number: 1,
              type: 'multiple-choice',
              prompt: 'How much rock and ash was ejected by the 1815 Tambora eruption?',
              options: [
                { key: 'A', text: 'About 4 cubic kilometres.' },
                { key: 'B', text: 'About 40 cubic kilometres.' },
                { key: 'C', text: 'About 400 cubic kilometres.' },
                { key: 'D', text: 'The passage does not say.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph A states "roughly forty cubic kilometres".',
            },
            {
              id: 'r004-q2',
              number: 2,
              type: 'multiple-choice',
              prompt:
                'Who first publicly suggested a link between volcanic eruptions and unusual weather?',
              options: [
                { key: 'A', text: 'Mary Shelley.' },
                { key: 'B', text: 'Benjamin Franklin.' },
                { key: 'C', text: 'A 19th-century Swiss scientist.' },
                { key: 'D', text: 'The British Royal Society.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph B credits Benjamin Franklin observing dry fogs over Paris.',
            },
            {
              id: 'r004-q3',
              number: 3,
              type: 'multiple-choice',
              prompt:
                'According to the passage, the principal cooling agent from a large eruption is',
              options: [
                { key: 'A', text: 'visible ash.' },
                { key: 'B', text: 'soot.' },
                { key: 'C', text: 'sulphate aerosols.' },
                { key: 'D', text: 'carbon dioxide.' },
              ],
              correctAnswer: 'C',
              explanation: 'Paragraph B states the cooling comes from sulphate aerosols, not ash.',
            },
            {
              id: 'r004-q4',
              number: 4,
              type: 'multiple-choice',
              prompt:
                'Aerosols in the stratosphere persist longer than those in the troposphere because',
              options: [
                { key: 'A', text: 'they are heavier.' },
                { key: 'B', text: 'the stratosphere has no rain to wash them out.' },
                { key: 'C', text: 'the stratosphere is colder.' },
                { key: 'D', text: 'they are made of glass.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph C says the stratosphere has no weather and no rain.',
            },
            {
              id: 'r004-q5',
              number: 5,
              type: 'multiple-choice',
              prompt: 'Why was the climate effect of Mount St. Helens negligible?',
              options: [
                { key: 'A', text: 'Its eruption was small.' },
                { key: 'B', text: 'Its plume failed to reach the stratosphere.' },
                { key: 'C', text: 'It produced no sulphur.' },
                { key: 'D', text: 'It occurred in winter.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph E describes the eruption as "largely tropospheric".',
            },
          ],
        },
        {
          id: 'r004-p1-g2',
          instruction:
            'Questions 6–9 · Match each event with the correct year. Choose A, B, C or D.',
          questions: [
            {
              id: 'r004-q6',
              number: 6,
              type: 'matching',
              items: [
                { id: 'item-1', text: 'Tambora eruption' },
                { id: 'item-2', text: 'Laki eruption observed by Franklin' },
                { id: 'item-3', text: 'Pinatubo eruption' },
                { id: 'item-4', text: 'Mount St. Helens eruption' },
              ],
              options: [
                { key: 'A', text: '1783' },
                { key: 'B', text: '1815' },
                { key: 'C', text: '1980' },
                { key: 'D', text: '1991' },
              ],
              correctMapping: {
                'item-1': 'B',
                'item-2': 'A',
                'item-3': 'D',
                'item-4': 'C',
              },
              explanation: 'See paragraphs A, B and E for these dates.',
            },
            {
              id: 'r004-q7',
              number: 7,
              type: 'sentence-completion',
              sentenceBefore: "Tambora's death toll was an estimated",
              sentenceAfter: 'people, mostly from famine.',
              correctAnswer: '71,000',
              acceptableVariants: ['71000', 'seventy-one thousand'],
              maxWords: 2,
              explanation: 'Paragraph A.',
            },
            {
              id: 'r004-q8',
              number: 8,
              type: 'sentence-completion',
              sentenceBefore: 'Pinatubo injected nearly',
              sentenceAfter: 'tonnes of sulphur dioxide into the stratosphere.',
              correctAnswer: 'twenty million',
              acceptableVariants: ['20 million', '20,000,000'],
              maxWords: 3,
              explanation: 'Paragraph E quantifies the sulphur dioxide injection.',
            },
            {
              id: 'r004-q9',
              number: 9,
              type: 'sentence-completion',
              sentenceBefore:
                'The cooling caused by Pinatubo lowered global mean temperature by approximately',
              sentenceAfter: 'in 1992 and 1993.',
              correctAnswer: '0.5 °C',
              acceptableVariants: [
                '0.5 C',
                'half a degree',
                'half a degree Celsius',
                '0.5 degrees',
              ],
              maxWords: 4,
              explanation: 'Paragraph E states the figure.',
            },
          ],
        },
        {
          id: 'r004-p1-g3',
          instruction:
            'Questions 10–13 · Do the following statements agree with the information in the passage? TRUE, FALSE, or NOT GIVEN.',
          questions: [
            {
              id: 'r004-q10',
              number: 10,
              type: 'true-false-not-given',
              statement: '1816 saw frost every month in some parts of the Northern Hemisphere.',
              correctAnswer: 'TRUE',
              explanation: 'Paragraph D mentions New England frost every month of 1816.',
            },
            {
              id: 'r004-q11',
              number: 11,
              type: 'true-false-not-given',
              statement: 'Mary Shelley wrote Frankenstein on a holiday in Switzerland.',
              correctAnswer: 'TRUE',
              explanation: 'Paragraph D refers to her writing in Switzerland that year.',
            },
            {
              id: 'r004-q12',
              number: 12,
              type: 'true-false-not-given',
              statement:
                'The total volume of ejected material is the most reliable predictor of climate impact.',
              correctAnswer: 'FALSE',
              explanation:
                'Paragraph E says the proportion reaching the stratosphere matters more.',
            },
            {
              id: 'r004-q13',
              number: 13,
              type: 'true-false-not-given',
              statement: 'Volcanic data have replaced laboratory experiments in climatology.',
              correctAnswer: 'NOT GIVEN',
              explanation: 'Paragraph F describes volcanic data as useful, not as a replacement.',
            },
          ],
        },
      ],
    },
    {
      id: 'reading-004-p2',
      number: 2,
      title: 'The Quiet Revolution of the Bicycle',
      wordCount: 480,
      bodyHtml: `
<p data-para="A"><strong>A.</strong> By the standards of nineteenth-century invention, the bicycle was an unspectacular machine. It used no fuel, made no noise, and required no infrastructure beyond a flat surface. Yet between 1880 and 1900 — the so-called "bicycle decade" — the safety bicycle reshaped Western daily life more decisively than the steam locomotive that preceded it or the motor car that came after.</p>
<p data-para="B"><strong>B.</strong> The bicycle's earlier ancestors were impractical. The "boneshaker" of the 1860s was a wooden frame on iron wheels and lived up to its nickname. The "ordinary," or penny-farthing, with its enormous front wheel and tiny rear, achieved respectable speed but was dangerous and accessible only to athletic young men. The 1885 Rover safety bicycle, with two equal-sized wheels and a chain-driven rear, was rideable by almost anyone. By 1893, the addition of pneumatic tyres made it comfortable as well.</p>
<p data-para="C"><strong>C.</strong> The economic effect was immediate. A working-class American or British family of 1890 could not afford a horse, but could afford a bicycle on instalment terms. For the first time, ordinary people had access to private transportation faster than walking. The radius of the daily commute extended from one mile to five. Country villages, until then half a day's walk from market towns, became part of the same labour market.</p>
<p data-para="D"><strong>D.</strong> The social effects were more diffuse but no less real. Susan B. Anthony, the American suffragist, declared in 1896 that the bicycle had "done more to emancipate women than anything else in the world." This was rhetorical excess, but it pointed to a real shift. Cycling was difficult in long skirts and corsets, and women who took up the bicycle adopted lighter, looser clothing — bloomers, divided skirts, bicycle suits. The medical and clerical objections to women cycling, which were vocal, did not survive the practical fact that women cycled.</p>
<p data-para="E"><strong>E.</strong> The bicycle was also responsible for an unlikely engineering legacy. Its components — ball bearings, lightweight steel tubing, the differential gear, pneumatic tyres — went on to become foundational components of the motor car. The Wright brothers ran a bicycle workshop in Dayton, Ohio, and used cycle technology to fabricate the airframe of the first powered aeroplane. Glenn Curtiss, an early aviator, was a bicycle racer. The bicycle, in this sense, was a school for the next century of mechanical invention.</p>
<p data-para="F"><strong>F.</strong> By 1910 the motor car had begun its rise, and the cultural prestige of the bicycle declined. In most countries it became the transport of children, students and the poor. Only in a few — the Netherlands, Denmark, China during the Mao era — did it remain the dominant mode of personal mobility into the late twentieth century. The reappearance of the bicycle in twenty-first-century Western cities, driven by congestion and climate concern, is in some sense a return rather than an innovation.</p>
`,
      vocabulary: [
        {
          term: 'pneumatic',
          definition: 'Filled with compressed air; used here of inflatable rubber tyres.',
          translation: 'bơm hơi',
        },
        {
          term: 'suffragist',
          definition: 'A person who advocates the extension of voting rights, especially to women.',
          translation: 'người vận động quyền bầu cử',
        },
        {
          term: 'instalment',
          definition: 'One of several scheduled payments by which a debt is gradually settled.',
          translation: 'trả góp',
        },
        {
          term: 'penny-farthing',
          definition: 'An early bicycle with a very large front wheel and a small rear one.',
        },
      ],
      groups: [
        {
          id: 'r004-p2-g1',
          instruction:
            'Questions 14–18 · Choose the correct heading for paragraphs A, B, C, D, F from the list.',
          questions: [
            {
              id: 'r004-q14',
              number: 14,
              type: 'matching-headings',
              paragraphId: 'A',
              headings: [
                { key: 'i', text: 'A return in the modern city' },
                { key: 'ii', text: 'A modest invention with disproportionate effects' },
                { key: 'iii', text: 'Economic reach for ordinary households' },
                { key: 'iv', text: 'Cycling and the changing dress of women' },
                { key: 'v', text: 'The path to a usable design' },
                { key: 'vi', text: 'Engineering parent of the motor age' },
              ],
              correctAnswer: 'ii',
              explanation: 'Paragraph A frames the bicycle as quietly transformative.',
            },
            {
              id: 'r004-q15',
              number: 15,
              type: 'matching-headings',
              paragraphId: 'B',
              headings: [
                { key: 'i', text: 'A return in the modern city' },
                { key: 'ii', text: 'A modest invention with disproportionate effects' },
                { key: 'iii', text: 'Economic reach for ordinary households' },
                { key: 'iv', text: 'Cycling and the changing dress of women' },
                { key: 'v', text: 'The path to a usable design' },
                { key: 'vi', text: 'Engineering parent of the motor age' },
              ],
              correctAnswer: 'v',
              explanation: 'Paragraph B traces predecessor designs to the safety bicycle.',
            },
            {
              id: 'r004-q16',
              number: 16,
              type: 'matching-headings',
              paragraphId: 'C',
              headings: [
                { key: 'i', text: 'A return in the modern city' },
                { key: 'ii', text: 'A modest invention with disproportionate effects' },
                { key: 'iii', text: 'Economic reach for ordinary households' },
                { key: 'iv', text: 'Cycling and the changing dress of women' },
                { key: 'v', text: 'The path to a usable design' },
                { key: 'vi', text: 'Engineering parent of the motor age' },
              ],
              correctAnswer: 'iii',
              explanation: 'Paragraph C discusses affordability and labour-market reach.',
            },
            {
              id: 'r004-q17',
              number: 17,
              type: 'matching-headings',
              paragraphId: 'D',
              headings: [
                { key: 'i', text: 'A return in the modern city' },
                { key: 'ii', text: 'A modest invention with disproportionate effects' },
                { key: 'iii', text: 'Economic reach for ordinary households' },
                { key: 'iv', text: 'Cycling and the changing dress of women' },
                { key: 'v', text: 'The path to a usable design' },
                { key: 'vi', text: 'Engineering parent of the motor age' },
              ],
              correctAnswer: 'iv',
              explanation: 'Paragraph D discusses dress reform and emancipation rhetoric.',
            },
            {
              id: 'r004-q18',
              number: 18,
              type: 'matching-headings',
              paragraphId: 'F',
              headings: [
                { key: 'i', text: 'A return in the modern city' },
                { key: 'ii', text: 'A modest invention with disproportionate effects' },
                { key: 'iii', text: 'Economic reach for ordinary households' },
                { key: 'iv', text: 'Cycling and the changing dress of women' },
                { key: 'v', text: 'The path to a usable design' },
                { key: 'vi', text: 'Engineering parent of the motor age' },
              ],
              correctAnswer: 'i',
              explanation: "Paragraph F discusses the bicycle's decline and reappearance.",
            },
          ],
        },
        {
          id: 'r004-p2-g2',
          instruction:
            'Questions 19–23 · Do the following statements agree with the information in the passage? TRUE, FALSE, or NOT GIVEN.',
          questions: [
            {
              id: 'r004-q19',
              number: 19,
              type: 'true-false-not-given',
              statement: 'The penny-farthing could be ridden safely by most adults.',
              correctAnswer: 'FALSE',
              explanation:
                'Paragraph B states it was dangerous and accessible only to athletic young men.',
            },
            {
              id: 'r004-q20',
              number: 20,
              type: 'true-false-not-given',
              statement:
                "Pneumatic tyres were added to safety bicycles in the same year as the Rover's release.",
              correctAnswer: 'FALSE',
              explanation: 'Paragraph B places the Rover in 1885 and pneumatic tyres in 1893.',
            },
            {
              id: 'r004-q21',
              number: 21,
              type: 'true-false-not-given',
              statement:
                'The Wright brothers used techniques from bicycle manufacture in their aeroplane.',
              correctAnswer: 'TRUE',
              explanation:
                'Paragraph E mentions the Daytona bicycle workshop and airframe fabrication.',
            },
            {
              id: 'r004-q22',
              number: 22,
              type: 'true-false-not-given',
              statement:
                'Bicycles remained the dominant transport in Britain into the late twentieth century.',
              correctAnswer: 'FALSE',
              explanation: 'Paragraph F lists the Netherlands, Denmark and China — not Britain.',
            },
            {
              id: 'r004-q23',
              number: 23,
              type: 'true-false-not-given',
              statement:
                'The reappearance of cycling in modern cities is partly motivated by climate concern.',
              correctAnswer: 'TRUE',
              explanation: 'Paragraph F states this explicitly.',
            },
          ],
        },
        {
          id: 'r004-p2-g3',
          instruction:
            'Questions 24–26 · Answer the questions. NO MORE THAN THREE WORDS for each answer.',
          questions: [
            {
              id: 'r004-q24',
              number: 24,
              type: 'short-answer',
              question: 'Which 1885 model is regarded as the first practical safety bicycle?',
              correctAnswer: 'Rover',
              acceptableVariants: ['the Rover', 'Rover safety bicycle'],
              maxWords: 3,
              explanation: 'Paragraph B names the Rover.',
            },
            {
              id: 'r004-q25',
              number: 25,
              type: 'short-answer',
              question:
                'What loose garment did female cyclists adopt in place of long skirts and corsets?',
              correctAnswer: 'bloomers',
              acceptableVariants: ['bicycle suits', 'divided skirts'],
              maxWords: 2,
              explanation: 'Paragraph D mentions bloomers, divided skirts and bicycle suits.',
            },
            {
              id: 'r004-q26',
              number: 26,
              type: 'short-answer',
              question:
                'What component, common to bicycles and cars, is mentioned as a foundational mechanical part?',
              correctAnswer: 'ball bearings',
              acceptableVariants: [
                'ball bearing',
                'bearings',
                'differential gear',
                'pneumatic tyres',
              ],
              maxWords: 3,
              explanation:
                'Paragraph E lists ball bearings, the differential gear and pneumatic tyres.',
            },
          ],
        },
      ],
    },
    {
      id: 'reading-004-p3',
      number: 3,
      title: 'Studying Remote Work',
      wordCount: 530,
      bodyHtml: `
<p data-para="A"><strong>A.</strong> Before 2020, the remote-work literature was thin. A handful of small studies, mostly conducted in call centres and software firms, suggested modest productivity gains and a clear preference among employees, but the practice remained marginal. Most managers regarded the question of remote work as more cultural than empirical: a privilege to be granted, rarely a default to be defended.</p>
<p data-para="B"><strong>B.</strong> The pandemic of 2020–2021 produced an unprecedented natural experiment. By April 2020, around 42 per cent of the American workforce was working remotely full-time — up from less than 5 per cent the year before. Comparable shifts occurred across most high-income economies. For the first time, researchers had a population large enough to measure remote work as a phenomenon rather than as a local arrangement.</p>
<p data-para="C"><strong>C.</strong> The early findings were mixed. Self-reported productivity rose; objective measures, where they existed, were ambiguous. A study of 10,000 employees at an Asian information technology firm reported that working hours increased by 30 per cent, but output rose by only 20 per cent — a productivity decline of around 8 per cent per hour worked. The same study reported a sharp increase in time spent in meetings.</p>
<p data-para="D"><strong>D.</strong> Subsequent work has refined the picture. Tasks differ. Independent, focused work — writing code, drafting reports, conducting analysis — appears to benefit modestly from remote conditions. Collaborative work, especially the loose, exploratory kind associated with innovation, suffers. A 2022 paper in the journal <em>Nature</em> tracked the email patterns of researchers and found that remote teams produced fewer cross-disciplinary collaborations and patents, even when total communication volume rose.</p>
<p data-para="E"><strong>E.</strong> Hybrid arrangements have emerged as a partial compromise. A field experiment at the Chinese travel firm Trip.com, randomly assigning engineers to two days a week at home, found no measurable productivity loss, lower attrition, and improved self-reported satisfaction. The study, published in <em>Nature</em> in 2024, has been widely cited as a counter to the more pessimistic findings of fully-remote arrangements.</p>
<p data-para="F"><strong>F.</strong> Geographical effects have been substantial. American job postings in software, finance and consulting are now twice as likely to advertise as remote-friendly as they were in 2019. House prices in mid-sized cities within commuting distance of major employment centres rose sharply between 2020 and 2022 as workers reallocated themselves outwards. Whether the new geography is stable or merely transitional is a question that the literature has not yet settled.</p>
<p data-para="G"><strong>G.</strong> Two cautious conclusions are now widely accepted. First, the optimal arrangement is not the same for every task or every worker, and the institutional arrangement should reflect this. Second, the question is no longer whether remote work is possible, but how it should be designed. The pandemic answered the first question; the second remains open.</p>
`,
      vocabulary: [
        {
          term: 'attrition',
          definition:
            'The gradual reduction of a workforce, typically by employees leaving voluntarily.',
          translation: 'tỷ lệ nghỉ việc',
        },
        {
          term: 'natural experiment',
          definition:
            'A research situation in which a change in conditions occurs without deliberate intervention by the researcher.',
        },
        {
          term: 'hybrid',
          definition: 'A mixture of two or more elements; here, a mix of office and remote work.',
          translation: 'kết hợp',
        },
        {
          term: 'patents',
          definition:
            'Government licences conferring exclusive rights to make, use or sell an invention.',
          translation: 'bằng sáng chế',
        },
      ],
      groups: [
        {
          id: 'r004-p3-g1',
          instruction:
            'Questions 27–32 · Do the following statements agree with the views of the writer? YES, NO, or NOT GIVEN.',
          questions: [
            {
              id: 'r004-q27',
              number: 27,
              type: 'yes-no-not-given',
              statement: 'Before 2020, evidence on remote work was limited.',
              correctAnswer: 'YES',
              explanation: 'Paragraph A says the literature was thin.',
            },
            {
              id: 'r004-q28',
              number: 28,
              type: 'yes-no-not-given',
              statement: 'The 2020 shift in remote work was confined to the United States.',
              correctAnswer: 'NO',
              explanation:
                'Paragraph B says comparable shifts occurred across most high-income economies.',
            },
            {
              id: 'r004-q29',
              number: 29,
              type: 'yes-no-not-given',
              statement:
                'In the cited Asian IT firm study, working hours rose more than output did.',
              correctAnswer: 'YES',
              explanation: 'Paragraph C states 30% hours, 20% output.',
            },
            {
              id: 'r004-q30',
              number: 30,
              type: 'yes-no-not-given',
              statement: 'Cross-disciplinary collaborations rose during fully-remote work.',
              correctAnswer: 'NO',
              explanation: 'Paragraph D reports the opposite.',
            },
            {
              id: 'r004-q31',
              number: 31,
              type: 'yes-no-not-given',
              statement: "Trip.com's hybrid policy was applied uniformly to all employees.",
              correctAnswer: 'NOT GIVEN',
              explanation: 'The passage describes only the field experiment with engineers.',
            },
            {
              id: 'r004-q32',
              number: 32,
              type: 'yes-no-not-given',
              statement: 'House prices in mid-sized commuter cities rose between 2020 and 2022.',
              correctAnswer: 'YES',
              explanation: 'Paragraph F says so explicitly.',
            },
          ],
        },
        {
          id: 'r004-p3-g2',
          instruction: 'Questions 33–36 · Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'r004-q33',
              number: 33,
              type: 'multiple-choice',
              prompt: 'In paragraph C, the cited 8% figure refers to',
              options: [
                { key: 'A', text: 'a rise in employee satisfaction.' },
                { key: 'B', text: 'a per-hour productivity decline.' },
                { key: 'C', text: 'an increase in attrition.' },
                { key: 'D', text: 'an increase in meeting time.' },
              ],
              correctAnswer: 'B',
              explanation: 'Hours rose 30% and output rose 20%, implying a per-hour decline.',
            },
            {
              id: 'r004-q34',
              number: 34,
              type: 'multiple-choice',
              prompt:
                'According to paragraph D, which type of work suffers most under fully-remote conditions?',
              options: [
                { key: 'A', text: 'Independent analytic work.' },
                { key: 'B', text: 'Drafting reports.' },
                { key: 'C', text: 'Loose, exploratory collaborative work.' },
                { key: 'D', text: 'Routine clerical work.' },
              ],
              correctAnswer: 'C',
              explanation:
                'Paragraph D names exploratory collaboration and innovation as most affected.',
            },
            {
              id: 'r004-q35',
              number: 35,
              type: 'multiple-choice',
              prompt: 'In what year was the Trip.com hybrid study published?',
              options: [
                { key: 'A', text: '2020.' },
                { key: 'B', text: '2022.' },
                { key: 'C', text: '2023.' },
                { key: 'D', text: '2024.' },
              ],
              correctAnswer: 'D',
              explanation: 'Paragraph E states 2024.',
            },
            {
              id: 'r004-q36',
              number: 36,
              type: 'multiple-choice',
              prompt: "What is the writer's overall position in paragraph G?",
              options: [
                { key: 'A', text: 'Remote work is universally superior.' },
                { key: 'B', text: 'Remote work is a failure.' },
                { key: 'C', text: 'The right arrangement depends on task and worker.' },
                { key: 'D', text: 'The pandemic data are inconclusive.' },
              ],
              correctAnswer: 'C',
              explanation: 'Paragraph G argues optimum varies by task and worker.',
            },
          ],
        },
        {
          id: 'r004-p3-g3',
          instruction:
            'Questions 37–40 · Complete the summary. Choose NO MORE THAN TWO WORDS from the passage.',
          questions: [
            {
              id: 'r004-q37',
              number: 37,
              type: 'sentence-completion',
              sentenceBefore: 'The pandemic created an unprecedented',
              sentenceAfter: 'in remote work.',
              correctAnswer: 'natural experiment',
              acceptableVariants: [],
              maxWords: 2,
              explanation: 'Paragraph B uses the term.',
            },
            {
              id: 'r004-q38',
              number: 38,
              type: 'sentence-completion',
              sentenceBefore:
                'Remote teams in the 2022 Nature study produced fewer cross-disciplinary',
              sentenceAfter: '.',
              correctAnswer: 'collaborations',
              acceptableVariants: ['patents', 'collaborations and patents'],
              maxWords: 3,
              explanation: 'Paragraph D — collaborations and patents.',
            },
            {
              id: 'r004-q39',
              number: 39,
              type: 'sentence-completion',
              sentenceBefore: 'The Trip.com experiment found that hybrid work reduced',
              sentenceAfter: 'and improved satisfaction.',
              correctAnswer: 'attrition',
              acceptableVariants: ['employee attrition'],
              maxWords: 2,
              explanation: 'Paragraph E names lower attrition.',
            },
            {
              id: 'r004-q40',
              number: 40,
              type: 'sentence-completion',
              sentenceBefore:
                'American postings in software, finance and consulting are now twice as likely to be',
              sentenceAfter: 'as in 2019.',
              correctAnswer: 'remote-friendly',
              acceptableVariants: ['remote friendly'],
              maxWords: 2,
              explanation: 'Paragraph F.',
            },
          ],
        },
      ],
    },
  ],
}
