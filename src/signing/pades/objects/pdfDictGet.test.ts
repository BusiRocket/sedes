import { describe, expect, it } from 'vitest'

import { pdfDict } from './pdfDict'
import { pdfDictGet } from './pdfDictGet'
import { pdfRaw } from './pdfRaw'

describe('pdfDictGet', () => {
  it('finds a key or answers undefined', () => {
    const dict = pdfDict([['Type', pdfRaw('/Page')]])
    expect(pdfDictGet(dict, 'Type')).toEqual(pdfRaw('/Page'))
    expect(pdfDictGet(dict, 'Kids')).toBeUndefined()
  })
})
