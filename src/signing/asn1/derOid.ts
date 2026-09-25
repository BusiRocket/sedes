import { derNode } from './derNode'

/** DER OBJECT IDENTIFIER from its dotted form (`1.2.840.113549.1.7.2`). */
export const derOid = (dotted: string): Buffer => {
  const arcs = dotted.split('.').map(Number)
  const [first = 0, second = 0, ...rest] = arcs
  const bytes: number[] = [first * 40 + second]
  for (const arc of rest) {
    const chunk: number[] = [arc % 128]
    for (
      let value = Math.floor(arc / 128);
      value > 0;
      value = Math.floor(value / 128)
    ) {
      chunk.unshift((value % 128) + 128)
    }
    bytes.push(...chunk)
  }
  return derNode(0x06, Buffer.from(bytes))
}
