import type { CertificateIdentity } from '../../certificate/types/CertificateIdentity'
import { signPkcs1Sha256 } from '../../signing/signPkcs1Sha256'

/**
 * The TGSS "firma optimizada" as AutoScript performs it with
 * `autofirma_Formato="NONE"`: a raw RSA PKCS#1 v1.5 SHA-256 signature over the
 * bytes the portal prepared (sent base64), returned base64. The portal only
 * requests `SHA256withRSA` (`FIRMAAUTOSCRIPT`); any other algorithm is refused
 * rather than signed with the wrong digest.
 */
export const signAutoscriptData = (
  identity: CertificateIdentity,
  dataBase64: string,
  algorithm: string,
): string => {
  if (algorithm.toUpperCase() !== 'SHA256WITHRSA')
    throw new Error(`unsupported AutoScript algorithm: ${algorithm}`)
  const data = Buffer.from(dataBase64, 'base64')
  if (data.length === 0) throw new Error('the portal sent no data to sign')
  return signPkcs1Sha256(identity, data).toString('base64')
}
