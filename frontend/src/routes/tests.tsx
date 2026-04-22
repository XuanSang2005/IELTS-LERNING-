import { createFileRoute, Outlet, useRouterState } from '@tanstack/react-router'
import { AppNav } from '@/features/practice/components/AppNav'

export const Route = createFileRoute('/tests')({
  component: TestsLayout,
})

function TestsLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const isRunner = pathname !== '/tests' && !pathname.endsWith('/results')
  return (
    <div className="min-h-screen bg-ivory">
      {!isRunner && <AppNav />}
      <Outlet />
    </div>
  )
}
