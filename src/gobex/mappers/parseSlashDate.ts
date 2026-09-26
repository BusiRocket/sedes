/** A `dd/mm/aaaa` date as a local midnight `Date`; anything else is refused. */
export const parseSlashDate = (text: string): Date => {
  const [, day = '', month = '', year = ''] =
    /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(text) ?? []
  const date = new Date(Number(year), Number(month) - 1, Number(day))
  if (!day || date.getDate() !== Number(day))
    throw new Error(`Junta: "${text}" is not a dd/mm/aaaa date`)
  return date
}
