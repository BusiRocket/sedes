import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpResponse } from '../../http/types/HttpResponse'
import { downloadNotificationFile } from './downloadNotificationFile'
import type { Sleep } from './types/Sleep'

const answer = (status: number, body?: unknown): HttpResponse => {
  const text = body === undefined ? '' : JSON.stringify(body)
  return {
    status,
    url: 'https://dehu.redsara.es/x',
    headers: {},
    body: Buffer.from(text),
    text,
  }
}
const sleep = vi.fn<Sleep>().mockResolvedValue(undefined)

describe('downloadNotificationFile', () => {
  it('saves a 200 answer and reports its size', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'sedes-dehu-'))
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(answer(200, { content: 'JVBERg==', name: 'acto.pdf' }))
    const client: HttpClient = { request, cookie: () => undefined }

    const file = await downloadNotificationFile(
      { client, authData: 'T', reference: 'REF1', kind: 'document' },
      'N1',
      dir,
      sleep,
    )

    expect(file).toEqual({
      kind: 'document',
      status: 'saved',
      path: join(dir, 'N1_document.pdf'),
      bytes: 4,
    })
  })

  it('reports a 404 as missing', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(answer(404))
    const client: HttpClient = { request, cookie: () => undefined }

    expect(
      await downloadNotificationFile(
        { client, authData: 'T', reference: 'REF1', kind: 'voucher' },
        'N1',
        '/nowhere',
        sleep,
      ),
    ).toEqual({ kind: 'voucher', status: 'missing' })
  })

  it('reports an exhausted ladder as failed, never as saved', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(answer(503))
    const client: HttpClient = { request, cookie: () => undefined }

    expect(
      await downloadNotificationFile(
        { client, authData: 'T', reference: 'REF1', kind: 'document' },
        'N1',
        '/nowhere',
        sleep,
      ),
    ).toEqual({ kind: 'document', status: 'failed' })
  })
})
