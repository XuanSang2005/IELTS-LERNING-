import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useRouterState } from '@tanstack/react-router'
import { MobileMenuSheet } from '@/components/MobileMenuSheet'
import { MobileMenuTrigger } from '@/components/MobileMenuTrigger'
import { useAuthStore } from '@/stores/auth-store'
import { logout } from '@/lib/auth'

const NAV_ITEMS = [
  { label: 'Programme', to: '/study' as const },
  { label: 'Method', to: '/method' as const },
  { label: 'Atlas', to: '/atlas' as const },
  { label: 'Journal', to: null, hash: '#journal' },
] as const

export function Nav({ minimal = false }: { minimal?: boolean } = {}) {
  const [scrolled, setScrolled] = useState(false)
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const user = useAuthStore((s) => s.user)
  const token = useAuthStore((s) => s.token)
  const isAuthed = Boolean(token && user)
  const navigate = useNavigate()

  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  const displayName = user?.name ?? '—'
  const initials = displayName
    .split(' ')
    .map((p) => p[0] ?? '')
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const handleSignOut = () => {
    void logout()
    setMenuOpen(false)
    void navigate({ to: '/' })
  }

  return (
    <nav
      className={`sticky top-0 z-50 bg-ivory transition-[border-color] duration-200 ${scrolled ? 'border-b border-line' : 'border-b border-transparent'}`}
    >
      <div className="flex w-full items-center justify-between gap-6 px-4 py-4 md:gap-8 md:px-6 md:py-5 lg:gap-10 xl:gap-14 xl:px-8">
        {/* Wordmark — subtitle absolutely positioned so the main text
             vertically centers with the nav links + CTA */}
        <Link to="/" className="relative shrink-0">
          <span className="font-fraunces text-[26px] font-medium leading-none tracking-tight md:text-[32px] xl:text-[36px]">
            <span className="text-claret">M</span>
            <span className="text-ink">eridian</span>
          </span>
          <span className="absolute left-0 top-full mt-1 hidden whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.25em] text-graphite md:block">
            IELTS · EST. MMXXIV
          </span>
        </Link>

        {/* Nav links — hidden in minimal mode (e.g. pricing/payment pages) */}
        {!minimal && (
          <div className="hidden flex-1 items-center justify-center gap-8 lg:flex xl:gap-12">
            {NAV_ITEMS.map((item) => {
              const isActive = item.to ? pathname === item.to : false
              const className = `group relative font-geist text-[22px] font-medium text-ink xl:text-[26px] ${isActive ? 'text-claret' : ''}`
              return item.to ? (
                <Link key={item.label} to={item.to} className={className}>
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 bg-claret transition-all duration-200 ${
                      isActive ? 'h-[2px] w-full' : 'h-px w-0 group-hover:w-full group-hover:bg-ink'
                    }`}
                  />
                </Link>
              ) : (
                <a key={item.label} href={item.hash} className={className}>
                  {item.label}
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-ink transition-all duration-200 group-hover:w-full" />
                </a>
              )
            })}
          </div>
        )}

        {/* Auth CTAs — signed-out shows Log in + Sign up; signed-in shows Dashboard + avatar (minimal mode hides the dashboard button) */}
        {isAuthed ? (
          <div className="hidden shrink-0 items-center gap-5 md:gap-7 lg:flex" ref={menuRef}>
            {!minimal && (
              <Link
                to="/app"
                className="border border-ink bg-transparent px-3.5 py-2 font-geist text-[16px] font-medium text-ink transition-colors duration-200 hover:bg-ink hover:text-ivory md:px-5 md:py-2.5 md:text-[17px] xl:px-5 xl:py-2.5 xl:text-[18px]"
              >
                Enter dashboard
              </Link>
            )}
            <div className="relative">
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
                      {user?.isPro ? 'PRO · COHORT IV' : 'FREE'}
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
          </div>
        ) : (
          <div className="hidden shrink-0 items-center gap-6 md:gap-10 lg:flex">
            <Link
              to="/login"
              className="group relative font-geist text-[20px] font-medium text-ink md:text-[22px] xl:text-[24px]"
            >
              Log in
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-ink transition-all duration-200 group-hover:w-full" />
            </Link>
            <Link
              to="/signup"
              className="border-2 border-ink bg-ink px-4 py-2.5 font-geist text-[20px] font-medium text-ivory transition-colors duration-200 hover:bg-ivory hover:text-ink md:px-6 md:py-3 md:text-[22px] xl:px-7 xl:py-3.5 xl:text-[24px]"
            >
              Sign up
            </Link>
          </div>
        )}

        <MobileMenuTrigger
          open={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          controlsId="public-mobile-menu"
        />
      </div>

      <MobileMenuSheet
        id="public-mobile-menu"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        eyebrow={isAuthed ? `${displayName} · ${user?.isPro ? 'PRO' : 'FREE'}` : 'NAVIGATION'}
        footer={
          isAuthed ? (
            <button
              type="button"
              onClick={handleSignOut}
              className="block w-full text-left font-geist text-[18px] text-claret active:opacity-70"
            >
              Sign out
            </button>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="block border border-ink px-5 py-3 text-center font-geist text-[16px] font-medium text-ink transition-colors duration-200 hover:bg-ink hover:text-ivory active:bg-ink/10"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileOpen(false)}
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden bg-ink-warm px-6 py-3.5 text-center font-geist text-[12px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:bg-ink active:bg-ink"
              >
                <span className="absolute inset-x-0 bottom-0 h-[2px] bg-claret" />
                <span className="relative z-10">Begin your assessment</span>
                <span className="relative z-10 text-[13px] text-claret">→</span>
              </Link>
            </div>
          )
        }
      >
        {!minimal && (
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item) => {
              const isActive = item.to ? pathname === item.to : false
              const itemClass = `group relative block w-full py-4 font-fraunces text-[26px] leading-tight text-ink transition-colors active:text-claret ${isActive ? 'text-claret' : ''}`
              return (
                <li key={item.label} className="border-b border-line last:border-b-0">
                  {item.to ? (
                    <Link to={item.to} onClick={() => setMobileOpen(false)} className={itemClass}>
                      {item.label}
                      <span
                        className={`absolute -bottom-px left-0 bg-claret transition-all duration-200 ${isActive ? 'h-[2px] w-12' : 'h-px w-0 group-hover:w-12'}`}
                      />
                    </Link>
                  ) : (
                    <a
                      href={item.hash}
                      onClick={() => setMobileOpen(false)}
                      className={itemClass}
                    >
                      {item.label}
                      <span className="absolute -bottom-px left-0 h-px w-0 bg-claret transition-all duration-200 group-hover:w-12" />
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        )}

        {isAuthed && (
          <div className={!minimal ? 'mt-8 border-t border-line pt-6' : ''}>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
              ◆ ACCOUNT
            </p>
            <ul className="flex flex-col gap-1">
              {!minimal && (
                <li>
                  <Link
                    to="/app"
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 font-fraunces text-[22px] text-ink active:text-claret"
                  >
                    Enter dashboard
                  </Link>
                </li>
              )}
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
        )}
      </MobileMenuSheet>
    </nav>
  )
}
