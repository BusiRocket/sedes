import { describe, expect, it } from 'vitest'

import { derNull } from './derNull'

describe('derNull', () => {
  it('is 05 00', () => {
    expect(derNull()).toEqual(Buffer.from([5, 0]))
  })
})
