import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../../http/types/HttpClient'
import type { HttpResponse } from '../../../http/types/HttpResponse'
import { releaseReportFile } from './releaseReportFile'

const page = (url: string, text: string): HttpResponse => ({
  status: 200,
  url,
  headers: {},
  body: Buffer.from(text),
  text,
})

describe('releaseReportFile', () => {
  it('posts the muestraFicheroIAS event', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(page('https://aps.bde.es/r', ''))
    const client: HttpClient = { request, cookie: () => undefined }

    await releaseReportFile(client, { executionKey: 'e1s4', idUnico: '3' })
    await releaseReportFile(client, { executionKey: undefined, idUnico: '3' })

    expect(request.mock.calls[0]?.[0]).toMatch(
      /mostrarFichero\/muestraFicheroIAS\?execution=e1s4$/,
    )
    expect(request.mock.calls[0]?.[1]?.form).toEqual({
      _eventId: 'muestraFicheroIAS',
      IdUnico: '3',
    })
    expect(request.mock.calls[1]?.[0]).toMatch(/execution=e1s1$/)
  })
})
