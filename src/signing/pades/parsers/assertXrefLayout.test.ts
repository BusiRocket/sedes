import { describe, expect, it } from 'vitest'

import { assertXrefLayout } from './assertXrefLayout'

describe('assertXrefLayout', () => {
  it('accepts rows that fit the data', () => {
    expect(() => {
      assertXrefLayout([1, 2, 1], [0, 3], 12)
    }).not.toThrow()
  })

  it('refuses widths no real xref stream uses', () => {
    expect(() => {
      assertXrefLayout([1_000_000_000, 0, 0], [0, 1], 12)
    }).toThrow('/W widths out of range')
  })

  it('refuses counts larger than the data', () => {
    expect(() => {
      assertXrefLayout([1, 2, 1], [0, 999_999_999_999], 12)
    }).toThrow('/Index does not fit')
  })
})
