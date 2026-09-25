import { describe, expect, it } from 'vitest'

import { pdfDict } from './pdfDict'
import { pdfRaw } from './pdfRaw'
import { streamObject } from './streamObject'

describe('streamObject', () => {
  it('sets /Length and frames the data', () => {
    const object = streamObject(
      4,
      pdfDict([['Type', pdfRaw('/XObject')]]),
      Buffer.from('abc'),
    )
    expect(object.bytes.toString('latin1')).toBe(
      '4 0 obj\n<< /Type /XObject /Length 3 >>\nstream\nabc\nendstream\nendobj\n',
    )
  })
})
