import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useRouterState } from '@tanstack/react-router'
import { MobileMenuSheet } from '@/components/MobileMenuSheet'
import { MobileMenuTrigger } from '@/components/MobileMenuTrigger'
import { useProfile } from '@/features/practice/hooks/practice-queries'
import { useAuthStore } from '@/stores/auth-store'
import { logout } from '@/lib/auth'

const LINKS = [
  { label: 'Dashboard', to: '/app' as const, exactMatch: true },
  { label: 'Test', to: '/tests' as const, exactMatch: false },
  { label: 'Lexicon', to: '/app/lexicon' as const, exactMatch: false },
  { label: 'Grammar', to: '/app/grammar' as const, exactMatch: true },
] as const

function daysUntilTrialEnds(trialEndsAt: string | null | undefined): number | null {
  if (!trialEndsAt) return null
  const ms = new Date(trialEndsAt).getTime() - Date.now()
  if (Number.isNaN(ms) || ms <= 0) return null
  return Math.ceil(ms / 86_400_000)
}

export function AppNav() {
  const profile = useProfile()
  const user = useAuthStore((s) => s.user)
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const navigate = useNavigate()

  const displayName = user?.name ?? profile?.name ?? '—'
  const initials = displayName
    .split(' ')
    .map((p) => p[0] ?? '')
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    const onDocDown = (e: MouseEvent) => {
      if (!menuRef.current) return
      if (!menuRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('mousedown', onDocDown)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const handleSignOut = () => {
    void logout()
    setMenuOpen(false)
    void navigate({ to: '/login' })
  }

  const daysLeft = daysUntilTrialEnds(user?.trialEndsAt)
  const statusLabel = user?.isPro
    ? 'PRO · COHORT IV'
    : daysLeft !== null
      ? `TRIAL · ${daysLeft} ${daysLeft === 1 ? 'DAY' : 'DAYS'} LEFT`
      : 'FREE'

  const isLinkActive = (item: (typeof LINKS)[number]): boolean => {
    if (item.exactMatch) return pathname === item.to
    return pathname === item.to || pathname.startsWith(`${item.to}/`)
  }

  return (
    <nav className="sticky top-0 z-40 border-b border-line bg-ivory">
      <div className="flex w-full items-center justify-between gap-6 px-4 py-4 md:gap-8 md:px-6 md:py-5 lg:gap-10 xl:gap-14 xl:px-8">
        {/* Wordmark */}
        <Link to="/" className="relative shrink-0">
          <span className="font-fraunces text-[26px] font-medium leading-none tracking-tight md:text-[32px] xl:text-[36px]">
            <span className="text-claret">M</span>
            <span className="text-ink">eridian</span>
          </span>
          {profile && (
            <span className="absolute left-0 top-full mt-1 hidden whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.25em] text-graphite md:block">
              STUDENT · COHORT IV · WEEK {String(profile.currentWeek).padStart(2, '0')} / XII
            </span>
          )}
        </Link>

        {/* Center links — desktop only */}
        <div className="hidden flex-1 items-center justify-center gap-8 lg:flex xl:gap-12">
          {LINKS.map((item) => {
            const active = isLinkActive(item)
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`group relative font-geist text-[22px] font-medium text-ink xl:text-[26px] ${
                  active ? 'text-claret' : ''
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 bg-claret transition-all duration-200 ${
                    active ? 'h-[2px] w-full' : 'h-px w-0 group-hover:w-full group-hover:bg-ink'
                  }`}
                />
              </Link>
            )
          })}
        </div>

        {/* Avatar dropdown — desktop only */}
        <div className="relative hidden shrink-0 lg:block" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            className={`flex h-10 w-10 items-center justify-center rounded-full border bg-bone font-fraunces text-[16px] text-ink transition-colors md:h-12 md:w-12 md:text-[18px] xl:h-14 xl:w-14 xl:text-[22px] ${
              menuOpen ? 'border-ink' : 'border-line hover:border-ink'
            }`}
          >
            {initials || '—'}
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 top-full mt-3 w-64 border border-line bg-ivory shadow-[0_20px_40px_-15px_rgba(20,18,16,0.18)]"
            >
              <div className="border-b border-line p-4">
                <p className="font-fraunces text-[19px] text-ink">{displayName}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
                  {statusLabel}
                </p>
              </div>
              <nav className="py-2">
                <Link
                  to="/profile"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 font-geist text-[18px] text-ink hover:bg-bone"
                >
                  Profile & settings
                </Link>
                <Link
                  to="/pricing"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 font-geist text-[18px] text-ink hover:bg-bone"
                >
                  Billing & membership
                </Link>
                <hr className="my-2 border-t border-line" />
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleSignOut}
                  className="block w-full px-4 py-2 text-left font-geist text-[18px] text-claret hover:bg-bone"
                >
                  Sign out
                </button>
              </nav>
            </div>
          )}
        </div>

        <MobileMenuTrigger
          open={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          controlsId="app-mobile-menu"
        />
      </div>

      <MobileMenuSheet
        id="app-mobile-menu"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        eyebrow={`${displayName.toUpperCase()} · ${statusLabel.split(' · ')[0]}`}
        footer={
          <button
            type="button"
            onClick={handleSignOut}
            className="block w-full text-left font-geist text-[18px] text-claret active:opacity-70"
          >
            Sign out
          </button>
        }
      >
        <ul className="flex flex-col">
          {LINKS.map((item) => {
            const active = isLinkActive(item)
            return (
              <li key={item.label} className="border-b border-line last:border-b-0">
                <Link
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={`group relative block w-full py-4 font-fraunces text-[26px] leading-tight text-ink transition-colors active:text-claret ${active ? 'text-claret' : ''}`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-px left-0 bg-claret transition-all duration-200 ${active ? 'h-[2px] w-12' : 'h-px w-0 group-hover:w-12'}`}
                  />
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="mt-8 border-t border-line pt-6">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
            ◆ ACCOUNT
          </p>
          <ul className="flex flex-col gap-1">
            <li>
              <Link
                to="/profile"
                onClick={() => setMobileOpen(false)}
                className="block py-3 font-geist text-[18px] text-ink active:text-claret"
              >
                Profile & settings
              </Link>
            </li>
            <li>
              <Link
                to="/pricing"
                onClick={() => setMobileOpen(false)}
                className="block py-3 font-geist text-[18px] text-ink active:text-claret"
              >
                Billing & membership
              </Link>
            </li>
          </ul>
        </div>
      </MobileMenuSheet>
    </nav>
  )
}
