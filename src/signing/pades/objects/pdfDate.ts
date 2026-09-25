/** A PDF date string body in UTC: `D:YYYYMMDDHHmmss+00'00'`. */
export const pdfDate = (date: Date): string => {
  const digits = date.toISOString().replace(/\D/g, '').slice(0, 14)
  return `D:${digits}+00'00'`
}
