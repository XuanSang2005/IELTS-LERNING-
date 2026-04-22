import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const Route = createRootRoute({
  component: RootLayout,
})

// Every route in the app uses the Meridian full-bleed layout. Routes bring
// their own Nav / AppNav when needed — the root renders only the <Outlet>.
function RootLayout() {
  return (
    <div className="flex min-h-full flex-col">
      <Outlet />
      {import.meta.env.DEV && (
        <>
          <TanStackRouterDevtools position="bottom-right" />
          <ReactQueryDevtools buttonPosition="bottom-left" />
        </>
      )}
    </div>
  )
}
