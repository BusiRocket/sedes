import { createHash } from 'node:crypto'

/** Base64 SHA-256 of `data`. */
export const sha256Base64 = (data: Buffer | string): string =>
  createHash('sha256').update(data).digest('base64')
