import type { CanonicalizationOptions } from '../types/CanonicalizationOptions'
import type { CanonicalRenderState } from '../types/CanonicalRenderState'
import type { XmlElement } from '../types/XmlElement'
import { canonicalAttributes } from './canonicalAttributes'
import { canonicalNamespaces } from './canonicalNamespaces'
import { escapeCanonicalAttribute } from './escapeCanonicalAttribute'
import { extendNamespaceScope } from './extendNamespaceScope'
import { renderCanonicalLeaf } from './renderCanonicalLeaf'

/** Render an element and its subtree canonically, skipping the excluded subtree. */
export const renderCanonicalElement = (
  element: XmlElement,
  state: CanonicalRenderState,
  options: CanonicalizationOptions,
): string => {
  if (options.exclude === element) return ''
  const scope = extendNamespaceScope(state.scope, element)
  const namespaces = canonicalNamespaces(
    element,
    scope,
    state.rendered,
    options,
  )
  const declared = namespaces.declarations
    .map(([prefix, uri]) =>
      prefix === ''
        ? ` xmlns="${escapeCanonicalAttribute(uri)}"`
        : ` xmlns:${prefix}="${escapeCanonicalAttribute(uri)}"`,
    )
    .join('')
  const own = new Set(element.attributes.map(({ name }) => name))
  const attributes = [
    ...element.attributes,
    ...state.inherited.filter(({ name }) => !own.has(name)),
  ]
  const inner = { scope, rendered: namespaces.rendered, inherited: [] }
  const children = element.children
    .map((child) =>
      child.kind === 'element'
        ? renderCanonicalElement(child, inner, options)
        : renderCanonicalLeaf(child, options),
    )
    .join('')
  return `<${element.name}${declared}${canonicalAttributes(attributes, scope)}>${children}</${element.name}>`
}
