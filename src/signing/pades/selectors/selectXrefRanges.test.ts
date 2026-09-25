import { describe, expect, it } from 'vitest'

import { pdfArray } from '../objects/pdfArray'
import { pdfDict } from '../objects/pdfDict'
import { pdfRaw } from '../objects/pdfRaw'
import { selectXrefRanges } from './selectXrefRanges'

describe('selectXrefRanges', () => {
  it('reads /Index or falls back to [0 Size]', () => {
    expect(
      selectXrefRanges(
        pdfDict([['Index', pdfArray([pdfRaw('5'), pdfRaw('2')])]]),
      ),
    ).toEqual([5, 2])
    expect(selectXrefRanges(pdfDict([['Size', pdfRaw('9')]]))).toEqual([0, 9])
    expect(selectXrefRanges(pdfDict([]))).toEqual([0, 0])
  })
})
