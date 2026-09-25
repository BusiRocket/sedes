import type { NamespaceScope } from '../types/NamespaceScope'
import type { XmlAttribute } from '../types/XmlAttribute'
import { attributeNamespace } from './attributeNamespace'
import { escapeCanonicalAttribute } from './escapeCanonicalAttribute'
import { isNamespaceDeclaration } from './isNamespaceDeclaration'
import { splitQualifiedName } from './splitQualifiedName'

/** Render the non-namespace attributes sorted by namespace URI, then local name. */
export const canonicalAttributes = (
  attributes: readonly XmlAttribute[],
  scope: NamespaceScope,
): string => {
  // A namespace URI never contains U+0000, so this key orders by URI, then local name.
  const keyed = attributes
    .filter(({ name }) => !isNamespaceDeclaration(name))
    .map((attribute) => ({
      attribute,
      key: `${attributeNamespace(attribute.name, scope) ?? ''}\u0000${splitQualifiedName(attribute.name).local}`,
    }))
  keyed.sort((a, b) => (a.key < b.key ? -1 : 1))
  return keyed
    .map(
      ({ attribute }) =>
        ` ${attribute.name}="${escapeCanonicalAttribute(attribute.value)}"`,
    )
    .join('')
}
