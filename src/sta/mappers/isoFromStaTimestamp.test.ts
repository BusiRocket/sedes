import { describe, expect, it } from 'vitest'

import { isoFromStaTimestamp } from './isoFromStaTimestamp'

describe('isoFromStaTimestamp', () => {
  it('formats the serialised calendar and zero-fills missing parts', () => {
    expect(
      isoFromStaTimestamp({
        year: 2023,
        month: 5,
        day: 9,
        hour: 8,
        minute: 7,
        second: 6,
        timezone: 120,
      }),
    ).toBe('2023-05-09T08:07:06')
    expect(isoFromStaTimestamp({ year: 2023, month: 5, day: 9 })).toBe(
      '2023-05-09T00:00:00',
    )
  })

  it('answers empty for an absent field', () => {
    expect(isoFromStaTimestamp(undefined)).toBe('')
    expect(isoFromStaTimestamp(null)).toBe('')
  })
})
