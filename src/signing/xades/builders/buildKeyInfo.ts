import type { XmlElement } from '../../xml/types/XmlElement'
import { rsaKeyValue } from '../mappers/rsaKeyValue'
import type { SignatureContext } from '../types/SignatureContext'
import { buildElement } from './buildElement'
import { buildTextElement } from './buildTextElement'

/** ds:KeyInfo: X509Data with the signer (and chain), optionally RSAKeyValue. */
export const buildKeyInfo = (context: SignatureContext): XmlElement => {
  const { ds } = context.prefixes
  const { signer, chain } = context.certificates
  const certificates = (context.keyInfo.chain ? chain : [signer]).map(
    (certificate) =>
      buildTextElement(
        `${ds}:X509Certificate`,
        certificate.raw.toString('base64'),
      ),
  )
  const keyValue = context.keyInfo.keyValue ? [rsaKeyValue(signer)] : []
  return buildElement(`${ds}:KeyInfo`, { Id: context.ids.keyInfo }, [
    buildElement(`${ds}:X509Data`, {}, certificates),
    ...keyValue.map(({ modulus, exponent }) =>
      buildElement(`${ds}:KeyValue`, {}, [
        buildElement(`${ds}:RSAKeyValue`, {}, [
          buildTextElement(`${ds}:Modulus`, modulus),
          buildTextElement(`${ds}:Exponent`, exponent),
        ]),
      ]),
    ),
  ])
}
