import type { AuthResponse, LoginDto, SignupDto, User } from '@shared/schemas/auth'
import type { PracticeStateShape } from '@shared/schemas/practice'
import { PracticeStateSchema } from '@shared/schemas/practice'
import { apiFetch, ApiError } from './api-client'
import { useAuthStore } from '@/stores/auth-store'

const LEGACY_PRACTICE_KEY = 'meridian-practice-v1'

/** Maps raw errors into the editorial copy dictated by CLAUDE.md + the auth spec. */
export function authErrorCopy(err: unknown, mode: 'login' | 'signup'): string {
  if (err instanceof ApiError) {
    if (err.status === 400 || err.status === 422)
      return 'Check the form above. Something is not quite right.'
    if (err.status === 401) return 'The email and password do not match.'
    if (err.status === 404 && mode === 'login')
      return 'The email and password do not match.'
    if (err.status === 409)
      return 'That email is already in the programme. Log in instead?'
    if (err.status === 429) return 'Too many attempts. Rest for a minute.'
    if (err.status >= 500) return "Something went wrong on our side. We've noted it."
  }
  return 'The signal is weak. Try again in a moment.'
}

export async function login(dto: LoginDto): Promise<AuthResponse> {
  // TODO(backend-swap): single call site — change URL or contract here.
  return apiFetch<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(dto),
  })
}

export async function signup(dto: SignupDto): Promise<AuthResponse> {
  // TODO(backend-swap): backend currently exposes /auth/register; rename if desired.
  return apiFetch<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(dto),
  })
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    return await apiFetch<User>('/auth/me')
  } catch {
    return null
  }
}

export async function logout(): Promise<void> {
  const refreshToken = useAuthStore.getState().refreshToken
  // Best-effort revoke. We always clear local state regardless of network result.
  if (refreshToken) {
    try {
      await apiFetch<void>('/auth/logout', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      })
    } catch {
      // Ignore — local clear below still happens.
    }
  }
  useAuthStore.getState().clear()
  if (typeof window !== 'undefined') {
    localStorage.removeItem(LEGACY_PRACTICE_KEY)
  }
}

/**
 * One-time migration: if the legacy Zustand-persisted practice state exists in
 * localStorage, POST it to /practice/import and remove the key so the migration
 * never runs twice. Silently skips invalid payloads.
 */
export async function migrateLocalPracticeIfPresent(): Promise<
  | { migrated: true; imported: { items: number; errors: number; logs: number } }
  | { migrated: false }
> {
  if (typeof window === 'undefined') return { migrated: false }
  const raw = localStorage.getItem(LEGACY_PRACTICE_KEY)
  if (!raw) return { migrated: false }
  try {
    const parsed = JSON.parse(raw) as { state?: unknown }
    const statePayload = parsed?.state ?? parsed
    const validated = PracticeStateSchema.safeParse(statePayload)
    if (!validated.success) {
      localStorage.removeItem(LEGACY_PRACTICE_KEY)
      return { migrated: false }
    }
    const res = await apiFetch<{ imported: { items: number; errors: number; logs: number } }>(
      '/practice/import',
      {
        method: 'POST',
        body: JSON.stringify(validated.data satisfies PracticeStateShape),
      },
    )
    localStorage.removeItem(LEGACY_PRACTICE_KEY)
    return { migrated: true, imported: res.imported }
  } catch {
    return { migrated: false }
  }
}
