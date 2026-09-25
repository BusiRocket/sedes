import { describe, expect, it } from 'vitest'

import { pdfDate } from './pdfDate'

describe('pdfDate', () => {
  it('formats UTC with the +00 offset', () => {
    expect(pdfDate(new Date('2026-09-26T08:07:06.123Z'))).toBe(
      "D:20260926080706+00'00'",
    )
  })
})
