import { appendChild } from '../mappers/appendChild'
import type { XmlCursor } from '../types/XmlCursor'
import type { XmlElement } from '../types/XmlElement'
import { readContentItem } from './readContentItem'
import { readStartTag } from './readStartTag'
import { xmlSyntaxError } from './xmlSyntaxError'

/** Read one element and everything inside it, without recursion. */
export const readElementTree = (cursor: XmlCursor): XmlElement => {
  const root = readStartTag(cursor)
  if (root.selfClosing) return root.element
  const open: XmlElement[] = [root.element]
  for (
    let current = open.at(-1);
    current !== undefined;
    current = open.at(-1)
  ) {
    const item = readContentItem(cursor)
    if (item.type === 'end') {
      if (item.name !== current.name)
        throw xmlSyntaxError(
          cursor,
          `"</${item.name}>" closes "<${current.name}>"`,
        )
      open.pop()
    } else if (item.type === 'start') {
      appendChild(current, item.element)
      if (!item.selfClosing) open.push(item.element)
    } else appendChild(current, item.node)
  }
  return root.element
}
