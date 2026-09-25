import { describe, expect, it } from 'vitest'

import { pdfArray } from './pdfArray'
import { pdfDict } from './pdfDict'
import { pdfRaw } from './pdfRaw'
import { pdfRefTo } from './pdfRefTo'
import { serializePdfValue } from './serializePdfValue'

describe('serializePdfValue', () => {
  it('writes every kind of value', () => {
    const value = pdfDict([
      ['Kids', pdfArray([pdfRefTo(3), pdfRaw('1')])],
      ['Type', pdfRaw('/Pages')],
    ])
    expect(serializePdfValue(value)).toBe('<< /Kids [3 0 R 1] /Type /Pages >>')
  })
})
