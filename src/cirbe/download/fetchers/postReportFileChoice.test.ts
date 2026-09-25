import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../../http/types/HttpClient'
import type { HttpResponse } from '../../../http/types/HttpResponse'
import { postReportFileChoice } from './postReportFileChoice'

const page = (url: string, text: string): HttpResponse => ({
  status: 200,
  url,
  headers: {},
  body: Buffer.from(text),
  text,
})

describe('postReportFileChoice', () => {
  it('re-posts the chosen report file', async () => {
    const xml = '<IdUnico>3</IdUnico><Dato Nombre="Fichero">f.pdf</Dato>'
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(page('https://aps.bde.es/s', xml))
    const client: HttpClient = { request, cookie: () => undefined }

    const step = await postReportFileChoice(
      client,
      { state: { executionKey: undefined, idUnico: '2' }, xml: '' },
      { TipoRespuesta: 'Informe Global' },
    )

    expect(step.xml).toBe(xml)
    expect(request.mock.calls[0]?.[0]).toMatch(
      /DescargarSolicitudesRiesgos\/Descargar\?execution=e1s1$/,
    )
    expect(request.mock.calls[0]?.[1]?.form).toMatchObject({
      'RelacionesRespuestasSeleccionado.TipoRespuesta': 'Informe Global',
      'RelacionesRespuestasSeleccionado.Nulo': '',
      _eventId: 'Descargar',
      IdUnico: '2',
    })
  })
})
