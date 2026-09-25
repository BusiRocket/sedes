import { describe, expect, it } from 'vitest'

import { euroAmountText } from './euroAmountText'

describe('euroAmountText', () => {
  it('renders dot thousands and comma decimals with two places', () => {
    expect(euroAmountText(1234.5)).toBe('1.234,50')
    expect(euroAmountText(140)).toBe('140,00')
    expect(euroAmountText(0)).toBe('0,00')
  })
})
