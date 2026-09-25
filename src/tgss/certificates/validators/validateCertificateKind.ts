import { certificateKinds } from '../certificateKinds'
import type { CertificateKind } from '../types/CertificateKind'

/** Accept `--tipo` as a kind name (`generico`) or as the portal's option value (`1`). */
export const validateCertificateKind = (
  input: string | undefined,
): CertificateKind => {
  const kinds = Object.keys(certificateKinds) as readonly CertificateKind[]
  const found = kinds.find(
    (kind) => kind === input || certificateKinds[kind].value === input,
  )
  if (found) return found
  const accepted = kinds
    .map((kind) => `${kind} (${certificateKinds[kind].value})`)
    .join(', ')
  throw new Error(
    `--tipo is required and must be one of ${accepted}; got "${input ?? ''}"`,
  )
}
