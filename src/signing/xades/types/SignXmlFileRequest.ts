import type { SignXmlPolicyName } from './SignXmlPolicyName'
import type { XadesMode } from './XadesMode'

/** A checked `ventanilla-unica firmar xml` invocation. */
export type SignXmlFileRequest = {
  readonly input: string
  readonly output: string
  readonly mode: XadesMode
  readonly policy: SignXmlPolicyName
}
