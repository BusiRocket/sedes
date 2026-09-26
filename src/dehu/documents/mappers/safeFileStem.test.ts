import { describe, expect, it } from 'vitest'

import { safeFileStem } from './safeFileStem'

describe('safeFileStem', () => {
  it('keeps ordinary identifiers', () => {
    expect(safeFileStem('N123-abc_4.v2')).toBe('N123-abc_4.v2')
  })

  it('neutralises separators and leading dots', () => {
    expect(safeFileStem('../../etc/passwd')).toBe('_.._etc_passwd')
    expect(safeFileStem('a\\b')).toBe('a_b')
    expect(safeFileStem('..')).toBe('notification')
    expect(safeFileStem('')).toBe('notification')
  })
})
