import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpResponse } from '../../http/types/HttpResponse'
import { fetchRequestsList } from './fetchRequestsList'

const page = (url: string, text: string): HttpResponse => ({
  status: 200,
  url,
  headers: {},
  body: Buffer.from(text),
  text,
})

describe('fetchRequestsList', () => {
  it('posts the list flow and reads its state', async () => {
    const xml =
      '<IdUnico>5</IdUnico><Dato Nombre="flowExecutionKey">e1s1</Dato>'
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(page('https://aps.bde.es/l', xml))
    const client: HttpClient = { request, cookie: () => undefined }

    const list = await fetchRequestsList(client)

    expect(request.mock.calls[0]?.[0]).toBe(
      'https://aps.bde.es/cir_www/ConsultaSolicitudesRiesgos',
    )
    expect(list).toEqual({ state: { executionKey: 'e1s1', idUnico: '5' }, xml })
  })

  it('throws on the WAF page', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(page('https://aps.bde.es/l', 'URL rechazada'))
    const client: HttpClient = { request, cookie: () => undefined }

    await expect(fetchRequestsList(client)).rejects.toThrow(
      /ConsultaSolicitudesRiesgos did not answer an IAS screen/,
    )
  })
})
