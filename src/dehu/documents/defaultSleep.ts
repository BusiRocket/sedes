import type { Sleep } from './types/Sleep'

/** The real pause: a resolved promise after `ms` milliseconds. */
export const defaultSleep: Sleep = async (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
