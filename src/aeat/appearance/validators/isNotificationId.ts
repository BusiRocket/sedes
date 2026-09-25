/** A GNNO-JDIT notification id (`ncc`): digits only, as the list links print it. */
export const isNotificationId = (value: string): boolean =>
  /^\d{6,20}$/.test(value)
