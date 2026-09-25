import type { XmlElement } from '../../xml/types/XmlElement'
import type { SignatureContext } from '../types/SignatureContext'
import { buildElement } from './buildElement'
import { buildSignaturePolicyIdentifier } from './buildSignaturePolicyIdentifier'
import { buildSigningCertificate } from './buildSigningCertificate'
import { buildTextElement } from './buildTextElement'

/**
 * xades:SignedProperties: SigningTime (UTC), SigningCertificate, the policy
 * when EPES, and a DataObjectFormat for the signed content.
 */
export const buildSignedProperties = (
  context: SignatureContext,
): XmlElement => {
  const { xades } = context.prefixes
  const policy =
    context.policy === undefined
      ? []
      : [buildSignaturePolicyIdentifier(context.prefixes, context.policy)]
  const encoding =
    context.encoding === undefined
      ? []
      : [buildTextElement(`${xades}:Encoding`, context.encoding)]
  const signingTime = context.signingTime
    .toISOString()
    .replace(/\.\d{3}Z$/, 'Z')
  return buildElement(
    `${xades}:SignedProperties`,
    { Id: context.ids.signedProperties },
    [
      buildElement(`${xades}:SignedSignatureProperties`, {}, [
        buildTextElement(`${xades}:SigningTime`, signingTime),
        buildSigningCertificate(context),
        ...policy,
      ]),
      buildElement(`${xades}:SignedDataObjectProperties`, {}, [
        buildElement(
          `${xades}:DataObjectFormat`,
          { ObjectReference: `#${context.ids.reference}` },
          [
            buildTextElement(`${xades}:MimeType`, context.mimeType),
            ...encoding,
          ],
        ),
      ]),
    ],
  )
}
