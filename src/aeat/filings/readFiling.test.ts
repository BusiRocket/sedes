import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpResponse } from '../../http/types/HttpResponse'
import { readFiling } from './readFiling'

const page = (text: string, body = Buffer.from(text)): HttpResponse => ({
  status: 200,
  url: 'https://www1.agenciatributaria.gob.es/x',
  headers: {},
  body,
  text,
})

const params = {
  desktopId: 'z_1',
  expediente: '2025303A1',
  verUuid: 'v1',
  query: { modelo: '303', ejercicio: '2025' },
}

describe('readFiling', () => {
  let dir: string | undefined

  afterEach(async () => {
    if (dir) await rm(dir, { recursive: true, force: true })
    dir = undefined
  })

  it('resolves the CSV only when there is no output directory', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(page("src:'x?CSV=ABC'"))
    const client: HttpClient = { request, cookie: () => undefined }

    await expect(readFiling(client, params)).resolves.toEqual({
      expediente: '2025303A1',
      csv: 'ABC',
    })
    expect(request).toHaveBeenCalledTimes(1)
  })

  it('keeps a row whose Ver answers no CSV', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(page('no csv'))
    const client: HttpClient = { request, cookie: () => undefined }

    await expect(
      readFiling(client, { ...params, outDir: '/nowhere' }),
    ).resolves.toEqual({ expediente: '2025303A1', csv: undefined })
  })

  it('downloads and writes the PDF with an output directory', async () => {
    dir = await mkdtemp(join(tmpdir(), 'papeleo-aeat-'))
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(page("src:'x?CSV=ABC'"))
      .mockResolvedValueOnce(page('', Buffer.from('%PDF-1.4 receipt')))
    const client: HttpClient = { request, cookie: () => undefined }

    await expect(
      readFiling(client, { ...params, outDir: dir }),
    ).resolves.toEqual({
      expediente: '2025303A1',
      csv: 'ABC',
      pdfPath: join(dir, 'aeat-303-2025-2025303A1.pdf'),
    })
  })
})
