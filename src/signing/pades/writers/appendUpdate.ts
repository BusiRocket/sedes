import type { PdfDocument } from '../types/PdfDocument'
import type { PdfUpdateObject } from '../types/PdfUpdateObject'
import type { XrefOffset } from '../types/XrefOffset'
import { writeXrefStream } from './writeXrefStream'
import { writeXrefTable } from './writeXrefTable'

/** The original bytes followed by the update's objects and an xref section of the source's kind. */
export const appendUpdate = (
  doc: PdfDocument,
  objects: readonly PdfUpdateObject[],
): Buffer => {
  const head =
    doc.pdf.at(-1) === 0x0a
      ? doc.pdf
      : Buffer.concat([doc.pdf, Buffer.from('\n')])
  const offsets: XrefOffset[] = []
  let offset = head.length
  for (const object of objects) {
    offsets.push({ num: object.num, gen: object.gen, offset })
    offset += object.bytes.length
  }
  const size = Math.max(
    ...objects.map((object) => object.num + 1),
    doc.entries.size,
  )
  const input = { doc, offsets, xrefOffset: offset, size }
  const xref = doc.usesXrefStream
    ? writeXrefStream(input)
    : writeXrefTable(input)
  return Buffer.concat([head, ...objects.map((object) => object.bytes), xref])
}
