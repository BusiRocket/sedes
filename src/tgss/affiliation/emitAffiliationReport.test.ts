import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpResponse } from '../../http/types/HttpResponse'
import { emitAffiliationReport } from './emitAffiliationReport'

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

const header =
  '<CvgiTbCorreo><nombre>correo</nombre></CvgiTbCorreo>' +
  '<NOM_solicitante>NOMBRE</NOM_solicitante><AP1_solicitante>UNO</AP1_solicitante>' +
  '<IP3_solicitante>00000000T</IP3_solicitante><NAF_Ciudadano>100000000001</NAF_Ciudadano>'

const landingUrl = 'https://sp.seg-social.es/ProsaInternet/OnlineAccess?ok=1'
const postFormUrl =
  'https://sp.seg-social.es/ProsaInternet/OnlineAccessUtf8;jsessionid=S1'

describe('emitAffiliationReport', () => {
  let dir: string | undefined

  afterEach(async () => {
    if (dir) await rm(dir, { recursive: true, force: true })
    dir = undefined
  })

  it('downloads the informe the entry screen already carries when there is no action', async () => {
    dir = await mkdtemp(join(tmpdir(), 'sedes-inaf-'))
    const entryXml =
      `<ProsaXMLData>${header}<MESSAGES><MESSAGE><TEXTO><![CDATA[Informe generado correctamente.]]></TEXTO></MESSAGE></MESSAGES>` +
      '<PREVIEWS><PREVIEW SECUENCIAL="1" TYPE="INFORME" IDEMBEDDED="ID_INFORME"/></PREVIEWS></ProsaXMLData>'
    const pdf = Buffer.from('%PDF-1.7 situacion')
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(page(landingUrl, prosaHtml('t0', entryXml)))
      .mockResolvedValueOnce({ ...page('x', ''), body: pdf })
    const client: HttpClient = { request, cookie: () => 'S1' }

    const result = await emitAffiliationReport(
      client,
      { app: 'INAF0013', kind: 'situacion', notes: ['n'] },
      dir,
    )

    expect(result).toEqual({
      holder: 'NOMBRE UNO',
      nif: '00000000T',
      naf: '100000000001',
      messages: ['Informe generado correctamente.'],
      secuencial: '1',
      pdfPath: join(dir, 'tgss-situacion-100000000001.pdf'),
      bytes: pdf.length,
      notes: ['n'],
    })
    expect(request.mock.calls[0]?.[0]).toContain('ARQ.IDAPP=INAF0013')
    expect(request.mock.calls[1]?.[0]).toBe(
      'https://sp.seg-social.es/ProsaInternet/ViewDocUtf8;jsessionid=S1?SECUENCIAL=1&TYPEVIEW=INFORME',
    )
  })

  it('presses the action with its fields and downloads an attached documento', async () => {
    const generatedXml =
      '<ProsaXMLData><ATTACHMENTS><ATTACHMENT EXT="pdf" SECUENCIAL="2"/></ATTACHMENTS></ProsaXMLData>'
    const pdf = Buffer.from('%PDF-1.7 alta')
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(
        page(landingUrl, prosaHtml('t0', '<ProsaXMLData/>')),
      )
      .mockResolvedValueOnce(page(postFormUrl, prosaHtml('t1', generatedXml)))
      .mockResolvedValueOnce({ ...page('x', ''), body: pdf })
    const client: HttpClient = { request, cookie: () => 'S1' }

    const result = await emitAffiliationReport(
      client,
      {
        app: 'INAF0009',
        kind: 'alta',
        action: 'ACEPTAR',
        fields: { fecha: '25/09/2026' },
        notes: [],
      },
      undefined,
    )

    expect(result).toEqual({
      holder: undefined,
      nif: undefined,
      naf: undefined,
      messages: [],
      secuencial: '2',
      pdfPath: undefined,
      bytes: pdf.length,
      notes: [],
    })
    expect(request.mock.calls[1]?.[1]).toMatchObject({
      method: 'POST',
      form: {
        'ARQ.SPM.TICKET': 't0',
        fecha: '25/09/2026',
        'SPM.ACC.ACEPTAR': 'ACEPTAR',
      },
    })
    expect(request.mock.calls[2]?.[0]).toContain(
      'SECUENCIAL=2&TYPEVIEW=DOCUMENTO',
    )
  })

  it('throws with the portal message when no report was generated', async () => {
    const refusedXml =
      '<ProsaXMLData><MESSAGES><MESSAGE><TEXTO><![CDATA[Usuario no Autorizado]]></TEXTO></MESSAGE></MESSAGES></ProsaXMLData>'
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(page(landingUrl, prosaHtml('t0', refusedXml)))
    const client: HttpClient = { request, cookie: () => 'S1' }

    await expect(
      emitAffiliationReport(
        client,
        { app: 'INAF0003', kind: 'x', notes: [] },
        undefined,
      ),
    ).rejects.toThrow(/Usuario no Autorizado/)
    expect(request).toHaveBeenCalledTimes(1)
  })
})
