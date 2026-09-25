import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpResponse } from '../../http/types/HttpResponse'
import { downloadNotificationDocuments } from './downloadNotificationDocuments'
import type { Sleep } from './types/Sleep'

vi.mock('../session/loginWithCertificate', () => ({
  loginWithCertificate: vi
    .fn<() => Promise<string>>()
    .mockResolvedValue('TOKEN'),
}))

const json = (status: number, body: unknown, url: string): HttpResponse => {
  const text = JSON.stringify(body)
  return { status, url, headers: {}, body: Buffer.from(text), text }
}

const realizedItem = (identifier: string, sentReference?: string): unknown => ({
  identifier,
  sentReference,
  concept: 'Concept',
  emitterEntity: 'Agencia Estatal de Administracion Tributaria',
  availabilityDate: '2026-02-01T00:00:00+01:00',
  state: 'ACEPTADA',
})

/** Answers the January listing with the given items, every document with a PDF and every voucher with 404. */
const answerFor = (items: readonly unknown[], url: string): HttpResponse => {
  if (url.includes('finalDate%5Bleft_date%5D=01%2F01%2F2026'))
    return json(200, { items }, url)
  if (url.includes('/api/v1/realized_notifications?'))
    return json(200, { items: [] }, url)
  if (url.endsWith('/voucher')) return json(404, {}, url)
  return json(200, { content: 'JVBERg==', name: 'acto.pdf' }, url)
}
const stubRequest = (items: readonly unknown[]) =>
  vi.fn<HttpClient['request']>().mockImplementation(async (url) => {
    await Promise.resolve()
    return answerFor(items, url)
  })

const noSleep = () => vi.fn<Sleep>().mockResolvedValue(undefined)

describe('downloadNotificationDocuments', () => {
  it('downloads document and voucher of every realized notification, pacing between them', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'sedes-dehu-'))
    const request = stubRequest([
      realizedItem('N1', 'R1'),
      realizedItem('N2', 'R2'),
    ])
    const client: HttpClient = { request, cookie: () => undefined }
    const sleep = noSleep()

    const result = await downloadNotificationDocuments(
      client,
      { year: 2026 },
      dir,
      sleep,
    )

    expect(result.year).toBe(2026)
    expect(result.requested).toBe(2)
    expect(result.downloaded.map((d) => d.id)).toEqual(['N1', 'N2'])
    expect(result.downloaded[0]?.files).toEqual([
      {
        kind: 'document',
        status: 'saved',
        path: join(dir, 'N1_document.pdf'),
        bytes: 4,
      },
      { kind: 'voucher', status: 'missing' },
    ])
    expect(sleep.mock.calls.map(([ms]) => ms)).toEqual([1_500])
  })

  it('narrows to the requested identifiers and notes the ones not found', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'sedes-dehu-'))
    const request = stubRequest([
      realizedItem('N1', 'R1'),
      realizedItem('N2', 'R2'),
    ])
    const client: HttpClient = { request, cookie: () => undefined }

    const result = await downloadNotificationDocuments(
      client,
      { year: 2026, ids: ['N2', 'N9'] },
      dir,
      noSleep(),
    )

    expect(result.requested).toBe(1)
    expect(result.downloaded.map((d) => d.reference)).toEqual(['R2'])
    expect(result.notes).toContain(
      "1 requested identifier(s) not among the year's realized notifications",
    )
  })

  it('skips a notification without a sent reference and says so', async () => {
    const request = stubRequest([realizedItem('N3')])
    const client: HttpClient = { request, cookie: () => undefined }

    const result = await downloadNotificationDocuments(
      client,
      { year: 2026 },
      '/nowhere',
      noSleep(),
    )

    expect(result.downloaded).toEqual([])
    expect(result.notes).toContain('N3: no sent reference, skipped')
  })

  it('never requests anything under the pending notifications resource', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'sedes-dehu-'))
    const request = stubRequest([realizedItem('N1', 'R1')])
    const client: HttpClient = { request, cookie: () => undefined }

    await downloadNotificationDocuments(client, { year: 2026 }, dir, noSleep())

    const urls = request.mock.calls.map(([url]) => url)
    expect(urls.length).toBeGreaterThan(0)
    expect(urls.some((url) => url.includes('/api/v1/notifications/'))).toBe(
      false,
    )
    expect(
      urls.filter((url) => url.includes('/realized_notifications/R1/')),
    ).toEqual([
      'https://dehu.redsara.es/api/v1/realized_notifications/R1/document',
      'https://dehu.redsara.es/api/v1/realized_notifications/R1/voucher',
    ])
  })
})
