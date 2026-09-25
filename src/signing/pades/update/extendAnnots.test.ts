import { describe, expect, it } from 'vitest'

import { buildClassicPdf } from '../fixtures/buildClassicPdf'
import { pdfDict } from '../objects/pdfDict'
import { pdfRaw } from '../objects/pdfRaw'
import { pdfRefTo } from '../objects/pdfRefTo'
import { serializePdfValue } from '../objects/serializePdfValue'
import { readPdfDocument } from '../parsers/readPdfDocument'
import { extendAnnots } from './extendAnnots'

describe('extendAnnots', () => {
  const doc = readPdfDocument(buildClassicPdf(['[7 0 R]', '<< >>']))

  it('starts or extends an inline /Annots', () => {
    expect(
      serializePdfValue(
        extendAnnots(doc, pdfDict([]), pdfRefTo(9)).dict ?? pdfDict([]),
      ),
    ).toBe('<< /Annots [9 0 R] >>')
    const page = pdfDict([['Annots', { kind: 'array', items: [pdfRefTo(6)] }]])
    expect(
      serializePdfValue(
        extendAnnots(doc, page, pdfRefTo(9)).dict ?? pdfDict([]),
      ),
    ).toBe('<< /Annots [6 0 R 9 0 R] >>')
  })

  it('rewrites an indirect /Annots array', () => {
    const change = extendAnnots(
      doc,
      pdfDict([['Annots', pdfRefTo(1)]]),
      pdfRefTo(9),
    )
    expect(change.dict).toBeUndefined()
    expect(change.objects[0]?.bytes.toString('latin1')).toBe(
      '1 0 obj\n[7 0 R 9 0 R]\nendobj\n',
    )
    const odd = extendAnnots(
      doc,
      pdfDict([['Annots', pdfRefTo(2)]]),
      pdfRefTo(9),
    )
    expect(odd.objects[0]?.bytes.toString('latin1')).toContain('[9 0 R]')
    expect(
      extendAnnots(doc, pdfDict([['Annots', pdfRaw('null')]]), pdfRefTo(9))
        .dict,
    ).toBeDefined()
  })
})
