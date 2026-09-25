import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../../http/types/HttpClient'
import type { HttpResponse } from '../../../http/types/HttpResponse'
import { acceptPrivacyConditions } from './acceptPrivacyConditions'

const page = (url: string, text: string): HttpResponse => ({
  status: 200,
  url,
  headers: {},
  body: Buffer.from(text),
  text,
})

describe('acceptPrivacyConditions', () => {
  it('posts the ajax privacy event on the given snapshot', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(page('https://aps.bde.es/p', ''))
    const client: HttpClient = { request, cookie: () => undefined }

    await acceptPrivacyConditions(
      client,
      { executionKey: 'e1s1', idUnico: '9' },
      'e1s1',
    )

    expect(request.mock.calls[0]?.[0]).toBe(
      'https://aps.bde.es/cir_www/PeticionInformeRiesgo/PeticionInformeRiesgo/PeticionInformeRiesgo/CondicionesPrivacidad?execution=e1s1&ajaxSource=true',
    )
    expect(request.mock.calls[0]?.[1]?.form).toMatchObject({
      CheckCondicionesPrivacidad: 'true',
      _eventId: 'CondicionesPrivacidad',
      IdUnico: '9',
      'Paginacion.NumeroRegistros': '1',
    })
  })
})
