import { describe, expect, it } from 'vitest'

import { parseXrefTable } from './parseXrefTable'

describe('parseXrefTable', () => {
  it('reads subsections and the trailer', () => {
    const text =
      'xref\n0 2\n0000000000 65535 f \n0000000015 00000 n \n5 1\n0000000099 00000 n \ntrailer\n<< /Size 6 >>'
    const section = parseXrefTable(text, 0)
    expect(section.isStream).toBe(false)
    expect([...section.entries]).toEqual([
      [0, { type: 'free' }],
      [1, { type: 'offset', offset: 15 }],
      [5, { type: 'offset', offset: 99 }],
    ])
    expect(section.trailer.entries).toHaveLength(1)
  })

  it('refuses malformed tables', () => {
    expect(() => parseXrefTable('xrf', 0)).toThrow(/xref keyword/)
    expect(() => parseXrefTable('xref\n0 0\n', 0)).toThrow(/without trailer/)
    expect(() => parseXrefTable('xref\ntrailer\n[1]', 0)).toThrow(
      /trailer dictionary/,
    )
  })
})
