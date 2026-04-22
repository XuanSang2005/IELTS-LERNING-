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
  // Use full navigation so route guards re-evaluate cleanly.
  if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
    const redirectTo = encodeURIComponent(window.location.pathname + window.location.search)
    window.location.href = `/login?redirect=${redirectTo}`
  }
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
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
  const payload = contentType.includes('application/json') ? await res.json() : await res.text()

  if (res.status === 401) {
    redirectToLogin()
    throw new ApiError(401, res.statusText, payload)
  }

  if (!res.ok) {
    throw new ApiError(res.status, res.statusText, payload)
  }

  return payload as T
}
