import type { XmlAttribute } from '../types/XmlAttribute'
import type { XmlElement } from '../types/XmlElement'

/** The `xml:*` attributes in force from ancestors (nearest wins), for an inclusive apex. */
export const inheritedXmlAttributes = (
  ancestors: readonly XmlElement[],
): XmlAttribute[] => {
  const found = new Map<string, string>()
  for (const ancestor of ancestors)
    for (const { name, value } of ancestor.attributes)
      if (name.startsWith('xml:')) found.set(name, value)
  return [...found].map(([name, value]) => ({ name, value }))
}
