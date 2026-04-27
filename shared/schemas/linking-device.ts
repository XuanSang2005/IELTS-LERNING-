import { z } from 'zod'
import { LessonRegisterSchema } from './lesson'

/**
 * The semantic role a linking device plays in discourse. Aligns with the
 * Cambridge band-descriptor cohesion taxonomy so candidates can map a
 * function to a band-7 connector without leaving the lexicon.
 */
export const LinkingFunctionSchema = z.enum([
  'addition', // moreover, furthermore, in addition
  'contrast', // however, in contrast, on the other hand
  'cause', // because, owing to, due to
  'effect', // therefore, consequently, as a result
  'concession', // although, despite, while
  'exemplification', // for instance, namely, in particular
  'sequence', // firstly, subsequently, finally
  'summary', // in conclusion, overall, to sum up
])
export type LinkingFunction = z.infer<typeof LinkingFunctionSchema>

/**
 * Where in a clause the linker most naturally sits. A device can support more
 * than one position; the array communicates flexibility to the candidate.
 */
export const LinkingPositionSchema = z.enum(['initial', 'medial', 'final'])
export type LinkingPosition = z.infer<typeof LinkingPositionSchema>

export const LinkingDeviceSchema = z.object({
  id: z.string().min(1),
  /** The linker phrase, normalised lower-case unless a proper noun. */
  phrase: z.string().min(1),
  /** Discourse function — single-valued; if a device serves two, seed twice. */
  function: LinkingFunctionSchema,
  /** Register signal: B1 connectors are everyday; C1 are formal/academic. */
  register: LessonRegisterSchema,
  /** Positions the device is grammatical in. Always at least one. */
  positions: z.array(LinkingPositionSchema).min(1),
  /** Examiner-grade example sentence using the device. */
  example: z.string().min(1),
  /** Optional caveat — e.g. "always followed by a clause", "comma required". */
  note: z.string().optional(),
})
export type LinkingDevice = z.infer<typeof LinkingDeviceSchema>
