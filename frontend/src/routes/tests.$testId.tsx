import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/tests/$testId')({
  component: TestIdLayout,
})

function TestIdLayout() {
  return <Outlet />
}
