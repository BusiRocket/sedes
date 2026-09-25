import { describe, expect, it } from 'vitest'

import { buildClassicPdf } from '../fixtures/buildClassicPdf'
import { buildObjectStreamPdf } from '../fixtures/buildObjectStreamPdf'
import { serializePdfValue } from '../objects/serializePdfValue'
import type { PdfDocument } from '../types/PdfDocument'
import { readPdfDocument } from './readPdfDocument'
import { readPdfObject } from './readPdfObject'

describe('readPdfObject', () => {
  it('reads objects at an offset and inside an object stream alike', () => {
    for (const pdf of [buildClassicPdf(), buildObjectStreamPdf()]) {
      const doc = readPdfDocument(pdf)
      expect(serializePdfValue(readPdfObject(doc, 2))).toBe(
        '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
      )
    }
  })

  it('refuses objects the xref does not place', () => {
    const doc = readPdfDocument(buildClassicPdf())
    expect(() => readPdfObject(doc, 0)).toThrow(/not in the xref/)
    const broken: PdfDocument = {
      ...doc,
      entries: new Map([
        [1, { type: 'compressed', stream: 9, index: 0 }],
        [2, { type: 'compressed', stream: 3, index: 0 }],
      ]),
    }
    expect(() => readPdfObject(broken, 1)).toThrow(/object stream 9 missing/)
    const notStream: PdfDocument = {
      ...broken,
      entries: new Map([
        ...broken.entries,
        [3, doc.entries.get(3) ?? { type: 'free' as const }],
      ]),
    }
    expect(() => readPdfObject(notStream, 2)).toThrow(/object stream expected/)
  })
})
