import { describe, expect, it } from 'vitest'

import { pdfDict } from './pdfDict'
import { pdfRaw } from './pdfRaw'

describe('pdfDict', () => {
  it('keeps entries in order', () => {
    expect(pdfDict([['A', pdfRaw('1')]]).entries).toEqual([
      ['A', { kind: 'raw', text: '1' }],
    ])
  })
})
