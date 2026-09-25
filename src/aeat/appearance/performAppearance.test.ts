import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpRequestOptions } from '../../http/types/HttpRequestOptions'
import { performAppearance } from './performAppearance'

const portal = (csv: string): ReturnType<typeof vi.fn<HttpClient['request']>> =>
  vi.fn<HttpClient['request']>(
    async (url: string, options?: HttpRequestOptions) => {
      const answer = async (text: string, body = Buffer.from(text)) =>
        Promise.resolve({
          status: 200,
          url,
          headers: {},
          body,
          text,
        })
      if (url.includes('CotejoDocIdSv'))
        return answer('', Buffer.from('%PDF acuse'))
      if (options?.form?.['accion'] === 'vernotif')
        return answer('', Buffer.from('%PDF acto'))
      if (options?.form?.['accion'] === 'firma')
        return answer(
          `<p>Concepto: LIQ A01</p><p>Fecha notificación: 26-09-2026</p>${csv ? `<a href='CotejoDocIdSv?CSV=${csv}'>x</a>` : ''}`,
        )
      return answer("<script>_fbNif='00000000T';_fbNombre='ANA';</script>")
    },
  )

describe('performAppearance', () => {
  it('signs, then saves the act and the acuse', async () => {
    const request = portal('ABCDEFGH12345678')
    const outDir = await mkdtemp(join(tmpdir(), 'papeleo-perform-'))
    const receipt = await performAppearance(
      { request, cookie: () => undefined },
      '00000000t',
      '123456',
      outDir,
    )
    expect(receipt).toEqual({
      ncc: '123456',
      concepto: 'LIQ A01',
      fechaNotificacion: '2026-09-26',
      csv: 'ABCDEFGH12345678',
      actoPath: join(outDir, 'aeat-notificacion-123456-acto.pdf'),
      acusePath: join(outDir, 'aeat-notificacion-123456-acuse.pdf'),
    })
    expect(
      request.mock.calls.map(([, options]) => options?.form?.['accion']),
    ).toEqual([undefined, 'firma', 'vernotif', undefined])
  })

  it('skips downloads without outDir and the acuse without a CSV', async () => {
    const withoutOut = await performAppearance(
      { request: portal('ABCDEFGH12345678'), cookie: () => undefined },
      '00000000T',
      '1',
    )
    expect(withoutOut.actoPath).toBeUndefined()
    const outDir = await mkdtemp(join(tmpdir(), 'papeleo-perform-'))
    const withoutCsv = await performAppearance(
      { request: portal(''), cookie: () => undefined },
      '00000000T',
      '1',
      outDir,
    )
    expect(withoutCsv.actoPath).toBeDefined()
    expect(withoutCsv.acusePath).toBeUndefined()
  })

  it('refuses before the act when the screen is for another NIF', async () => {
    const request = portal('X')
    await expect(
      performAppearance({ request, cookie: () => undefined }, 'B00000000', '1'),
    ).rejects.toThrow('nothing was done')
    expect(request).toHaveBeenCalledTimes(1)
  })
})
