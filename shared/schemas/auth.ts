import { z } from 'zod'

export const SignupDtoSchema = z.object({
  name: z.string().min(1, 'Required').max(80),
  email: z.string().email('Not a valid email'),
  password: z
    .string()
    .min(8, 'At least eight characters')
    .max(72, 'Fewer than seventy-two characters'),
})
export type SignupDto = z.infer<typeof SignupDtoSchema>

// Legacy alias — kept so older imports don't break.
export const RegisterDtoSchema = SignupDtoSchema
export type RegisterDto = SignupDto

export const LoginDtoSchema = z.object({
  email: z.string().email('Not a valid email'),
  password: z.string().min(1, 'Required'),
})
export type LoginDto = z.infer<typeof LoginDtoSchema>

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  trialEndsAt: z.string().nullable(),
  isPro: z.boolean(),
})
export type User = z.infer<typeof UserSchema>

// Legacy alias.
export const AuthUserSchema = UserSchema
export type AuthUser = User

export const AuthResponseSchema = z.object({
  token: z.string(),
  refreshToken: z.string(),
  user: UserSchema,
})
export type AuthResponse = z.infer<typeof AuthResponseSchema>

export const RefreshDtoSchema = z.object({
  refreshToken: z.string().min(1, 'Required'),
})
export type RefreshDto = z.infer<typeof RefreshDtoSchema>

export const LogoutDtoSchema = z.object({
  refreshToken: z.string().min(1, 'Required'),
})
export type LogoutDto = z.infer<typeof LogoutDtoSchema>
