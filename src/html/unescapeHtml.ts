import { namedHtmlEntities } from './namedHtmlEntities'

/** Decode the HTML entities the portals emit: numeric ones and the Spanish named set. */
export const unescapeHtml = (value: string): string =>
  value.replaceAll(
    /&(#x[\da-f]+|#\d+|[a-z]+);/gi,
    (match: string, entity: string) => {
      const hexRadix = 16
      if (entity.startsWith('#x') || entity.startsWith('#X'))
        return String.fromCodePoint(Number.parseInt(entity.slice(2), hexRadix))
      if (entity.startsWith('#'))
        return String.fromCodePoint(Number.parseInt(entity.slice(1), 10))
      return namedHtmlEntities[entity] ?? match
    },
  )
