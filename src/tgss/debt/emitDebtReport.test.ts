import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpResponse } from '../../http/types/HttpResponse'
import type { ProsaSession } from '../session/types/ProsaSession'
import { emitDebtReport } from './emitDebtReport'

const page = (text: string): HttpResponse => ({
  status: 200,
  url: 'https://sp.seg-social.es/ProsaInternet/OnlineAccessUtf8;jsessionid=S1',
  headers: {},
  body: Buffer.from(text),
  text,
})

const prosaPage = (ticket: string, xml: string): string =>
  `<input type="hidden" id="ARQ.SPM.TICKET" value="${ticket}"/>` +
  `<script id="xml" type="text/plain">${xml}</script>`

const session: ProsaSession = {
  ticket: 't0',
  sessionId: 'S1',
  xml: '<ProsaXMLData/>',
}

describe('emitDebtReport', () => {
  it('reports no debt when the Continuar answer carries no tipoEjecucion', async () => {
    const xml =
      '<MESSAGES><MESSAGE><TEXTO><![CDATA[NO SE HA ENCONTRADO DEUDA PARA EL IDENTIFICADOR SOLICITADO]]></TEXTO></MESSAGE></MESSAGES>'
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(page(prosaPage('t1', xml)))
    const client: HttpClient = { request, cookie: () => undefined }

    const outcome = await emitDebtReport(client, session)

    expect(outcome).toEqual({
      hasDebt: false,
      message: 'NO SE HA ENCONTRADO DEUDA PARA EL IDENTIFICADOR SOLICITADO',
    })
    expect(request).toHaveBeenCalledTimes(1)
  })

  it('prints directly when tipoEjecucion is O', async () => {
    const continuarXml =
      '<ProsaXMLData><tipoEjecucion>O</tipoEjecucion>' +
      '<NIFInteresado>12345678Z</NIFInteresado></ProsaXMLData>'
    const readyXml =
      '<ProsaXMLData><DOCDocumento>20260032162911</DOCDocumento></ProsaXMLData>'
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(page(prosaPage('t1', continuarXml)))
      .mockResolvedValueOnce(page(prosaPage('t2', readyXml)))
    const client: HttpClient = { request, cookie: () => undefined }

    const outcome = await emitDebtReport(client, session)

    expect(outcome).toEqual({ hasDebt: true, xml: readyXml })
    expect(request).toHaveBeenCalledTimes(2)
    const secondCall = request.mock.calls[1]?.[1]
    expect(secondCall?.method).toBe('POST')
    expect(secondCall?.form?.['SPM.ACC.IMPRIMIR']).toBe('IMPRIMIR')
  })

  it('confirms first when tipoEjecucion is D, then prints', async () => {
    const continuarXml =
      '<ProsaXMLData><tipoEjecucion>D</tipoEjecucion></ProsaXMLData>'
    const confirmedXml =
      '<ProsaXMLData><tipoEjecucion>O</tipoEjecucion></ProsaXMLData>'
    const readyXml =
      '<ProsaXMLData><DOCDocumento>1</DOCDocumento></ProsaXMLData>'
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(page(prosaPage('t1', continuarXml)))
      .mockResolvedValueOnce(page(prosaPage('t2', confirmedXml)))
      .mockResolvedValueOnce(page(prosaPage('t3', readyXml)))
    const client: HttpClient = { request, cookie: () => undefined }

    const outcome = await emitDebtReport(client, session)

    expect(outcome).toEqual({ hasDebt: true, xml: readyXml })
    expect(request).toHaveBeenCalledTimes(3)
    expect(request.mock.calls[1]?.[1]?.form?.['SPM.ACC.CONFIRMAR']).toBe(
      'CONFIRMAR',
    )
  })

  it('confirms the situation 68 warning when mostrarConfirmacion is S', async () => {
    const continuarXml =
      '<ProsaXMLData><tipoEjecucion>O</tipoEjecucion>' +
      '<mostrarConfirmacion>S</mostrarConfirmacion></ProsaXMLData>'
    const confirmedXml =
      '<ProsaXMLData><tipoEjecucion>O</tipoEjecucion></ProsaXMLData>'
    const readyXml =
      '<ProsaXMLData><DOCDocumento>1</DOCDocumento></ProsaXMLData>'
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(page(prosaPage('t1', continuarXml)))
      .mockResolvedValueOnce(page(prosaPage('t2', confirmedXml)))
      .mockResolvedValueOnce(page(prosaPage('t3', readyXml)))
    const client: HttpClient = { request, cookie: () => undefined }

    const outcome = await emitDebtReport(client, session)

    expect(request.mock.calls[1]?.[1]?.form?.['SPM.ACC.CONFIRMAR_SIT_68']).toBe(
      'CONFIRMAR_SIT_68',
    )
    expect(request).toHaveBeenCalledTimes(3)
    expect(outcome).toEqual({ hasDebt: true, xml: readyXml })
  })

  it('reports no debt when the final screen still shows the no-debt message', async () => {
    const continuarXml =
      '<ProsaXMLData><tipoEjecucion>O</tipoEjecucion></ProsaXMLData>'
    const finalXml =
      '<MESSAGES><MESSAGE><TEXTO><![CDATA[NO SE HA ENCONTRADO DEUDA]]></TEXTO></MESSAGE></MESSAGES>'
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(page(prosaPage('t1', continuarXml)))
      .mockResolvedValueOnce(page(prosaPage('t2', finalXml)))
    const client: HttpClient = { request, cookie: () => undefined }

    const outcome = await emitDebtReport(client, session)

    expect(outcome).toEqual({
      hasDebt: false,
      message: 'NO SE HA ENCONTRADO DEUDA',
    })
  })
})
