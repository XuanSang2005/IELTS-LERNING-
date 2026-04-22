import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.string().url().default('http://localhost:4000'),
})

const parsed = envSchema.safeParse(import.meta.env)

if (!parsed.success) {
  console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors)
  throw new Error('Invalid environment variables. See console for details.')
}

export const env = parsed.data
