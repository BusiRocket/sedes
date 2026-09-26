import type { SignXmlPolicyName } from './SignXmlPolicyName'
import type { XadesMode } from './XadesMode'

/** What `ventanilla-unica firmar xml` reports. */
export type SignXmlFileResult = {
  readonly out: string
  readonly mode: XadesMode
  readonly policy: SignXmlPolicyName
  readonly signatureId: string
  readonly bytes: number
  readonly signer: string
  readonly notes: readonly string[]
}
