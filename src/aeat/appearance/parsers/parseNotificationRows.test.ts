import { describe, expect, it } from 'vitest'

import { parseNotificationRows } from './parseNotificationRows'

const row = (index: number, ncc: string, leida: string): string => `
  <tr  id='filaNum${String(index)}' class='fila_par' >
    <td scope='row' class='texto_cen'><span id='Ccf_1_1'><a href='https://www1.agenciatributaria.gob.es/wlpl/GNNO-JDIT/DetalleSede?ncc=${ncc}' target='_blank'>${ncc}</a></span></td>
    <td scope='row' class='texto_izq'><span id='Ccf_2_1'>LIQ. EN EJECUTIVA  A0000000000000001      </span></td>
    <td scope='row'><span id='Ccf_3_1'>Notificaci&oacute;n</span></td>
    <td scope='row'><span id='Ccf_4_1'>00000000T GARCIA LOPEZ ANA</span></td>
    <td scope='row'><span id='Ccf_5_1'>00000000T GARCIA LOPEZ ANA</span></td>
    <td scope='row'><span id='Ccf_6_1'>15-09-2026</span></td>
    <td scope='row'><span id='Ccf_7_1'>16-09-2026</span></td>
    <td scope='row'><span id='Ccf_8_1'>Electr&oacute;nico accedida</span></td>
    <td scope='row'><span id='Ccf_9_1'>${leida}</span></td>
  </tr>`

describe('parseNotificationRows', () => {
  it('reads every row with its ncc and read flag', () => {
    const html = `<table><thead><tr><th>Id</th></tr></thead><tbody id='tbodyDatos'>${row(0, '1111111111111', 'S&iacute;')}${row(1, '2222222222222', 'No')}</tbody></table>`
    const rows = parseNotificationRows(html)
    expect(rows).toHaveLength(2)
    expect(rows[0]).toEqual({
      ncc: '1111111111111',
      concepto: 'LIQ. EN EJECUTIVA A0000000000000001',
      tipo: 'Notificación',
      titular: '00000000T GARCIA LOPEZ ANA',
      destinatario: '00000000T GARCIA LOPEZ ANA',
      fechaEmision: '2026-09-15',
      fechaNotificacion: '2026-09-16',
      modo: 'Electrónico accedida',
      leida: true,
    })
    expect(rows[1]?.leida).toBe(false)
  })

  it('skips rows without a DetalleSede link and reads the empty notice as none', () => {
    expect(
      parseNotificationRows(
        "<tr id='filaNum0'><td>x</td></tr><p>No se han obtenido resultados para estos datos</p>",
      ),
    ).toEqual([])
  })

  it('leaves missing cells empty', () => {
    const rows = parseNotificationRows(
      "<tr id='filaNum0'><td><a href='DetalleSede?ncc=123456'>123456</a></td></tr>",
    )
    expect(rows[0]).toMatchObject({ ncc: '123456', concepto: '', leida: false })
  })
})
