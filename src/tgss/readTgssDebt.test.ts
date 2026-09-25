import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../http/HttpClient'
import type { HttpResponse } from '../http/HttpResponse'
import { readTgssDebt } from './readTgssDebt'

const page = (url: string, text: string): HttpResponse => ({
  status: 200,
  url,
  headers: {},
  body: Buffer.from(text),
  text,
})

const prosaHtml = (ticket: string, xml: string): string =>
  `<html><input type="hidden" id="ARQ.SPM.TICKET" value="${ticket}"/>` +
  `<script id="xml" type="text/plain">${xml}</script></html>`

const postFormUrl =
  'https://sp.seg-social.es/ProsaInternet/OnlineAccessUtf8;jsessionid=S1'
const viewDocUrl =
  'https://sp.seg-social.es/ProsaInternet/ViewDocUtf8;jsessionid=S1'

const loginPages = (): HttpResponse[] => [
  // the IdP chooser: no form, answered by the empty POST to the IPCE option
  page(
    'https://idp.seg-social.es/PGIS/Login',
    '<a href="/PGIS/Login?seleccion=IPCE">Certificado</a>',
  ),
  page(
    'https://idp.seg-social.es/PGIS/Login?seleccion=IPCE',
    '<form action="https://ipce.seg-social.es/IPCE/Login">' +
      '<input type="hidden" name="SAMLRequest" value="req1"></form>',
  ),
  page(
    'https://sp.seg-social.es/ProsaInternet/OnlineAccess?ok=1',
    prosaHtml('t0', '<ProsaXMLData/>'),
  ),
]

describe('readTgssDebt', () => {
  let dir: string | undefined

  afterEach(async () => {
    if (dir) await rm(dir, { recursive: true, force: true })
    dir = undefined
  })

  it('reports no debt without downloading anything', async () => {
    const noDebtXml =
      '<MESSAGES><MESSAGE><TEXTO><![CDATA[NO SE HA ENCONTRADO DEUDA PARA EL IDENTIFICADOR SOLICITADO]]></TEXTO></MESSAGE></MESSAGES>'
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(loginPages()[0] as HttpResponse)
      .mockResolvedValueOnce(loginPages()[1] as HttpResponse)
      .mockResolvedValueOnce(loginPages()[2] as HttpResponse)
      .mockResolvedValueOnce(page(postFormUrl, prosaHtml('t1', noDebtXml)))
    const client: HttpClient = {
      request,
      cookie: () => 'S1',
    }

    const result = await readTgssDebt(client, '12345678Z', undefined)

    expect(result).toEqual({
      nif: '12345678Z',
      hasDebt: false,
      message: 'NO SE HA ENCONTRADO DEUDA PARA EL IDENTIFICADOR SOLICITADO',
      notes: ['one emission per subject and day'],
    })
    expect(request).toHaveBeenCalledTimes(4)
  })

  it('downloads and writes the PDF, and reports the debt the XML carried', async () => {
    const readyXml = [
      '<ProsaXMLData>',
      '<DOCDocumento>20260032162911</DOCDocumento>',
      '<TEXTO><![CDATA[',
      'por un importe total de 38,86 euros',
      '101011406203 0521                           10/03/26 208442981                01/2024    01/2024                         38,86',
      'Código: AAAAA-BBBBB-CCCCC-DDDDD-EEEEE-FFFFF',
      ']]></TEXTO>',
      '</ProsaXMLData>',
    ].join('\n')
    const continuarXml =
      '<ProsaXMLData><tipoEjecucion>O</tipoEjecucion></ProsaXMLData>'
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(loginPages()[0] as HttpResponse)
      .mockResolvedValueOnce(loginPages()[1] as HttpResponse)
      .mockResolvedValueOnce(loginPages()[2] as HttpResponse)
      .mockResolvedValueOnce(page(postFormUrl, prosaHtml('t1', continuarXml)))
      .mockResolvedValueOnce(page(postFormUrl, prosaHtml('t2', readyXml)))
      .mockResolvedValueOnce(page(viewDocUrl, '%PDF-1.4 fixture'))
    const client: HttpClient = { request, cookie: () => 'S1' }
    dir = await mkdtemp(join(tmpdir(), 'sedes-tgss-'))

    const result = await readTgssDebt(client, '12345678Z', dir)

    expect(request).toHaveBeenCalledTimes(6)
    expect(result.hasDebt).toBe(true)
    expect(result.pdfPath).toBe(join(dir, 'tgss-deuda-12345678Z.pdf'))
    expect(result.report).toEqual({
      totalExigible: '38,86',
      totalExigibleEuros: 38.86,
      documentos: [
        {
          identificador: '101011406203 0521',
          numeroDocumento: '10/03/26 208442981',
          periodo: '01/2024',
          importe: '38,86',
          importeEuros: 38.86,
        },
      ],
      referenciaVerificacion: 'AAAAA-BBBBB-CCCCC-DDDDD-EEEEE-FFFFF',
    })
    expect(result.notes).toEqual(['one emission per subject and day'])
  })

  it('does not write a PDF when no --out directory was given', async () => {
    const continuarXml =
      '<ProsaXMLData><tipoEjecucion>O</tipoEjecucion></ProsaXMLData>'
    const readyXml =
      '<ProsaXMLData><DOCDocumento>1</DOCDocumento></ProsaXMLData>'
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(loginPages()[0] as HttpResponse)
      .mockResolvedValueOnce(loginPages()[1] as HttpResponse)
      .mockResolvedValueOnce(loginPages()[2] as HttpResponse)
      .mockResolvedValueOnce(page(postFormUrl, prosaHtml('t1', continuarXml)))
      .mockResolvedValueOnce(page(postFormUrl, prosaHtml('t2', readyXml)))
      .mockResolvedValueOnce(page(viewDocUrl, '%PDF-1.4 fixture'))
    const client: HttpClient = { request, cookie: () => 'S1' }

    const result = await readTgssDebt(client, '12345678Z', undefined)

    expect(result.hasDebt).toBe(true)
    expect(result.pdfPath).toBeUndefined()
    expect(result.report).toBeUndefined()
  })
})
