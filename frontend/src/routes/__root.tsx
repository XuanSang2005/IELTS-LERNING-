import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Header } from '@/components/layout/Header'

export const Route = createRootRoute({
  component: RootLayout,
})

// Routes that use the Meridian full-bleed layout (their own Nav + no app shell).
const FULL_BLEED_ROUTES = new Set(['/', '/study', '/method', '/login', '/signup'])

function isFullBleedPath(pathname: string): boolean {
  return (
    FULL_BLEED_ROUTES.has(pathname) ||
    pathname === '/app' ||
    pathname.startsWith('/app/') ||
    pathname === '/tests' ||
    pathname.startsWith('/tests/') ||
    pathname === '/review' ||
    pathname === '/profile' ||
    pathname.startsWith('/profile/') ||
    pathname.startsWith('/onboarding/')
  )
}

function RootLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const isFullBleed = isFullBleedPath(pathname)

  return (
    <div className="flex min-h-full flex-col">
      {!isFullBleed && <Header />}
      {isFullBleed ? (
        <Outlet />
      ) : (
        <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-8">
          <Outlet />
        </main>
      )}
      {import.meta.env.DEV && (
        <>
          <TanStackRouterDevtools position="bottom-right" />
          <ReactQueryDevtools buttonPosition="bottom-left" />
        </>
      )}
    </div>
  )
}
