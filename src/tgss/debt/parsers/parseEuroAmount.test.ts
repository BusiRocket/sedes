import { describe, expect, it } from 'vitest'

import { parseEuroAmount } from './parseEuroAmount'

describe('parseEuroAmount', () => {
  it('parses a small amount', () => {
    expect(parseEuroAmount('38,86')).toBeCloseTo(38.86)
  })

  it('parses a thousands-separated amount', () => {
    expect(parseEuroAmount('1.662,94')).toBeCloseTo(1662.94)
  })
})
