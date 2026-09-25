import type { XmlElement } from '../../xml/types/XmlElement'
import type { ReferenceSpec } from '../types/ReferenceSpec'
import type { SignatureContext } from '../types/SignatureContext'
import type { SignatureSkeleton } from '../types/SignatureSkeleton'
import { xadesUris } from '../xadesUris'
import { buildElement } from './buildElement'
import { buildKeyInfo } from './buildKeyInfo'
import { buildQualifyingObject } from './buildQualifyingObject'
import { buildSignedInfo } from './buildSignedInfo'
import { buildText } from './buildText'

/**
 * The ds:Signature tree, both prefixes declared on it: SignedInfo,
 * SignatureValue, KeyInfo, the enveloped content object when there is one,
 * then the QualifyingProperties object.
 */
export const buildSignature = (
  context: SignatureContext,
  content: ReferenceSpec,
  contentObject?: XmlElement,
): SignatureSkeleton => {
  const { ds, xades } = context.prefixes
  const signedInfo = buildSignedInfo(context, content)
  const signatureValue = buildText('')
  const signature = buildElement(
    `${ds}:Signature`,
    {
      [`xmlns:${ds}`]: xadesUris.ds,
      [`xmlns:${xades}`]: xadesUris.xades,
      Id: context.ids.signature,
    },
    [
      signedInfo.element,
      buildElement(`${ds}:SignatureValue`, { Id: context.ids.signatureValue }, [
        signatureValue,
      ]),
      buildKeyInfo(context),
      ...(contentObject === undefined ? [] : [contentObject]),
      buildQualifyingObject(context),
    ],
  )
  return {
    signature,
    signedInfo: signedInfo.element,
    signatureValue,
    references: signedInfo.references,
  }
}
