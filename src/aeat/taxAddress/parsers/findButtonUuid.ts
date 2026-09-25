/** The uuid of the first ZK button whose label starts with `labelPrefix`. */
export const findButtonUuid = (html: string, labelPrefix: string): string => {
  for (const [, uuid = '', attributes = ''] of html.matchAll(
    /Button','(\w+)',\{([^}]*)\}/g,
  ))
    if (attributes.includes(`label:'${labelPrefix}`)) return uuid
  throw new Error(`AEAT: 036 button "${labelPrefix}" not found`)
}
