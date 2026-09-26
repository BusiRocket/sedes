import type { IncomingMessage } from 'node:http'
import { Readable } from 'node:stream'

import { describe, expect, it } from 'vitest'

import { collectResponse } from './collectResponse'
import { CookieJar } from './CookieJar'
import { maxBodyBytes } from './maxBodyBytes'

const response = (chunks: Buffer[]): IncomingMessage =>
  Object.assign(Readable.from(chunks), {
    headers: { 'content-type': 'text/plain', 'set-cookie': ['a=1'] },
    statusCode: 200,
  }) as unknown as IncomingMessage

describe('collectResponse', () => {
  it('decodes the body and stores the cookies for the host', async () => {
    const jar = new CookieJar()
    const result = await collectResponse(
      response([Buffer.from('he'), Buffer.from('llo')]),
      'https://sede.oargt.es/x',
      jar,
      undefined,
    )
    expect(result.text).toBe('hello')
    expect(result.status).toBe(200)
    expect(jar.get('sede.oargt.es', 'a')).toBe('1')
  })

  it('refuses a body over the limit', async () => {
    await expect(
      collectResponse(
        response([Buffer.alloc(maxBodyBytes), Buffer.alloc(1)]),
        'https://sede.oargt.es/big',
        new CookieJar(),
        undefined,
      ),
    ).rejects.toThrow('exceeds')
  })
})
