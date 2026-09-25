import { describe, expect, it } from 'vitest'

import { parseEuroAmount } from './parseEuroAmount'

describe('parseEuroAmount', () => {
  it('returns a number as-is', () => {
    expect(parseEuroAmount(140)).toBe(140)
    expect(parseEuroAmount(158.24)).toBe(158.24)
  })

  it('parses the numeric strings the portal sends for importePendiente', () => {
    expect(parseEuroAmount('318.48')).toBe(318.48)
    expect(parseEuroAmount('0.0')).toBe(0)
  })

  it('accepts a comma decimal separator too', () => {
    expect(parseEuroAmount('318,48')).toBe(318.48)
  })

  it('answers zero for anything unreadable', () => {
    expect(parseEuroAmount('not a number')).toBe(0)
    expect(parseEuroAmount(undefined)).toBe(0)
    expect(parseEuroAmount(null)).toBe(0)
    expect(parseEuroAmount(true)).toBe(0)
  })
})
