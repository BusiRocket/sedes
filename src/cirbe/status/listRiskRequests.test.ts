import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpResponse } from '../../http/types/HttpResponse'
import { listRiskRequests } from './listRiskRequests'

const page = (url: string, text: string): HttpResponse => ({
  status: 200,
  url,
  headers: {},
  body: Buffer.from(text),
  text,
})

describe('listRiskRequests', () => {
  it('maps the listed rows', async () => {
    const xml =
      '<IdUnico>1</IdUnico><DatoRegistro Nombre="RegistrosSolicitudesRiesgos"><Dato Nombre="REFERENCIA">R1</Dato><Dato Nombre="ESTADO">Registrada</Dato></DatoRegistro>'
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(page('https://aps.bde.es/l', xml))
    const client: HttpClient = { request, cookie: () => undefined }

    expect(await listRiskRequests(client)).toEqual([
      {
        fechaSolicitud: '',
        referencia: 'R1',
        periodo: '',
        estado: 'Registrada',
        fechaObtencion: '',
      },
    ])
  })
})
