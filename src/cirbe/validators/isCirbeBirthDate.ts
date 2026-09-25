/** True for a date written exactly `dd-mm-aaaa`, the only form the petición accepts. */
export const isCirbeBirthDate = (value: string): boolean =>
  /^(?:0[1-9]|[12]\d|3[01])-(?:0[1-9]|1[0-2])-(?:19|20)\d{2}$/.test(value)
