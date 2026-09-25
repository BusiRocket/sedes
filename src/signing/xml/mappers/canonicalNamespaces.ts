import type { CanonicalizationOptions } from '../types/CanonicalizationOptions'
import type { CanonicalNamespaces } from '../types/CanonicalNamespaces'
import type { NamespaceScope } from '../types/NamespaceScope'
import type { XmlElement } from '../types/XmlElement'
import { visiblyUsedPrefixes } from './visiblyUsedPrefixes'

/**
 * Decide which namespace declarations an element renders: inclusive C14N
 * considers every namespace in scope, exclusive only the visibly used ones
 * plus the InclusiveNamespaces PrefixList; either renders one only when the
 * output ancestors did not already render the same binding.
 */
export const canonicalNamespaces = (
  element: XmlElement,
  scope: NamespaceScope,
  rendered: NamespaceScope,
  options: CanonicalizationOptions,
): CanonicalNamespaces => {
  const listed = (options.inclusivePrefixes ?? []).map((prefix) =>
    prefix === '#default' ? '' : prefix,
  )
  const candidates = options.exclusive
    ? [...visiblyUsedPrefixes(element), ...listed].filter(
        (p) => scope.has(p) || p === '',
      )
    : [...scope.keys()]
  const next = new Map(rendered)
  const declarations: [string, string][] = []
  for (const prefix of new Set(candidates)) {
    if (prefix === 'xml') continue
    const uri = scope.get(prefix) ?? ''
    const shown = rendered.get(prefix) ?? ''
    const differs = uri === '' ? shown !== '' : rendered.get(prefix) !== uri
    if (!differs) continue
    declarations.push([prefix, uri])
    next.set(prefix, uri)
  }
  declarations.sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
  return { declarations, rendered: next }
}
