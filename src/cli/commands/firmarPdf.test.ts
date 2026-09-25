import { mkdtemp, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { buildTestIdentity } from '../../signing/fixtures/buildTestIdentity'
import { buildClassicPdf } from '../../signing/pades/fixtures/buildClassicPdf'
import { firmarPdf } from './firmarPdf'

const request = vi.fn()
const client: HttpClient = { request, cookie: () => undefined }

describe('firmarPdf', () => {
  it('is a local signing command', () => {
    expect(firmarPdf).toMatchObject({
      portal: 'firmar',
      action: 'pdf',
      effect: 'sign',
    })
  })

  it('requires --in, --out and the certificate', async () => {
    await expect(firmarPdf.run(client, {})).rejects.toThrow(/--in and --out/)
    await expect(firmarPdf.run(client, { in: 'a', out: 'b' })).rejects.toThrow(
      /needs the certificate/,
    )
  })

  it('signs the file without touching the network', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'papeleo-firmar-'))
    const input = join(dir, 'in.pdf')
    // eslint-disable-next-line security/detect-non-literal-fs-filename -- a temporary test directory
    await writeFile(input, buildClassicPdf())
    const options = {
      in: input,
      out: join(dir, 'out.pdf'),
      visible: 'si',
      motivo: 'Conforme',
    }
    await expect(
      firmarPdf.run(client, options, buildTestIdentity('ANA')),
    ).resolves.toMatchObject({
      signer: 'ANA',
      visible: true,
    })
    expect(request).not.toHaveBeenCalled()
  })
})
