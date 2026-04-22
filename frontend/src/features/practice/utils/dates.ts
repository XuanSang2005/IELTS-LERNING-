export function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

export function isoDaysFromNow(days: number): string {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

export function isoDaysAgo(days: number): string {
  return isoDaysFromNow(-days)
}

export function isBeforeOrEqualToday(iso: string): boolean {
  return iso <= todayIso()
}

export function formatHuman(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function daysUntil(iso: string): number {
  const today = new Date(todayIso()).getTime()
  const target = new Date(iso).getTime()
  return Math.round((target - today) / 86_400_000)
}

export function weekKey(iso: string): string {
  const d = new Date(iso)
  const year = d.getFullYear()
  const first = new Date(year, 0, 1)
  const days = Math.floor((d.getTime() - first.getTime()) / 86_400_000)
  const week = Math.ceil((days + first.getDay() + 1) / 7)
  return `${year}-W${String(week).padStart(2, '0')}`
}
