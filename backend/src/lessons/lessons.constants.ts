// Mongoose model tokens for each per-discipline lessons collection. The
// LessonsService maps `Discipline` to one of these models so a single
// LessonDocument schema serves four physical collections.
export const GRAMMAR_LESSON = 'GrammarLesson'
export const VOCABULARY_LESSON = 'VocabularyLesson'
export const COLLOCATION_LESSON = 'CollocationLesson'
export const LINKING_LESSON = 'LinkingLesson'
