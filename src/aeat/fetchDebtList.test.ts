import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../http/HttpClient'
import { fetchDebtList } from './fetchDebtList'

describe('fetchDebtList', () => {
  it('POSTs ConsultaDdas with the SALTAR fields and iso-8859-15 decoding', async () => {
    const request = vi.fn<HttpClient['request']>().mockResolvedValue({
      status: 200,
      url: 'https://www1.agenciatributaria.gob.es/wlpl/SRVO-JDIT/ConsultaDdas',
      headers: {},
      body: Buffer.alloc(0),
      text: '<html>debts</html>',
    })
    const client: HttpClient = { request, cookie: () => undefined }
    const html = await fetchDebtList(client, '12345678Z')
    expect(html).toBe('<html>debts</html>')
    expect(request).toHaveBeenCalledWith(
      'https://www1.agenciatributaria.gob.es/wlpl/SRVO-JDIT/ConsultaDdas',
      {
        method: 'POST',
        form: {
          fnif: '12345678Z',
          faccion: 'CONS_DDAS',
          faccionboton: 'SALTAR',
          flistadoselecc: '',
          ACEPTAR: 'Aceptar',
        },
        defaultCharset: 'iso-8859-15',
      },
    )
  })
})
