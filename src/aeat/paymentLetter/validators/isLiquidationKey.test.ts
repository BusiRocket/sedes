import { describe, expect, it } from 'vitest'

import { isLiquidationKey } from './isLiquidationKey'

describe('isLiquidationKey', () => {
  it('accepts both printed shapes', () => {
    expect(isLiquidationKey('A0000000000000001')).toBe(true)
    expect(isLiquidationKey('2026ABC123D4E')).toBe(true)
    expect(isLiquidationKey('a1')).toBe(false)
  })
})
