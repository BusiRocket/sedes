import type { CanonicalizationOptions } from '../types/CanonicalizationOptions'
import type { XmlDocument } from '../types/XmlDocument'
import { baseNamespaceScope } from './baseNamespaceScope'
import { renderCanonicalElement } from './renderCanonicalElement'
import { renderCanonicalLeaf } from './renderCanonicalLeaf'

/**
 * Canonicalise a whole document: prolog nodes each followed by a line feed,
 * the root, epilog nodes each preceded by one (comments only when kept).
 */
export const canonicalizeDocument = (
  document: XmlDocument,
  options: CanonicalizationOptions,
): string => {
  const kept = (node: XmlDocument['prolog'][number]): boolean =>
    node.kind === 'pi' || options.withComments
  const before = document.prolog
    .filter(kept)
    .map((node) => `${renderCanonicalLeaf(node, options)}\n`)
  const after = document.epilog
    .filter(kept)
    .map((node) => `\n${renderCanonicalLeaf(node, options)}`)
  const root = renderCanonicalElement(
    document.root,
    { scope: baseNamespaceScope(), rendered: new Map(), inherited: [] },
    options,
  )
  return [...before, root, ...after].join('')
}
