import { describe, expect, it } from 'vitest'

import { sha256Base64 } from './sha256Base64'

describe('sha256Base64', () => {
  it('hashes strings and bytes alike', () => {
    expect(sha256Base64('abc')).toBe(
      'ungWv48Bz+pBQUDeXa4iI7ADYaOWF3qctBD/YfIAFa0=',
    )
    expect(sha256Base64(Buffer.from('abc'))).toBe(sha256Base64('abc'))
  })
})
