import type { DerElement } from '../types/DerElement'
import { readDerElement } from './readDerElement'

/** The elements directly inside a constructed element, in order. */
export const readDerChildren = (
  der: Buffer,
  parent: DerElement,
): readonly DerElement[] => {
  const children: DerElement[] = []
  for (let offset = parent.valueStart; offset < parent.end;) {
    const child = readDerElement(der, offset)
    children.push(child)
    offset = child.end
  }
  return children
}
