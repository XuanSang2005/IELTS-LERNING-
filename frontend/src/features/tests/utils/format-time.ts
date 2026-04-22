export function formatClock(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return '00:00'
  const mm = Math.floor(totalSeconds / 60)
  const ss = Math.floor(totalSeconds % 60)
  return `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`
}

export function formatDuration(totalSeconds: number): string {
  const mm = Math.floor(totalSeconds / 60)
  if (mm < 1) return `${Math.round(totalSeconds)}s`
  return `${mm} min`
}
