import { describe, expect, it } from 'vitest'

import { isEuroAmountText } from './isEuroAmountText'

describe('isEuroAmountText', () => {
  it('accepts n,nn with optional thousands dots', () => {
    expect(isEuroAmountText('100,00')).toBe(true)
    expect(isEuroAmountText('1.234,56')).toBe(true)
    expect(isEuroAmountText('1234.56')).toBe(false)
    expect(isEuroAmountText('12,5')).toBe(false)
    expect(isEuroAmountText('12.34,56')).toBe(false)
  })
})
