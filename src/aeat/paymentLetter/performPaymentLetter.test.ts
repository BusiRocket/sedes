import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { performPaymentLetter } from './performPaymentLetter'

const clave = 'A0000000000000001'
const token = (value: string): string => `jQuery('#pUV').val('${value}');`

const portal = (pages: Readonly<Record<string, string>>) =>
  vi.fn<HttpClient['request']>(async (url, options) => {
    const servlet = /SRVO-JDIT\/(\w+)/.exec(url)?.[1] ?? ''
    const text = url.includes('VerPdfWlpl')
      ? '%PDF carta'
      : (pages[servlet] ?? '')
    return Promise.resolve({
      status: 200,
      url,
      headers: { 'x-puv': options?.form?.['pUV'] ?? '' },
      body: Buffer.from(text),
      text,
    })
  })

const chain = {
  PagarParcial: `<a href="javascript:ejecutar('${clave}')">${clave}</a>${token('A1')}`,
  DetalleDda: token('B2'),
  ResumenDdas: token('C3'),
  FinalPago:
    "<h3>Documento de ingreso</h3><td>100000000000A</td><a href='/VerPdfWlpl?ncc=NCC123456'>PDF</a>",
}
const request = { nif: '00000000T', clave, importe: '100,50', confirm: true }

describe('performPaymentLetter', () => {
  it('walks the chain, carrying each page token to the next step', async () => {
    const outDir = await mkdtemp(join(tmpdir(), 'ventanilla-unica-010-'))
    const client = portal(chain)
    const receipt = await performPaymentLetter(
      { request: client, cookie: () => undefined },
      { ...request, outDir },
      'D0',
      100000,
    )
    expect(receipt).toEqual({
      clave,
      importe: '100,50',
      justificante: '100000000000A',
      pdfPath: join(outDir, 'aeat-010-100000000000A.pdf'),
    })
    const posted = client.mock.calls.map(([url, options]) => [
      /(?:SRVO-JDIT\/|VerPdfWlpl)(\w*)/.exec(url)?.[1],
      options?.form?.['pUV'],
    ])
    expect(posted).toEqual([
      ['PagarParcial', 'D0'],
      ['DetalleDda', 'A1'],
      ['ResumenDdas', 'B2'],
      ['FinalPago', 'C3'],
      ['', undefined],
    ])
    expect(client.mock.calls[3]?.[1]?.form).toMatchObject({
      fimpselecc: '100',
      fimpseleccdec: '50',
      fimptotal: '100000',
    })
  })

  it('returns the justificante without a PDF when --out or the reference is missing', async () => {
    const receipt = await performPaymentLetter(
      { request: portal(chain), cookie: () => undefined },
      request,
      'D0',
      100000,
    )
    expect(receipt.pdfPath).toBeUndefined()
    expect(receipt.justificante).toBe('100000000000A')
  })

  it('stops when PagarParcial does not list the debt', async () => {
    await expect(
      performPaymentLetter(
        {
          request: portal({ PagarParcial: '<input name="fnif">' }),
          cookie: () => undefined,
        },
        request,
        'D0',
        100000,
      ),
    ).rejects.toThrow('nothing was generated')
  })

  it('stops when FinalPago prints no justificante', async () => {
    await expect(
      performPaymentLetter(
        {
          request: portal({ ...chain, FinalPago: '<p>error</p>' }),
          cookie: () => undefined,
        },
        request,
        'D0',
        100000,
      ),
    ).rejects.toThrow('printed no justificante')
  })
})
