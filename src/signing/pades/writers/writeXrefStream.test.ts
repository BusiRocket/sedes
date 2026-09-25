import { describe, expect, it } from 'vitest'

import { buildObjectStreamPdf } from '../fixtures/buildObjectStreamPdf'
import { readPdfDocument } from '../parsers/readPdfDocument'
import { readXrefSection } from '../parsers/readXrefSection'
import { writeXrefStream } from './writeXrefStream'

describe('writeXrefStream', () => {
  it('writes an xref stream that lists itself and reads back', () => {
    const doc = readPdfDocument(buildObjectStreamPdf())
    const offsets = [{ num: 1, gen: 0, offset: 10 }]
    const bytes = writeXrefStream({ doc, offsets, xrefOffset: 0, size: 6 })
    const text = bytes.toString('latin1')
    expect(text).toContain(
      '/Type /XRef /Size 7 /Index [1 1 6 1] /W [1 4 2] /Root 1 0 R',
    )
    expect(text).toContain(`/Prev ${String(doc.startXref)}`)
    const section = readXrefSection(bytes, text, 0)
    expect(section.entries.get(1)).toEqual({ type: 'offset', offset: 10 })
    expect(section.entries.get(6)).toEqual({ type: 'offset', offset: 0 })
  })
})
