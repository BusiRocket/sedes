import { describe, expect, it } from 'vitest'

import { buildClassicPdf } from '../fixtures/buildClassicPdf'
import { buildObjectStreamPdf } from '../fixtures/buildObjectStreamPdf'
import { indirectObject } from '../objects/indirectObject'
import { pdfRaw } from '../objects/pdfRaw'
import { readPdfDocument } from '../parsers/readPdfDocument'
import { readPdfObject } from '../parsers/readPdfObject'
import { appendUpdate } from './appendUpdate'

describe('appendUpdate', () => {
  it('keeps the original bytes and makes new objects reachable, per xref kind', () => {
    for (const original of [buildClassicPdf(), buildObjectStreamPdf()]) {
      const doc = readPdfDocument(original)
      const updated = appendUpdate(doc, [indirectObject(9, 0, pdfRaw('(new)'))])
      expect(updated.subarray(0, original.length)).toEqual(original)
      const reopened = readPdfDocument(updated)
      expect(reopened.usesXrefStream).toBe(doc.usesXrefStream)
      expect(readPdfObject(reopened, 9)).toEqual(pdfRaw('(new)'))
      expect(readPdfObject(reopened, 2)).toMatchObject({ kind: 'dict' })
    }
  })

  it('adds a newline when the source does not end with one', () => {
    const original = buildClassicPdf().subarray(0, -1)
    const updated = appendUpdate(readPdfDocument(original), [
      indirectObject(4, 0, pdfRaw('1')),
    ])
    expect(
      updated.toString('latin1', original.length, original.length + 8),
    ).toBe('\n4 0 obj')
  })
})
