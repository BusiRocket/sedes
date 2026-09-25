import { describe, expect, it } from 'vitest'

import { parsePdfArray } from './parsePdfArray'
import { parsePdfValue } from './parsePdfValue'

describe('parsePdfArray', () => {
  it('reads items up to ]', () => {
    expect(parsePdfArray({ text: '1 /A]', pos: 0 }, parsePdfValue)).toEqual({
      kind: 'array',
      items: [
        { kind: 'raw', text: '1' },
        { kind: 'raw', text: '/A' },
      ],
    })
  })

  it('refuses an unterminated array', () => {
    expect(() => parsePdfArray({ text: '1 2', pos: 0 }, parsePdfValue)).toThrow(
      /unterminated/,
    )
  })
})
