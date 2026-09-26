import { describe, expect, it } from 'vitest'

import { isoFromCompactDate } from './isoFromCompactDate'

describe('isoFromCompactDate', () => {
  it('converts yyyymmdd and leaves anything else', () => {
    expect(isoFromCompactDate('20251113')).toBe('2025-11-13')
    expect(isoFromCompactDate('')).toBe('')
    expect(isoFromCompactDate('13/11/2025')).toBe('13/11/2025')
  })
})
