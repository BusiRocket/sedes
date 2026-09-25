import { testPdfBodies } from './testPdfBodies'

/** A synthetic PDF whose objects 1..n are `bodies`, with a classic xref table and a /Root 1 0 R trailer. */
export const buildClassicPdf = (
  bodies: readonly string[] = testPdfBodies,
): Buffer => {
  let text = '%PDF-1.7\n'
  const offsets: number[] = []
  bodies.forEach((body, index) => {
    offsets.push(text.length)
    text += `${String(index + 1)} 0 obj\n${body}\nendobj\n`
  })
  const xref = text.length
  const rows = offsets.map(
    (offset) => `${String(offset).padStart(10, '0')} 00000 n \n`,
  )
  text += `xref\n0 ${String(bodies.length + 1)}\n0000000000 65535 f \n${rows.join('')}`
  text += `trailer\n<< /Size ${String(bodies.length + 1)} /Root 1 0 R /ID [<AA> <BB>] >>\n`
  text += `startxref\n${String(xref)}\n%%EOF\n`
  return Buffer.from(text, 'latin1')
}
