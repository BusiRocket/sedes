/** The validation flags an IAS screen raised (`Nombre="mostrarError*">true`), by name. */
export const readErrorFlags = (xml: string): string[] =>
  [...xml.matchAll(/Nombre="(mostrarError\w+)">true</g)].map((match) =>
    String(match[1]),
  )
