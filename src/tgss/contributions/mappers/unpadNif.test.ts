import { describe, expect, it } from 'vitest'

import { unpadNif } from './unpadNif'

describe('unpadNif', () => {
  it('drops the padding down to nine characters and keeps real zeros', () => {
    expect(unpadNif('012345678T')).toBe('12345678T')
    expect(unpadNif('000000000T')).toBe('00000000T')
    expect(unpadNif('X1234567L')).toBe('X1234567L')
  })
})
