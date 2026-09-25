/** Four digits, the way the AESRCUS3 select codes its years. */
export const isYear = (value: string): boolean => /^\d{4}$/.test(value)
