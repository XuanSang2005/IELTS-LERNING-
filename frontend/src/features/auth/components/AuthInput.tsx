import { useId, useState } from 'react'
import type { AnyFieldApi } from '@tanstack/react-form'

interface AuthInputProps {
  field: AnyFieldApi
  label: string
  type?: 'text' | 'email' | 'password'
  autoComplete?: string
  placeholder?: string
  disabled?: boolean
}

function EyeOpen({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function EyeClosed({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17.94 17.94A10.43 10.43 0 0 1 12 19c-6.5 0-10-7-10-7a18.7 18.7 0 0 1 4.22-5.22" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c6.5 0 10 7 10 7a18.5 18.5 0 0 1-2.16 3.19" />
      <path d="M14.12 14.12A3 3 0 1 1 9.88 9.88" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  )
}

export function AuthInput({
  field,
  label,
  type = 'text',
  autoComplete,
  placeholder,
  disabled = false,
}: AuthInputProps) {
  const id = useId()
  const errorId = `${id}-error`
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type

  const rawErrors = field.state.meta.errors
  const hasError = rawErrors.length > 0 && field.state.meta.isTouched
  const errorMessage = hasError
    ? rawErrors
        .map((e) => (typeof e === 'string' ? e : e?.message))
        .filter(Boolean)
        .join(' · ')
    : null

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-3 block font-mono text-[11px] uppercase tracking-[0.22em] text-graphite"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={field.name}
          type={inputType}
          autoComplete={autoComplete}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          value={field.state.value as string}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          className={`block w-full border-0 border-b bg-transparent pb-2 pr-8 pt-1 font-geist text-[20px] text-ink placeholder:text-graphite/50 transition-colors focus:outline-none disabled:opacity-50 ${
            hasError
              ? 'border-b-2 border-claret'
              : 'border-line focus:border-b-2 focus:border-claret'
          }`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
            tabIndex={-1}
            className="absolute bottom-2 right-0 text-graphite transition-colors hover:text-ink"
          >
            {showPassword ? <EyeClosed /> : <EyeOpen />}
          </button>
        )}
      </div>
      {errorMessage && (
        <p
          id={errorId}
          className="mt-2 font-fraunces text-[15px] italic text-claret"
        >
          {errorMessage}
        </p>
      )}
    </div>
  )
}
