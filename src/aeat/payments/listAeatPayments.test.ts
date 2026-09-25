import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpResponse } from '../../http/types/HttpResponse'
import { listAeatPayments } from './listAeatPayments'

const base = 'https://www1.agenciatributaria.gob.es/wlpl'

const page = (text: string, status = 200): HttpResponse => ({
  status,
  url: `${base}/x`,
  headers: {},
  body: Buffer.from(text),
  text,
})

const misPagosHtml = `
<span id="user-name" class="aeat--username">JANE DOE</span>
<table>
<tr><td>Liquidación</td><td>010</td><td>1026220000001</td><td>200,00 €</td><td>2100</td><td>06/06/2026</td><td><a href='${base}/OVPP-PAGO/ImpresionPDF?nrc=1026220000001ABCDEFGHI'>Descargar</a></td></tr>
<tr><td>Tasa</td><td>791</td><td>7915000000003</td><td>55,70 €</td><td>0049</td><td>10/06/2026</td><td><a href='${base}/OVPP-PAGO/ImpresionPDF?nrc=7915000000003STUVWXYZA'>Descargar</a></td></tr>
</table>
`

const buildRequest = () =>
  vi.fn<HttpClient['request']>(async (url) => {
    if (url.endsWith('/BUGC-JDIT/MdcAcceso')) return Promise.resolve(page(''))
    if (url.endsWith('/OVPP-PAGO/MisPagos'))
      return Promise.resolve(page(misPagosHtml))
    if (url.includes('/OVPP-PAGO/ImpresionPDF?nrc='))
      return Promise.resolve(page('%PDF-1.4 fixture'))
    throw new Error(`unexpected request: ${url}`)
  })

describe('listAeatPayments', () => {
  let dir: string | undefined

  afterEach(async () => {
    if (dir) await rm(dir, { recursive: true, force: true })
    dir = undefined
  })

  it('lists the payments with the holder and a cents-exact total', async () => {
    const request = buildRequest()
    const client: HttpClient = { request, cookie: () => undefined }

    const report = await listAeatPayments(client, '12345678Z', undefined)

    expect(report.nif).toBe('12345678Z')
    expect(report.entity).toBe('JANE DOE')
    expect(report.payments.map((payment) => payment.justificante)).toEqual([
      '1026220000001',
      '7915000000003',
    ])
    expect(report.total).toBe(255.7)
    expect(report.payments[0]?.pdfPath).toBeUndefined()
    expect(request).toHaveBeenCalledTimes(2)
  })

  it('downloads every receipt when an output directory is given', async () => {
    dir = await mkdtemp(join(tmpdir(), 'papeleo-aeat-'))
    const request = buildRequest()
    const client: HttpClient = { request, cookie: () => undefined }

    const report = await listAeatPayments(client, '12345678Z', dir)

    expect(report.payments.map((payment) => payment.pdfPath)).toEqual([
      join(dir, 'aeat-pago-1026220000001ABCDEFGHI.pdf'),
      join(dir, 'aeat-pago-7915000000003STUVWXYZA.pdf'),
    ])
    expect(request).toHaveBeenCalledTimes(4)
  })

  it('fails when the session is refused', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(page('', 403))
    const client: HttpClient = { request, cookie: () => undefined }

    await expect(
      listAeatPayments(client, '12345678Z', undefined),
    ).rejects.toThrow(/session refused/)
  })
})
