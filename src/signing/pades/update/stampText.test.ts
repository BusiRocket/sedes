import { describe, expect, it } from 'vitest'

import { stampText } from './stampText'

describe('stampText', () => {
  it('keeps latin-1, escapes delimiters and replaces the rest', () => {
    expect(stampText('Núñez (a\\b) €')).toBe('(Núñez \\(a\\\\b\\) ?)')
  })
})
