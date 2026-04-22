import { createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'
import { AuthShell } from '@/features/auth/components/AuthShell'
import { LoginForm } from '@/features/auth/components/LoginForm'
import { useAuthStore } from '@/stores/auth-store'

const loginSearchSchema = z.object({
  redirect: z.string().optional().catch(undefined),
})

export const Route = createFileRoute('/login')({
  component: LoginPage,
  validateSearch: loginSearchSchema,
  beforeLoad: () => {
    if (useAuthStore.getState().token) {
      throw redirect({ to: '/app' })
    }
  },
})

function LoginPage() {
  const { redirect: redirectParam } = Route.useSearch()
  const redirectTo = redirectParam && redirectParam.startsWith('/') ? redirectParam : '/app'

  return (
    <AuthShell
      eyebrow="FIG. 01 — ENTRY"
      headingLead="Welcome"
      headingItalic="back"
      headingTail="."
      quote="The library remembers every item you've noticed. Return, and the programme continues where you left it."
      attribution="— EDITORIAL NOTE, VOL. IV"
    >
      <LoginForm redirectTo={redirectTo} />
    </AuthShell>
  )
}
