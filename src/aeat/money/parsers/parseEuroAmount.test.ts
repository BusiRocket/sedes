import { describe, expect, it } from 'vitest'

import { parseEuroAmount } from './parseEuroAmount'

describe('parseEuroAmount', () => {
  it('parses a plain amount with no thousands separator', () => {
    expect(parseEuroAmount('639,26')).toBeCloseTo(639.26)
  })

  it('parses an amount with a thousands separator', () => {
    expect(parseEuroAmount('1.287,57')).toBeCloseTo(1287.57)
  })

  it('parses a negative amount', () => {
    expect(parseEuroAmount('-313,98')).toBeCloseTo(-313.98)
  })
})
