import { describe, expect, it } from 'vitest'

import type { NotificationApiItem } from '../types/NotificationApiItem'
import { toNotification } from './toNotification'

const item: NotificationApiItem = {
  identifier: '2699394202927',
  concept: 'Notificacion administrativa',
  emitterEntity: 'Agencia Estatal de Administracion Tributaria',
  availabilityDate: '2026-02-10T21:07:46+01:00',
  nifTitular: '12345678Z',
}

describe('toNotification', () => {
  it('maps a validated item to the listing shape, guessing the source', () => {
    expect(
      toNotification(item, { state: 'pending', expiresAt: '2026-03-10' }),
    ).toEqual({
      id: '2699394202927',
      subject: 'Notificacion administrativa',
      issuer: 'Agencia Estatal de Administracion Tributaria',
      holderNif: '12345678Z',
      holderName: undefined,
      createdAt: '2026-02-10T21:07:46+01:00',
      expiresAt: '2026-03-10',
      state: 'pending',
      kind: undefined,
      source: 'aeat',
    })
  })

  it('leaves holderNif and expiresAt undefined when the item has none', () => {
    const result = toNotification(
      { ...item, nifTitular: undefined },
      { state: 'compareced' },
    )
    expect(result.holderNif).toBeUndefined()
    expect(result.expiresAt).toBeUndefined()
  })
})
