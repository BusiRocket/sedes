/** A date as the GNNO-JDIT search form wants it: `dd-mm-aaaa`. */
export const formatDashDate = (date: Date): string => {
  const pad = (value: number): string => String(value).padStart(2, '0')
  return `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${String(date.getFullYear())}`
}
