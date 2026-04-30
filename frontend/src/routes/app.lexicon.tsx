import { createFileRoute, Outlet } from '@tanstack/react-router'

// Layout route for /app/lexicon. Must render <Outlet /> so child routes
// (app.lexicon.index for the roadmap, app.lexicon.$week for the week page)
// mount correctly.
export const Route = createFileRoute('/app/lexicon')({
  component: LexiconLayout,
})

function LexiconLayout() {
  return <Outlet />
}
