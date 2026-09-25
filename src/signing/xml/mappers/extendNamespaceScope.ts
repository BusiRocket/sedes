import type { NamespaceScope } from '../types/NamespaceScope'
import type { XmlElement } from '../types/XmlElement'

/** The scope inside `element`: the outer scope plus the element's own declarations. */
export const extendNamespaceScope = (
  scope: NamespaceScope,
  element: XmlElement,
): NamespaceScope => {
  const next = new Map(scope)
  for (const { name, value } of element.attributes) {
    if (name === 'xmlns') next.set('', value)
    else if (name.startsWith('xmlns:')) next.set(name.slice(6), value)
  }
  return next
}
