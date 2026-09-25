import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, describe, expect, it } from 'vitest'

import { writePaymentReceipt } from './writePaymentReceipt'

describe('writePaymentReceipt', () => {
  let dir: string | undefined

  afterEach(async () => {
    if (dir) await rm(dir, { recursive: true, force: true })
    dir = undefined
  })

  it('writes the PDF under aeat-pago-<nrc>.pdf', async () => {
    dir = await mkdtemp(join(tmpdir(), 'sedes-aeat-'))
    const pdf = Buffer.from('%PDF-1.4 fixture')

    const filePath = await writePaymentReceipt(
      dir,
      '1026110000002JKLMNOPQR',
      pdf,
    )

    expect(filePath).toBe(join(dir, 'aeat-pago-1026110000002JKLMNOPQR.pdf'))
    // filePath is the path this same test just built under its own temp dir.
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    await expect(readFile(filePath)).resolves.toEqual(pdf)
  })
})
