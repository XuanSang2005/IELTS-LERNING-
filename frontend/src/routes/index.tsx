import { createFileRoute } from '@tanstack/react-router'
import { Nav } from '@/features/landing/components/Nav'
import { Hero } from '@/features/landing/components/Hero'
import { TrustStrip } from '@/features/landing/components/TrustStrip'
import { BackgroundOrnaments } from '@/features/landing/components/BackgroundOrnaments'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-ivory 2xl:h-screen 2xl:overflow-hidden">
      <BackgroundOrnaments />
      <div className="relative z-10 flex min-h-screen flex-col 2xl:h-full">
        <Nav />
        <Hero />
        <TrustStrip />
      </div>
    </div>
  )
}
