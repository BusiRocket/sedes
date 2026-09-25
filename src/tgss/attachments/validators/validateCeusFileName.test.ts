import { describe, expect, it } from 'vitest'

import { validateCeusFileName } from './validateCeusFileName'

describe('validateCeusFileName', () => {
  it('accepts a name of 79 characters', () => {
    const name = `${'a'.repeat(75)}.pdf`
    expect(validateCeusFileName(name)).toBe(name)
  })

  it('refuses a name of 80 characters', () => {
    expect(() => validateCeusFileName(`${'a'.repeat(76)}.pdf`)).toThrow(
      /80 characters; CEUS accepts at most 79/,
    )
  })
})
