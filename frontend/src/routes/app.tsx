import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { AppNav } from '@/features/practice/components/AppNav'
import { useAuthStore } from '@/stores/auth-store'

export const Route = createFileRoute('/app')({
  component: AppLayout,
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

function AppLayout() {
  return (
    <div className="min-h-screen bg-ivory">
      <AppNav />
      <Outlet />
    </div>
  )
}
