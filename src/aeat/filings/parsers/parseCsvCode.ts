/** The CSV (código seguro de verificación) a "Ver" click answers with, if any. */
export const parseCsvCode = (text: string): string | undefined =>
  /CSV=(\w+)/.exec(text)?.[1]
