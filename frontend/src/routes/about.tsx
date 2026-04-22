import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold text-slate-900">About</h1>
      <p className="text-slate-700">
        This is a placeholder route to prove TanStack Router navigation works without a full page
        reload.
      </p>
    </section>
  )
}
