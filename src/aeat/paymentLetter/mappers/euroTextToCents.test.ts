import { describe, expect, it } from 'vitest'

import { euroTextToCents } from './euroTextToCents'

describe('euroTextToCents', () => {
  it('converts without float rounding', () => {
    expect(euroTextToCents('1.234,56')).toBe(123456)
    expect(euroTextToCents(' 0,10 ')).toBe(10)
    expect(euroTextToCents('-5,00')).toBe(-500)
  })

  it('refuses anything else', () => {
    expect(() => euroTextToCents('5.00')).toThrow('not a euro amount')
  })
})
