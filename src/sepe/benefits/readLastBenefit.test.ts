import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpResponse } from '../../http/types/HttpResponse'
import { readLastBenefit } from './readLastBenefit'

vi.mock('../session/loginWithCertificate', () => ({
  loginWithCertificate: vi.fn(),
}))

const { loginWithCertificate } = await import('../session/loginWithCertificate')

const latin1Page = (text: string): HttpResponse => ({
  status: 200,
  url: 'https://sede.sepe.gob.es/ConsultaPrestacionesAAWWeb/AccesoConsultaAction.do',
  headers: {},
  body: Buffer.from(text, 'latin1'),
  text: '',
})

const client: HttpClient = { request: vi.fn(), cookie: () => undefined }

describe('readLastBenefit', () => {
  it('reads the fields from the landed page, decoded as ISO-8859-1, and derives the remaining days', async () => {
    vi.mocked(loginWithCertificate).mockResolvedValueOnce(
      latin1Page(
        '<input name="situacion" value="BAJA">' +
          '<input name="tipoPrestacion" value="PRESTACIÓN">' +
          '<input name="diasDerecho" value="720"><input name="diasConsumidos" value="300">',
      ),
    )

    const result = await readLastBenefit(client)

    expect(vi.mocked(loginWithCertificate)).toHaveBeenCalledWith(
      client,
      'https://sede.sepe.gob.es/ConsultaPrestacionesAAWWeb/AccesoConsultaAction.do',
    )
    expect(result.fields).toEqual({
      situacion: 'BAJA',
      tipoPrestacion: 'PRESTACIÓN',
      diasDerecho: '720',
      diasConsumidos: '300',
    })
    expect(result.diasRestantes).toBe(420)
    expect(result.message).toBeUndefined()
  })

  it('omits diasRestantes when the day counts are not numeric', async () => {
    vi.mocked(loginWithCertificate).mockResolvedValueOnce(
      latin1Page('<input name="situacion" value="ALTA">'),
    )

    const result = await readLastBenefit(client)

    expect(result.fields).toEqual({ situacion: 'ALTA' })
    expect('diasRestantes' in result).toBe(false)
  })

  it('quotes the screen message when no field is present', async () => {
    vi.mocked(loginWithCertificate).mockResolvedValueOnce(
      latin1Page(
        '<div id="contenido"><p>No consta ningún derecho.</p></div><div id="pie">x</div>',
      ),
    )

    const result = await readLastBenefit(client)

    expect(result.fields).toEqual({})
    expect(result.message).toBe('No consta ningún derecho.')
  })
})
