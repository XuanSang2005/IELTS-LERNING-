import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { Link } from '@tanstack/react-router'
import { LoginDtoSchema } from '@shared/schemas/auth'
import { useAuthStore } from '@/stores/auth-store'
import { authErrorCopy, login, migrateLocalPracticeIfPresent } from '@/lib/auth'
import { AuthInput } from './AuthInput'
import { AuthSubmit } from './AuthSubmit'
import { FormErrorNote } from './FormErrorNote'

interface LoginFormProps {
  redirectTo: string
}

export function LoginForm({ redirectTo }: LoginFormProps) {
  const setAuth = useAuthStore((s) => s.setAuth)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm({
    defaultValues: { email: '', password: '' },
    validators: { onChange: LoginDtoSchema },
    onSubmit: async ({ value }) => {
      setSubmitError(null)
      try {
        const res = await login(value)
        setAuth(res)
        void migrateLocalPracticeIfPresent()
        window.location.href = redirectTo
      } catch (err) {
        setSubmitError(authErrorCopy(err, 'login'))
      }
    },
  })

  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-graphite">
        ENTRY FORM
      </p>
      <h1 className="mt-3 font-fraunces text-[32px] leading-none text-ink">Log in.</h1>

      <form
        role="form"
        aria-label="Sign in"
        className="mt-10 space-y-7"
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void form.handleSubmit()
        }}
      >
        <form.Field
          name="email"
          children={(field) => (
            <AuthInput
              field={field}
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="you@domain.com"
            />
          )}
        />

        <form.Field
          name="password"
          children={(field) => (
            <AuthInput
              field={field}
              label="Password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
            />
          )}
        />

        {submitError && <FormErrorNote>{submitError}</FormErrorNote>}

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting] as const}
          children={([canSubmit, isSubmitting]) => (
            <AuthSubmit
              idleLabel="Enter"
              busy={isSubmitting}
              disabled={!canSubmit}
            />
          )}
        />
      </form>

      <div className="mt-12 border-t border-line pt-6">
        <p className="font-geist text-[18px] text-graphite">
          New to Meridian?{' '}
          <Link to="/signup" className="group inline-flex items-center gap-1 text-ink">
            <span className="relative">
              <em className="italic">Begin here</em>
              <span className="absolute -bottom-0.5 left-0 h-px w-full bg-line transition-colors duration-200 group-hover:bg-ink" />
            </span>
            <span className="text-claret transition-transform duration-200 group-hover:translate-x-0.5">
              ↗
            </span>
          </Link>
        </p>
      </div>
    </div>
  )
}
