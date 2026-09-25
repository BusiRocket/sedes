import { describe, expect, it } from 'vitest'

import { parseRealizedNotificationPage } from './parseRealizedNotificationPage'

describe('parseRealizedNotificationPage', () => {
  it('translates each item state and leaves expiresAt undefined', () => {
    const result = parseRealizedNotificationPage({
      items: [
        {
          identifier: '2699884302647',
          concept: 'Notificacion administrativa',
          emitterEntity: 'Agencia Estatal de Administracion Tributaria',
          availabilityDate: '2026-02-05T17:23:19+01:00',
          state: 'ACEPTADA',
          nifTitular: 'B12345678',
        },
      ],
    })
    expect(result).toEqual([
      {
        id: '2699884302647',
        subject: 'Notificacion administrativa',
        issuer: 'Agencia Estatal de Administracion Tributaria',
        holderNif: 'B12345678',
        holderName: undefined,
        createdAt: '2026-02-05T17:23:19+01:00',
        expiresAt: undefined,
        state: 'compareced',
        rawState: 'ACEPTADA',
        kind: undefined,
        source: 'aeat',
      },
    ])
  })

  it('keeps an unrecognized raw state as other, with the raw value', () => {
    const [item] = parseRealizedNotificationPage({
      items: [
        {
          identifier: 'X',
          concept: 'C',
          emitterEntity: 'E',
          availabilityDate: '2026-01-01T00:00:00+01:00',
          state: 'BOGUS',
        },
      ],
    })
    expect(item).toMatchObject({ state: 'other', rawState: 'BOGUS' })
  })
})
