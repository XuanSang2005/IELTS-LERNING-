import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/app/notebook')({
  beforeLoad: () => {
    throw redirect({ to: '/app' })
  },
  component: () => null,
})
