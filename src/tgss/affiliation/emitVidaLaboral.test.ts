import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpResponse } from '../../http/types/HttpResponse'
import { emitVidaLaboral } from './emitVidaLaboral'

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

const entryXml =
  '<ProsaXMLData><nombre><![CDATA[NOMBRE APELLIDO UNO]]></nombre>' +
  '<NAF_Ciudadano>100000000001</NAF_Ciudadano></ProsaXMLData>'

const landing = (): HttpResponse =>
  page(
    'https://sp.seg-social.es/ProsaInternet/OnlineAccess?ok=1',
    prosaHtml('t0', entryXml),
  )

const desde = '01/01/2018'
const hasta = '25/09/2026'
const emissionNote =
  'the informe is emitted on request; it changes nothing about the holder'

const postFormUrl =
  'https://sp.seg-social.es/ProsaInternet/OnlineAccessUtf8;jsessionid=S1'

describe('emitVidaLaboral', () => {
  let dir: string | undefined

  afterEach(async () => {
    if (dir) await rm(dir, { recursive: true, force: true })
    dir = undefined
  })

  it('logs into INAF0011, posts the dates, downloads the informe and writes it', async () => {
    dir = await mkdtemp(join(tmpdir(), 'papeleo-vl-'))
    const generatedXml =
      '<ProsaXMLData><MESSAGES><MESSAGE><TEXTO><![CDATA[Informe generado correctamente]]></TEXTO></MESSAGE></MESSAGES>' +
      '<SCREEN_REPORTS><PREVIEWS><PREVIEW IDEMBEDDED="Informe" SECUENCIAL="2"/></PREVIEWS></SCREEN_REPORTS></ProsaXMLData>'
    const pdf = Buffer.from('%PDF-1.7 vida laboral')
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(landing())
      .mockResolvedValueOnce(page(postFormUrl, prosaHtml('t1', generatedXml)))
      .mockResolvedValueOnce({ ...page('x', ''), body: pdf })
    const client: HttpClient = { request, cookie: () => 'S1' }

    const result = await emitVidaLaboral(client, { desde, hasta }, dir)

    expect(result).toEqual({
      holder: 'NOMBRE APELLIDO UNO',
      naf: '100000000001',
      desde,
      hasta,
      messages: ['Informe generado correctamente'],
      secuencial: '2',
      pdfPath: join(dir, 'tgss-vida-laboral-100000000001.pdf'),
      bytes: pdf.length,
      notes: [emissionNote],
    })
    expect(request.mock.calls[0]?.[0]).toContain('ARQ.IDAPP=INAF0011')
    expect(request.mock.calls[1]?.[1]).toMatchObject({
      method: 'POST',
      form: {
        'ARQ.SPM.TICKET': 't0',
        fechaDesde: desde,
        fechaHasta: '25/09/2026',
        'SPM.ACC.AC_GENERAR_FECHAS': 'AC_GENERAR_FECHAS',
      },
    })
    expect(request.mock.calls[2]?.[0]).toBe(
      'https://sp.seg-social.es/ProsaInternet/ViewDocUtf8;jsessionid=S1?SECUENCIAL=2&TYPEVIEW=INFORME',
    )
  })

  it('throws with the portal message when no informe was generated', async () => {
    const refusedXml =
      '<ProsaXMLData><MESSAGES><MESSAGE><TEXTO><![CDATA[Fecha hasta anterior a fecha desde]]></TEXTO></MESSAGE></MESSAGES></ProsaXMLData>'
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(landing())
      .mockResolvedValueOnce(page(postFormUrl, prosaHtml('t1', refusedXml)))
    const client: HttpClient = { request, cookie: () => 'S1' }

    await expect(
      emitVidaLaboral(
        client,
        { desde: '01/01/2026', hasta: '01/01/2018' },
        undefined,
      ),
    ).rejects.toThrow(/Fecha hasta anterior a fecha desde/)
    expect(request).toHaveBeenCalledTimes(2)
  })

  it('refuses dates that are not DD/MM/AAAA before touching the portal', async () => {
    const request = vi.fn<HttpClient['request']>()
    const client: HttpClient = { request, cookie: () => 'S1' }

    await expect(
      emitVidaLaboral(
        client,
        { desde: '2018-01-01', hasta: '01/01/2026' },
        undefined,
      ),
    ).rejects.toThrow(/DD\/MM\/AAAA/)
    expect(request).not.toHaveBeenCalled()
  })

  it('names the file after the holder when the screen carries no NAF, and after nothing when it carries neither', async () => {
    dir = await mkdtemp(join(tmpdir(), 'papeleo-vl-'))
    const generatedXml =
      '<ProsaXMLData><PREVIEW SECUENCIAL="1"/></ProsaXMLData>'
    const pdf = Buffer.from('%PDF-1.7 x')
    const run = async (entry: string): Promise<string | undefined> => {
      const request = vi
        .fn<HttpClient['request']>()
        .mockResolvedValueOnce(
          page(
            'https://sp.seg-social.es/ProsaInternet/OnlineAccess?ok=1',
            prosaHtml('t0', entry),
          ),
        )
        .mockResolvedValueOnce(page(postFormUrl, prosaHtml('t1', generatedXml)))
        .mockResolvedValueOnce({ ...page('x', ''), body: pdf })
      const client: HttpClient = { request, cookie: () => 'S1' }
      const result = await emitVidaLaboral(client, { desde, hasta }, dir)
      return result.pdfPath
    }

    expect(
      await run('<ProsaXMLData><nombre>NOMBRE DOS</nombre></ProsaXMLData>'),
    ).toBe(join(dir, 'tgss-vida-laboral-NOMBRE_DOS.pdf'))
    expect(await run('<ProsaXMLData/>')).toBe(
      join(dir, 'tgss-vida-laboral-holder.pdf'),
    )
  })

  it('reports "no message" when the refusal carries none', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(landing())
      .mockResolvedValueOnce(
        page(postFormUrl, prosaHtml('t1', '<ProsaXMLData/>')),
      )
    const client: HttpClient = { request, cookie: () => 'S1' }

    await expect(
      emitVidaLaboral(client, { desde, hasta }, undefined),
    ).rejects.toThrow(/no informe in the response \(no message\)/)
  })
})
