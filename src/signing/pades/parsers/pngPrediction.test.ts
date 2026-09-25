import { describe, expect, it } from 'vitest'

import { pngPrediction } from './pngPrediction'

describe('pngPrediction', () => {
  it('covers the five PNG filter types', () => {
    expect([0, 1, 2, 3, 4].map((type) => pngPrediction(type, 4, 8, 2))).toEqual(
      [0, 4, 8, 6, 8],
    )
  })

  it('refuses an unknown type', () => {
    expect(() => pngPrediction(5, 0, 0, 0)).toThrow(/unknown PNG filter/)
  })
})
