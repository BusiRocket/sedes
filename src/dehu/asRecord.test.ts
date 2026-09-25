import { describe, expect, it } from 'vitest'

import { asRecord } from './asRecord'

describe('asRecord', () => {
  it('returns a plain object unchanged', () => {
    expect(asRecord({ a: 1 })).toEqual({ a: 1 })
  })

  it('rejects an array', () => {
    expect(asRecord([1, 2])).toBeUndefined()
  })

  it('rejects null and primitives', () => {
    expect(asRecord(null)).toBeUndefined()
    expect(asRecord('text')).toBeUndefined()
    expect(asRecord(42)).toBeUndefined()
  })
})
