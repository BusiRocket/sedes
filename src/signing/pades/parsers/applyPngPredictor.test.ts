import { describe, expect, it } from 'vitest'

import { pdfDict } from '../objects/pdfDict'
import { pdfRaw } from '../objects/pdfRaw'
import { applyPngPredictor } from './applyPngPredictor'

describe('applyPngPredictor', () => {
  const data = Buffer.from([2, 1, 2, 2, 1, 1])
  const parms = (predictor: string) =>
    pdfDict([
      [
        'DecodeParms',
        pdfDict([
          ['Predictor', pdfRaw(predictor)],
          ['Columns', pdfRaw('2')],
        ]),
      ],
    ])

  it('undoes a PNG predictor', () => {
    expect([...applyPngPredictor(parms('12'), data)]).toEqual([1, 2, 2, 3])
  })

  it('leaves data alone without PNG parameters', () => {
    expect(
      applyPngPredictor(pdfDict([['DecodeParms', pdfDict([])]]), data),
    ).toBe(data)
    expect(applyPngPredictor(pdfDict([]), data)).toBe(data)
    expect(applyPngPredictor(parms('1'), data)).toBe(data)
  })

  it('defaults /Columns to 1', () => {
    const dict = pdfDict([
      ['DecodeParms', pdfDict([['Predictor', pdfRaw('10')]])],
    ])
    expect([...applyPngPredictor(dict, Buffer.from([0, 5, 2, 1]))]).toEqual([
      5, 6,
    ])
  })
})
