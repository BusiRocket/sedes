import { describe, expect, it } from 'vitest'

import { buildClassicPdf } from '../fixtures/buildClassicPdf'
import { pdfDict } from '../objects/pdfDict'
import { pdfRefTo } from '../objects/pdfRefTo'
import { readPdfDocument } from '../parsers/readPdfDocument'
import { selectCatalog } from './selectCatalog'

describe('selectCatalog', () => {
  const doc = readPdfDocument(buildClassicPdf())

  it('reads /Root', () => {
    expect(selectCatalog(doc).ref).toEqual(pdfRefTo(1))
  })

  it('refuses a trailer without /Root or a /Root that is not a dictionary', () => {
    expect(() => selectCatalog({ ...doc, trailer: pdfDict([]) })).toThrow(
      /no \/Root/,
    )
    const odd = readPdfDocument(buildClassicPdf(['[1 2]']))
    expect(() => selectCatalog(odd)).toThrow(/not a dictionary/)
  })
})
