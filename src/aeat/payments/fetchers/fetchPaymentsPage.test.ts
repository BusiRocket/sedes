import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../../http/types/HttpClient'
import { fetchPaymentsPage } from './fetchPaymentsPage'

describe('fetchPaymentsPage', () => {
  it('GETs MisPagos decoding Windows-1252 by default', async () => {
    const request = vi.fn<HttpClient['request']>().mockResolvedValue({
      status: 200,
      url: 'https://www1.agenciatributaria.gob.es/wlpl/OVPP-PAGO/MisPagos',
      headers: {},
      body: Buffer.alloc(0),
      text: '<table></table>',
    })
    const client: HttpClient = { request, cookie: () => undefined }

    await expect(fetchPaymentsPage(client)).resolves.toBe('<table></table>')
    expect(request).toHaveBeenCalledWith(
      'https://www1.agenciatributaria.gob.es/wlpl/OVPP-PAGO/MisPagos',
      { defaultCharset: 'windows-1252' },
    )
  })
})
