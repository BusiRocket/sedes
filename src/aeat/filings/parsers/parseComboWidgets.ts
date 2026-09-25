/** Every ZK `Combobox` declared with an `id` on the page, as id -> uuid (first declaration wins). */
export const parseComboWidgets = (
  html: string,
): ReadonlyMap<string, string> => {
  const combos = new Map<string, string>()
  for (const match of html.matchAll(/\['([\w.]+)','(\w+)',\{id:'(\w+)'/g)) {
    const [, widgetClass = '', uuid = '', id = ''] = match
    if (widgetClass.includes('Combobox') && !combos.has(id))
      combos.set(id, uuid)
  }
  return combos
}
