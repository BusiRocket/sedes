import { describe, expect, it } from 'vitest'

import { mapAttachmentPlan } from './mapAttachmentPlan'

describe('mapAttachmentPlan', () => {
  it('names every step with the values that would be sent', () => {
    const plan = mapAttachmentPlan(
      { expediente: '000111', documento: '/x/j.pdf', tipo: '1010' },
      { path: '/x/j.pdf', fileName: 'j.pdf', bytes: 42 },
    )
    expect(plan).toHaveLength(7)
    expect(plan.join('\n')).toContain('expediente 000111')
    expect(plan.join('\n')).toContain(
      '#tipoDocumentoOpcional=1010 (Justificante)',
    )
    expect(plan.join('\n')).toContain('#documentoOpcional=j.pdf (42 bytes)')
    expect(plan.join('\n')).toContain('cargarAutoFirmaWPS')
  })
})
