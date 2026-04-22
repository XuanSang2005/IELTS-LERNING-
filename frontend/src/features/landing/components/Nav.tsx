import { useEffect, useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'

const NAV_ITEMS = [
  { label: 'Programme', to: '/study' as const },
  { label: 'Method', to: '/method' as const },
  { label: 'Stories', to: null, hash: '#stories' },
  { label: 'Journal', to: null, hash: '#journal' },
] as const

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-50 bg-ivory transition-[border-color] duration-200 ${scrolled ? 'border-b border-line' : 'border-b border-transparent'}`}
    >
      <div className="flex w-full items-center justify-between gap-6 px-4 py-4 md:gap-8 md:px-6 md:py-5 lg:gap-10 xl:gap-14 xl:px-8">
        {/* Wordmark — subtitle absolutely positioned so the main text
             vertically centers with the nav links + CTA */}
        <div className="relative shrink-0">
          <span className="font-fraunces text-[26px] font-medium leading-none tracking-tight md:text-[32px] xl:text-[36px]">
            <span className="text-claret">M</span>
            <span className="text-ink">eridian</span>
          </span>
          <span className="absolute left-0 top-full mt-1 hidden whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.25em] text-graphite md:block">
            IELTS · EST. MMXXIV
          </span>
        </div>

        {/* Nav links — only visible from lg up to avoid crowding at tablet */}
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

        {/* Auth CTAs — Log in (text link) + Sign up (outlined per CLAUDE.md secondary) */}
        <div className="flex shrink-0 items-center gap-6 md:gap-10">
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
      </div>
    </nav>
  )
}
