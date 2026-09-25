import { describe, expect, it } from 'vitest'

import { parseAppearanceConfirmation } from './parseAppearanceConfirmation'

describe('parseAppearanceConfirmation', () => {
  it('reads concepto, fecha and the CSV', () => {
    const html = `<dl><dt>Concepto:</dt><dd>LIQ. EN EJECUTIVA A0000000000000001</dd>
      <dt>Fecha notificaci&oacute;n:</dt><dd>26/09/2026</dd></dl>
      <a href="https://www1.agenciatributaria.gob.es/wlpl/KATA-APLI/cotejo/CotejoDocIdSv?CSV=ABCD1234EFGH5678">Acuse</a>`
    expect(parseAppearanceConfirmation(html)).toEqual({
      concepto: 'LIQ. EN EJECUTIVA A0000000000000001',
      fechaNotificacion: '2026-09-26',
      csv: 'ABCD1234EFGH5678',
    })
  })

  it('leaves unknown fields undefined', () => {
    expect(parseAppearanceConfirmation('<p>ok</p>')).toEqual({
      concepto: undefined,
      fechaNotificacion: undefined,
      csv: undefined,
    })
  })
})
