import type { CollocationLexiconItem } from '@shared/schemas/lexicon-items'

/**
 * Intermediate · Week 03 · Workplace chunks.
 * 49 items across 7 days. Meeting agendas, deadlines, deliverables —
 * the natural language of office life that slips into Speaking and Writing.
 */

const items: CollocationLexiconItem[] = [
  // Day 1 — Meetings
  c('w03-d1-01', 'hold a meeting', 1, 'verb-noun', 'arrange and lead a meeting', 'The committee holds a meeting once every fortnight.', ['call a meeting', 'convene a meeting']),
  c('w03-d1-02', 'attend a meeting', 1, 'verb-noun', 'be present at a meeting', 'All managers were expected to attend the quarterly review.', ['be present at', 'go to']),
  c('w03-d1-03', 'set the agenda', 1, 'verb-noun', 'decide the topics to be discussed', 'A clear agenda halves the length of the meeting.', ['draw up an agenda', 'plan the agenda']),
  c('w03-d1-04', 'take minutes', 1, 'verb-noun', 'record what is said in a meeting', 'A junior staff member took minutes throughout the discussion.', ['record proceedings', 'note down']),
  c('w03-d1-05', 'reach a consensus', 1, 'verb-noun', 'arrive at a general agreement', 'After two hours the team reached a consensus on the launch date.', ['come to agreement', 'find common ground']),
  c('w03-d1-06', 'raise a concern', 1, 'verb-noun', 'bring up a worry for discussion', 'A junior engineer raised a valid concern about timing.', ['voice a concern', 'flag a worry']),
  c('w03-d1-07', 'wrap up a meeting', 1, 'verb-noun', 'conclude a meeting', 'The chair wrapped up the meeting ten minutes early.', ['close a meeting', 'conclude proceedings']),

  // Day 2 — Email & correspondence
  c('w03-d2-01', 'send a follow-up', 2, 'verb-noun', 'write a second message to remind or continue', 'A polite follow-up after three days usually gets a reply.', ['send a reminder', 'check in']),
  c('w03-d2-02', 'reply promptly', 2, 'verb-adverb', 'respond without delay', 'A team that replies promptly earns the trust of clients.', ['answer quickly', 'respond at once']),
  c('w03-d2-03', 'attach a document', 2, 'verb-noun', 'include a file with an email', 'I have attached the latest draft for your review.', ['append a file', 'include a document']),
  c('w03-d2-04', 'CC someone', 2, 'verb-noun', 'send a copy of an email to another person', 'Please CC the project manager on all client correspondence.', ['copy in', 'include in copy']),
  c('w03-d2-05', 'flag an email', 2, 'verb-noun', 'mark an email as important', 'I flagged the budget memo for action this morning.', ['highlight an email', 'star an email']),
  c('w03-d2-06', 'circulate a memo', 2, 'verb-noun', 'send a written message to all relevant people', 'The CEO circulates a memo before any major change.', ['distribute a memo', 'send round']),
  c('w03-d2-07', 'sign off on', 2, 'verb-preposition', 'give final approval to', 'The director signed off on the contract this morning.', ['approve', 'authorise']),

  // Day 3 — Deadlines & deliverables
  c('w03-d3-01', 'meet a deadline', 3, 'verb-noun', 'finish work by the agreed time', 'Meeting a deadline matters more than perfecting one document.', ['hit a deadline', 'achieve a deadline']),
  c('w03-d3-02', 'miss a deadline', 3, 'verb-noun', 'fail to finish on time', 'Missing a deadline once is forgivable; missing two is a pattern.', ['overshoot a deadline', 'be late']),
  c('w03-d3-03', 'extend a deadline', 3, 'verb-noun', 'give more time to complete something', 'The supervisor extended the deadline by a week.', ['push back', 'postpone']),
  c('w03-d3-04', 'work to a tight deadline', 3, 'verb-preposition', 'complete work under significant time pressure', 'They worked to a tight deadline for the trade fair.', ['race against time', 'be under pressure']),
  c('w03-d3-05', 'deliver on time', 3, 'verb-preposition', 'provide a result by the agreed date', 'Reliable consultants deliver on time, even when scope shifts.', ['be punctual', 'meet the schedule']),
  c('w03-d3-06', 'fall behind schedule', 3, 'verb-noun', 'progress more slowly than planned', 'The site fell behind schedule after the rains.', ['lag', 'be delayed']),
  c('w03-d3-07', 'deliver the goods', 3, 'verb-noun', 'produce the result that was promised', 'A short trial showed she could deliver the goods.', ['perform', 'produce results']),

  // Day 4 — Career moves
  c('w03-d4-01', 'apply for a position', 4, 'verb-preposition', 'send a formal application for a job', 'She applied for the analyst position last Monday.', ['put in for', 'submit application']),
  c('w03-d4-02', 'land a job', 4, 'verb-noun', 'succeed in getting a job', 'He landed a job at the firm three weeks after graduation.', ['secure a job', 'get hired']),
  c('w03-d4-03', 'get promoted', 4, 'verb', 'be raised to a higher position', 'She got promoted to head of section after only two years.', ['be elevated', 'move up']),
  c('w03-d4-04', 'change careers', 4, 'verb-noun', 'move into a different profession', 'Changing careers in your forties is harder than people pretend.', ['switch careers', 'pivot']),
  c('w03-d4-05', 'hand in a resignation', 4, 'verb-noun', 'formally tell an employer you are leaving', 'He handed in a resignation the day after his bonus arrived.', ['quit', 'tender a resignation']),
  c('w03-d4-06', 'work your way up', 4, 'verb-preposition', 'progress in a career through your own effort', 'She worked her way up from a part-time role to the board.', ['climb the ladder', 'rise through the ranks']),
  c('w03-d4-07', 'climb the corporate ladder', 4, 'verb-noun', 'progress steadily in a corporate career', 'Climbing the corporate ladder consumed her thirties.', ['rise through the ranks', 'work your way up']),

  // Day 5 — Productivity
  c('w03-d5-01', 'boost productivity', 5, 'verb-noun', 'increase output or efficiency', 'A short walk after lunch boosts productivity more than coffee.', ['raise output', 'lift efficiency']),
  c('w03-d5-02', 'streamline a process', 5, 'verb-noun', 'make a process simpler and faster', 'They streamlined the procurement process in three weeks.', ['simplify a process', 'optimise']),
  c('w03-d5-03', 'cut corners', 5, 'verb-noun', 'do something the cheapest or quickest way', 'Cutting corners on quality control rarely ends well.', ['take shortcuts', 'skimp']),
  c('w03-d5-04', 'multitask effectively', 5, 'verb-adverb', 'handle several tasks at once with success', 'Few people multitask effectively; most simply switch quickly.', ['juggle tasks', 'handle parallel work']),
  c('w03-d5-05', 'manage your time', 5, 'verb-noun', 'plan how to use your time well', 'Senior staff manage their time; junior staff are managed by it.', ['schedule yourself', 'plan your day']),
  c('w03-d5-06', 'set priorities', 5, 'verb-noun', 'decide what is most important', 'Setting priorities at the start of the week saves it from collapse.', ['rank tasks', 'prioritise']),
  c('w03-d5-07', 'fall behind on work', 5, 'verb-preposition', 'be late on the work expected', 'Two days off the grid and I had fallen behind on emails.', ['get backed up', 'pile up']),

  // Day 6 — Working culture
  c('w03-d6-01', 'work overtime', 6, 'verb-noun', 'work beyond normal hours', 'Working overtime three nights a week is unsustainable.', ['put in extra hours', 'work late']),
  c('w03-d6-02', 'take a sick day', 6, 'verb-noun', 'be absent from work due to illness', 'I took a sick day and slept for ten hours.', ['call in sick', 'be off ill']),
  c('w03-d6-03', 'request annual leave', 6, 'verb-noun', 'formally apply for paid time off', 'She requested annual leave for two weeks in August.', ['book holiday', 'take time off']),
  c('w03-d6-04', 'work from home', 6, 'verb-preposition', 'do your job in your own residence', 'Working from home suits some roles and ruins others.', ['telecommute', 'work remotely']),
  c('w03-d6-05', 'commute to work', 6, 'verb-preposition', 'travel regularly to work', 'I commute to work by metro because driving costs more time.', ['travel to work', 'go in']),
  c('w03-d6-06', 'maintain a work-life balance', 6, 'verb-noun', 'keep healthy proportions between work and personal time', 'Maintaining a work-life balance is the difference between staying ten years and leaving in two.', ['balance work and life', 'keep things in proportion']),
  c('w03-d6-07', 'take early retirement', 6, 'verb-noun', 'stop working before the usual age', 'He took early retirement and turned a hobby into a small business.', ['retire early', 'leave the workforce']),

  // Day 7 — Performance
  c('w03-d7-01', 'meet expectations', 7, 'verb-noun', 'reach the level that was hoped for', 'The product met expectations on speed but not on price.', ['live up to', 'fulfil']),
  c('w03-d7-02', 'exceed expectations', 7, 'verb-noun', 'do more than was hoped for', 'Her dissertation exceeded expectations and won a prize.', ['surpass', 'go beyond']),
  c('w03-d7-03', 'fall short of expectations', 7, 'verb-noun', 'fail to reach the expected level', 'The product fell short of expectations on customer service.', ['under-deliver', 'disappoint']),
  c('w03-d7-04', 'receive feedback', 7, 'verb-noun', 'be given comments on your work', 'She receives feedback after every draft, not at the end.', ['be given feedback', 'be assessed']),
  c('w03-d7-05', 'give constructive feedback', 7, 'verb-noun', 'offer comments that help someone improve', 'A senior teacher gives constructive feedback on three points, not thirty.', ['offer guidance', 'critique helpfully']),
  c('w03-d7-06', 'undergo a performance review', 7, 'verb-noun', 'be formally evaluated at work', 'Each engineer undergoes a performance review every six months.', ['be appraised', 'be assessed']),
  c('w03-d7-07', 'be on track', 7, 'verb-preposition', 'progress as planned towards a goal', 'We are on track for the November launch.', ['be on schedule', 'be on course']),
]

function c(
  shortId: string,
  phrase: string,
  day: 1 | 2 | 3 | 4 | 5 | 6 | 7,
  pattern: CollocationLexiconItem['pattern'],
  definition: string,
  example: string,
  alternatives: string[],
  register: CollocationLexiconItem['register'] = 'B2',
): CollocationLexiconItem {
  return {
    discipline: 'collocations',
    id: `int-colloc-${shortId}`,
    phrase,
    pattern,
    definition,
    example,
    register,
    topic: 'workplace',
    alternatives,
    level: 'intermediate',
    week: 3,
    day,
  }
}

export const INTERMEDIATE_COLLOC_WEEK_03: CollocationLexiconItem[] = items
