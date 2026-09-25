import { describe, expect, it } from 'vitest'

import { parseDebtReportText } from './parseDebtReportText'

describe('parseDebtReportText', () => {
  it('combines the total, the documents and the reference', () => {
    const text = [
      'Presentada solicitud de informe por JANE DOE, con NIF 12345678Z:',
      'por un importe total de 38,86 euros, incluyendo principal',
      '101011406203 0521                           10/03/26 208442981                01/2024    01/2024                         38,86',
      'Código: AAAAA-BBBBB-CCCCC-DDDDD-EEEEE-FFFFF                    Fecha: 25/09/2026',
    ].join('\n')
    expect(parseDebtReportText(text)).toEqual({
      totalExigible: '38,86',
      totalExigibleEuros: 38.86,
      documentos: [
        {
          identificador: '101011406203 0521',
          numeroDocumento: '10/03/26 208442981',
          periodo: '01/2024',
          importe: '38,86',
          importeEuros: 38.86,
        },
      ],
      referenciaVerificacion: 'AAAAA-BBBBB-CCCCC-DDDDD-EEEEE-FFFFF',
    })
  })

  it('defaults the total to zero and the reference to undefined when absent', () => {
    const result = parseDebtReportText('nothing here')
    expect(result.totalExigible).toBe('')
    expect(result.totalExigibleEuros).toBe(0)
    expect(result.documentos).toEqual([])
    expect(result.referenciaVerificacion).toBeUndefined()
  })
})
