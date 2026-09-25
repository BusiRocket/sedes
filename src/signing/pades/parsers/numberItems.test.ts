import { describe, expect, it } from 'vitest'

import { pdfArray } from '../objects/pdfArray'
import { pdfRaw } from '../objects/pdfRaw'
import { numberItems } from './numberItems'

describe('numberItems', () => {
  it('reads the numbers of an array', () => {
    expect(numberItems(pdfArray([pdfRaw('1'), pdfRaw('/x')]))).toEqual([1, 0])
    expect(numberItems(pdfRaw('1'))).toEqual([])
  })
})
