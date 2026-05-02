import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import type { PracticeStateShape } from '@shared/schemas/practice'
import { AppNav } from '@/features/practice/components/AppNav'
import { apiFetch } from '@/lib/api-client'
import { practiceStateKey } from '@/features/practice/hooks/practice-queries'
import { useAuthStore } from '@/stores/auth-store'

export const Route = createFileRoute('/app')({
  component: AppLayout,
  beforeLoad: async ({ location, context }) => {
    const { token } = useAuthStore.getState()
    if (!token) {
      throw redirect({
        to: '/login',
        search: { redirect: location.pathname + location.searchStr },
      })
    }

    // Diagnostic gate — first-time users must complete or explicitly skip.
    // Use the existing query cache via the router context so subsequent
    // /app/* navigations don't re-fetch.
    try {
      const state = await context.queryClient.ensureQueryData<PracticeStateShape>({
        queryKey: practiceStateKey,
        queryFn: () => apiFetch<PracticeStateShape>('/practice/state'),
        staleTime: 60_000,
      })
      const completed = state.profile.diagnosticCompletedAt ?? null
      const skipped = state.profile.diagnosticSkippedAt ?? null
      if (!completed && !skipped) {
        throw redirect({ to: '/onboarding/diagnostic' })
      }
    } catch (err) {
      // Re-throw redirects; swallow other errors so the app still loads in
      // degraded mode (the dashboard will show its own loading/error UI).
      if (err && typeof err === 'object' && 'isRedirect' in err) throw err
    }
  },
})

function AppLayout() {
  return (
    <div className="min-h-screen bg-ivory">
      <AppNav />
      <Outlet />
    </div>
  )
}
