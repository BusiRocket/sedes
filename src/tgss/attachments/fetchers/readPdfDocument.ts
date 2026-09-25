import { readFile } from 'node:fs/promises'
import { basename } from 'node:path'

import type { SubmittedDocument } from '../types/SubmittedDocument'

/** Read the holder's `--documento` from disk and refuse anything that is not a PDF. */
export const readPdfDocument = async (
  path: string,
): Promise<SubmittedDocument> => {
  // path is the holder's own --documento choice, not attacker input.
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const content = await readFile(path)
  if (!content.subarray(0, 5).equals(Buffer.from('%PDF-')))
    throw new Error(`--documento is not a PDF: ${basename(path)}`)
  return { path, fileName: basename(path), bytes: content.length }
}
