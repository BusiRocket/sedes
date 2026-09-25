import type { NamespaceScope } from './NamespaceScope'

/** What the canonical renderer knows when it reaches an element. */
export type CanonicalRenderState = {
  /** Namespaces in scope outside the element. */
  readonly scope: NamespaceScope
  /** Namespaces the output ancestors already rendered (their visible namespace axis). */
  readonly rendered: NamespaceScope
  /** `xml:*` attributes an inclusive apex inherits from ancestors outside the subset. */
  readonly inherited: readonly Readonly<{ name: string; value: string }>[]
}
