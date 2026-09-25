import { describe, expect, it } from 'vitest'

import { parseDebtRows } from './parseDebtRows'

const consultaDdasFixture = `
<table class=' celdasConBorde ancho_98 sortable' id='TablaCumpli' title='Relación de deudas'>
<caption>&nbsp;</caption><thead>
<tr>
<th class='ancho_30 texto_cen'>Clave de liquidación</th>
<th class='ancho_30 texto_cen'>Objeto tributario</th>
<th class='ancho_15 texto_cen'>Importe pendiente</th>
<th class='ancho_15 texto_cen'>Importe a ingresar</th>
<th class='ancho_15 texto_cen'>Importe principal (Deudas no seleccionables)</th>
<th class='ancho_15 texto_cen'>Periodo</th>
<th class='ancho_30 texto_cen'>Situación</th>
<th class='ancho_30 texto_cen'>Notas</th>
</tr>
</thead>
<tbody>
<tr></tr>
<tr><td id="clave">A1060012340012345</td><td id="objeto">0A   2024 100 TT-IRPF - DEC.OR EJER:2024 PER:ANUAL</td><td id="imppendiente">639,26</td><td id="impingresar"></td><td id="objeto"></td><td id="periodo">Voluntario</td><td id="situacion">Pendiente de pago en plazo de pago voluntario (ART.62 LGT)</td></tr>
<tr><td id="clave">A1060012340012345</td><td id="objeto">0A   2024 100 TT-IRPF - DEC.OR EJER:2024 PER:ANUAL</td><td id="imppendiente">639,26</td><td id="impingresar"></td><td id="objeto"></td><td id="periodo">Voluntario</td><td id="situacion">Pendiente de pago en plazo de pago voluntario (ART.62 LGT)</td></tr>
<tr><td id="clave">A1060012340054321</td><td id="objeto">3T   2024 130-IRPF PAGO FRA EJER:2024 PER:3T</td><td id="imppendiente">1.287,57</td><td id="impingresar"></td><td id="objeto"></td><td id="periodo">Ejecutivo</td><td id="situacion">Pendiente de pago en fase de embargo</td></tr>
<tr><td id="clave">A1060012340099887</td><td id="objeto">2T   2024 130-IRPF PAGO FRA EJER:2024 PER:2T</td><td id="imppendiente">313,98</td><td id="impingresar">300,00</td><td id="objeto"></td><td id="periodo">Ejecutivo</td><td id="situacion">Aplazada / Fraccionada (ART.65 LGT)</td></tr>
<tr><td id="clave">A1060012340011223</td><td id="objeto">0A   2023 100 TT-IRPF - DEC.OR EJER:2023 PER:ANUAL</td><td id="imppendiente">450,00</td><td id="impingresar"></td><td id="objeto"></td><td id="periodo">Ejecutivo</td><td id="situacion">Pendiente de pago</td></tr>
</tbody>
</table>
<div class='conborde bloque_100'>
<ul class='AEAT_form lista_espaciada'>
<li><strong class='azul'>Clave de liquidación:</strong>&nbsp;<a href='javascript:ejecutar("A1060012340012345")'><span class='notraducir'>A1060012340012345</span></a></li>
<li class='ancho_99'><strong class='azul'>Objeto tributario:</strong>&nbsp;<span class='notraducir'>0A   2024 100 TT-IRPF - DEC.OR EJER:2024 PER:ANUAL</span></li>
<li class='ancho_99'><strong class='azul'>Importe pendiente:</strong>&nbsp;<span class='notraducir'>639,26</span></li>
<li class='dos_cols'><strong class='azul'>Periodo:</strong>&nbsp;<span class='notraducir'>Voluntario</span></li>
<li class='dos_cols'><strong class='azul'>Situación:</strong>&nbsp;<span class='notraducir'>Pendiente de pago en plazo de pago voluntario (ART.62 LGT)</span></li>
</ul>
</div>
`

describe('parseDebtRows', () => {
  it('parses clave, concepto, amounts, periodo and situacion, deduplicated by clave', () => {
    const rows = parseDebtRows(consultaDdasFixture)
    expect(rows).toHaveLength(4)
    expect(rows[0]).toEqual({
      clave: 'A1060012340012345',
      concepto: '0A 2024 100 TT-IRPF - DEC.OR EJER:2024 PER:ANUAL',
      pendiente: { text: '639,26', amount: 639.26 },
      aIngresar: undefined,
      periodoRecaudacion: 'Voluntario',
      situacion: 'Pendiente de pago en plazo de pago voluntario (ART.62 LGT)',
    })
  })

  it('parses a thousands-separated pendiente and a present a-ingresar amount', () => {
    const rows = parseDebtRows(consultaDdasFixture)
    expect(rows[1]?.pendiente).toEqual({ text: '1.287,57', amount: 1287.57 })
    expect(rows[2]?.aIngresar).toEqual({ text: '300,00', amount: 300 })
  })

  it('returns nothing for a page whose rows carry no matching clave', () => {
    expect(parseDebtRows('<table><tr><td>x</td></tr></table>')).toEqual([])
  })

  it('skips a row with a clave but no amount cell', () => {
    const html =
      '<table><tr><td>A1060012340012345</td><td>concepto</td><td>Voluntario</td></tr></table>'
    expect(parseDebtRows(html)).toEqual([])
  })

  it('leaves periodo and situacion undefined when the row carries neither', () => {
    const html =
      '<table><tr><td>A1060012340012345</td><td>concepto</td><td>100,00</td></tr></table>'
    expect(parseDebtRows(html)).toEqual([
      {
        clave: 'A1060012340012345',
        concepto: 'concepto',
        pendiente: { text: '100,00', amount: 100 },
        aIngresar: undefined,
        periodoRecaudacion: undefined,
        situacion: undefined,
      },
    ])
  })
})
