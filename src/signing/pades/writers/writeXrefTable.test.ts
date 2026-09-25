import { describe, expect, it } from 'vitest'

import { buildClassicPdf } from '../fixtures/buildClassicPdf'
import { readPdfDocument } from '../parsers/readPdfDocument'
import { writeXrefTable } from './writeXrefTable'

describe('writeXrefTable', () => {
  it('writes 20-byte entries and a trailer chained with /Prev', () => {
    const doc = readPdfDocument(buildClassicPdf())
    const offsets = [
      { num: 1, gen: 0, offset: 500 },
      { num: 4, gen: 0, offset: 600 },
    ]
    const text = writeXrefTable({
      doc,
      offsets,
      xrefOffset: 700,
      size: 5,
    }).toString('latin1')
    expect(text).toContain(
      'xref\n1 1\n0000000500 00000 n \n4 1\n0000000600 00000 n \n',
    )
    expect(text).toContain(
      `trailer\n<< /Size 5 /Root 1 0 R /ID [<AA> <BB>] /Prev ${String(doc.startXref)} >>\nstartxref\n700\n%%EOF\n`,
    )
  })
})
