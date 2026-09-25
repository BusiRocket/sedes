import { pdfDictGet } from '../objects/pdfDictGet'
import { pdfRawNumber } from '../objects/pdfRawNumber'
import type { PdfDocument } from '../types/PdfDocument'
import type { XrefEntry } from '../types/XrefEntry'
import { findStartXref } from './findStartXref'
import { readXrefSection } from './readXrefSection'

/**
 * Open a PDF for an incremental update: follow /Prev (and a hybrid file's
 * /XRefStm) from the last startxref, newest entries winning.
 */
export const readPdfDocument = (pdf: Buffer): PdfDocument => {
  const text = pdf.toString('latin1')
  const startXref = findStartXref(text)
  const newest = readXrefSection(pdf, text, startXref)
  const entries = new Map<number, XrefEntry>()
  const pending = [startXref]
  const seen = new Set<number>()
  for (
    let offset = pending.shift();
    offset !== undefined;
    offset = pending.shift()
  ) {
    if (seen.has(offset)) continue
    seen.add(offset)
    const section = readXrefSection(pdf, text, offset)
    for (const [num, entry] of section.entries)
      if (!entries.has(num)) entries.set(num, entry)
    const hybrid = pdfRawNumber(pdfDictGet(section.trailer, 'XRefStm'))
    const previous = pdfRawNumber(pdfDictGet(section.trailer, 'Prev'))
    if (hybrid !== undefined) pending.unshift(hybrid)
    if (previous !== undefined) pending.push(previous)
  }
  if (pdfDictGet(newest.trailer, 'Encrypt'))
    throw new Error('encrypted PDFs are not supported')
  return {
    pdf,
    text,
    entries,
    trailer: newest.trailer,
    startXref,
    usesXrefStream: newest.isStream,
  }
}
