import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../../http/types/HttpClient'
import type { HttpResponse } from '../../../http/types/HttpResponse'
import { submitReportRequest } from './submitReportRequest'

const page = (url: string, text: string): HttpResponse => ({
  status: 200,
  url,
  headers: {},
  body: Buffer.from(text),
  text,
})

describe('submitReportRequest', () => {
  it('posts Aceptar with the birth date and e-mail', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(page('https://aps.bde.es/a', 'done'))
    const client: HttpClient = { request, cookie: () => undefined }

    const answer = await submitReportRequest(client, {
      state: { executionKey: 'e1s1', idUnico: '9' },
      executionKey: 'e1s2',
      query: { birthDate: '01-02-1990', email: 'a@b.es' },
    })

    expect(answer.text).toBe('done')
    expect(request.mock.calls[0]?.[0]).toMatch(/\/Aceptar\?execution=e1s2$/)
    expect(request.mock.calls[0]?.[1]?.form).toMatchObject({
      'DatosPeticion.FechaNacimiento': '01-02-1990',
      'DatosPeticion.CorreoElectronico': 'a@b.es',
      'DatosPeticion.NIE': '',
      _eventId: 'Aceptar',
      IdUnico: '9',
    })
  })
})
