/** The uuids of the street list items the 036 street finder answered. */
export const parseStreetItems = (text: string): readonly string[] =>
  [...text.matchAll(/Listitem','(\w+)'/g)].map(([, uuid = '']) => uuid)
