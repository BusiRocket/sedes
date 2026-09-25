import { describe, expect, it } from 'vitest'

import { isYear } from './isYear'

describe('isYear', () => {
  it('accepts four digits only', () => {
    expect(isYear('2025')).toBe(true)
    expect(isYear('25')).toBe(false)
    expect(isYear('2025/01')).toBe(false)
  })
})
