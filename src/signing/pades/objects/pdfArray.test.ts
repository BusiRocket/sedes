import { describe, expect, it } from 'vitest'

import { pdfArray } from './pdfArray'
import { pdfRaw } from './pdfRaw'

describe('pdfArray', () => {
  it('wraps items', () => {
    expect(pdfArray([pdfRaw('1')])).toEqual({
      kind: 'array',
      items: [{ kind: 'raw', text: '1' }],
    })
  })
})
