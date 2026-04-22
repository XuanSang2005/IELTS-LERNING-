// Mongoose model tokens for the per-discipline physical collections.
// Lives in its own file to avoid a circular import between the service
// (which uses the tokens via @InjectModel) and the module (which provides
// them via MongooseModule.forFeature).
export const GRAMMAR_LESSON = 'GrammarLesson'
export const VOCABULARY_LESSON = 'VocabularyLesson'
export const COLLOCATIONS_LESSON = 'CollocationsLesson'
export const LINKING_LESSON = 'LinkingLesson'
