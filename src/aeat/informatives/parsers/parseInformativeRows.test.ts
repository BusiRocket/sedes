import { describe, expect, it } from 'vitest'

import { parseInformativeRows } from './parseInformativeRows'

const html = `
<table id="otra"><tr><td>a</td></tr></table>
<table class="t" id='idtablaExped'>
<tr><td>Justificante</td><td>Expediente</td><td>Periodo</td><td>Fecha Presentación</td><td>Complementaria</td><td>Sustitutiva</td><td>Justificante anterior</td><td>Estado</td><td>Detalles</td></tr>
<tr><td>1900000000001</td><td>2025190000001</td><td></td><td>20/01/2026</td><td></td><td></td><td></td><td>Presentada</td><td>1</td></tr>
<tr><td>1900000000002</td><td>2025190000002</td><td></td><td>25/01/2026</td><td>X</td><td></td><td>1900000000001</td><td>Presentada</td><td>1</td></tr>
</table>`

describe('parseInformativeRows', () => {
  it('reads every expediente row of idtablaExped', () => {
    const rows = parseInformativeRows(html)
    expect(rows.map((row) => row.expediente)).toEqual([
      '2025190000001',
      '2025190000002',
    ])
    expect(rows[1]?.complementaria).toBe(true)
  })

  it('is empty without the table', () => {
    expect(parseInformativeRows('<html>sin datos</html>')).toEqual([])
  })
})
