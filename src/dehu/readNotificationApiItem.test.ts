import { describe, expect, it } from 'vitest'

import { readNotificationApiItem } from './readNotificationApiItem'

describe('readNotificationApiItem', () => {
  it('validates a full pending-shaped item', () => {
    expect(
      readNotificationApiItem({
        identifier: '2699394202927',
        concept: 'Notificacion administrativa',
        emitterEntity: 'Agencia Estatal de Administracion Tributaria',
        availabilityDate: '2026-02-10T21:07:46+01:00',
        expirationDate: '2026-03-10T21:07:46+01:00',
        nifTitular: '12345678Z',
      }),
    ).toEqual({
      identifier: '2699394202927',
      concept: 'Notificacion administrativa',
      emitterEntity: 'Agencia Estatal de Administracion Tributaria',
      availabilityDate: '2026-02-10T21:07:46+01:00',
      nifTitular: '12345678Z',
      expirationDate: '2026-03-10T21:07:46+01:00',
      state: undefined,
    })
  })

  it('validates a realized-shaped item and leaves expirationDate undefined', () => {
    expect(
      readNotificationApiItem({
        identifier: 'N271612747',
        concept: 'REGIMENES SEG. SOCIAL',
        emitterEntity: 'Tesoreria General de la Seguridad Social',
        availabilityDate: '2026-01-28T00:15:25+01:00',
        state: 'ACEPTADA',
      }),
    ).toEqual({
      identifier: 'N271612747',
      concept: 'REGIMENES SEG. SOCIAL',
      emitterEntity: 'Tesoreria General de la Seguridad Social',
      availabilityDate: '2026-01-28T00:15:25+01:00',
      nifTitular: undefined,
      expirationDate: undefined,
      state: 'ACEPTADA',
    })
  })

  it('rejects a value that is not an object', () => {
    expect(readNotificationApiItem('nope')).toBeUndefined()
    expect(readNotificationApiItem(null)).toBeUndefined()
  })

  it('rejects an item missing a required field', () => {
    expect(
      readNotificationApiItem({
        identifier: 'X',
        concept: 'Y',
        emitterEntity: 'Z',
        // availabilityDate missing
      }),
    ).toBeUndefined()
  })
})
