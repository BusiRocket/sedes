import { describe, expect, it } from 'vitest'

import { notificationStateFromRaw } from './notificationStateFromRaw'

describe('notificationStateFromRaw', () => {
  it('maps ACEPTADA to compareced', () => {
    expect(notificationStateFromRaw('ACEPTADA')).toBe('compareced')
  })

  it('maps EXPIRADA to expired', () => {
    expect(notificationStateFromRaw('EXPIRADA')).toBe('expired')
  })

  it('maps RECHAZADA to rejected', () => {
    expect(notificationStateFromRaw('RECHAZADA')).toBe('rejected')
  })

  it('throws on an unrecognized or missing state', () => {
    expect(() => notificationStateFromRaw('WHATEVER')).toThrow(
      /unrecognized realized notification state/,
    )
    expect(() => notificationStateFromRaw(undefined)).toThrow()
  })
})
