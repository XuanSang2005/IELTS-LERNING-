import { addDaysUtc, endOfDayInTz, getTimezoneOffsetMinutes, startOfDayInTz } from './tz-helper'

describe('tz-helper', () => {
  describe('getTimezoneOffsetMinutes', () => {
    it('Asia/Ho_Chi_Minh = +420 (UTC+7, no DST)', () => {
      const offset = getTimezoneOffsetMinutes('Asia/Ho_Chi_Minh', new Date('2026-06-15T12:00:00Z'))
      expect(offset).toBe(420)
    })

    it('UTC = 0', () => {
      const offset = getTimezoneOffsetMinutes('UTC', new Date('2026-06-15T12:00:00Z'))
      expect(offset).toBe(0)
    })

    it('America/Los_Angeles handles DST — +/- depending on time of year', () => {
      // PDT (DST): UTC-7 in summer
      const summer = getTimezoneOffsetMinutes(
        'America/Los_Angeles',
        new Date('2026-07-01T12:00:00Z'),
      )
      expect(summer).toBe(-420)
      // PST: UTC-8 in winter
      const winter = getTimezoneOffsetMinutes(
        'America/Los_Angeles',
        new Date('2026-01-15T12:00:00Z'),
      )
      expect(winter).toBe(-480)
    })
  })

  describe('startOfDayInTz', () => {
    it('Asia/Ho_Chi_Minh: instant 2026-04-29T17:30:00Z falls on local 2026-04-30, returns 17:00Z', () => {
      // local time = 2026-04-30T00:30:00+07:00 → start of local day = 2026-04-30T00:00:00+07:00 = 2026-04-29T17:00:00Z
      const result = startOfDayInTz(new Date('2026-04-29T17:30:00Z'), 'Asia/Ho_Chi_Minh')
      expect(result.toISOString()).toBe('2026-04-29T17:00:00.000Z')
    })

    it('UTC: returns midnight UTC of the same day', () => {
      const result = startOfDayInTz(new Date('2026-04-29T17:30:00Z'), 'UTC')
      expect(result.toISOString()).toBe('2026-04-29T00:00:00.000Z')
    })

    it('Asia/Ho_Chi_Minh at noon UTC: local is 19:00 same day, start of local day = 17:00Z prev day', () => {
      // 2026-04-29T12:00:00Z = 2026-04-29T19:00:00+07:00 → start = 2026-04-29T00:00:00+07:00 = 2026-04-28T17:00:00Z
      const result = startOfDayInTz(new Date('2026-04-29T12:00:00Z'), 'Asia/Ho_Chi_Minh')
      expect(result.toISOString()).toBe('2026-04-28T17:00:00.000Z')
    })
  })

  describe('endOfDayInTz', () => {
    it('returns 23:59:59.999 of user-local day', () => {
      const result = endOfDayInTz(new Date('2026-04-29T17:30:00Z'), 'Asia/Ho_Chi_Minh')
      // start = 2026-04-29T17:00:00Z, end = +24h - 1ms = 2026-04-30T16:59:59.999Z
      expect(result.toISOString()).toBe('2026-04-30T16:59:59.999Z')
    })
  })

  describe('addDaysUtc', () => {
    it('adds 24-hour increments regardless of DST', () => {
      const result = addDaysUtc(new Date('2026-04-29T10:00:00Z'), 3)
      expect(result.toISOString()).toBe('2026-05-02T10:00:00.000Z')
    })
  })
})
