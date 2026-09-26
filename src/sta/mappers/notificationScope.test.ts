import { describe, expect, it } from 'vitest'

import { notificationScope } from './notificationScope'

describe('notificationScope', () => {
  it('reads role and tab from the dataset name', () => {
    expect(notificationScope('NOTIFICACIONES_ACEPTADA')).toEqual({
      role: 'interesado',
      tab: 'aceptada',
    })
    expect(notificationScope('NOTIFICACIONES_REP_PENDIENTE')).toEqual({
      role: 'representante',
      tab: 'pendiente',
    })
  })

  it('ignores other datasets', () => {
    expect(notificationScope('EXPEDIENTES_FULL_ENCURSO')).toBeUndefined()
  })
})
