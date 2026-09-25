import { describe, expect, it } from 'vitest'

import { buildClassicPdf } from '../fixtures/buildClassicPdf'
import { buildObjectStreamPdf } from '../fixtures/buildObjectStreamPdf'
import { pdfDictGet } from '../objects/pdfDictGet'
import { readPdfDocument } from './readPdfDocument'

describe('readPdfDocument', () => {
  it('opens a classic PDF', () => {
    const doc = readPdfDocument(buildClassicPdf())
    expect(doc.usesXrefStream).toBe(false)
    expect(doc.entries.get(1)).toMatchObject({ type: 'offset' })
    expect(pdfDictGet(doc.trailer, 'Root')).toEqual({
      kind: 'ref',
      num: 1,
      gen: 0,
    })
  })

  it('opens an xref stream PDF', () => {
    expect(readPdfDocument(buildObjectStreamPdf()).usesXrefStream).toBe(true)
  })

  it('follows /Prev and /XRefStm, newest entries first', () => {
    const base = buildClassicPdf()
    const text = base.toString('latin1')
    const old = text.lastIndexOf('startxref') + 10
    const oldXref = Number(/\d+/.exec(text.slice(old))?.[0])
    const update = `1 0 obj\n<< /Type /Catalog /Pages 2 0 R /New true >>\nendobj\n`
    const at = base.length
    const xref = at + update.length
    const tail = `xref\n1 1\n${String(at).padStart(10, '0')} 00000 n \ntrailer\n<< /Size 4 /Root 1 0 R /Prev ${String(oldXref)} /XRefStm ${String(oldXref)} >>\nstartxref\n${String(xref)}\n%%EOF\n`
    const doc = readPdfDocument(
      Buffer.concat([base, Buffer.from(update + tail)]),
    )
    expect(doc.entries.get(1)).toEqual({ type: 'offset', offset: at })
    expect(doc.entries.get(3)).toMatchObject({ type: 'offset' })
    expect(doc.startXref).toBe(xref)
  })

  it('refuses encrypted PDFs', () => {
    const pdf = buildClassicPdf()
      .toString('latin1')
      .replace('/Root 1 0 R', '/Root 1 0 R /Encrypt 9 0 R')
    expect(() => readPdfDocument(Buffer.from(pdf, 'latin1'))).toThrow(
      /encrypted/,
    )
  })
})
