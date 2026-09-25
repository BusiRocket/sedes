import { describe, expect, it } from 'vitest'

import { writeTestPdf } from '../attachments/fixtures/writeTestPdf'
import { requestDeferral } from './requestDeferral'

describe('requestDeferral', () => {
  it('returns the plan without executing when not confirmed', async () => {
    const documento = await writeTestPdf('sepa.pdf')
    const result = await requestDeferral(
      { nif: '00000000T', plazos: 6, garantia: 'exenta', documento },
      false,
    )
    expect(result).toMatchObject({
      action: 'tgss aplazamiento',
      executed: false,
    })
    expect(result.plan.join('\n')).toContain('6 instalments')
  })

  it('refuses to submit when confirmed, before any request', async () => {
    const documento = await writeTestPdf('sepa.pdf')
    await expect(
      requestDeferral(
        { nif: '00000000T', plazos: 6, garantia: 'exenta', documento },
        true,
      ),
    ).rejects.toThrow(/cannot submit yet.*Nothing was sent/)
  })
})
