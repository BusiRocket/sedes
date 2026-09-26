import { describe, expect, it } from 'vitest'

import { parseGrids } from './parseGrids'

const grid = (id: string, titles: string[], cells: string[]): string =>
  `<div class="columnas_rejilla"><table><tr>${titles.map((title) => `<td>${title}</td>`).join('')}</tr></table></div>
<div></div><table class="rich-table marcoRichTable" id="${id}"><tbody><tr class="rich-table-row "><td>${cells.join('</td><td>')}</td></tr></tbody></table>`

describe('parseGrids', () => {
  it('pairs each title strip with the table after it', () => {
    const html =
      grid(
        'j_id137:tasas',
        ['N&ordm;. carta de pago', 'Importe'],
        ['05', '33,10'],
      ) +
      grid(
        'panelModelo:tablaIncidencias',
        ['C&oacute;digo', 'Imp. pendiente'],
        ['09', '382,18'],
      )
    expect(parseGrids(html)).toEqual([
      {
        id: 'j_id137:tasas',
        headers: ['Nº. carta de pago', 'Importe'],
        rows: [['05', '33,10']],
      },
      {
        id: 'panelModelo:tablaIncidencias',
        headers: ['Código', 'Imp. pendiente'],
        rows: [['09', '382,18']],
      },
    ])
  })
})
