import type { XmlElement } from '../../xml/types/XmlElement'
import type { SignatureContext } from '../types/SignatureContext'
import { buildElement } from './buildElement'
import { buildSignedProperties } from './buildSignedProperties'

/** The ds:Object that carries xades:QualifyingProperties. */
export const buildQualifyingObject = (context: SignatureContext): XmlElement =>
  buildElement(`${context.prefixes.ds}:Object`, {}, [
    buildElement(
      `${context.prefixes.xades}:QualifyingProperties`,
      {
        Id: context.ids.qualifyingProperties,
        Target: `#${context.ids.signature}`,
      },
      [buildSignedProperties(context)],
    ),
  ])
