import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../../http/types/HttpClient'
import { fetchDebtDetail } from './fetchDebtDetail'

describe('fetchDebtDetail', () => {
  it('POSTs DetalleDda with the clave and the CONS_DDAS origin fields', async () => {
    const request = vi.fn<HttpClient['request']>().mockResolvedValue({
      status: 200,
      url: 'https://www1.agenciatributaria.gob.es/wlpl/SRVO-JDIT/DetalleDda',
      headers: {},
      body: Buffer.alloc(0),
      text: '<html>detail</html>',
    })
    const client: HttpClient = { request, cookie: () => undefined }
    const html = await fetchDebtDetail(client, '12345678Z', 'A1060012340012345')
    expect(html).toBe('<html>detail</html>')
    expect(request).toHaveBeenCalledWith(
      'https://www1.agenciatributaria.gob.es/wlpl/SRVO-JDIT/DetalleDda',
      {
        method: 'POST',
        form: {
          fnif: '12345678Z',
          fliquidacion: 'A1060012340012345',
          faccion: 'DETALLE_DDA',
          faccionboton: '',
          faccionorigen: 'CONS_DDAS',
          faccionorigen2: 'CONS_DDAS',
          fmigas: '1',
          fnddasemb: '3',
          fcostas: '0',
        },
        defaultCharset: 'iso-8859-15',
      },
    )
  })
})
