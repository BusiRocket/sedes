import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpResponse } from '../../http/types/HttpResponse'
import { emitContributionsReport } from './emitContributionsReport'

const html = (ticket: string, xml: string): HttpResponse => {
  const text =
    `<html><input type="hidden" id="ARQ.SPM.TICKET" value="${ticket}"/>` +
    `<script id="xml" type="text/plain">${xml}</script></html>`
  return { status: 200, url: 'x', headers: {}, body: Buffer.from(text), text }
}

const entryXml =
  '<ProsaXMLData><PersonaFisica><nombre>NOMBRE APELLIDO</nombre><NAF CODIGO="100000000001"></NAF><NIF CODIGO="000000000T"></NIF></PersonaFisica>' +
  '<cAnio><ELEMENTO><CODELEMENTO>2026</CODELEMENTO></ELEMENTO><ELEMENTO><CODELEMENTO>2025</CODELEMENTO></ELEMENTO></cAnio></ProsaXMLData>'

const yearXml =
  '<ProsaXMLData><enBYC><anio>2025</anio><regimen>AUTONOMOS</regimen><listado>' +
  '<filaBYC><mes>ENERO</mes><base>1000,00</base><cuota>300,00</cuota><cuota>300</cuota><rec>0,00</rec><marcaSSSEPE> </marcaSSSEPE></filaBYC>' +
  '</listado></enBYC><dtPg><btSig><![CDATA[0]]></btSig></dtPg></ProsaXMLData>'

const printedXml =
  '<ProsaXMLData><MESSAGES><MESSAGE><TEXTO><![CDATA[Informe generado.]]></TEXTO></MESSAGE></MESSAGES>' +
  '<PREVIEWS><PREVIEW SECUENCIAL="1" TYPE="INFORME"/></PREVIEWS></ProsaXMLData>'

describe('emitContributionsReport', () => {
  let dir: string | undefined

  afterEach(async () => {
    if (dir) await rm(dir, { recursive: true, force: true })
    dir = undefined
  })

  it('selects the year, reads the régimen rows, prints the informe and writes it', async () => {
    dir = await mkdtemp(join(tmpdir(), 'sedes-byc-'))
    const pdf = Buffer.from('%PDF-1.7 bases')
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(html('t0', entryXml))
      .mockResolvedValueOnce(html('t1', yearXml))
      .mockResolvedValueOnce(html('t2', printedXml))
      .mockResolvedValueOnce({ ...html('x', ''), body: pdf })
    const client: HttpClient = { request, cookie: () => 'S1' }

    const result = await emitContributionsReport(
      client,
      { ejercicio: '2025' },
      dir,
    )

    expect(result).toMatchObject({
      holder: 'NOMBRE APELLIDO',
      nif: '00000000T',
      naf: '100000000001',
      ejercicio: '2025',
      regimenes: [
        {
          anio: '2025',
          regimen: 'AUTONOMOS',
          rows: [
            { mes: 'ENERO', base: 1000, cuota: 300, recargo: 0, sepe: false },
          ],
          hasNext: false,
        },
      ],
      messages: ['Informe generado.'],
      secuencial: '1',
      pdfPath: join(dir, 'tgss-bases-2025-100000000001.pdf'),
      bytes: pdf.length,
    })
    expect(request.mock.calls[0]?.[0]).toContain('ARQ.IDAPP=AESRCUS3')
    expect(request.mock.calls[2]?.[1]).toMatchObject({
      form: {
        'ARQ.SPM.TICKET': 't1',
        anioSel: '2025',
        'SPM.ACC.AC_IMPRIMIR_INFORME_BASES_Y_CUOTAS':
          'AC_IMPRIMIR_INFORME_BASES_Y_CUOTAS',
      },
    })
    expect(request.mock.calls[3]?.[0]).toContain(
      'SECUENCIAL=1&TYPEVIEW=INFORME',
    )
  })

  it('refuses a year the screen does not offer after one request', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(html('t0', entryXml))
    const client: HttpClient = { request, cookie: () => 'S1' }

    await expect(
      emitContributionsReport(client, { ejercicio: '1990' }, undefined),
    ).rejects.toThrow(/ejercicio 1990 is not offered \(2025-2026\)/)
    expect(request).toHaveBeenCalledTimes(1)
  })
})
