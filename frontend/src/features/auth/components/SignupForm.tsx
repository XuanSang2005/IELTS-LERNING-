import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import { SignupDtoSchema } from '@shared/schemas/auth'
import { useAuthStore } from '@/stores/auth-store'
import { authErrorCopy, migrateLocalPracticeIfPresent, signup } from '@/lib/auth'
import { AuthInput } from './AuthInput'
import { AuthSubmit } from './AuthSubmit'
import { FormErrorNote } from './FormErrorNote'
import { SuccessTransition } from './SuccessTransition'

interface SignupFormProps {
  redirectTo: string
}

const ease = [0.22, 1, 0.36, 1] as const

export function SignupForm({ redirectTo }: SignupFormProps) {
  const setAuth = useAuthStore((s) => s.setAuth)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const form = useForm({
    defaultValues: { name: '', email: '', password: '' },
    validators: { onChange: SignupDtoSchema },
    onSubmit: async ({ value }) => {
      setSubmitError(null)
      try {
        const res = await signup(value)
        setAuth(res)
        void migrateLocalPracticeIfPresent()
        setSuccess(true)
        setTimeout(() => {
          const onboardUrl = `/onboarding/band?redirect=${encodeURIComponent(redirectTo)}`
          window.location.href = onboardUrl
        }, 1500)
      } catch (err) {
        setSubmitError(authErrorCopy(err, 'signup'))
      }
    },
  })

  return (
    <div>
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <SuccessTransition />
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-graphite">
              NEW CANDIDATE
            </p>
            <h1 className="mt-3 font-fraunces text-[32px] leading-none text-ink">
              Create account.
            </h1>

            <form
              role="form"
              aria-label="Register for Meridian"
              className="mt-10 space-y-7"
              onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                void form.handleSubmit()
              }}
            >
              <form.Field
                name="name"
                children={(field) => (
                  <AuthInput
                    field={field}
                    label="Name"
                    autoComplete="name"
                    placeholder="Minh Nguyen"
                  />
                )}
              />

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

              <div>
                <form.Field
                  name="password"
                  children={(field) => (
                    <AuthInput
                      field={field}
                      label="Password"
                      type="password"
                      autoComplete="new-password"
                      placeholder="Minimum 8 characters"
                    />
                  )}
                />
                <p className="mt-3 font-fraunces text-[15px] italic leading-snug text-graphite">
                  Eight characters or more. One is enough, if it is strong.
                </p>
              </div>

              {submitError && <FormErrorNote>{submitError}</FormErrorNote>}

              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting] as const}
                children={([canSubmit, isSubmitting]) => (
                  <AuthSubmit
                    idleLabel="Enter the programme"
                    busy={isSubmitting}
                    disabled={!canSubmit}
                  />
                )}
              />
            </form>

            <div className="mt-12 border-t border-line pt-6">
              <p className="font-geist text-[18px] text-graphite">
                Already enrolled?{' '}
                <Link to="/login" className="group inline-flex items-center gap-1 text-ink">
                  <span className="relative">
                    <em className="italic">Return to the library</em>
                    <span className="absolute -bottom-0.5 left-0 h-px w-full bg-line transition-colors duration-200 group-hover:bg-ink" />
                  </span>
                  <span className="text-claret transition-transform duration-200 group-hover:translate-x-0.5">
                    ↗
                  </span>
                </Link>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
