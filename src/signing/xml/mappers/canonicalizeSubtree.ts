import type { CanonicalizationOptions } from '../types/CanonicalizationOptions'
import type { XmlElement } from '../types/XmlElement'
import { inheritedXmlAttributes } from './inheritedXmlAttributes'
import { renderCanonicalElement } from './renderCanonicalElement'
import { scopeOfPath } from './scopeOfPath'

/**
 * Canonicalise the subtree of the last element of a root-to-element path, in
 * its document context: the namespaces (and, inclusive, the `xml:*`
 * attributes) its ancestors put in scope are rendered on it.
 */
export const canonicalizeSubtree = (
  path: readonly XmlElement[],
  options: CanonicalizationOptions,
): string => {
  const element = path.at(-1)
  if (element === undefined) throw new Error('xml: empty element path')
  const ancestors = path.slice(0, -1)
  return renderCanonicalElement(
    element,
    {
      scope: scopeOfPath(ancestors),
      rendered: new Map(),
      inherited: options.exclusive ? [] : inheritedXmlAttributes(ancestors),
    },
    options,
  )
}
