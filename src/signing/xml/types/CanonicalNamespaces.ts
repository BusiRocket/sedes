import type { NamespaceScope } from './NamespaceScope'

/** The namespace declarations an element renders and the visible axis its children see. */
export type CanonicalNamespaces = {
  readonly declarations: readonly (readonly [string, string])[]
  readonly rendered: NamespaceScope
}
