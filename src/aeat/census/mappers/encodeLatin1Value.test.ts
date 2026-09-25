import { describe, expect, it } from 'vitest'

import { encodeLatin1Value } from './encodeLatin1Value'

describe('encodeLatin1Value', () => {
  it('leaves unreserved bytes bare', () => {
    expect(encodeLatin1Value('Az09-_.~')).toBe('Az09-_.~')
  })

  it('encodes accents as single Latin-1 bytes and spaces as %20', () => {
    expect(encodeLatin1Value('situación censal')).toBe('situaci%F3n%20censal')
  })
})
