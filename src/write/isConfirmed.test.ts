import { describe, expect, it } from 'vitest'

import { isConfirmed } from './isConfirmed'

describe('isConfirmed', () => {
  it('accepts only the literal si', () => {
    expect(isConfirmed({ confirmar: 'si' })).toBe(true)
    expect(isConfirmed({ confirmar: 'yes' })).toBe(false)
    expect(isConfirmed({ confirmar: undefined })).toBe(false)
    expect(isConfirmed({})).toBe(false)
  })
})
