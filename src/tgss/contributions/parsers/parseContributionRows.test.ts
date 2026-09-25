import { describe, expect, it } from 'vitest'

import { parseContributionRows } from './parseContributionRows'

describe('parseContributionRows', () => {
  it('maps each month with Spanish amounts as euros and the SEPE mark', () => {
    const xml =
      '<listado><filaBYC><mes>ENERO</mes><base>1234,56</base><cuota>370,37</cuota><cuota>370</cuota><rec>0,00</rec><marcaSSSEPE> </marcaSSSEPE></filaBYC>' +
      '<filaBYC><mes>FEBRERO</mes><base>1.234,56</base><cuota>12,00</cuota><cuota>12</cuota><rec>1,50</rec><marcaSSSEPE>S</marcaSSSEPE></filaBYC></listado>'

    expect(parseContributionRows(xml)).toEqual([
      { mes: 'ENERO', base: 1234.56, cuota: 370.37, recargo: 0, sepe: false },
      { mes: 'FEBRERO', base: 1234.56, cuota: 12, recargo: 1.5, sepe: true },
    ])
  })

  it('defaults a row without amounts to zero', () => {
    expect(
      parseContributionRows('<filaBYC><mes>MARZO</mes></filaBYC>'),
    ).toEqual([{ mes: 'MARZO', base: 0, cuota: 0, recargo: 0, sepe: false }])
    expect(parseContributionRows('<x/>')).toEqual([])
  })
})
