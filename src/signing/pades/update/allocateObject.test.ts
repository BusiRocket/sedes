import { describe, expect, it } from 'vitest'

import { allocateObject } from './allocateObject'

describe('allocateObject', () => {
  it('hands out consecutive numbers', () => {
    const allocator = { next: 7 }
    expect([allocateObject(allocator), allocateObject(allocator)]).toEqual([
      7, 8,
    ])
    expect(allocator.next).toBe(9)
  })
})
