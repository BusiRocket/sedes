import type { XmlElement } from '../../xml/types/XmlElement'
import type { XmlNode } from '../../xml/types/XmlNode'

/** A new element with attributes in the given order. */
export const buildElement = (
  name: string,
  attributes: Readonly<Record<string, string>>,
  children: readonly XmlNode[] = [],
): XmlElement => ({
  kind: 'element',
  name,
  attributes: Object.entries(attributes).map(([key, value]) => ({
    name: key,
    value,
  })),
  children: [...children],
})
