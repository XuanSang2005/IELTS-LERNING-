import { z } from 'zod'

export const FamilySchema = z.enum(['I', 'II', 'III', 'IV', 'V'])
export type Family = z.infer<typeof FamilySchema>

export const FAMILY_META: Record<Family, { numeral: string; name: string; tagline: string }> = {
  I: {
    numeral: 'VOL. I',
    name: 'Translations Literal',
    tagline: 'The Vietnamese sentence, in English dress.',
  },
  II: {
    numeral: 'VOL. II',
    name: 'False Cognates',
    tagline: 'Familiar on the tongue, foreign in meaning.',
  },
  III: {
    numeral: 'VOL. III',
    name: 'Phantom Collocations',
    tagline: 'A pairing the ear invents, the page rejects.',
  },
  IV: {
    numeral: 'VOL. IV',
    name: 'Register Drift',
    tagline: 'A casual word in a formal room.',
  },
  V: {
    numeral: 'VOL. V',
    name: 'Structural Echoes',
    tagline: 'Vietnamese syntax, transcribed verbatim.',
  },
}

export const SpecimenSchema = z.object({
  plate: z.number().int().positive(),
  family: FamilySchema,
  wrong: z.string().min(1),
  right: z.string().min(1),
  note: z.string().min(1),
  frequency: z.number().int().min(1).max(5),
  bandCost: z.number().min(0).max(1),
  seeAlso: z.array(z.number().int().positive()).default([]),
})
export type Specimen = z.infer<typeof SpecimenSchema>

export const AtlasVolumeSchema = z.object({
  volume: z.number().int().min(1),
  specimens: z.array(SpecimenSchema).min(1),
})
export type AtlasVolume = z.infer<typeof AtlasVolumeSchema>

export const FamilyFilterSchema = z.union([z.literal('all'), FamilySchema])
export type FamilyFilter = z.infer<typeof FamilyFilterSchema>
