import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpResponse } from '../../http/types/HttpResponse'
import { requestRiskReport } from './requestRiskReport'

const { openSession } = vi.hoisted(() => ({
  openSession: vi.fn<() => Promise<void>>().mockResolvedValue(undefined),
}))
vi.mock('../session/openCirbeSession', () => ({
  openCirbeSession: openSession,
}))

const page = (url: string, text: string): HttpResponse => ({
  status: 200,
  url,
  headers: {},
  body: Buffer.from(text),
  text,
})

const start =
  '<IdUnico>11</IdUnico><Dato Nombre="Periodo"></Dato><Dato Nombre="Periodo">2026-07</Dato>'
const list =
  '<IdUnico>12</IdUnico><DatoRegistro Nombre="RegistrosSolicitudesRiesgos"><Dato Nombre="REFERENCIA">R9</Dato><Dato Nombre="ESTADO">Registrada</Dato></DatoRegistro>'
const query = { birthDate: '01-02-1990', email: 'a@b.es' }

const clientAnswering = (
  accepted: string,
): {
  client: HttpClient
  request: ReturnType<typeof vi.fn<HttpClient['request']>>
} => {
  const request = vi
    .fn<HttpClient['request']>()
    .mockResolvedValueOnce(page('https://aps.bde.es/s', start))
    .mockResolvedValueOnce(page('https://aps.bde.es/p', ''))
    .mockResolvedValueOnce(page('https://aps.bde.es/a', accepted))
    .mockResolvedValueOnce(page('https://aps.bde.es/l', list))
  return { client: { request, cookie: () => undefined }, request }
}

describe('requestRiskReport', () => {
  it('registers the request and lists it', async () => {
    const { client, request } = clientAnswering(
      '<EstadoPresentacion>PeticionInformeRiesgo#Informacion</EstadoPresentacion>',
    )
    const sleep = vi.fn<(ms: number) => Promise<void>>().mockResolvedValue()

    const result = await requestRiskReport(client, query, sleep)

    expect(openSession).toHaveBeenCalledWith(client)
    expect(result).toMatchObject({
      registered: true,
      presentationState: 'PeticionInformeRiesgo#Informacion',
      periodo: '2026-07',
      errors: [],
      requests: [{ referencia: 'R9', estado: 'Registrada' }],
    })
    expect(sleep).toHaveBeenCalledWith(5000)
    expect(request.mock.calls[1]?.[0]).toMatch(/execution=e1s1&ajaxSource/)
    expect(request.mock.calls[2]?.[0]).toMatch(/Aceptar\?execution=e1s2$/)
  })

  it('reports a flow that died with its error flags', async () => {
    const { client } = clientAnswering(
      '<EstadoPresentacion>Final_Operacion</EstadoPresentacion><Dato Nombre="mostrarErrorFecha">true</Dato>',
    )

    const result = await requestRiskReport(client, query, async () => {
      await Promise.resolve()
    })

    expect(result.registered).toBe(false)
    expect(result.errors).toEqual(['mostrarErrorFecha'])
  })

  it('refuses an invalid query before any request', async () => {
    const { client, request } = clientAnswering('')

    await expect(
      requestRiskReport(client, { ...query, birthDate: '1990-02-01' }),
    ).rejects.toThrow(/--nacimiento/)
    expect(request).not.toHaveBeenCalled()
  })
})
