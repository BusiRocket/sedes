import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpResponse } from '../../http/types/HttpResponse'
import { emitSituationCertificate } from './emitSituationCertificate'

vi.mock('../session/loginWithCertificate', () => ({
  loginWithCertificate: vi.fn(),
}))

const { loginWithCertificate } = await import('../session/loginWithCertificate')

const sede = 'https://sede.sepe.gob.es/DServiciosPrestanetWEB/'

const page = (url: string, text: string): HttpResponse => ({
  status: 200,
  url,
  headers: {},
  body: Buffer.from(text, 'latin1'),
  text,
})

const chooserHtml =
  '<form name="tipoCertFormBean" action="/DServiciosPrestanetWEB/tipoCertAction.do">' +
  '<input name="token" value="t1"><input name="textoIRPFMult" value="irpf"><input name="tipo" value=""></form>'
const requestHtml =
  '<form name="DSolicitudForm" action="/DServiciosPrestanetWEB/TipoSolicitudAction.do">' +
  '<input name="token" value="t2"><input name="opcion" value=""></form>'
const downloadHtml =
  '<form name="DescargaCertificadoForm" action="/DServiciosPrestanetWEB/DescargaAction.do">' +
  '<input name="xml" value="&lt;cert&gt;&#241;&lt;/cert&gt;"><input name="huella" value="h"></form>'

describe('emitSituationCertificate', () => {
  let dir: string | undefined

  afterEach(async () => {
    if (dir) await rm(dir, { recursive: true, force: true })
    dir = undefined
    vi.mocked(loginWithCertificate).mockReset()
  })

  it('requires --out before touching the portal', async () => {
    const client: HttpClient = { request: vi.fn(), cookie: () => undefined }

    await expect(emitSituationCertificate(client, undefined)).rejects.toThrow(
      /--out is required/,
    )
    expect(vi.mocked(loginWithCertificate)).not.toHaveBeenCalled()
  })

  it('plays kind, confirmation and download with Latin-1 bodies and writes the PDF', async () => {
    dir = await mkdtemp(join(tmpdir(), 'sedes-sepe-'))
    vi.mocked(loginWithCertificate).mockResolvedValueOnce(
      page(`${sede}CertificadosPrestaWeb.do`, chooserHtml),
    )
    const pdf = Buffer.from('%PDF-1.4 certificado')
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(page(`${sede}tipoCertAction.do`, requestHtml))
      .mockResolvedValueOnce(
        page(`${sede}TipoSolicitudAction.do`, downloadHtml),
      )
      .mockResolvedValueOnce({
        ...page(`${sede}DescargaAction.do`, ''),
        body: pdf,
      })
    const client: HttpClient = { request, cookie: () => undefined }

    const result = await emitSituationCertificate(client, dir)

    expect(request.mock.calls[0]?.[0]).toBe(`${sede}tipoCertAction.do`)
    expect(request.mock.calls[0]?.[1]).toMatchObject({
      body: 'token=t1&tipo=De+situaci%F3n',
      referer: `${sede}CertificadosPrestaWeb.do`,
    })
    expect(request.mock.calls[1]?.[1]).toMatchObject({
      body: 'token=t2&opcion=Aceptar',
    })
    expect(request.mock.calls[2]?.[0]).toBe(`${sede}DescargaAction.do`)
    expect(request.mock.calls[2]?.[1]).toMatchObject({
      body: 'xml=%3Ccert%3E%F1%3C%2Fcert%3E&huella=h',
      headers: { Origin: 'https://sede.sepe.gob.es' },
    })
    expect(result.pdfPath).toBe(join(dir, 'sepe-certificado-situacion.pdf'))
    expect(result.bytes).toBe(pdf.length)
    // the path is the temp file the orchestrator just wrote
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    expect(await readFile(result.pdfPath ?? '')).toEqual(pdf)
  })

  it('throws when the download is not a PDF', async () => {
    vi.mocked(loginWithCertificate).mockResolvedValueOnce(
      page(`${sede}CertificadosPrestaWeb.do`, chooserHtml),
    )
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(page(`${sede}tipoCertAction.do`, requestHtml))
      .mockResolvedValueOnce(
        page(`${sede}TipoSolicitudAction.do`, downloadHtml),
      )
      .mockResolvedValueOnce({
        ...page(`${sede}DescargaAction.do`, 'denegado'),
        status: 403,
      })
    const client: HttpClient = { request, cookie: () => undefined }

    await expect(emitSituationCertificate(client, '/tmp')).rejects.toThrow(
      'SEPE: no PDF in the download (403, 8 bytes)',
    )
  })

  it('names the form that is missing', async () => {
    vi.mocked(loginWithCertificate).mockResolvedValueOnce(
      page(`${sede}CertificadosPrestaWeb.do`, '<p>sin formulario</p>'),
    )
    const client: HttpClient = { request: vi.fn(), cookie: () => undefined }

    await expect(emitSituationCertificate(client, '/tmp')).rejects.toThrow(
      /no tipoCertFormBean form/,
    )
  })
})
