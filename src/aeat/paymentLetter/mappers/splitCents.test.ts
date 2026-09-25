import { describe, expect, it } from 'vitest'

import { splitCents } from './splitCents'

describe('splitCents', () => {
  it('splits euros and two-digit decimals', () => {
    expect(splitCents(123405)).toEqual({ euros: '1234', decimals: '05' })
    expect(splitCents(7)).toEqual({ euros: '0', decimals: '07' })
  })
})
