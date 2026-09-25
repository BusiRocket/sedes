import { describe, expect, it } from 'vitest'

import { parseContributionsPage } from './parseContributionsPage'

describe('parseContributionsPage', () => {
  it('reads the year, the régimen, the rows and the paging flag', () => {
    const xml =
      '<enBYC><anio>2025</anio><regimen>RÉGIMEN ESPECIAL TRABAJADORES AUTÓNOMOS</regimen>' +
      '<listado><filaBYC><mes>ENERO</mes><base>1,00</base><cuota>2,00</cuota><rec>0,00</rec><marcaSSSEPE> </marcaSSSEPE></filaBYC></listado></enBYC>' +
      '<dtPg><btAnt><![CDATA[0]]></btAnt><btSig><![CDATA[1]]></btSig><numPag>1</numPag></dtPg>'

    expect(parseContributionsPage(xml)).toEqual({
      anio: '2025',
      regimen: 'RÉGIMEN ESPECIAL TRABAJADORES AUTÓNOMOS',
      rows: [{ mes: 'ENERO', base: 1, cuota: 2, recargo: 0, sepe: false }],
      hasNext: true,
    })
  })

  it('has no next page without the paging block', () => {
    expect(parseContributionsPage('<enBYC/>')).toEqual({
      anio: '',
      regimen: '',
      rows: [],
      hasNext: false,
    })
  })
})
