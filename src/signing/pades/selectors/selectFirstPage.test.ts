import { describe, expect, it } from 'vitest'

import { buildClassicPdf } from '../fixtures/buildClassicPdf'
import { pdfDict } from '../objects/pdfDict'
import { pdfRaw } from '../objects/pdfRaw'
import { readPdfDocument } from '../parsers/readPdfDocument'
import { selectCatalog } from './selectCatalog'
import { selectFirstPage } from './selectFirstPage'

describe('selectFirstPage', () => {
  it('descends nested page trees, with /Kids given indirectly', () => {
    const doc = readPdfDocument(
      buildClassicPdf([
        '<< /Type /Catalog /Pages 2 0 R >>',
        '<< /Type /Pages /Kids 3 0 R /Count 1 >>',
        '[4 0 R]',
        '<< /Type /Pages /Kids [5 0 R] /Count 1 >>',
        '<< /Type /Page /Parent 4 0 R >>',
      ]),
    )
    expect(selectFirstPage(doc, selectCatalog(doc).dict).ref.num).toBe(5)
  })

  it('refuses broken trees', () => {
    const doc = readPdfDocument(buildClassicPdf(['<< /Pages 2 0 R >>', '[1]']))
    expect(() =>
      selectFirstPage(doc, pdfDict([['Pages', pdfRaw('1')]])),
    ).toThrow(/not a reference/)
    expect(() => selectFirstPage(doc, selectCatalog(doc).dict)).toThrow(
      /not a dictionary/,
    )
    const loop = readPdfDocument(
      buildClassicPdf(['<< /Pages 2 0 R >>', '<< /Kids [2 0 R] >>']),
    )
    expect(() => selectFirstPage(loop, selectCatalog(loop).dict)).toThrow(
      /too deep/,
    )
  })
})
