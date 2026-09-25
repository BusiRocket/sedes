import { describe, expect, it } from 'vitest'

import { findStartXref } from './findStartXref'

describe('findStartXref', () => {
  it('takes the last startxref', () => {
    expect(
      findStartXref('startxref\n10\n%%EOF\nstartxref\r\n250\n%%EOF\n'),
    ).toBe(250)
  })

  it('refuses a file without one', () => {
    expect(() => findStartXref('%PDF-1.7')).toThrow(/startxref not found/)
  })
})
