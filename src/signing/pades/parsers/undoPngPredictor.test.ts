import { describe, expect, it } from 'vitest'

import { undoPngPredictor } from './undoPngPredictor'

describe('undoPngPredictor', () => {
  it('reverses None, Up and Paeth rows', () => {
    const data = Buffer.from([0, 1, 2, 2, 1, 1, 4, 0, 3, 2, 1, 1])
    expect([...undoPngPredictor(data, 2)]).toEqual([1, 2, 2, 3, 2, 6, 3, 7])
  })
})
