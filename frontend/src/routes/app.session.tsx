import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/app/session')({
  component: SessionLayout,
})

function SessionLayout() {
  return <Outlet />
}
