import { describe, expect, it } from 'vitest'

import { pdfArray } from '../objects/pdfArray'
import { pdfDict } from '../objects/pdfDict'
import { pdfRaw } from '../objects/pdfRaw'
import { selectSingleFilter } from './selectSingleFilter'

describe('selectSingleFilter', () => {
  const flate = pdfRaw('/FlateDecode')

  it('unwraps a one-item array', () => {
    expect(
      selectSingleFilter(pdfDict([['Filter', pdfArray([flate])]])),
    ).toEqual(flate)
    expect(selectSingleFilter(pdfDict([['Filter', flate]]))).toEqual(flate)
    expect(selectSingleFilter(pdfDict([]))).toBeUndefined()
  })

  it('refuses a filter chain', () => {
    const dict = pdfDict([['Filter', pdfArray([flate, flate])]])
    expect(() => selectSingleFilter(dict)).toThrow(/chained/)
  })
})
