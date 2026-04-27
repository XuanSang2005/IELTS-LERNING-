import { Nav } from '@/features/landing/components/Nav'
import { MethodHero } from './components/MethodHero'
import { FivePrinciples } from './components/FivePrinciples'
import { FourDisciplines } from './components/FourDisciplines'
import { TwelveWeekArc } from './components/TwelveWeekArc'
import { DailyLoops } from './components/DailyLoops'
import { BandRange } from './components/BandRange'
import { MethodClosing } from './components/MethodClosing'
import { MethodFooter } from './components/MethodFooter'

export function Method() {
  return (
    <div className="min-h-screen bg-ivory">
      <Nav />
      <MethodHero />
      <FivePrinciples />
      <FourDisciplines />
      <TwelveWeekArc />
      <DailyLoops />
      <BandRange />
      <MethodClosing />
      <MethodFooter />
    </div>
  )
}
