/** Re-post a listed row as the selected one: `<prefix>.<key>` for each key, empty when the row lacks it. */
export const selectedRecordFields = (
  prefix: string,
  record: Readonly<Record<string, string>>,
  keys: readonly string[],
): Record<string, string> =>
  Object.fromEntries(keys.map((key) => [`${prefix}.${key}`, record[key] ?? '']))
