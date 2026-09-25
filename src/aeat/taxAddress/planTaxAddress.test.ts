import { describe, expect, it } from 'vitest'

import { taxAddressRequest } from './fixtures/taxAddressRequest'
import { planTaxAddress } from './planTaxAddress'

describe('planTaxAddress', () => {
  it('describes each step with and without a complemento', () => {
    expect(planTaxAddress(taxAddressRequest)[3]).toMatch(/NUMERO 3, LOCAL 1/)
    const plan = planTaxAddress({
      ...taxAddressRequest,
      complemento: undefined,
    })
    expect(plan[3]).toMatch(/NUMERO 3;/)
    expect(plan.at(-1)).toMatch(/filed/)
  })
})
