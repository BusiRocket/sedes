import { describe, expect, it } from 'vitest'

import { buildClassicPdf } from '../fixtures/buildClassicPdf'
import { readPdfDocument } from '../parsers/readPdfDocument'
import { pdfRaw } from './pdfRaw'
import { pdfRefTo } from './pdfRefTo'
import { resolvePdfValue } from './resolvePdfValue'

describe('resolvePdfValue', () => {
  const doc = readPdfDocument(buildClassicPdf())

  it('follows a reference', () => {
    expect(resolvePdfValue(doc, pdfRefTo(1))).toMatchObject({ kind: 'dict' })
  })

  it('returns direct values unchanged', () => {
    expect(resolvePdfValue(doc, pdfRaw('1'))).toEqual(pdfRaw('1'))
    expect(resolvePdfValue(doc, undefined)).toBeUndefined()
  })
})
