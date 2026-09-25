import type { XadesMode } from './XadesMode'

/** A signed XML document and what went into it. */
export type SignXmlResult = {
  readonly xml: Buffer
  readonly mode: XadesMode
  readonly signatureId: string
  /** Subject of the signing certificate. */
  readonly signer: string
}
