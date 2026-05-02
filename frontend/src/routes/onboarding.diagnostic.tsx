import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'

export const Route = createFileRoute('/onboarding/diagnostic')({
  component: DiagnosticLayout,
  beforeLoad: ({ location }) => {
    const { token } = useAuthStore.getState()
    if (!token) {
      throw redirect({
        to: '/login',
        search: { redirect: location.pathname + location.searchStr },
      })
    }
  },
})

function DiagnosticLayout() {
  return (
    <div className="min-h-screen bg-ivory">
      <Outlet />
    </div>
  )
}
