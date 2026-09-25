import { describe, expect, it } from 'vitest'

import { isoDateFromDashed } from './isoDateFromDashed'

describe('isoDateFromDashed', () => {
  it('reads dashes and slashes', () => {
    expect(isoDateFromDashed('16-09-2026')).toBe('2026-09-16')
    expect(isoDateFromDashed(' 16/09/2026 ')).toBe('2026-09-16')
  })

  it('returns anything else trimmed', () => {
    expect(isoDateFromDashed(' pendiente ')).toBe('pendiente')
  })
})
