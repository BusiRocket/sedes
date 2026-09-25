import { describe, expect, it } from 'vitest'

import { notificationStateFromRaw } from './notificationStateFromRaw'

describe('notificationStateFromRaw', () => {
  it('maps the portal states the listing knows', () => {
    expect(notificationStateFromRaw('ACEPTADA')).toBe('compareced')
    expect(notificationStateFromRaw('EXPIRADA')).toBe('expired')
    expect(notificationStateFromRaw('RECHAZADA')).toBe('rejected')
    expect(notificationStateFromRaw('REALIZADA_TEU')).toBe('edict')
  })

  it('keeps an unrecognized or missing state as other', () => {
    expect(notificationStateFromRaw('WHATEVER')).toBe('other')
    expect(notificationStateFromRaw(undefined)).toBe('other')
  })
})
