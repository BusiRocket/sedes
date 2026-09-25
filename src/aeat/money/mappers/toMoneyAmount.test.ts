import { describe, expect, it } from 'vitest'

import { toMoneyAmount } from './toMoneyAmount'

describe('toMoneyAmount', () => {
  it('keeps the original text alongside the parsed euro amount', () => {
    expect(toMoneyAmount('1.234,56')).toEqual({
      text: '1.234,56',
      amount: 1234.56,
    })
  })
})
