import { createHash, verify, X509Certificate } from 'node:crypto'

import { readDerChildren } from '../../asn1/parsers/readDerChildren'
import { readDerElement } from '../../asn1/parsers/readDerElement'

/**
 * Check a detached CMS the way a validator would: the signed attributes carry
 * SHA-256(content) and the RSA signature over them verifies with `cert`.
 */
export const verifyDetachedCms = (
  cms: Buffer,
  content: Buffer,
  cert: Buffer,
): boolean => {
  const [, wrapper] = readDerChildren(cms, readDerElement(cms, 0))
  const signedData = wrapper && readDerChildren(cms, wrapper)[0]
  const signerSet = signedData && readDerChildren(cms, signedData).at(-1)
  const signer = signerSet && readDerChildren(cms, signerSet)[0]
  const [attributes, , signature] = signer
    ? readDerChildren(cms, signer).slice(3)
    : []
  if (!attributes || !signature) return false
  const signedBytes = Buffer.from(
    cms.subarray(attributes.start, attributes.end),
  )
  signedBytes[0] = 0x31
  const digest = createHash('sha256').update(content).digest()
  const value = cms.subarray(signature.valueStart, signature.end)
  const key = new X509Certificate(cert).publicKey
  return (
    signedBytes.includes(digest) && verify('sha256', signedBytes, key, value)
  )
}
