import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpResponse } from '../../http/types/HttpResponse'
import { readInformative } from './readInformative'
import type { InformativeFiling } from './types/InformativeFiling'

const page = (text: string): HttpResponse => ({
  status: 200,
  url: '',
  headers: {},
  body: Buffer.from(text),
  text,
})

const filing: InformativeFiling = {
  justificante: '1900000000001',
  expediente: '2025190000001',
  periodo: '0A',
  fechaPresentacion: '2026-01-20',
  complementaria: false,
  sustitutiva: false,
  estado: 'Presentada',
}
const query = { modelo: '190', ejercicio: '2025' }

const buildClient = (detail: string): HttpClient => ({
  request: vi.fn<HttpClient['request']>(async (url) => {
    if (url.includes('/DetalleExpedienteOServlet?'))
      return Promise.resolve(page(detail))
    if (url.includes('/CotejoDocIdSv?CSV=CSV123456789012'))
      return Promise.resolve(page('%PDF-1.4 receipt'))
    throw new Error(`unexpected request: ${url}`)
  }),
  cookie: () => undefined,
})

describe('readInformative', () => {
  let dir: string | undefined

  afterEach(async () => {
    if (dir) await rm(dir, { recursive: true, force: true })
    dir = undefined
  })

  it('adds the CSV without fetching the PDF when there is no outDir', async () => {
    const client = buildClient('<a href="x?CSV=CSV123456789012">ver</a>')
    const result = await readInformative({
      client,
      nif: 'B00000000',
      query,
      filing,
      outDir: undefined,
    })
    expect(result.csv).toBe('CSV123456789012')
    expect(result.pdfPath).toBeUndefined()
  })

  it('writes the PDF with outDir', async () => {
    dir = await mkdtemp(join(tmpdir(), 'informativas-'))
    const client = buildClient('CSV=CSV123456789012')
    const result = await readInformative({
      client,
      nif: 'B00000000',
      query,
      filing,
      outDir: dir,
    })
    expect(result.pdfPath).toBe(join(dir, 'aeat-190-2025-2025190000001.pdf'))
  })

  it('leaves csv undefined when the detail carries none', async () => {
    const client = buildClient('<p>sin CSV</p>')
    const result = await readInformative({
      client,
      nif: 'B00000000',
      query,
      filing,
      outDir: '/nowhere',
    })
    expect(result.csv).toBeUndefined()
    expect(result.pdfPath).toBeUndefined()
  })
})
