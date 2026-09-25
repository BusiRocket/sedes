import { describe, expect, it } from 'vitest'

import { buildObjectStreamPdf } from './buildObjectStreamPdf'

describe('buildObjectStreamPdf', () => {
  it('points startxref at an xref stream object', () => {
    const text = buildObjectStreamPdf().toString('latin1')
    const offset = Number(/startxref\n(\d+)/.exec(text)?.[1])
    expect(text.slice(offset, offset + 60)).toContain('/Type /XRef')
    expect(text).toContain('/Type /ObjStm /N 3')
  })
})
