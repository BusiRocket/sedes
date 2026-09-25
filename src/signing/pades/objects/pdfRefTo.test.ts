import { describe, expect, it } from 'vitest'

import { pdfRefTo } from './pdfRefTo'

describe('pdfRefTo', () => {
  it('defaults the generation to 0', () => {
    expect(pdfRefTo(7)).toEqual({ kind: 'ref', num: 7, gen: 0 })
    expect(pdfRefTo(7, 2).gen).toBe(2)
  })
})
