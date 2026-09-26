import { mkdtemp, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

import { buildTestIdentity } from '../fixtures/buildTestIdentity'
import { buildClassicPdf } from './fixtures/buildClassicPdf'
import { signPdfFile } from './signPdfFile'

describe('signPdfFile', () => {
  const identity = buildTestIdentity('ANA')

  it('writes the signed copy and reports it', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'ventanilla-unica-pades-'))
    const input = join(dir, 'in.pdf')
    const output = join(dir, 'out.pdf')
    // eslint-disable-next-line security/detect-non-literal-fs-filename -- a temporary test directory
    await writeFile(input, buildClassicPdf())
    const result = await signPdfFile(identity, {
      input,
      output,
      options: { visible: true },
    })
    expect(result).toMatchObject({
      signer: 'ANA',
      visible: true,
      subFilter: 'ETSI.CAdES.detached',
    })
    // eslint-disable-next-line security/detect-non-literal-fs-filename -- a temporary test directory
    expect((await readFile(output)).length).toBe(result.bytes)
  })

  it('never overwrites the input', async () => {
    await expect(
      signPdfFile(identity, { input: 'a.pdf', output: './a.pdf', options: {} }),
    ).rejects.toThrow(/must differ/)
  })
})
