import { describe, expect, it } from 'vitest'

import { parseDebtDocumentRows } from './parseDebtDocumentRows'

describe('parseDebtDocumentRows', () => {
  it('parses a single-month row', () => {
    const line =
      '101011406203 0521                           10/03/26 208442981                01/2024    01/2024                         38,86'
    expect(parseDebtDocumentRows(line)).toEqual([
      {
        identificador: '101011406203 0521',
        numeroDocumento: '10/03/26 208442981',
        periodo: '01/2024',
        importe: '38,86',
        importeEuros: 38.86,
      },
    ])
  })

  it('parses a multi-month row and skips non-row lines', () => {
    const text = [
      '     IDENTIFICADOR   Nº DOCUMENTO   PERIODO   IMPORTE',
      '101011406203 2300                           10/08/25 219951448                06/2021    09/2021                    1.662,94',
      '                                                            IMPORTE TOTAL 1.662,94 EUR',
    ].join('\n')
    expect(parseDebtDocumentRows(text)).toEqual([
      {
        identificador: '101011406203 2300',
        numeroDocumento: '10/08/25 219951448',
        periodo: '06/2021-09/2021',
        importe: '1.662,94',
        importeEuros: 1662.94,
      },
    ])
  })

  it('returns an empty array when there are no document rows', () => {
    expect(parseDebtDocumentRows('nothing to see here')).toEqual([])
  })
})
