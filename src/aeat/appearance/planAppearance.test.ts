import { describe, expect, it } from 'vitest'

import { planAppearance } from './planAppearance'
import type { AeatNotification } from './types/AeatNotification'

const pending: AeatNotification = {
  ncc: '123456',
  concepto: 'LIQ',
  tipo: 'Notificación',
  titular: 'T',
  destinatario: 'D',
  fechaEmision: '2026-09-20',
  fechaNotificacion: '',
  modo: '',
  leida: false,
}

describe('planAppearance', () => {
  it('says there is nothing pending', () => {
    const result = planAppearance([], { nif: 'X', confirm: false })
    expect(result.plan).toEqual([])
    expect(result.notes).toEqual([
      'No pending notification at the AEAT sede for this holder.',
    ])
  })

  it('asks for --id when there are candidates', () => {
    const result = planAppearance([pending], { nif: 'X', confirm: false })
    expect(result.plan).toEqual([])
    expect(result.notes[0]).toMatch(/--id/)
  })

  it('plans a pending notification with downloads', () => {
    const result = planAppearance([pending], {
      nif: 'X',
      ncc: '123456',
      outDir: '/tmp/o',
      confirm: false,
    })
    expect(result.notes).toEqual([])
    expect(result.plan).toHaveLength(4)
    expect(result.plan[1]).toMatch(/deadline/)
  })

  it('notes a notification that is not pending and one without --out', () => {
    const result = planAppearance([pending], {
      nif: 'X',
      ncc: '999999',
      confirm: true,
    })
    expect(result.notes[0]).toMatch(/not pending/)
    expect(result.plan.at(-1)).toMatch(/Without --out/)
  })
})
