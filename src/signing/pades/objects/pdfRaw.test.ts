import { describe, expect, it } from 'vitest'

import { pdfRaw } from './pdfRaw'

describe('pdfRaw', () => {
  it('keeps the source text', () => {
    expect(pdfRaw('/Sig')).toEqual({ kind: 'raw', text: '/Sig' })
  })
})
