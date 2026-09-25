import { describe, expect, it } from 'vitest'

import { paethPredictor } from './paethPredictor'

describe('paethPredictor', () => {
  it('picks the nearest neighbour to left + up - upLeft', () => {
    expect(paethPredictor(10, 20, 10)).toBe(20)
    expect(paethPredictor(20, 10, 10)).toBe(20)
    expect(paethPredictor(10, 10, 20)).toBe(10)
    expect(paethPredictor(5, 9, 7)).toBe(7)
  })
})
