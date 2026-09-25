import { describe, expect, it } from 'vitest'

import { buildClassicPdf } from '../fixtures/buildClassicPdf'
import { pdfDict } from '../objects/pdfDict'
import { pdfRefTo } from '../objects/pdfRefTo'
import { serializePdfValue } from '../objects/serializePdfValue'
import { readPdfDocument } from '../parsers/readPdfDocument'
import { withSignatureField } from './withSignatureField'

describe('withSignatureField', () => {
  it('starts /Fields and sets /SigFlags 3', () => {
    const doc = readPdfDocument(buildClassicPdf())
    expect(
      serializePdfValue(withSignatureField(doc, pdfDict([]), pdfRefTo(9))),
    ).toBe('<< /Fields [9 0 R] /SigFlags 3 >>')
  })

  it('appends to /Fields held in another object', () => {
    const doc = readPdfDocument(buildClassicPdf(['[5 0 R]']))
    const form = pdfDict([['Fields', pdfRefTo(1)]])
    expect(serializePdfValue(withSignatureField(doc, form, pdfRefTo(9)))).toBe(
      '<< /Fields [5 0 R 9 0 R] /SigFlags 3 >>',
    )
  })
})
