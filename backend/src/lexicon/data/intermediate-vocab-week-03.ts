import type { VocabularyLexiconItem } from '@shared/schemas/lexicon-items'

/**
 * Intermediate · Week 03 · Work and study.
 * 70 items across 7 days. The vocabulary of the working day, in plain
 * academic register — roles, tasks, deadlines, outcomes.
 */

const items: VocabularyLexiconItem[] = [
  // Day 1 — Roles & responsibilities
  v('w03-d1-01', 'colleague', 1, { partOfSpeech: 'noun', definition: 'A person you work with, especially in a profession.', example: 'A trusted colleague is more useful than three online tools.', synonyms: [['co-worker', 'B2'], ['associate', 'C1']] }),
  v('w03-d1-02', 'subordinate', 1, { partOfSpeech: 'noun', definition: 'A person of lower rank in an organisation.', example: 'A good manager defends a subordinate in public and corrects in private.', synonyms: [['junior', 'B2'], ['underling', 'C1']] }),
  v('w03-d1-03', 'supervisor', 1, { partOfSpeech: 'noun', definition: 'A person who manages and guides the work of others.', example: 'My supervisor reviews drafts within forty-eight hours.', synonyms: [['manager', 'B1'], ['overseer', 'C1']] }),
  v('w03-d1-04', 'subordinate', 1, { partOfSpeech: 'verb', definition: 'To treat as less important.', example: 'They subordinated short-term sales to long-term reputation.', synonyms: [['rank below', 'C1'], ['relegate', 'C1']] }),
  v('w03-d1-05', 'delegate', 1, { partOfSpeech: 'verb', definition: 'To give a task or authority to someone else.', example: 'Senior staff who fail to delegate burn out the fastest.', synonyms: [['assign', 'B2'], ['entrust', 'C1']] }),
  v('w03-d1-06', 'oversee', 1, { partOfSpeech: 'verb', definition: 'To watch and supervise the progress of work.', example: 'A new manager oversees three teams across two countries.', synonyms: [['supervise', 'B2'], ['superintend', 'C1']] }),
  v('w03-d1-07', 'accountable', 1, { partOfSpeech: 'adjective', definition: 'Required to explain your decisions or actions.', example: 'Senior staff are accountable to the board for every quarter.', synonyms: [['answerable', 'C1'], ['responsible', 'B2']] }),
  v('w03-d1-08', 'mentor', 1, { partOfSpeech: 'noun', definition: 'An experienced person who advises a less experienced one.', example: 'A patient mentor changes a young career more than a course does.', synonyms: [['adviser', 'B2'], ['guide', 'B1']] }),
  v('w03-d1-09', 'rank', 1, { partOfSpeech: 'noun', definition: 'A position in a hierarchy of importance.', example: 'In universities, rank matters less than research output.', synonyms: [['grade', 'B2'], ['standing', 'C1']] }),
  v('w03-d1-10', 'remit', 1, { partOfSpeech: 'noun', definition: 'The area of activity over which a person has authority.', example: 'Pricing falls outside the marketing department\'s remit.', synonyms: [['scope', 'C1'], ['jurisdiction', 'C1']] }),

  // Day 2 — Tasks & projects
  v('w03-d2-01', 'task', 2, { partOfSpeech: 'noun', definition: 'A piece of work to be done.', example: 'Breaking a project into small tasks makes the deadline less terrifying.', synonyms: [['job', 'B1'], ['assignment', 'B2']] }),
  v('w03-d2-02', 'assignment', 2, { partOfSpeech: 'noun', definition: 'A particular task given to a person or group.', example: 'The first assignment is due before the term ends.', synonyms: [['task', 'B1'], ['project', 'B1']] }),
  v('w03-d2-03', 'workload', 2, { partOfSpeech: 'noun', definition: 'The amount of work to be done by one person.', example: 'A heavy workload at work and home leaves little for revision.', synonyms: [['burden', 'B2'], ['load', 'B1']] }),
  v('w03-d2-04', 'milestone', 2, { partOfSpeech: 'noun', definition: 'An important point in the development of a project.', example: 'The first draft was the project\'s most important milestone.', synonyms: [['landmark', 'C1'], ['benchmark', 'C1']] }),
  v('w03-d2-05', 'pending', 2, { partOfSpeech: 'adjective', definition: 'Waiting to be done, decided, or paid.', example: 'Two reports are pending the supervisor\'s sign-off.', synonyms: [['outstanding', 'C1'], ['awaiting', 'B2']] }),
  v('w03-d2-06', 'undertake', 2, { partOfSpeech: 'verb', definition: 'To take on a job or responsibility.', example: 'She undertook the audit despite the short timeline.', synonyms: [['take on', 'B2'], ['embark on', 'C1']] }),
  v('w03-d2-07', 'liaise', 2, { partOfSpeech: 'verb', definition: 'To work with another person or group to share information.', example: 'The marketing team liaises closely with engineering during launch weeks.', synonyms: [['coordinate', 'C1'], ['collaborate', 'B2']] }),
  v('w03-d2-08', 'workflow', 2, { partOfSpeech: 'noun', definition: 'The sequence of steps through which a piece of work passes.', example: 'A clear workflow doubles a small team\'s output.', synonyms: [['process', 'B2'], ['pipeline', 'C1']] }),
  v('w03-d2-09', 'streamline', 2, { partOfSpeech: 'verb', definition: 'To make a process simpler and more efficient.', example: 'They streamlined the approval chain from seven steps to three.', synonyms: [['simplify', 'B2'], ['rationalise', 'C1']] }),
  v('w03-d2-10', 'overhaul', 2, { partOfSpeech: 'verb', definition: 'To examine and reform something thoroughly.', example: 'The committee overhauled the marking criteria after the audit.', synonyms: [['revamp', 'C1'], ['restructure', 'C1']] }),

  // Day 3 — Deadlines & timing
  v('w03-d3-01', 'deadline', 3, { partOfSpeech: 'noun', definition: 'A time or date by which something must be finished.', example: 'A self-imposed deadline a day early prevents most disasters.', synonyms: [['cut-off', 'B2'], ['due date', 'B1']] }),
  v('w03-d3-02', 'imminent', 3, { partOfSpeech: 'adjective', definition: 'About to happen very soon.', example: 'The launch is imminent, and last-minute changes are forbidden.', synonyms: [['impending', 'C1'], ['looming', 'C1']] }),
  v('w03-d3-03', 'overdue', 3, { partOfSpeech: 'adjective', definition: 'Not done or paid by the time expected.', example: 'Two invoices are overdue by three weeks.', synonyms: [['late', 'B1'], ['outstanding', 'C1']] }),
  v('w03-d3-04', 'expedite', 3, { partOfSpeech: 'verb', definition: 'To make something happen sooner.', example: 'A direct call to the supplier expedited the shipment.', synonyms: [['speed up', 'B2'], ['hasten', 'C1']] }),
  v('w03-d3-05', 'postpone', 3, { partOfSpeech: 'verb', definition: 'To arrange for something to happen at a later time.', example: 'Heavy rain postponed the workshop by a week.', synonyms: [['defer', 'C1'], ['put off', 'B2']] }),
  v('w03-d3-06', 'extension', 3, { partOfSpeech: 'noun', definition: 'Extra time given for completing something.', example: 'The supervisor granted a one-week extension on the report.', synonyms: [['grace period', 'C1'], ['delay', 'B1']] }),
  v('w03-d3-07', 'turnaround', 3, { partOfSpeech: 'noun', definition: 'The time taken to complete a process or order.', example: 'A twenty-four-hour turnaround is faster than the industry norm.', synonyms: [['lead time', 'C1'], ['response time', 'B2']] }),
  v('w03-d3-08', 'urgency', 3, { partOfSpeech: 'noun', definition: 'The need for swift action.', example: 'A sense of urgency is missing from the team\'s emails.', synonyms: [['immediacy', 'C1'], ['priority', 'B2']] }),
  v('w03-d3-09', 'lag', 3, { partOfSpeech: 'verb', definition: 'To move or develop more slowly than others.', example: 'The pilot region is now lagging behind the others on adoption.', synonyms: [['fall behind', 'B2'], ['trail', 'C1']] }),
  v('w03-d3-10', 'ahead of schedule', 3, { partOfSpeech: 'phrase', definition: 'Earlier than the planned time.', example: 'The team finished a fortnight ahead of schedule.', synonyms: [['early', 'B1'], ['in advance', 'B2']] }),

  // Day 4 — Outcomes & performance
  v('w03-d4-01', 'outcome', 4, { partOfSpeech: 'noun', definition: 'The final result of a process or activity.', example: 'A neutral outcome was the best we could expect.', synonyms: [['result', 'B1'], ['upshot', 'C1']] }),
  v('w03-d4-02', 'achieve', 4, { partOfSpeech: 'verb', definition: 'To succeed in completing or gaining something.', example: 'Most candidates achieve a band rise within three months.', synonyms: [['attain', 'C1'], ['accomplish', 'C1']] }),
  v('w03-d4-03', 'accomplishment', 4, { partOfSpeech: 'noun', definition: 'Something successfully completed or achieved.', example: 'A finished thesis is its own accomplishment, regardless of the grade.', synonyms: [['achievement', 'B2'], ['feat', 'C1']] }),
  v('w03-d4-04', 'productive', 4, { partOfSpeech: 'adjective', definition: 'Achieving a great deal in a given time.', example: 'A short, productive meeting beats a long, talkative one.', synonyms: [['fruitful', 'C1'], ['efficient', 'B2']] }),
  v('w03-d4-05', 'underperform', 4, { partOfSpeech: 'verb', definition: 'To do less well than expected or required.', example: 'The Q3 numbers underperformed the forecast by twelve per cent.', synonyms: [['fall short', 'B2'], ['flag', 'C1']] }),
  v('w03-d4-06', 'output', 4, { partOfSpeech: 'noun', definition: 'The amount of something produced.', example: 'The factory\'s output has doubled since the upgrade.', synonyms: [['production', 'B2'], ['yield', 'C1']] }),
  v('w03-d4-07', 'efficient', 4, { partOfSpeech: 'adjective', definition: 'Working well without waste of time or effort.', example: 'An efficient morning is worth two distracted afternoons.', synonyms: [['effective', 'B2'], ['productive', 'B2']] }),
  v('w03-d4-08', 'effective', 4, { partOfSpeech: 'adjective', definition: 'Producing the result that is wanted or intended.', example: 'A short, effective email outperforms a long, vague one.', synonyms: [['successful', 'B1'], ['potent', 'C1']] }),
  v('w03-d4-09', 'shortfall', 4, { partOfSpeech: 'noun', definition: 'A failure to meet the amount required.', example: 'The shortfall in donations forced a temporary closure.', synonyms: [['deficit', 'C1'], ['gap', 'B1']] }),
  v('w03-d4-10', 'surplus', 4, { partOfSpeech: 'noun', definition: 'An amount that is more than what is needed.', example: 'A budget surplus allowed extra investment in training.', synonyms: [['excess', 'B2'], ['overhang', 'C1']] }),

  // Day 5 — Skills & qualifications
  v('w03-d5-01', 'expertise', 5, { partOfSpeech: 'noun', definition: 'High-level skill or knowledge in a particular area.', example: 'Her expertise in regulatory law is rare in our sector.', synonyms: [['proficiency', 'C1'], ['know-how', 'B2']] }),
  v('w03-d5-02', 'competence', 5, { partOfSpeech: 'noun', definition: 'The ability to do something well.', example: 'Quiet competence often goes further than loud ambition.', synonyms: [['capability', 'C1'], ['ability', 'B1']] }),
  v('w03-d5-03', 'aptitude', 5, { partOfSpeech: 'noun', definition: 'A natural ability or skill.', example: 'A musical aptitude shows up before formal lessons begin.', synonyms: [['flair', 'C1'], ['talent', 'B2']] }),
  v('w03-d5-04', 'qualification', 5, { partOfSpeech: 'noun', definition: 'An official record showing a level of skill or training.', example: 'Recruiters scan for the qualification first and the personality second.', synonyms: [['credential', 'C1'], ['certification', 'B2']] }),
  v('w03-d5-05', 'proficient', 5, { partOfSpeech: 'adjective', definition: 'Skilled and competent in doing something.', example: 'She is proficient in three programming languages.', synonyms: [['skilled', 'B2'], ['adept', 'C1']] }),
  v('w03-d5-06', 'adept', 5, { partOfSpeech: 'adjective', definition: 'Very skilled at something, especially something complex.', example: 'He is adept at handling difficult conversations.', synonyms: [['proficient', 'C1'], ['expert', 'B2']] }),
  v('w03-d5-07', 'training', 5, { partOfSpeech: 'noun', definition: 'The process of learning the skills needed for a job.', example: 'Two months of training reduces errors by a third.', synonyms: [['preparation', 'B2'], ['instruction', 'B2']] }),
  v('w03-d5-08', 'certify', 5, { partOfSpeech: 'verb', definition: 'To officially state that something is true or of a certain standard.', example: 'The body certifies translators every five years.', synonyms: [['accredit', 'C1'], ['authorise', 'B2']] }),
  v('w03-d5-09', 'apprentice', 5, { partOfSpeech: 'noun', definition: 'A person learning a skill from an experienced worker.', example: 'An apprentice carpenter spends two years on small projects first.', synonyms: [['trainee', 'B2'], ['novice', 'C1']] }),
  v('w03-d5-10', 'on-the-job', 5, { partOfSpeech: 'adjective', definition: 'Happening at work as part of doing the work.', example: 'On-the-job training accelerates skill acquisition more than classroom study.', synonyms: [['practical', 'B2'], ['hands-on', 'B2']] }),

  // Day 6 — Pay & promotion
  v('w03-d6-01', 'salary', 6, { partOfSpeech: 'noun', definition: 'A fixed regular payment, usually monthly.', example: 'A starting salary in the public sector is modest but reliable.', synonyms: [['wage', 'B2'], ['pay', 'B1']] }),
  v('w03-d6-02', 'wage', 6, { partOfSpeech: 'noun', definition: 'A payment usually received hourly or weekly.', example: 'The minimum wage rises every April in this country.', synonyms: [['earnings', 'B2'], ['pay', 'B1']] }),
  v('w03-d6-03', 'bonus', 6, { partOfSpeech: 'noun', definition: 'Extra money given as a reward for good work.', example: 'A small year-end bonus matters less than a clear career path.', synonyms: [['premium', 'C1'], ['incentive', 'B2']] }),
  v('w03-d6-04', 'promotion', 6, { partOfSpeech: 'noun', definition: 'A move to a more senior job.', example: 'A promotion is most often offered to a person who already does the work.', synonyms: [['advancement', 'C1'], ['elevation', 'C1']] }),
  v('w03-d6-05', 'demote', 6, { partOfSpeech: 'verb', definition: 'To move to a less important position.', example: 'He was demoted after a serious accounting error.', synonyms: [['relegate', 'C1'], ['downgrade', 'B2']] }),
  v('w03-d6-06', 'redundancy', 6, { partOfSpeech: 'noun', definition: 'The loss of a job because it is no longer needed.', example: 'A round of redundancies is rarely the end of a person\'s career.', synonyms: [['lay-off', 'B2'], ['dismissal', 'C1']] }),
  v('w03-d6-07', 'pay rise', 6, { partOfSpeech: 'phrase', definition: 'An increase in regular payment.', example: 'A pay rise tied to performance reviews keeps both sides honest.', synonyms: [['raise', 'B2'], ['salary increment', 'C1']] }),
  v('w03-d6-08', 'incentive', 6, { partOfSpeech: 'noun', definition: 'Something that encourages a person to do something.', example: 'A small incentive for early sign-up doubled the registrations.', synonyms: [['inducement', 'C1'], ['reward', 'B2']] }),
  v('w03-d6-09', 'remuneration', 6, { partOfSpeech: 'noun', definition: 'Payment for work or services done.', example: 'The remuneration package includes pension contributions.', synonyms: [['compensation', 'C1'], ['pay', 'B1']] }),
  v('w03-d6-10', 'overtime', 6, { partOfSpeech: 'noun', definition: 'Extra hours worked beyond the standard schedule.', example: 'Paid overtime is rare in the start-up world.', synonyms: [['extra hours', 'B2'], ['additional time', 'B2']] }),

  // Day 7 — Study habits & academic life
  v('w03-d7-01', 'revise', 7, { partOfSpeech: 'verb', definition: 'To study notes again before an examination.', example: 'I revise for an hour every morning before any new material.', synonyms: [['review', 'B2'], ['recap', 'B2']] }),
  v('w03-d7-02', 'curriculum', 7, { partOfSpeech: 'noun', definition: 'The subjects studied in a school or university.', example: 'The curriculum was rewritten to include digital literacy.', synonyms: [['syllabus', 'B2'], ['programme', 'B1']] }),
  v('w03-d7-03', 'syllabus', 7, { partOfSpeech: 'noun', definition: 'A list of topics to be studied in a course.', example: 'The syllabus lists eighteen readings for the term.', synonyms: [['course outline', 'B2'], ['curriculum', 'B2']] }),
  v('w03-d7-04', 'lecture', 7, { partOfSpeech: 'noun', definition: 'A formal talk on a subject given to an audience.', example: 'A good lecture leaves three clear ideas behind.', synonyms: [['talk', 'B1'], ['address', 'C1']] }),
  v('w03-d7-05', 'seminar', 7, { partOfSpeech: 'noun', definition: 'A small group meeting for discussion of a topic.', example: 'Seminars test understanding more sharply than lectures do.', synonyms: [['workshop', 'B2'], ['tutorial', 'B2']] }),
  v('w03-d7-06', 'tutorial', 7, { partOfSpeech: 'noun', definition: 'A small teaching session, often one-to-one.', example: 'A weekly tutorial keeps the dissertation moving.', synonyms: [['supervision', 'C1'], ['lesson', 'B1']] }),
  v('w03-d7-07', 'thesis', 7, { partOfSpeech: 'noun', definition: 'A long piece of academic writing presenting an argument.', example: 'Her thesis won a small prize from the department.', synonyms: [['dissertation', 'C1'], ['treatise', 'C1']] }),
  v('w03-d7-08', 'transcript', 7, { partOfSpeech: 'noun', definition: 'An official record of a student\'s academic results.', example: 'A clean transcript opens doors that a personal statement cannot.', synonyms: [['record', 'B1'], ['report', 'B1']] }),
  v('w03-d7-09', 'plagiarism', 7, { partOfSpeech: 'noun', definition: 'The act of copying another person\'s work as if it were one\'s own.', example: 'Modern plagiarism software catches even paraphrased passages.', synonyms: [['copying', 'B2'], ['intellectual theft', 'C1']] }),
  v('w03-d7-10', 'graduate', 7, { partOfSpeech: 'verb', definition: 'To complete a course of study at a university.', example: 'She graduated with first-class honours in three years.', synonyms: [['qualify', 'B2'], ['complete', 'B1']] }),
]

interface VocabInput {
  partOfSpeech: VocabularyLexiconItem['partOfSpeech']
  definition: string
  example: string
  register?: VocabularyLexiconItem['register']
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
    register: input.register ?? 'B2',
    topic: input.topic ?? 'work-study',
    frequency: input.frequency ?? 'high',
    synonyms: input.synonyms.map(([word, register, nuance]) => ({
      word,
      register,
      ...(nuance ? { nuance } : {}),
    })),
    level: 'intermediate',
    week: 3,
    day,
  }
}

export const INTERMEDIATE_VOCAB_WEEK_03: VocabularyLexiconItem[] = items
