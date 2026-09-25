import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../../http/types/HttpClient'
import { fetchInformativesPage } from './fetchInformativesPage'

describe('fetchInformativesPage', () => {
  it('POSTs the consultation form', async () => {
    const request = vi.fn<HttpClient['request']>(async () =>
      Promise.resolve({
        status: 200,
        url: '',
        headers: {},
        body: Buffer.from('list'),
        text: 'list',
      }),
    )
    const client: HttpClient = { request, cookie: () => undefined }

    expect(
      await fetchInformativesPage(client, 'B00000000', {
        modelo: '190',
        ejercicio: '2025',
      }),
    ).toBe('list')
    expect(request).toHaveBeenCalledWith(
      'https://www1.agenciatributaria.gob.es/wlpl/SCGI-DTRA/EntradaInternetServlet',
      {
        method: 'POST',
        form: {
          cmb_ejercicio: '2025',
          cmb_nifdeclarante: 'B00000000',
          MODELO: '190',
          fAccion: '1',
          formEntra: 'formEntra',
        },
      },
    )
  })
})
