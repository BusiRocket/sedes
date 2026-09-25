import { describe, expect, it } from 'vitest'

import { isoDateFromSpanish } from './isoDateFromSpanish'

describe('isoDateFromSpanish', () => {
  it('turns dd/mm/yyyy into an ISO date', () => {
    expect(isoDateFromSpanish(' 05/06/2026 ')).toBe('2026-06-05')
  })

  it('returns anything else as printed', () => {
    expect(isoDateFromSpanish('2026-06-05')).toBe('2026-06-05')
  })
})
