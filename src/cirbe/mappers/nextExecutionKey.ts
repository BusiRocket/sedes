/** The snapshot key after one more WebFlow event: `e1s1` becomes `e1s2`. */
export const nextExecutionKey = (key: string): string =>
  key.replace(
    /s(\d+)$/,
    (_match, step: string) => `s${String(Number(step) + 1)}`,
  )
