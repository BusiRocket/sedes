import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../../http/types/HttpClient'
import type { HttpResponse } from '../../../http/types/HttpResponse'
import { openDownloadFlow } from './openDownloadFlow'

const page = (url: string, text: string): HttpResponse => ({
  status: 200,
  url,
  headers: {},
  body: Buffer.from(text),
  text,
})

describe('openDownloadFlow', () => {
  it('re-posts the chosen row on the list snapshot', async () => {
    const xml =
      '<IdUnico>2</IdUnico><Dato Nombre="flowExecutionKey">e1s2</Dato>'
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(page('https://aps.bde.es/d', xml))
    const client: HttpClient = { request, cookie: () => undefined }

    const step = await openDownloadFlow(
      client,
      { state: { executionKey: 'e1s1', idUnico: '1' }, xml: '' },
      { REFERENCIA: 'R1', ESTADO: 'Resuelta' },
    )

    expect(step.state).toEqual({ executionKey: 'e1s2', idUnico: '2' })
    expect(request.mock.calls[0]?.[0]).toMatch(
      /ConsultaEstadoRiesgos\/Descargar\?execution=e1s1$/,
    )
    expect(request.mock.calls[0]?.[1]?.form).toMatchObject({
      'RegistrosSolicitudesRiesgosSeleccionado.REFERENCIA': 'R1',
      'RegistrosSolicitudesRiesgosSeleccionado.FECHAOBTENCION': '',
      _eventId: 'Descargar',
      IdUnico: '1',
    })
  })

  it('falls back to the first snapshot key', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(page('https://aps.bde.es/d', '<IdUnico>2</IdUnico>'))
    const client: HttpClient = { request, cookie: () => undefined }

    await openDownloadFlow(
      client,
      { state: { executionKey: undefined, idUnico: '1' }, xml: '' },
      {},
    )

    expect(request.mock.calls[0]?.[0]).toMatch(/execution=e1s1$/)
  })
})
