import { describe, expect, it } from 'vitest'

import { parseAgreementDetail } from './parseAgreementDetail'

const acuAccDetaFixture = `
<html><body>
<h2>Datos del acuerdo</h2>
<p>Acuerdo: 102540306837F (Acuerdo notificado)</p>
<p>Tipo resolución: Concesión</p>
<p>Importe acuerdo: 1.234,56</p>
<p>Fecha notificación: 15-03-2025</p>
<p>Número de plazos: 6</p>
<p>Fecha primer plazo: 05-04-2025</p>
<p>Deuda relacionada: A1060025530032194</p>
<table>
<tr><th>Nº</th><th>Fecha</th><th>Importe</th><th>Estado</th></tr>
<tr><td>1</td><td>05-04-2025</td><td>206,50</td><td>Pendiente</td></tr>
<tr><td>2</td><td>05-05-2025</td><td>206,50</td><td>Pendiente</td></tr>
</table>
</body></html>
`

describe('parseAgreementDetail', () => {
  it('reads the named fields, every liquidation key and the plazos table cells', () => {
    const detail = parseAgreementDetail(acuAccDetaFixture)
    expect(detail.estado).toBe('Acuerdo notificado')
    expect(detail.resolucion).toBe('Concesión')
    expect(detail.importe).toEqual({ text: '1.234,56', amount: 1234.56 })
    expect(detail.notificado).toBe('15-03-2025')
    expect(detail.plazos).toBe('6')
    expect(detail.primerPlazo).toBe('05-04-2025')
    expect(detail.deudas).toEqual(['A1060025530032194'])
    expect(detail.instalments).toEqual([
      ['Nº', 'Fecha', 'Importe', 'Estado'],
      ['1', '05-04-2025', '206,50', 'Pendiente'],
      ['2', '05-05-2025', '206,50', 'Pendiente'],
    ])
  })

  it('leaves the named fields undefined and reports no debts for a page without them', () => {
    const detail = parseAgreementDetail('<p>nothing recognisable here</p>')
    expect(detail.estado).toBeUndefined()
    expect(detail.resolucion).toBeUndefined()
    expect(detail.importe).toBeUndefined()
    expect(detail.deudas).toEqual([])
    expect(detail.instalments).toEqual([])
  })
})
