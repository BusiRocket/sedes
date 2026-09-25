import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpResponse } from '../../http/types/HttpResponse'
import { downloadRiskReport } from './downloadRiskReport'

const page = (url: string, text: string): HttpResponse => ({
  status: 200,
  url,
  headers: {},
  body: Buffer.from(text),
  text,
})

const row = (estado: string): string =>
  `<DatoRegistro Nombre="RegistrosSolicitudesRiesgos"><Dato Nombre="REFERENCIA">R1</Dato><Dato Nombre="ESTADO">${estado}</Dato></DatoRegistro>`
const list = (estado: string): string =>
  `<IdUnico>1</IdUnico><Dato Nombre="flowExecutionKey">e1s1</Dato>${row(estado)}`
const files =
  '<IdUnico>2</IdUnico><Dato Nombre="flowExecutionKey">e1s2</Dato><DatoRegistro Nombre="RelacionesRespuestas"><Dato Nombre="TipoRespuesta">Informe Global</Dato></DatoRegistro>'

const global = 'Informe Global'

const stub = (...texts: string[]): HttpClient => {
  const request = vi.fn<HttpClient['request']>()
  for (const text of texts)
    request.mockResolvedValueOnce(page('https://aps.bde.es/x', text))
  return { request, cookie: () => undefined }
}

describe('downloadRiskReport', () => {
  it('walks list, request, file, release and download', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'papeleo-cirbe-'))
    const client = stub(
      list('Resuelta'),
      files,
      '<IdUnico>3</IdUnico><Dato Nombre="Fichero">g.pdf</Dato>',
      '',
      '%PDF-1.4 global',
    )

    const report = await downloadRiskReport(client, global, dir)

    expect(report).toEqual({
      tipo: global,
      fichero: 'g.pdf',
      path: join(dir, 'cirbe-informe-global-r1.pdf'),
      bytes: 15,
    })
  })

  it('answers undefined when no request is resolved', async () => {
    const client = stub(list('Registrada'))

    expect(await downloadRiskReport(client, global, '/x')).toBe(undefined)
  })

  it('answers undefined when the request lacks that file', async () => {
    const client = stub(list('Descargada'), files)

    expect(await downloadRiskReport(client, 'Informe Detallado', '/x')).toBe(
      undefined,
    )
  })

  it('throws when the chosen file has no name', async () => {
    const client = stub(list('Resuelta'), files, '<IdUnico>3</IdUnico>')

    await expect(downloadRiskReport(client, global, '/x')).rejects.toThrow(
      /Informe Global answered no file name/,
    )
  })
})
