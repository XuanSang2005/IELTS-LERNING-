import { createFileRoute, Outlet } from '@tanstack/react-router'

// Layout route for /app/grammar. Must render <Outlet /> so the child route
// (app.grammar.$week) can mount — without it, navigating to /app/grammar/10
// still renders only this parent and the child never appears.
export const Route = createFileRoute('/app/grammar')({
  component: GrammarLayout,
})

function GrammarLayout() {
  return <Outlet />
}
