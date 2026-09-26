import { describe, expect, it } from 'vitest'

import { isoFromSpanishDateTime } from './isoFromSpanishDateTime'

describe('isoFromSpanishDateTime', () => {
  it('converts dd/mm/yyyy with and without a time', () => {
    expect(isoFromSpanishDateTime('21/11/2025 12:51:30')).toBe(
      '2025-11-21T12:51:30',
    )
    expect(isoFromSpanishDateTime('21/11/2025')).toBe('2025-11-21')
    expect(isoFromSpanishDateTime('soon')).toBe('soon')
  })
})
