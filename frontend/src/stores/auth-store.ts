import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { AuthResponseSchema, type AuthResponse, type User } from '@shared/schemas/auth'

interface AuthState {
  token: string | null
  user: User | null
  setAuth: (auth: AuthResponse) => void
  clear: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: ({ token, user }) => set({ token, user }),
      clear: () => set({ token: null, user: null }),
    }),
    {
      name: 'meridian-auth-v1',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ token: s.token, user: s.user }),
      merge: (persisted, current) => {
        if (!persisted || typeof persisted !== 'object') return current
        const candidate = persisted as { token?: unknown; user?: unknown }
        if (typeof candidate.token !== 'string' || !candidate.user) return current
        const parsed = AuthResponseSchema.safeParse({
          token: candidate.token,
          user: candidate.user,
        })
        if (!parsed.success) return current
        return { ...current, token: parsed.data.token, user: parsed.data.user }
      },
    },
  ),
)
