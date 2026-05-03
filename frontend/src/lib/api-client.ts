import { useAuthStore } from '@/stores/auth-store'
import { env } from './env'

export class ApiError extends Error {
  status: number
  statusText: string
  body: unknown

  constructor(status: number, statusText: string, body: unknown) {
    super(`API ${status} ${statusText}`)
    this.name = 'ApiError'
    this.status = status
    this.statusText = statusText
    this.body = body
  }
}

function redirectToLogin() {
  useAuthStore.getState().clear()
  if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
    const redirectTo = encodeURIComponent(window.location.pathname + window.location.search)
    window.location.href = `/login?redirect=${redirectTo}`
  }
}

// Singleton in-flight refresh — concurrent 401s share one /auth/refresh call.
let inFlightRefresh: Promise<string | null> | null = null

async function refreshAccessToken(): Promise<string | null> {
  if (inFlightRefresh) return inFlightRefresh
  const refreshToken = useAuthStore.getState().refreshToken
  if (!refreshToken) return null

  inFlightRefresh = (async () => {
    try {
      const res = await fetch(`${env.VITE_API_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ refreshToken }),
      })
      if (!res.ok) return null
      const data = (await res.json()) as { token: string; refreshToken: string }
      if (typeof data?.token !== 'string' || typeof data?.refreshToken !== 'string') return null
      useAuthStore.getState().setTokens({ token: data.token, refreshToken: data.refreshToken })
      return data.token
    } catch {
      return null
    } finally {
      inFlightRefresh = null
    }
  })()

  return inFlightRefresh
}

interface FetchOpts extends RequestInit {
  /** Internal: prevents infinite refresh loops. */
  _retried?: boolean
}

export async function apiFetch<T>(path: string, init: FetchOpts = {}): Promise<T> {
  const url = path.startsWith('http') ? path : `${env.VITE_API_URL}${path}`

  const headers = new Headers(init.headers)
  if (!headers.has('Content-Type') && init.body && typeof init.body === 'string') {
    headers.set('Content-Type', 'application/json')
  }
  headers.set('Accept', 'application/json')

  const token = useAuthStore.getState().token
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const res = await fetch(url, { ...init, headers })

  const contentType = res.headers.get('content-type') ?? ''
  const payload =
    res.status === 204
      ? null
      : contentType.includes('application/json')
        ? await res.json()
        : await res.text()

  if (res.status === 401) {
    // Don't try to refresh on the refresh endpoint itself, or if we already retried.
    const isAuthEndpoint = path.startsWith('/auth/refresh') || path.startsWith('/auth/login')
    if (!init._retried && !isAuthEndpoint) {
      const fresh = await refreshAccessToken()
      if (fresh) {
        return apiFetch<T>(path, { ...init, _retried: true })
      }
    }
    redirectToLogin()
    throw new ApiError(401, res.statusText, payload)
  }

  if (!res.ok) {
    throw new ApiError(res.status, res.statusText, payload)
  }

  return payload as T
}
