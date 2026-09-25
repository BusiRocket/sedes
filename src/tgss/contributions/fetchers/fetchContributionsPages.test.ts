import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../../http/types/HttpClient'
import type { HttpResponse } from '../../../http/types/HttpResponse'
import { fetchContributionsPages } from './fetchContributionsPages'

const screen = (
  ticket: string,
  regimen: string,
  next: '0' | '1',
): HttpResponse => {
  const text =
    `<html><input type="hidden" id="ARQ.SPM.TICKET" value="${ticket}"/><script id="xml" type="text/plain">` +
    `<ProsaXMLData><enBYC><anio>2025</anio><regimen>${regimen}</regimen><listado>` +
    '<filaBYC><mes>ENERO</mes><base>1,00</base><cuota>2,00</cuota><rec>0,00</rec><marcaSSSEPE> </marcaSSSEPE></filaBYC>' +
    `</listado></enBYC><dtPg><btSig><![CDATA[${next}]]></btSig></dtPg></ProsaXMLData></script></html>`
  return { status: 200, url: 'x', headers: {}, body: Buffer.from(text), text }
}

const session = { ticket: 't0', sessionId: 'S1', xml: '' }

describe('fetchContributionsPages', () => {
  it('selects the year and follows PAGINA_SIGUIENTE until the last régimen', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(screen('t1', 'AUTONOMOS', '1'))
      .mockResolvedValueOnce(screen('t2', 'GENERAL', '0'))
    const client: HttpClient = { request, cookie: () => undefined }

    const result = await fetchContributionsPages(client, session, '2025')

    expect(result.pages.map((page) => page.regimen)).toEqual([
      'AUTONOMOS',
      'GENERAL',
    ])
    expect(result.session.ticket).toBe('t2')
    expect(request.mock.calls[0]?.[1]).toMatchObject({
      form: {
        'ARQ.SPM.TICKET': 't0',
        anio: '2025',
        'SPM.ACC.AC_CONTINUAR_SELECCION_ANIO': 'AC_CONTINUAR_SELECCION_ANIO',
      },
    })
    expect(request.mock.calls[1]?.[1]).toMatchObject({
      form: {
        'ARQ.SPM.TICKET': 't1',
        'SPM.ACC.PAGINA_SIGUIENTE': 'PAGINA_SIGUIENTE',
      },
    })
  })

  it('stops at maxPages even when the screen offers more', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(screen('t9', 'LOOP', '1'))
    const client: HttpClient = { request, cookie: () => undefined }

    const result = await fetchContributionsPages(client, session, '2025', 3)

    expect(result.pages).toHaveLength(3)
    expect(request).toHaveBeenCalledTimes(3)
  })
})
