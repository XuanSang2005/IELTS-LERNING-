// Mongoose model tokens for the per-skill physical collections.
// Lives in its own file to avoid a circular import between the service
// (which uses the tokens via @InjectModel) and the module (which provides
// them via MongooseModule.forFeature).
export const LISTENING_TEST = 'ListeningTest'
export const READING_TEST = 'ReadingTest'
export const WRITING_TEST = 'WritingTest'
export const SPEAKING_TEST = 'SpeakingTest'
