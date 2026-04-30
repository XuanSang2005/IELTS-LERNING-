/**
 * Timezone helpers using only the built-in Intl API — no date-fns-tz dep.
 * All functions accept an IANA timezone string (e.g. 'Asia/Ho_Chi_Minh').
 */

/**
 * Returns the offset in minutes east of UTC for the given timezone at the
 * given instant. e.g. Asia/Ho_Chi_Minh → 420 (UTC+7). Handles DST correctly
 * because the offset is computed at the supplied instant.
 */
export function getTimezoneOffsetMinutes(timezone: string, instant: Date): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    timeZoneName: 'longOffset',
  }).formatToParts(instant)
  const offsetPart = parts.find((p) => p.type === 'timeZoneName')?.value ?? 'GMT+00:00'
  const match = /GMT([+-])(\d{1,2})(?::?(\d{2}))?/.exec(offsetPart)
  if (!match) return 0
  const sign = match[1] === '+' ? 1 : -1
  const hours = parseInt(match[2], 10)
  const mins = match[3] ? parseInt(match[3], 10) : 0
  return sign * (hours * 60 + mins)
}

/**
 * Returns the UTC instant corresponding to 00:00:00 of the *user-local* day
 * that contains `instant`. e.g. for Asia/Ho_Chi_Minh and instant
 * 2026-04-29T17:30:00Z (local 2026-04-30T00:30:00+07:00), returns
 * 2026-04-29T17:00:00Z (= local 2026-04-30T00:00:00+07:00).
 */
export function startOfDayInTz(instant: Date, timezone: string): Date {
  const dateString = new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(instant)
  const offsetMin = getTimezoneOffsetMinutes(timezone, instant)
  const localMidnightAsUtc = new Date(`${dateString}T00:00:00Z`).getTime()
  return new Date(localMidnightAsUtc - offsetMin * 60_000)
}

/**
 * Returns the UTC instant corresponding to 23:59:59.999 of the user-local day.
 */
export function endOfDayInTz(instant: Date, timezone: string): Date {
  const start = startOfDayInTz(instant, timezone)
  return new Date(start.getTime() + 24 * 60 * 60_000 - 1)
}

/**
 * Adds N days to an instant. Pure UTC arithmetic — does not adjust for DST
 * transitions because the SRS interval semantic is "24 hours" not
 * "same wall-clock time tomorrow".
 */
export function addDaysUtc(instant: Date, days: number): Date {
  return new Date(instant.getTime() + days * 24 * 60 * 60_000)
}
