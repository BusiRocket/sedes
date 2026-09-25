import { describe, expect, it } from 'vitest'

import { mapDeferralPlan } from './mapDeferralPlan'

describe('mapDeferralPlan', () => {
  it('walks every XV207A01 screen with the values that would be sent', () => {
    const plan = mapDeferralPlan(
      {
        nif: '00000000T',
        plazos: 12,
        garantia: 'exenta',
        documento: '/x/s.pdf',
      },
      { path: '/x/s.pdf', fileName: 's.pdf', bytes: 9 },
    )
    const text = plan.join('\n')
    expect(plan).toHaveLength(12)
    for (const action of [
      'CONTINUAR',
      'DATOSTELEMATICOS',
      'SIGUIENTEPa1',
      'IRAAMORT',
      'SIGUIENTEPa2',
      'IRAEXENCIONES',
      'IRAGARANTIAS',
      'ADJUNTAR',
      'ACEPTARDATOS',
      'FIRMAR',
    ])
      expect(text).toContain(`SPM.ACC.${action}`)
    expect(text).toContain('NIF 00000000T')
    expect(text).toContain('12 instalments')
    expect(text).toContain('DOCUMENTO0=s.pdf (9 bytes)')
  })
})
