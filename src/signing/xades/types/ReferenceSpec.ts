import type { ReferenceTarget } from './ReferenceTarget'

/** One ds:Reference before its digest is known. */
export type ReferenceSpec = {
  readonly id?: string | undefined
  readonly type?: string | undefined
  readonly uri: string
  readonly transforms: readonly string[]
  readonly target: ReferenceTarget
}
