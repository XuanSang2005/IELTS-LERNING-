import type { VocabularyLexiconItem } from '@shared/schemas/lexicon-items'

/**
 * Intermediate · Week 04 · Education.
 * 70 items across 7 days. Words for learning, teaching, assessment,
 * and educational progression — Phase II opens with the canonical
 * IELTS topic.
 */

const items: VocabularyLexiconItem[] = [
  // Day 1 — The classroom
  v('w04-d1-01', 'pupil', 1, { partOfSpeech: 'noun', definition: 'A student in a school, usually a child.', example: 'Each pupil was handed a copy of the new textbook.', synonyms: [['student', 'B1'], ['schoolchild', 'B2']] }),
  v('w04-d1-02', 'discipline', 1, { partOfSpeech: 'noun', definition: 'The control of behaviour by a teacher or school.', example: 'Strict discipline does not always raise standards.', synonyms: [['order', 'B1'], ['regulation', 'C1']] }),
  v('w04-d1-03', 'attendance', 1, { partOfSpeech: 'noun', definition: 'The act of being present at a place, especially a school.', example: 'Poor attendance correlates closely with weak final marks.', synonyms: [['presence', 'B2'], ['turnout', 'C1']] }),
  v('w04-d1-04', 'compulsory', 1, { partOfSpeech: 'adjective', definition: 'That must be done because of a rule or law.', example: 'Education is compulsory until the age of sixteen.', synonyms: [['mandatory', 'C1'], ['obligatory', 'C1']] }),
  v('w04-d1-05', 'optional', 1, { partOfSpeech: 'adjective', definition: 'That can be chosen or not, as you wish.', example: 'Music remains optional in most secondary schools.', synonyms: [['voluntary', 'C1'], ['elective', 'C1']] }),
  v('w04-d1-06', 'instruct', 1, { partOfSpeech: 'verb', definition: 'To teach someone how to do something.', example: 'New teachers are instructed in safeguarding before the term begins.', synonyms: [['teach', 'B1'], ['educate', 'B2']] }),
  v('w04-d1-07', 'literacy', 1, { partOfSpeech: 'noun', definition: 'The ability to read and write.', example: 'Adult literacy programmes have reduced the gap by half.', synonyms: [['reading skill', 'B2'], ['fluency in reading', 'C1']] }),
  v('w04-d1-08', 'numeracy', 1, { partOfSpeech: 'noun', definition: 'The ability to understand and work with numbers.', example: 'Strong numeracy correlates with later wage outcomes.', synonyms: [['arithmetic skill', 'B2'], ['mathematical fluency', 'C1']] }),
  v('w04-d1-09', 'state school', 1, { partOfSpeech: 'phrase', definition: 'A school funded and managed by the government.', example: 'A good state school costs the family nothing in tuition.', synonyms: [['public school (UK sense)', 'B2'], ['government school', 'B2']] }),
  v('w04-d1-10', 'private school', 1, { partOfSpeech: 'phrase', definition: 'A school funded by fees rather than the state.', example: 'A private school charges fees that ration access by income.', synonyms: [['independent school', 'C1'], ['fee-paying school', 'B2']] }),

  // Day 2 — Curriculum & subjects
  v('w04-d2-01', 'curriculum', 2, { partOfSpeech: 'noun', definition: 'The subjects studied in a school or course.', example: 'The national curriculum was last reformed a decade ago.', synonyms: [['syllabus', 'B2'], ['course of study', 'B2']] }),
  v('w04-d2-02', 'core subject', 2, { partOfSpeech: 'phrase', definition: 'A subject that all students must study.', example: 'Mathematics is a core subject across all educational systems.', synonyms: [['compulsory subject', 'B2'], ['mandatory subject', 'C1']] }),
  v('w04-d2-03', 'elective', 2, { partOfSpeech: 'noun', definition: 'A subject a student may choose to study.', example: 'Electives in art and music shape personality as much as transcripts.', synonyms: [['option', 'B2'], ['optional course', 'C1']] }),
  v('w04-d2-04', 'humanities', 2, { partOfSpeech: 'noun', definition: 'Subjects such as literature, history, and philosophy.', example: 'Funding for the humanities has tightened across the West.', synonyms: [['arts subjects', 'B2'], ['liberal arts', 'C1']] }),
  v('w04-d2-05', 'STEM', 2, { partOfSpeech: 'noun', definition: 'Science, Technology, Engineering, and Mathematics, taken collectively.', example: 'Government programmes encourage girls to pursue STEM degrees.', synonyms: [['sciences', 'B2'], ['technical subjects', 'C1']] }),
  v('w04-d2-06', 'extracurricular', 2, { partOfSpeech: 'adjective', definition: 'Additional to the standard curriculum, done outside class.', example: 'Extracurricular activities matter to admissions committees abroad.', synonyms: [['after-school', 'B2'], ['enrichment', 'C1']] }),
  v('w04-d2-07', 'vocational', 2, { partOfSpeech: 'adjective', definition: 'Connected to skills required for a particular trade.', example: 'Vocational courses bridge the gap between school and the workplace.', synonyms: [['trade-based', 'B2'], ['career-oriented', 'C1']] }),
  v('w04-d2-08', 'theoretical', 2, { partOfSpeech: 'adjective', definition: 'Concerned with ideas rather than practical experience.', example: 'A heavily theoretical course leaves graduates unprepared for real cases.', synonyms: [['conceptual', 'C1'], ['abstract', 'B2']] }),
  v('w04-d2-09', 'practical', 2, { partOfSpeech: 'adjective', definition: 'Concerned with real situations and the actual doing of something.', example: 'A short practical placement teaches what a year of theory cannot.', synonyms: [['hands-on', 'B2'], ['applied', 'C1']] }),
  v('w04-d2-10', 'interdisciplinary', 2, { partOfSpeech: 'adjective', definition: 'Involving two or more academic disciplines.', example: 'Climate science is interdisciplinary by necessity.', synonyms: [['cross-disciplinary', 'C1'], ['multi-disciplinary', 'C1']] }),

  // Day 3 — Teaching methods
  v('w04-d3-01', 'pedagogy', 3, { partOfSpeech: 'noun', definition: 'The method and practice of teaching.', example: 'Modern pedagogy moves away from rote learning.', synonyms: [['teaching method', 'B2'], ['educational theory', 'C1']] }),
  v('w04-d3-02', 'lecture-based', 3, { partOfSpeech: 'adjective', definition: 'Centred on a teacher speaking to a passive class.', example: 'Lecture-based courses suit motivated, independent learners.', synonyms: [['didactic', 'C1'], ['teacher-led', 'B2']] }),
  v('w04-d3-03', 'student-centred', 3, { partOfSpeech: 'adjective', definition: 'Designed around the needs and choices of the student.', example: 'A student-centred approach raises engagement at the cost of pace.', synonyms: [['learner-led', 'C1'], ['participatory', 'C1']] }),
  v('w04-d3-04', 'rote learning', 3, { partOfSpeech: 'phrase', definition: 'Memorising material without understanding it.', example: 'Rote learning helps with multiplication but fails with reasoning.', synonyms: [['memorisation', 'B2'], ['parrot learning', 'C1']] }),
  v('w04-d3-05', 'critical thinking', 3, { partOfSpeech: 'phrase', definition: 'The skill of analysing arguments and evidence carefully.', example: 'A class on critical thinking pays back in every essay later.', synonyms: [['analysis', 'B2'], ['independent thought', 'C1']] }),
  v('w04-d3-06', 'inquiry-based', 3, { partOfSpeech: 'adjective', definition: 'Driven by students asking and investigating questions.', example: 'Inquiry-based science classes produce deeper retention.', synonyms: [['investigative', 'C1'], ['question-led', 'C1']] }),
  v('w04-d3-07', 'flipped classroom', 3, { partOfSpeech: 'phrase', definition: 'A model where lectures are watched at home and class time is used for practice.', example: 'The flipped classroom relies on disciplined home preparation.', synonyms: [['inverted teaching', 'C1'], ['blended model', 'C1']] }),
  v('w04-d3-08', 'differentiation', 3, { partOfSpeech: 'noun', definition: 'Adapting teaching to the needs of different learners.', example: 'Differentiation is the hardest skill new teachers face.', synonyms: [['personalisation', 'C1'], ['tailored instruction', 'C1']] }),
  v('w04-d3-09', 'scaffold', 3, { partOfSpeech: 'verb', definition: 'To provide support that helps a learner reach a higher level.', example: 'Examiners reward writing that scaffolds its argument step by step.', synonyms: [['support', 'B1'], ['structure', 'B2']] }),
  v('w04-d3-10', 'feedback loop', 3, { partOfSpeech: 'phrase', definition: 'A repeating cycle of action, response, and adjustment.', example: 'A weekly feedback loop turns a writing class into a writing habit.', synonyms: [['review cycle', 'C1'], ['feedback cycle', 'B2']] }),

  // Day 4 — Assessment
  v('w04-d4-01', 'assessment', 4, { partOfSpeech: 'noun', definition: 'The evaluation of a student\'s work or ability.', example: 'Continuous assessment captures progress that one exam cannot.', synonyms: [['evaluation', 'B2'], ['appraisal', 'C1']] }),
  v('w04-d4-02', 'examination', 4, { partOfSpeech: 'noun', definition: 'A formal test of knowledge or ability.', example: 'Final examinations remain the dominant form of assessment in many systems.', synonyms: [['test', 'B1'], ['exam', 'B1']] }),
  v('w04-d4-03', 'grade', 4, { partOfSpeech: 'noun', definition: 'A mark showing the level of achievement.', example: 'A consistent grade across drafts matters more than one bright spot.', synonyms: [['mark', 'B2'], ['score', 'B2']] }),
  v('w04-d4-04', 'benchmark', 4, { partOfSpeech: 'noun', definition: 'A standard against which something can be measured.', example: 'A simulated test serves as a useful benchmark mid-course.', synonyms: [['standard', 'B2'], ['yardstick', 'C1']] }),
  v('w04-d4-05', 'criteria', 4, { partOfSpeech: 'noun', definition: 'Standards by which something is judged.', example: 'Marking criteria should be shared with students before the assignment.', synonyms: [['standards', 'B2'], ['rubric', 'C1']] }),
  v('w04-d4-06', 'rubric', 4, { partOfSpeech: 'noun', definition: 'A formal table describing criteria for grading.', example: 'A clear rubric makes feedback more actionable.', synonyms: [['marking scheme', 'C1'], ['guideline', 'B2']] }),
  v('w04-d4-07', 'objective', 4, { partOfSpeech: 'adjective', definition: 'Based on facts and not on personal opinion.', example: 'Multiple-choice questions provide an objective measure.', synonyms: [['impartial', 'C1'], ['unbiased', 'C1']] }),
  v('w04-d4-08', 'subjective', 4, { partOfSpeech: 'adjective', definition: 'Influenced by personal feelings and tastes.', example: 'Essay marking is partly subjective and so requires moderation.', synonyms: [['personal', 'B1'], ['biased', 'B2']] }),
  v('w04-d4-09', 'moderate', 4, { partOfSpeech: 'verb', definition: 'To check that grading is consistent across markers.', example: 'A second examiner moderates a sample of borderline scripts.', synonyms: [['standardise', 'C1'], ['cross-check', 'B2']] }),
  v('w04-d4-10', 'standardise', 4, { partOfSpeech: 'verb', definition: 'To make something conform to a standard.', example: 'The board standardises results across all regions.', synonyms: [['normalise', 'C1'], ['regulate', 'C1']] }),

  // Day 5 — Higher education
  v('w04-d5-01', 'undergraduate', 5, { partOfSpeech: 'noun', definition: 'A university student studying for a first degree.', example: 'Undergraduates outnumber postgraduates four to one in this faculty.', synonyms: [['student', 'B1'], ['first-degree student', 'B2']] }),
  v('w04-d5-02', 'postgraduate', 5, { partOfSpeech: 'noun', definition: 'A student doing further study after a first degree.', example: 'Postgraduate funding is the most common barrier to a doctorate.', synonyms: [['graduate student', 'B2'], ['masters/doctoral student', 'C1']] }),
  v('w04-d5-03', 'faculty', 5, { partOfSpeech: 'noun', definition: 'A department or group of departments in a university.', example: 'The faculty of arts has its own admissions cycle.', synonyms: [['department', 'B1'], ['school', 'B1']] }),
  v('w04-d5-04', 'enrolment', 5, { partOfSpeech: 'noun', definition: 'The act of becoming an officially registered student.', example: 'Enrolment fell five per cent during the pandemic year.', synonyms: [['registration', 'B2'], ['intake', 'C1']] }),
  v('w04-d5-05', 'tuition', 5, { partOfSpeech: 'noun', definition: 'Money paid for being taught.', example: 'Tuition fees in the UK are among the highest in Europe.', synonyms: [['school fees', 'B2'], ['instruction cost', 'C1']] }),
  v('w04-d5-06', 'scholarship', 5, { partOfSpeech: 'noun', definition: 'A grant of money to a student to support study.', example: 'A modest scholarship covered her living costs in the first year.', synonyms: [['bursary', 'C1'], ['grant', 'B2']] }),
  v('w04-d5-07', 'campus', 5, { partOfSpeech: 'noun', definition: 'The buildings and grounds of a university.', example: 'A walkable campus shapes student culture more than any committee can.', synonyms: [['college grounds', 'B2'], ['university premises', 'C1']] }),
  v('w04-d5-08', 'lecturer', 5, { partOfSpeech: 'noun', definition: 'A teacher at a university below the rank of professor.', example: 'A skilled lecturer can make even statistics gripping.', synonyms: [['teacher', 'B1'], ['academic', 'C1']] }),
  v('w04-d5-09', 'admission', 5, { partOfSpeech: 'noun', definition: 'The act of being allowed to enter a school or university.', example: 'Admission to the programme is competitive but transparent.', synonyms: [['acceptance', 'B2'], ['entry', 'B1']] }),
  v('w04-d5-10', 'alumnus', 5, { partOfSpeech: 'noun', definition: 'A former student of a particular school or university.', example: 'Successful alumni often fund the bursaries they once received.', synonyms: [['graduate', 'B2'], ['old student', 'B1']] }),

  // Day 6 — Learning outcomes
  v('w04-d6-01', 'retention', 6, { partOfSpeech: 'noun', definition: 'The ability to remember things learned.', example: 'Spaced review increases long-term retention by a measurable margin.', synonyms: [['recall', 'C1'], ['memory', 'B1']] }),
  v('w04-d6-02', 'comprehension', 6, { partOfSpeech: 'noun', definition: 'The ability to understand something.', example: 'Reading comprehension is the bottleneck for most weak essays.', synonyms: [['understanding', 'B1'], ['grasp', 'B2']] }),
  v('w04-d6-03', 'fluency', 6, { partOfSpeech: 'noun', definition: 'The ability to speak or write smoothly and clearly.', example: 'Fluency is built by quantity; accuracy by careful repetition.', synonyms: [['ease', 'B2'], ['articulacy', 'C1']] }),
  v('w04-d6-04', 'mastery', 6, { partOfSpeech: 'noun', definition: 'A complete understanding or skill in a subject.', example: 'Mastery of basics matters more than exposure to advanced topics.', synonyms: [['command', 'C1'], ['proficiency', 'C1']] }),
  v('w04-d6-05', 'progression', 6, { partOfSpeech: 'noun', definition: 'The movement to a more advanced level.', example: 'Steady weekly progression beats sudden bursts of effort.', synonyms: [['advancement', 'C1'], ['development', 'B2']] }),
  v('w04-d6-06', 'plateau', 6, { partOfSpeech: 'noun', definition: 'A period when progress stops at a particular level.', example: 'Most learners hit a plateau around band six and stay there.', synonyms: [['levelling-off', 'C1'], ['stagnation', 'C1']] }),
  v('w04-d6-07', 'breakthrough', 6, { partOfSpeech: 'noun', definition: 'A sudden important advance.', example: 'A real breakthrough usually follows weeks of unglamorous practice.', synonyms: [['leap forward', 'B2'], ['advance', 'B1']] }),
  v('w04-d6-08', 'aptitude', 6, { partOfSpeech: 'noun', definition: 'A natural skill or ability for learning something.', example: 'Aptitude opens the door; effort decides what is found inside.', synonyms: [['flair', 'C1'], ['talent', 'B2']] }),
  v('w04-d6-09', 'underachieve', 6, { partOfSpeech: 'verb', definition: 'To do less well than one is capable of.', example: 'Brilliant students sometimes underachieve when bored.', synonyms: [['fall short', 'B2'], ['underperform', 'C1']] }),
  v('w04-d6-10', 'attain', 6, { partOfSpeech: 'verb', definition: 'To succeed in achieving or reaching something.', example: 'A motivated learner can attain band seven in twelve weeks.', synonyms: [['achieve', 'B2'], ['reach', 'B1']] }),

  // Day 7 — Wider issues
  v('w04-d7-01', 'lifelong learning', 7, { partOfSpeech: 'phrase', definition: 'The continued pursuit of knowledge throughout life.', example: 'Lifelong learning has shifted from a slogan to a working assumption.', synonyms: [['continuing education', 'C1'], ['adult learning', 'B2']] }),
  v('w04-d7-02', 'literate society', 7, { partOfSpeech: 'phrase', definition: 'A society in which most adults can read and write.', example: 'A literate society raises a higher floor for democratic participation.', synonyms: [['educated population', 'B2'], ['lettered nation', 'C1']] }),
  v('w04-d7-03', 'inequality', 7, { partOfSpeech: 'noun', definition: 'Unequal access to or quality of resources.', example: 'Educational inequality persists across regions of the same country.', synonyms: [['disparity', 'C1'], ['imbalance', 'B2']] }),
  v('w04-d7-04', 'access', 7, { partOfSpeech: 'noun', definition: 'The right or opportunity to use or obtain something.', example: 'Access to quality teaching matters more than access to expensive tools.', synonyms: [['availability', 'B2'], ['entry', 'B1']] }),
  v('w04-d7-05', 'subsidy', 7, { partOfSpeech: 'noun', definition: 'Money paid by the government to reduce the cost of something.', example: 'A modest subsidy keeps tuition affordable for low-income families.', synonyms: [['grant', 'B2'], ['financial aid', 'B2']] }),
  v('w04-d7-06', 'funding', 7, { partOfSpeech: 'noun', definition: 'Money provided to support a project or institution.', example: 'Public funding for the arts has fallen for a decade.', synonyms: [['financing', 'B2'], ['investment', 'B2']] }),
  v('w04-d7-07', 'reform', 7, { partOfSpeech: 'noun', definition: 'A change made to improve a system or institution.', example: 'A long-overdue reform of the marking system arrived this year.', synonyms: [['overhaul', 'C1'], ['restructuring', 'C1']] }),
  v('w04-d7-08', 'autonomy', 7, { partOfSpeech: 'noun', definition: 'The freedom of an institution to make its own decisions.', example: 'Schools with greater autonomy report higher staff retention.', synonyms: [['independence', 'B2'], ['self-governance', 'C1']] }),
  v('w04-d7-09', 'rote', 7, { partOfSpeech: 'adjective', definition: 'Done by memory without understanding.', example: 'A rote answer rarely earns a band-seven mark.', synonyms: [['memorised', 'B2'], ['mechanical', 'C1']] }),
  v('w04-d7-10', 'meritocracy', 7, { partOfSpeech: 'noun', definition: 'A system in which people advance by ability and effort.', example: 'A true meritocracy in education would equalise opportunity, not outcome.', synonyms: [['fair system', 'B2'], ['rule by merit', 'C1']] }),
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
    topic: input.topic ?? 'education',
    frequency: input.frequency ?? 'high',
    synonyms: input.synonyms.map(([word, register, nuance]) => ({
      word,
      register,
      ...(nuance ? { nuance } : {}),
    })),
    level: 'intermediate',
    week: 4,
    day,
  }
}

export const INTERMEDIATE_VOCAB_WEEK_04: VocabularyLexiconItem[] = items
