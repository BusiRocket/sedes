import { deflateSync } from 'node:zlib'

import { testPdfBodies } from './testPdfBodies'

/**
 * A synthetic PDF with every body in one object stream and an xref stream
 * compressed with FlateDecode and the PNG Up predictor (/W [1 2 1]).
 */
export const buildObjectStreamPdf = (
  bodies: readonly string[] = testPdfBodies,
): Buffer => {
  const count = bodies.length
  let data = ''
  const header: string[] = []
  for (const [index, body] of bodies.entries()) {
    header.push(`${String(index + 1)} ${String(data.length)}`)
    data += `${body}\n`
  }
  const head = `${header.join(' ')}\n`
  let text = '%PDF-1.7\n'
  const objStm = text.length
  text += `${String(count + 1)} 0 obj\n<< /Type /ObjStm /N ${String(count)} /First ${String(head.length)} /Length ${String(head.length + data.length)} >>\nstream\n${head}${data}\nendstream\nendobj\n`
  const xref = text.length
  const rows = [
    [0, 0, 255],
    ...bodies.map((_, index) => [2, count + 1, index]),
    [1, objStm, 0],
    [1, xref, 0],
  ]
  let previous = [0, 0, 0, 0]
  const raw = rows.flatMap(([type = 0, field = 0, last = 0]) => {
    const row = [type, field >> 8, field & 0xff, last]
    const encoded = row.map((byte, at) => (byte - (previous[at] ?? 0)) & 0xff)
    previous = row
    return [2, ...encoded]
  })
  const packed = deflateSync(Buffer.from(raw))
  const dict = `<< /Type /XRef /Size ${String(count + 3)} /W [1 2 1] /Root 1 0 R /ID [<AA> <BB>] /Filter /FlateDecode /DecodeParms << /Columns 4 /Predictor 12 >> /Length ${String(packed.length)} >>`
  return Buffer.concat([
    Buffer.from(
      `${text}${String(count + 2)} 0 obj\n${dict}\nstream\n`,
      'latin1',
    ),
    packed,
    Buffer.from(
      `\nendstream\nendobj\nstartxref\n${String(xref)}\n%%EOF\n`,
      'latin1',
    ),
  ])
}
