import { createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'
import { AuthShell } from '@/features/auth/components/AuthShell'
import { SignupForm } from '@/features/auth/components/SignupForm'
import { useAuthStore } from '@/stores/auth-store'

const signupSearchSchema = z.object({
  redirect: z.string().optional().catch(undefined),
})

export const Route = createFileRoute('/signup')({
  component: SignupPage,
  validateSearch: signupSearchSchema,
  beforeLoad: () => {
    if (useAuthStore.getState().token) {
      throw redirect({ to: '/app' })
    }
  },
})

function SignupPage() {
  const { redirect: redirectParam } = Route.useSearch()
  const redirectTo = redirectParam && redirectParam.startsWith('/') ? redirectParam : '/app'

  return (
    <AuthShell
      eyebrow="FIG. 01 — ADMISSION"
      headingLead="Begin"
      headingItalic="here"
      headingTail="."
      quote="Seven days. Three loops. Full access. Meridian begins with a test, and continues with a programme."
      attribution="— THE METHOD, CH. I"
    >
      <SignupForm redirectTo={redirectTo} />
    </AuthShell>
  )
}
