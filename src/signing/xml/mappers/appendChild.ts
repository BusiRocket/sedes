import type { XmlElement } from '../types/XmlElement'
import type { XmlNode } from '../types/XmlNode'

/** Append a child, merging adjacent text (character data next to CDATA is one text node). */
export const appendChild = (parent: XmlElement, node: XmlNode): void => {
  const last = parent.children.at(-1)
  if (node.kind === 'text' && last?.kind === 'text') {
    last.value += node.value
    return
  }
  parent.children.push(node)
}
