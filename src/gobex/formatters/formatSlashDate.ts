/** A date as the Carpeta Ciudadana's calendar inputs want it: `dd/mm/aaaa`. */
export const formatSlashDate = (date: Date): string => {
  const pad = (value: number): string => String(value).padStart(2, '0')
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${String(date.getFullYear())}`
}
