import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { AuthResponseSchema, type AuthResponse, type User } from '@shared/schemas/auth'

interface AuthState {
  token: string | null
  refreshToken: string | null
  user: User | null
  setAuth: (auth: AuthResponse) => void
  setTokens: (tokens: { token: string; refreshToken: string }) => void
  clear: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      user: null,
      setAuth: ({ token, refreshToken, user }) => set({ token, refreshToken, user }),
      setTokens: ({ token, refreshToken }) => set({ token, refreshToken }),
      clear: () => set({ token: null, refreshToken: null, user: null }),
    }),
    {
      name: 'meridian-auth-v1',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ token: s.token, refreshToken: s.refreshToken, user: s.user }),
      merge: (persisted, current) => {
        if (!persisted || typeof persisted !== 'object') return current
        const c = persisted as { token?: unknown; refreshToken?: unknown; user?: unknown }
        if (typeof c.token !== 'string' || !c.user) return current
        // Backward compat: older persisted state had no refreshToken. Allow
        // it to merge; the next 401 will simply force a fresh login.
        const refreshToken = typeof c.refreshToken === 'string' ? c.refreshToken : ''
        const parsed = AuthResponseSchema.safeParse({
          token: c.token,
          refreshToken,
          user: c.user,
        })
        if (!parsed.success) return current
        return {
          ...current,
          token: parsed.data.token,
          refreshToken: refreshToken || null,
          user: parsed.data.user,
        }
      },
    },
  ),
)
