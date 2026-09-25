import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../../http/types/HttpClient'
import { fetchLetterPdf } from './fetchLetterPdf'
import { postDebtStep } from './postDebtStep'

const answer = (
  status: number,
  body: string,
): Awaited<ReturnType<HttpClient['request']>> => ({
  status,
  url: '',
  headers: {},
  body: Buffer.from(body),
  text: body,
})

describe('payment-letter fetchers', () => {
  it('POSTs a SRVO-JDIT step', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(answer(200, 'page'))
    expect(
      await postDebtStep({ request, cookie: () => undefined }, 'DetalleDda', {
        a: 'b',
      }),
    ).toBe('page')
    expect(request.mock.calls[0]?.[0]).toBe(
      'https://www1.agenciatributaria.gob.es/wlpl/SRVO-JDIT/DetalleDda',
    )
    expect(request.mock.calls[0]?.[1]).toMatchObject({
      method: 'POST',
      form: { a: 'b' },
    })
  })

  it('throws on a failed step', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(answer(500, ''))
    await expect(
      postDebtStep({ request, cookie: () => undefined }, 'FinalPago', {}),
    ).rejects.toThrow('FinalPago answered HTTP 500')
  })

  it('GETs the carta de pago PDF', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(answer(200, '%PDF-1.4'))
    const pdf = await fetchLetterPdf(
      { request, cookie: () => undefined },
      'N1',
      '100000000000A',
    )
    expect(pdf.toString()).toBe('%PDF-1.4')
    expect(request.mock.calls[0]?.[0]).toContain(
      'VerPdfWlpl?ncc=N1&claveAplic=100000000000A',
    )
  })

  it('refuses a non-PDF answer', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(answer(200, '<html>'))
    await expect(
      fetchLetterPdf({ request, cookie: () => undefined }, 'N1', 'J'),
    ).rejects.toThrow('did not answer a PDF')
  })
})
