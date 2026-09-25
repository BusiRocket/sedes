import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../../http/types/HttpClient'
import { fetchInformativeDetail } from './fetchInformativeDetail'

describe('fetchInformativeDetail', () => {
  it('GETs the expediente detail at level 1', async () => {
    const request = vi.fn<HttpClient['request']>(async () =>
      Promise.resolve({
        status: 200,
        url: '',
        headers: {},
        body: Buffer.from('detail'),
        text: 'detail',
      }),
    )
    const client: HttpClient = { request, cookie: () => undefined }

    expect(
      await fetchInformativeDetail(client, 'B00000000', '2025190000001'),
    ).toBe('detail')
    expect(request).toHaveBeenCalledWith(
      'https://www1.agenciatributaria.gob.es/wlpl/SCGI-DTRA/DetalleExpedienteOServlet?nif=B00000000&exp=2025190000001&niv=1',
    )
  })
})
